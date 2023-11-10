// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"context"
	"strings"
	"time"

	"go.chromium.org/tast-tests/cros/common/android/ui"
	"go.chromium.org/tast-tests/cros/local/chrome"
	"go.chromium.org/tast-tests/cros/local/chrome/ash"
	"go.chromium.org/tast-tests/cros/local/chrome/uiauto"
	"go.chromium.org/tast-tests/cros/local/chrome/uiauto/nodewith"
	"go.chromium.org/tast-tests/cros/local/chrome/uiauto/restriction"
	"go.chromium.org/tast-tests/cros/local/chrome/uiauto/role"
	"go.chromium.org/tast-tests/cros/local/input"
	"go.chromium.org/tast/core/errors"
	"go.chromium.org/tast/core/testing"
)

var centerButtonClassName = "FrameCenterButton"

// Check out WaitWindowFinishAnimating, might want to use this as well WaitWindowFinishAnimating
func CheckAppStatus(ctx context.Context, tconn *chrome.TestConn, s *testing.State, d *ui.Device, pkgName, appName string) (*ash.Window, AppStatus, ash.WindowStateType, error) {
	// 1. Check window size
	// If launched Maximized:
	// Potentail candidate for FS -> Amace
	// Check to Minimized App
	// App minimized: Check for CenterFrameButton (checkVisibility())
	// [FS >  AMAC ]

	// Cannot Unmaximize
	// [FS only]

	// [Not AMACE]

	// If not launched in maximized,
	// Check for CenterFrameButton (checkVisibility())
	// Check if its disabled
	// [AMAC (disabled)]
	// [AMAC]
	// [Not AMACE]

	windowChan := make(chan *ash.Window, 1)
	errorChan := make(chan string, 1)
	var initState ash.WindowStateType
	var result *ash.Window
	var isFullScreen bool
	s.Log("Getting window state ")
	go getWindowState(ctx, windowChan, errorChan, tconn, s, pkgName)

	s.Log("Got window state")
	select {
	case result = <-windowChan:
		s.Log("result window State: ", result.State)
		initState = result.State
	case err := <-errorChan:
		// Handle the result
		s.Log("result window err: ", err)
		return nil, Fail, ash.WindowStateNormal, errors.New(err)
	case <-time.After(time.Second * 5):
		// Handle timeout
		s.Log("Timeout occurred while getting ARC window state")
		return nil, Fail, ash.WindowStateNormal, errors.New("Timeout while getting ARC window state")
	}
	if result == nil {
		s.Log("Window returned was nil")
		return nil, Fail, ash.WindowStateNormal, errors.New("Window is nil")
	}

	if result.WindowType == ash.WindowTypeExtension {
		// App is PWA.
		if strings.ToLower(result.Title) != strings.ToLower(appName) {
			s.Logf("💥✅❌❌✅💥 Found PWA for %s but Window Title does not match appName: %s", result.Title, appName)
		}
		return result, PWA, initState, nil
	}

	isFullOrMax := result.State == ash.WindowStateMaximized || result.State == ash.WindowStateFullscreen
	if isFullOrMax && result.CanResize {
		// Potentail for FS => Amace
		// Minimize app and check for Amace Type
		isFullScreen = true
		s.Log("App is  Fullscreen, but can resize ")
	} else if isFullOrMax && !result.CanResize {
		s.Log("✅ App is O4C since its Fullscreen, no resize")
		return result, O4CFullScreenOnly, initState, nil
	}

	if isFullScreen {
		_, err := ash.SetARCAppWindowStateAndWait(ctx, tconn, pkgName, ash.WindowStateNormal)
		if err != nil {
			s.Log("Failed to set ARC window state: ", err)
			return result, Fail, initState, errors.New("continue")
		}
	}

	go getWindowState(ctx, windowChan, errorChan, tconn, s, pkgName)

	select {
	case result = <-windowChan:
		s.Log("result window State: ", result.State)
	case err := <-errorChan:
		// Handle the result
		s.Log("result window err: ", err)
		return nil, Fail, initState, errors.New(err)
	case <-time.After(time.Second * 5):
		// Handle timeout
		s.Log("Timeout occurred while getting ARC window state")
		return nil, Fail, initState, errors.New("Timeout while getting ARC window state")
	}
	if result == nil {
		s.Log("Window returned was nil")
		return nil, Fail, initState, errors.New("Window is nil")
	}

	// At this point, we have a restored/ Normal window
	if err := checkVisibility(ctx, tconn, centerButtonClassName, false /* visible */); err != nil {
		if err.Error() == "failed to start : failed to start activity: exit status 255" {
			s.Log("App error : ", err)
			return result, Fail, initState, errors.New("continue")
		}
		// If the error was not a failure error, we know the AMACE-E Label is present.
		ui := uiauto.New(tconn)
		centerBtn := nodewith.HasClass(centerButtonClassName)
		nodeInfo, err := ui.Info(ctx, centerBtn) // Returns info about the node, and more importantly, the window status
		if err != nil {
			s.Log("Failed to find the node info")
			return result, Fail, initState, errors.New("failed to find the node info")
		}

		if nodeInfo != nil {
			s.Log("Node info: ", nodeInfo)
			s.Log("Node info: Restriction", nodeInfo.Restriction)
			s.Log("Node info: Checked", nodeInfo.Checked)
			s.Log("Node info: ClassName", nodeInfo.ClassName)
			s.Log("Node info: Description", nodeInfo.Description)
			s.Log("Node info: HTMLAttributes", nodeInfo.HTMLAttributes)
			s.Log("Node info: Location", nodeInfo.Location)
			s.Log("Node info: Name", nodeInfo.Name)
			s.Log("Node info: Restriction", nodeInfo.Restriction)
			s.Log("Node info: Role", nodeInfo.Role)
			s.Log("Node info: Selected", nodeInfo.Selected)
			s.Log("Node info: State", nodeInfo.State)
			s.Log("Node info: Value", nodeInfo.Value)

			if nodeInfo.Restriction == restriction.Disabled {
				if result.BoundsInRoot.Width < result.BoundsInRoot.Height {
					return result, IsLockedPAmacE, initState, nil
				}
				return result, IsLockedTAmacE, initState, nil
			}
		} else {
			return result, Fail, initState, errors.New("nodeInfo was nil")
		}

		if isFullScreen {
			return result, IsFSToAmacE, initState, nil
		}
		return result, IsAmacE, initState, nil
	}
	return result, O4C, initState, nil
}

