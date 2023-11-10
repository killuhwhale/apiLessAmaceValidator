// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"context"
	"errors"
	"time"

	"go.chromium.org/tast-tests/cros/common/android/ui"
	"go.chromium.org/tast-tests/cros/local/arc"
	"go.chromium.org/tast-tests/cros/local/chrome"
	"go.chromium.org/tast-tests/cros/local/chrome/ash"
	"go.chromium.org/tast-tests/cros/local/input"
	"go.chromium.org/tast/core/testing"
)

// Need a way to install and login to facebook.

func FacebookLogin(ctx context.Context, a *arc.ARC, d *ui.Device, tconn *chrome.TestConn, cr *chrome.Chrome, keyboard *input.KeyboardEventWriter, ah *AppHistory, hostIP, runID, deviceInfo string, appCreds AppCreds, initState ash.WindowStateType) bool {

	appPack := AppPackage{Aname: "Fb", Pname: FacebookPackageName}
	if _, err := InstallARCApp(ctx, a, d, appPack, "fbpass"); err != nil {
		testing.ContextLog(ctx, err)
		return false
	}

	if err := LaunchApp(ctx, a, appPack.Pname); err != nil {
		// GoBigSleepLint Need to wait for act to start...
		testing.Sleep(ctx, 2*time.Second)

		if err := LaunchApp(ctx, a, appPack.Pname); err != nil {
			testing.ContextLog(ctx, err)
			return false
		}
	}

	fbCreds, exists := appCreds[FacebookPackageName]
	if !exists {
		testing.ContextLog(ctx, "Facebook creds not available")
		return false
	}

	ToggleResizeLockMode(ctx, tconn, cr, PhoneResizeLockMode, DialogActionNoDialog, InputMethodClick, keyboard)
	testing.ContextLog(ctx, "ReSize lock done, sleeping... ")
	// GoBigSleepLint wait for FB to open
	testing.Sleep(ctx, 10*time.Second)

	testing.ContextLog(ctx, "Pre Facebook Login")
	preFBLogin := true
	if _, err := AttemptLogins(ctx, a, tconn, d, cr, keyboard, ah, hostIP, fbCreds.L, appPack.Pname, runID, deviceInfo, appCreds, initState, preFBLogin); err != nil {
		testing.ContextLog(ctx, err)
		return false
	}
	// GoBigSleepLint wait for FB to sign in
	testing.Sleep(ctx, 10*time.Second)
	AddHistoryWithImage(ctx, tconn, ah, deviceInfo, FacebookPackageName, "Prefacebook - Done logging in after 10s, pressing contine again", runID, hostIP, false)

	testing.ContextLog(ctx, "Done logging in, pressing contine again")

	testing.Poll(ctx, func(ctx context.Context) error {

		yr, err := YoloDetect(ctx, hostIP)
		if err != nil {
			return errors.New("No detections found")
		}
		if _, exists := yr.Data["Continue"]; !exists {
			return errors.New("Contine does not exist")
		}
		if !yr.Click(ctx, a, "Continue") {
			return errors.New("Failed to click continue")

		}

		return nil
	}, &testing.PollOptions{Timeout: 20 * time.Second, Interval: 1 * time.Second})
	AddHistoryWithImage(ctx, tconn, ah, deviceInfo, FacebookPackageName, "Prefacebook - Pressed cont. Closing app. Logged into Facebook!", runID, hostIP, false)
	CloseApp(ctx, a, appPack.Pname)

	return true
}