// checkVisibility checks whether the node specified by the given class name exists or not.
func checkAmaceVisibility(ctx context.Context, tconn *chrome.TestConn, className string, visible bool) error {
	uia := uiauto.New(tconn)
	finder := nodewith.HasClass(className).First()
	if visible {
		return uia.WithTimeout(10 * time.Second).WaitUntilExists(finder)(ctx)
	}
	return uia.WithTimeout(10 * time.Second).WaitUntilGone(finder)(ctx)
}

// checkResizability checks if window can resize.
func checkResizability(ctx context.Context, tconn *chrome.TestConn, s *testing.State, pkgName string) error {
	return testing.Poll(ctx, func(ctx context.Context) error {
		window, err := ash.GetARCAppWindowInfo(ctx, tconn, pkgName)
		if err != nil {
			return errors.Wrapf(err, "failed to get the ARC window infomation for package name %s", pkgName)
		}

		s.Log("Window state: ", window.State)
		s.Log("Window canResize: ", window.CanResize)

		return nil
	}, &testing.PollOptions{Timeout: 10 * time.Second})
}

// getWindowState returns the window state
func getWindowState(ctx context.Context, resultChan chan<- *ash.Window, errorChan chan<- string, tconn *chrome.TestConn, s *testing.State, pkgName string) {

	s.Log("Calling Arc Window state: ")
	window, err := ash.GetARCAppWindowInfo(ctx, tconn, pkgName)
	s.Log("Arc Window state: ", window, err)

	if err != nil && err.Error() == "couldn't find window: failed to find window" {
		pwawindow, pwaerr := ash.GetActiveWindow(ctx, tconn)
		s.Log("Arc Window not found because we have pwa most likely, check for ARCWindow?: ", window, err)

		if pwawindow != nil {
			s.Log("Window state: ", pwawindow.WindowType)
			s.Log("Window state: ", pwawindow.Name)
			s.Log("Window state: ", pwawindow.OverviewInfo)
			s.Log("Window state: ", pwawindow.Title) // TikTok
			s.Log("Window state: ", pwawindow.State)
			resultChan <- pwawindow
		}
		if pwaerr != nil {
			s.Log("Thoewing error on channel: ", pwaerr)
			// errorChan <- err.Error()
		}
		return
	}

	if window != nil {
		s.Log("ARC Window state: ", window.State)
		s.Log("ARC Window state: ", window.WindowType)
		resultChan <- window
	}
	if err != nil {
		s.Log("Thoewing error on channel: ", err)
		// errorChan <- err.Error()
	}
}

// ####################################################################################################
// ###  From Login Utils originally, helps to navigate various windows while logging in.
// ####################################################################################################

func restoreWindow(ctx context.Context, tconn *chrome.TestConn, cr *chrome.Chrome, pkgName string, initState ash.WindowStateType, keyboard *input.KeyboardEventWriter) error {
	window, err := ash.GetARCAppWindowInfo(ctx, tconn, pkgName)
	if err != nil {
		return errors.Wrapf(err, "failed to get the ARC window infomation for package name %s", pkgName)
	}

	// If app initState was Full or Maxmimized, check for Maximize Button
	if initState == ash.WindowStateFullscreen || initState == ash.WindowStateMaximized {
		// We need to press maximized but first we need to check if the Maximize button exists...

		testing.ContextLog(ctx, "restoreWindow Window can resize: ", window.CanResize)
		testing.ContextLog(ctx, "restoreWindow Window target bounds: ", window.TargetBounds)

		// Make the app resizable to enable maximization.
		ToggleResizeLockMode(ctx, tconn, cr, ResizableTogglableResizeLockMode, DialogActionConfirmWithDoNotAskMeAgainChecked, InputMethodClick, keyboard)

	}

	// Restore app
	err = testing.Poll(ctx, func(ctx context.Context) error {
		_, err = ash.SetARCAppWindowStateAndWait(ctx, tconn, pkgName, initState)
		if err != nil {
			testing.ContextLog(ctx, "Failed to change app back to initState: ", err)
			return err
		}

		return nil
	}, &testing.PollOptions{Timeout: 60 * time.Second, Interval: 750 * time.Millisecond})

	if err != nil {
		testing.ContextLog(ctx, err)
		return err
	}
	// If exists, press or maximize
	// Else, Choose Amace option Resizeable and then Maximize...
	return nil

}

const (

	// BubbleDialogClassName is the class name of the bubble dialog.
	BubbleDialogClassName = "BubbleDialogDelegateView"

	// Used to (i) find the resize lock mode buttons on the compat-mode menu and (ii) check the state of the compat-mode button
	phoneButtonName     = "Phone"
	tabletButtonName    = "Tablet"
	resizableButtonName = "Resizable"
	// CenterButtonClassName is the class name of the caption center button.
	CenterButtonClassName  = "FrameCenterButton"
	overlayDialogClassName = "OverlayDialog"
	confirmButtonName      = "Allow"
	cancelButtonName       = "Cancel"
	checkBoxClassName      = "Checkbox"
)

// ResizeLockMode represents the high-level state of the app from the resize-lock feature's perspective.
type ResizeLockMode int

const (
	// PhoneResizeLockMode represents the state where an app is locked in a portrait size.
	PhoneResizeLockMode ResizeLockMode = iota
	// TabletResizeLockMode represents the state where an app is locked in a landscape size.
	TabletResizeLockMode
	// ResizableTogglableResizeLockMode represents the state where an app is not resize lock, and the resize lock state is togglable.
	ResizableTogglableResizeLockMode
	// NoneResizeLockMode represents the state where an app is not eligible for resize lock.
	NoneResizeLockMode
)

func (mode ResizeLockMode) String() string {
	switch mode {
	case PhoneResizeLockMode:
		return phoneButtonName
	case TabletResizeLockMode:
		return tabletButtonName
	case ResizableTogglableResizeLockMode:
		return resizableButtonName
	default:
		return ""
	}
}

// ConfirmationDialogAction represents the expected behavior and action to take for the resizability confirmation dialog.
type ConfirmationDialogAction int

const (
	// DialogActionNoDialog represents the behavior where resize confirmation dialog isn't shown when a window is resized.
	DialogActionNoDialog ConfirmationDialogAction = iota
	// DialogActionCancel represents the behavior where resize confirmation dialog is shown, and the cancel button should be selected.
	DialogActionCancel
	// DialogActionConfirm represents the behavior where resize confirmation dialog is shown, and the confirm button should be selected.
	DialogActionConfirm
	// DialogActionConfirmWithDoNotAskMeAgainChecked represents the behavior where resize confirmation dialog is shown, and the confirm button should be selected with the "Don't ask me again" option on.
	DialogActionConfirmWithDoNotAskMeAgainChecked
)

// InputMethodType represents how to interact with UI.
type InputMethodType int

const (
	// InputMethodClick represents the state where UI should be interacted with mouse click.
	InputMethodClick InputMethodType = iota
	// InputMethodKeyEvent represents the state where UI should be interacted with keyboard.
	InputMethodKeyEvent
)

func (mode InputMethodType) String() string {
	switch mode {
	case InputMethodClick:
		return "click"
	case InputMethodKeyEvent:
		return "keyboard"
	default:
		return "unknown"
	}
}

// ToggleResizeLockMode shows the compat-mode menu, selects one of the resize lock mode buttons on the compat-mode menu via the given method, and verifies the post state.
func ToggleResizeLockMode(ctx context.Context, tconn *chrome.TestConn, cr *chrome.Chrome, nextMode ResizeLockMode, action ConfirmationDialogAction, method InputMethodType, keyboard *input.KeyboardEventWriter) error {

	if err := ToggleCompatModeMenu(ctx, tconn, method, keyboard, true /* isMenuVisible */); err != nil {
		// return errors.Wrapf(err, "failed to show the compat-mode dialog of %s via %s", activity.ActivityName(), method)
		return errors.Wrapf(err, "failed to show the compat-mode dialog of %s via %s", "actname", method)
	}

	ui := uiauto.New(tconn)
	compatModeMenuDialog := nodewith.Role(role.Window).HasClass(BubbleDialogClassName)
	if err := ui.WithTimeout(10 * time.Second).WaitUntilExists(compatModeMenuDialog)(ctx); err != nil {
		return errors.Wrapf(err, "failed to find the compat-mode menu dialog of %s", "actName")
	}

	switch method {
	case InputMethodClick:
		if err := selectResizeLockModeViaClick(ctx, tconn, nextMode, compatModeMenuDialog); err != nil {
			return errors.Wrapf(err, "failed to click on the compat-mode dialog of %s via click", "actName")
		}
	case InputMethodKeyEvent:
		if err := shiftViaTabAndEnter(ctx, tconn, nodewith.Ancestor(compatModeMenuDialog).Role(role.MenuItem).Name(nextMode.String()), keyboard); err != nil {
			return errors.Wrapf(err, "failed to click on the compat-mode dialog of %s via keyboard", "actName")
		}
	}

	if action != DialogActionNoDialog {
		if err := waitForCompatModeMenuToDisappear(ctx, tconn); err != nil {
			return errors.Wrapf(err, "failed to wait for the compat-mode menu of %s to disappear", "actName")
		}

		confirmationDialog := nodewith.HasClass(overlayDialogClassName)
		if err := ui.WithTimeout(10 * time.Second).WaitUntilExists(confirmationDialog)(ctx); err != nil {
			return errors.Wrap(err, "failed to find the resizability confirmation dialog")
		}

		switch method {
		case InputMethodClick:
			if err := handleConfirmationDialogViaClick(ctx, tconn, nextMode, confirmationDialog, action); err != nil {
				return errors.Wrapf(err, "failed to handle the confirmation dialog of %s via click", "actName")
			}
		case InputMethodKeyEvent:
			if err := handleConfirmationDialogViaKeyboard(ctx, tconn, nextMode, confirmationDialog, action, keyboard); err != nil {
				return errors.Wrapf(err, "failed to handle the confirmation dialog of %s via keyboard", "actName")
			}
		}
	}

	// The compat-mode dialog stays shown for two seconds by default after resize lock mode is toggled.
	// Explicitly close the dialog using the Esc key.
	if err := ui.WithTimeout(5*time.Second).RetryUntil(func(ctx context.Context) error {
		if err := keyboard.Accel(ctx, "Esc"); err != nil {
			return errors.Wrap(err, "failed to press the Esc key")
		}
		return nil
	}, ui.Gone(nodewith.Role(role.Window).Name(BubbleDialogClassName)))(ctx); err != nil {
		return errors.Wrap(err, "failed to verify that the resizability confirmation dialog is invisible")
	}

	return nil
}

// selectResizeLockModeViaClick clicks on the given resize lock mode button.
func selectResizeLockModeViaClick(ctx context.Context, tconn *chrome.TestConn, mode ResizeLockMode, compatModeMenuDialog *nodewith.Finder) error {
	ui := uiauto.New(tconn)
	resizeLockModeButton := nodewith.Ancestor(compatModeMenuDialog).Role(role.MenuItem).Name(mode.String())
	if err := ui.WithTimeout(10 * time.Second).WaitUntilExists(resizeLockModeButton)(ctx); err != nil {
		return errors.Wrapf(err, "failed to find the %s button on the compat mode menu", mode)
	}
	return ui.LeftClick(resizeLockModeButton)(ctx)
}

// waitForCompatModeMenuToDisappear waits for the compat-mode menu to disappear.
// After one of the resize lock mode buttons are selected, the compat mode menu disappears after a few seconds of delay.
// Can't use chromeui.WaitUntilGone() for this purpose because this function also checks whether the dialog has the "Phone" button or not to ensure that we are checking the correct dialog.
func waitForCompatModeMenuToDisappear(ctx context.Context, tconn *chrome.TestConn) error {
	ui := uiauto.New(tconn)
	dialog := nodewith.ClassName(BubbleDialogClassName).Role(role.Window)
	phoneButton := nodewith.HasClass(phoneButtonName).Ancestor(dialog)
	return ui.WithTimeout(10 * time.Second).WaitUntilGone(phoneButton)(ctx)
}

// ToggleCompatModeMenu toggles the compat-mode menu via the given method
func ToggleCompatModeMenu(ctx context.Context, tconn *chrome.TestConn, method InputMethodType, keyboard *input.KeyboardEventWriter, isMenuVisible bool) error {
	switch method {
	case InputMethodClick:
		return toggleCompatModeMenuViaButtonClick(ctx, tconn, isMenuVisible)
	case InputMethodKeyEvent:
		return toggleCompatModeMenuViaKeyboard(ctx, tconn, keyboard, isMenuVisible)
	}
	return errors.Errorf("invalid InputMethodType is given: %s", method)
}

// toggleCompatModeMenuViaButtonClick clicks on the compat-mode button and verifies the expected visibility of the compat-mode menu.
func toggleCompatModeMenuViaButtonClick(ctx context.Context, tconn *chrome.TestConn, isMenuVisible bool) error {
	ui := uiauto.New(tconn)
	icon := nodewith.Role(role.Button).HasClass(CenterButtonClassName)
	if err := ui.WithTimeout(10 * time.Second).LeftClick(icon)(ctx); err != nil {
		return errors.Wrap(err, "failed to click on the compat-mode button")
	}

	return checkVisibility(ctx, tconn, BubbleDialogClassName, isMenuVisible)
}

// toggleCompatModeMenuViaKeyboard injects the keyboard shortcut and verifies the expected visibility of the compat-mode menu.
func toggleCompatModeMenuViaKeyboard(ctx context.Context, tconn *chrome.TestConn, keyboard *input.KeyboardEventWriter, isMenuVisible bool) error {
	ui := uiauto.New(tconn)
	accel := func(ctx context.Context) error {
		if err := keyboard.Accel(ctx, "Search+Alt+C"); err != nil {
			return errors.Wrap(err, "failed to inject Search+Alt+C")
		}
		return nil
	}
	dialog := nodewith.Role(role.Window).HasClass(BubbleDialogClassName)
	if isMenuVisible {
		return ui.WithTimeout(10*time.Second).WithInterval(2*time.Second).RetryUntil(accel, ui.Exists(dialog))(ctx)
	}
	return nil
}

// handleConfirmationDialogViaKeyboard does the given action for the confirmation dialog via keyboard.
func handleConfirmationDialogViaKeyboard(ctx context.Context, tconn *chrome.TestConn, mode ResizeLockMode, confirmationDialog *nodewith.Finder, action ConfirmationDialogAction, keyboard *input.KeyboardEventWriter) error {
	if action == DialogActionCancel {
		return shiftViaTabAndEnter(ctx, tconn, nodewith.Ancestor(confirmationDialog).Role(role.Button).Name(cancelButtonName), keyboard)
	} else if action == DialogActionConfirm || action == DialogActionConfirmWithDoNotAskMeAgainChecked {
		if action == DialogActionConfirmWithDoNotAskMeAgainChecked {
			if err := shiftViaTabAndEnter(ctx, tconn, nodewith.Ancestor(confirmationDialog).HasClass(checkBoxClassName), keyboard); err != nil {
				return errors.Wrap(err, "failed to select the checkbox of the resizability confirmation dialog via keyboard")
			}
		}
		return shiftViaTabAndEnter(ctx, tconn, nodewith.Ancestor(confirmationDialog).Role(role.Button).Name(confirmButtonName), keyboard)
	}
	return nil
}

// handleConfirmationDialogViaClick does the given action for the confirmation dialog via click.
func handleConfirmationDialogViaClick(ctx context.Context, tconn *chrome.TestConn, mode ResizeLockMode, confirmationDialog *nodewith.Finder, action ConfirmationDialogAction) error {
	ui := uiauto.New(tconn)
	if action == DialogActionCancel {
		cancelButton := nodewith.Ancestor(confirmationDialog).Role(role.Button).Name(cancelButtonName)
		return ui.WithTimeout(10 * time.Second).LeftClick(cancelButton)(ctx)
	} else if action == DialogActionConfirm || action == DialogActionConfirmWithDoNotAskMeAgainChecked {
		if action == DialogActionConfirmWithDoNotAskMeAgainChecked {
			checkbox := nodewith.HasClass(checkBoxClassName)
			if err := ui.WithTimeout(10 * time.Second).LeftClick(checkbox)(ctx); err != nil {
				return errors.Wrap(err, "failed to click on the checkbox of the resizability confirmation dialog")
			}
		}

		confirmButton := nodewith.Ancestor(confirmationDialog).Role(role.Button).Name(confirmButtonName)
		return ui.WithTimeout(10 * time.Second).LeftClick(confirmButton)(ctx)
	}
	return nil
}

// shiftViaTabAndEnter keeps pressing the Tab key until the UI element of interest gets focus, and press the Enter key.
func shiftViaTabAndEnter(ctx context.Context, tconn *chrome.TestConn, target *nodewith.Finder, keyboard *input.KeyboardEventWriter) error {
	ui := uiauto.New(tconn)
	if err := testing.Poll(ctx, func(ctx context.Context) error {
		if err := keyboard.Accel(ctx, "Tab"); err != nil {
			return errors.Wrap(err, "failed to press the Tab key")
		}
		if err := ui.Exists(target)(ctx); err != nil {
			return testing.PollBreak(errors.Wrap(err, "failed to find the node seeking focus"))
		}
		return ui.Exists(target.Focused())(ctx)
	}, &testing.PollOptions{Timeout: 10 * time.Second}); err != nil {
		return errors.Wrap(err, "failed to shift focus to the node to click on")
	}
	return keyboard.Accel(ctx, "Enter")
}

// TODO() move this somewhere because its used in amace.go as well...
// checkVisibility checks whether the node specified by the given class name exists or not.
func checkVisibility(ctx context.Context, tconn *chrome.TestConn, className string, visible bool) error {
	uia := uiauto.New(tconn)
	finder := nodewith.HasClass(className).First()
	if visible {
		return uia.WithTimeout(10 * time.Second).WaitUntilExists(finder)(ctx)
	}
	return uia.WithTimeout(10 * time.Second).WaitUntilGone(finder)(ctx)
}
