// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"context"
	"fmt"
	"strings"
	"time"

	"go.chromium.org/tast-tests/cros/common/android/ui"
	"go.chromium.org/tast-tests/cros/local/arc"
	"go.chromium.org/tast-tests/cros/local/chrome"
	"go.chromium.org/tast-tests/cros/local/chrome/ash"
	"go.chromium.org/tast-tests/cros/local/input"
	"go.chromium.org/tast/core/testing"
)

type LoginResult struct {
	Google   bool
	Facebook bool
	Email    bool
}

func (lr *LoginResult) Encode() int8 {
	// For each result, ecode to a bit
	var result int8 = 8
	if lr.Google {
		result |= 1 << 0
	}
	if lr.Facebook {
		result |= 1 << 1
	}
	if lr.Email {
		result |= 1 << 2
	}
	return result
}

type AppCred struct {
	L string
	P string
}

type AppCreds map[string]AppCred

// AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App crashed with black screen.", runID.Value(), hostIP.Value(), false)
func AttemptLogins(ctx context.Context, a *arc.ARC, tconn *chrome.TestConn, d *ui.Device, cr *chrome.Chrome, keyboard *input.KeyboardEventWriter, ah *AppHistory, hostIP, accountEmail, pkgName, runID, deviceInfo string, appCreds AppCreds, initState ash.WindowStateType, preFBLogin bool) (LoginResult, error) {
	lr := LoginResult{Google: false, Facebook: false, Email: false}
	// For each login method:
	// Close App, Clear app storage, open app
	// Reset Error detector time
	// if game: sleep 10 sec
	// attempt login for current method.
	AddHistoryWithImage(ctx, tconn, ah, deviceInfo, pkgName, "Testing SS for login.", runID, hostIP, false)
	// TODO add error detector after each login method atempt
	var loggedIn bool
	var err error
	var msg string
	// Reset app window since we changed it when verfiying AMACE status
	// To reset we need to manually put it back to what it was

	if !preFBLogin {
		testing.ContextLog(ctx, "Closing app at beginning of Attempt Log in")
		CloseApp(ctx, a, pkgName)
		if err := LaunchApp(ctx, a, pkgName); err != nil {
			testing.ContextLog(ctx, "Failed  to launch app at beginning of Attempt Log in")
		}
		// GoBigSleepLint Need to wait for app to start...
		testing.Sleep(ctx, 5*time.Second)
		testing.ContextLogf(ctx, "%s's init window state is: %s ", pkgName, initState)
		err = restoreWindow(ctx, tconn, cr, pkgName, initState, keyboard)
		if err != nil {
			testing.ContextLog(ctx, "Failed to restore window: ", err)
		}

	}

	// Login Google
	if !preFBLogin {
		loggedIn, err := LoginGoogle(ctx, a, d, hostIP, accountEmail)
		if err != nil {
			// TODO add to LoginResults
			testing.ContextLog(ctx, "Failed to login with Google")
		}
		if loggedIn {
			lr.Google = true
		}
		msg := loggedInOrNahMsg(loggedIn, "Google")
		testing.ContextLog(ctx, "Logged in google: ", msg)
		// GoBigSleepLint Need to wait for app to sign in...
		testing.Sleep(ctx, 3*time.Second)
		AddHistoryWithImage(ctx, tconn, ah, deviceInfo, pkgName, msg, runID, hostIP, false)
		ClearApp(ctx, a, pkgName)
		CloseApp(ctx, a, pkgName)
		if err := LaunchApp(ctx, a, pkgName); err != nil {
			testing.ContextLog(ctx, "Failed  to launch app after google login")
		}
	}

	// Login Facebook
	if installed := IsAppInstalled(ctx, a, FacebookPackageName); installed && !preFBLogin {
		loggedIn, err = LoginFacebook(ctx, a, d, hostIP, accountEmail)
		if err != nil {
			// TODO add to LoginResults
			testing.ContextLog(ctx, "Failed to login with facebook")
		}
		if loggedIn {
			lr.Facebook = true
		}
		msg = loggedInOrNahMsg(loggedIn, "Facebook")
		testing.ContextLog(ctx, "Logged in facebook: ", msg)
		// GoBigSleepLint Need to wait for app to sign in...
		testing.Sleep(ctx, 3*time.Second)
		AddHistoryWithImage(ctx, tconn, ah, deviceInfo, pkgName, msg, runID, hostIP, false)
		ClearApp(ctx, a, pkgName)
		CloseApp(ctx, a, pkgName)
		if err := LaunchApp(ctx, a, pkgName); err != nil {
			testing.ContextLog(ctx, "Failed  to launch app after facebook login")
		}
	} else {
		testing.ContextLog(ctx, "Facebook not installed, skipping attemp to login with Facebook")
	}

	// Login Email
	if ac, exists := appCreds[pkgName]; exists {
		loggedIn, err = LoginEmail(ctx, a, d, keyboard, hostIP, runID, pkgName, deviceInfo, ac, tconn, ah)
		if err != nil {
			// TODO add to LoginResults
			testing.ContextLog(ctx, "Failed to login with Email")
		}
		if loggedIn {
			lr.Email = true
		}
		msg = loggedInOrNahMsg(loggedIn, "Email")
		testing.ContextLog(ctx, "Logged in Email: ", msg)

		// GoBigSleepLint Need to wait for app to sign in...
		testing.Sleep(ctx, 3*time.Second)
		AddHistoryWithImage(ctx, tconn, ah, deviceInfo, pkgName, msg, runID, hostIP, false)

	} else {
		testing.ContextLog(ctx, "No App Cred available")
	}

	return lr, nil
}

func LoginGoogle(ctx context.Context, a *arc.ARC, d *ui.Device, hostIP, account string) (bool, error) {
	// Login method:
	// Allow 3 attempts - Retry entire attempt
	//         Allow 2 empty retries - retry SS if no detection is made

	//         While not submitted and attempts/ retries:
	//             close smart lock
	//             Get SS
	//             if no detection:
	//                 - Retry SS
	//             elif Google login in Detection results:
	//                 click button
	//                 rm result from result set.
	//                 if current_activity == '.common.account.AccountPickerActivity'
	//                     Find Email View to click: .className("android.widget.TextView").text(EmailAddress)

	//                     return True, nil
	//         return False, nil

	attempts := 3
	retries := 3
	SUBMITTED := false
	googleAct := "com.google.android.gms.common.account.AccountPickerActivity"
	for !SUBMITTED && attempts > 0 && retries > 0 {
		attempts--
		// GoBigSleepLint Need to wait for act to start...
		testing.Sleep(ctx, 4*time.Second)

		// TODO() Check and close smart lock
		yr, err := YoloDetect(ctx, hostIP) // Returns a yoloResult
		if err != nil {
			testing.ContextLog(ctx, "Failed to get YoloResult: ", err)
		}
		hasDetection := len(yr.Data) > 0
		if !hasDetection {
			// Retry new detection
			yr, err = YoloDetect(ctx, hostIP) // Returns a yoloResult
			retries--
			continue
		} else if _, labelExists := yr.Data["GoogleAuth"]; labelExists {
			clicked := yr.Click(ctx, a, "GoogleAuth")
			testing.ContextLog(ctx, "Clicked Google Auth btn? ", clicked)
			if clicked {
				// GoBigSleepLint Need to wait for act to start...
				testing.Sleep(ctx, 5*time.Second)
				// check current act for google_act, sometimes, the app will auto login without presenting this view...
				if curAct := CurrentActivity(ctx, a); curAct == googleAct {
					// uidevice nonsense here for login view w/ Email
					testing.ContextLog(ctx, "Clicking Google Email View!")
					accountCreds := strings.Split(account, ":")
					accountEmail := accountCreds[0]
					emailView := d.Object(ui.ClassName("android.widget.TextView"), ui.TextMatches(fmt.Sprintf("(?i)%s", accountEmail)))
					if err := emailView.WaitForExists(ctx, 10*time.Second); err != nil {
						testing.ContextLog(ctx, "Failed waiting for exist: emailView ", err)
						return false, err
					}

					if err := emailView.Click(ctx); err != nil {
						testing.ContextLog(ctx, "Failed clicking: emailView", err)
						return false, err
					}
					testing.ContextLog(ctx, "Clicked Google Login Email View")
				}
				SUBMITTED = true
				return true, nil
			}

		} else if _, labelExists := yr.Data["Continue"]; labelExists {
			clicked := yr.Click(ctx, a, "Continue")
			testing.ContextLog(ctx, "Clicked cont btn? ", clicked)

		}
	}
	return false, nil
}

func LoginFacebook(ctx context.Context, a *arc.ARC, d *ui.Device, hostIP, account string) (bool, error) {
	attempts := 3
	retries := 3
	SUBMITTED := false
	facebookAct := ".gdp.ProxyAuthDialog"
	for !SUBMITTED && attempts > 0 && retries > 0 {
		attempts--
		// GoBigSleepLint Need to wait for act to start...
		testing.Sleep(ctx, 4*time.Second)

		// TODO() Check and close smart lock
		yr, err := YoloDetect(ctx, hostIP) // Returns a yoloResult
		if err != nil {
			testing.ContextLog(ctx, "Failed to get YoloResult: ", err)
		}
		hasDetection := len(yr.Data) > 0
		if !hasDetection {
			// Retry new detection
			yr, err = YoloDetect(ctx, hostIP) // Returns a yoloResult
			retries--
			continue
		} else if _, labelExists := yr.Data["FBAuth"]; labelExists {
			clicked := yr.Click(ctx, a, "FBAuth")
			testing.ContextLog(ctx, "Clicked Facebook Auth btn? ", clicked)
			if clicked {
				// GoBigSleepLint Need to wait for act to start...
				testing.Sleep(ctx, 5*time.Second)
				// check current act for google_act, sometimes, the app will auto login without presenting this view...
				curAct := CurrentActivity(ctx, a)
				if curAct == facebookAct {
					testing.ContextLog(ctx, "Clicking Facebook continue View")

					continueView := d.Object(ui.ClassName("android.widget.Button"), ui.TextMatches(fmt.Sprintf("(?i)%s", "Continue")))
					if err := continueView.WaitForExists(ctx, 10*time.Second); err != nil {
						testing.ContextLog(ctx, "Failed waiting for exist: Facebook continueView ", err)
						return false, err
					}

					if err := continueView.Click(ctx); err != nil {
						testing.ContextLog(ctx, "Failed clicking: Facebook continueView", err)
						return false, err
					}
					testing.ContextLog(ctx, "Clicked Facebook continue")
				}
				testing.ContextLog(ctx, "curAct: ", curAct)
				SUBMITTED = true
				return true, nil
			}

		} else if _, labelExists := yr.Data["Continue"]; labelExists {
			clicked := yr.Click(ctx, a, "Continue")
			testing.ContextLog(ctx, "Clicked cont btn? ", clicked)

		}
	}
	return false, nil
}

func LoginEmail(ctx context.Context, a *arc.ARC, d *ui.Device, keyboard *input.KeyboardEventWriter, hostIP, runID, pkgName, deviceInfo string, appCred AppCred, tconn *chrome.TestConn, ah *AppHistory) (bool, error) {
	attempts := 7
	// retries := 7 // might not actually need...
	continueSubmitted := false
	loginEntered := false
	passwordEntered := false

	for !continueSubmitted && attempts > 0 {
		attempts--

		testing.ContextLog(ctx, "Attempts remaining: ", attempts)
		// GoBigSleepLint Need to wait for act to start...
		testing.Sleep(ctx, 4*time.Second)

		// TODO() Check and close smart lock
		yr, err := YoloDetect(ctx, hostIP) // Returns a yoloResult
		AddHistoryWithImage(ctx, tconn, ah, deviceInfo, pkgName, "Labels found: "+strings.Join(yr.Keys(), " - "), runID, hostIP, false)
		if err != nil {
			testing.ContextLog(ctx, "Failed to get YoloResult: ", err)
		}
		hasDetection := len(yr.Data) > 0
		if !hasDetection {
			testing.Sleep(ctx, 2*time.Second)
			continue
		} else if _, labelExists := yr.Data["loginfield"]; labelExists && !loginEntered {
			// loginfield
			// passwordfield
			clicked := yr.Click(ctx, a, "loginfield")
			testing.ContextLog(ctx, "Clicked loginfield? ", clicked)
			if clicked {
				// GoBigSleepLint Need to wait for act to start...
				testing.Sleep(ctx, 2*time.Second)
				textSent := yr.SendTextCr(ctx, keyboard, appCred.L)
				testing.ContextLog(ctx, "Login textSent? ", textSent)
				loginEntered = true
			}

		} else if _, labelExists := yr.Data["passwordfield"]; labelExists && !passwordEntered {
			// loginfield
			// passwordfield
			clicked := yr.Click(ctx, a, "passwordfield")
			testing.ContextLog(ctx, "Clicked passwordfield? ", clicked)
			if clicked {
				// GoBigSleepLint Need to wait for act to start...
				testing.Sleep(ctx, 2*time.Second)
				textSent := yr.SendTextCr(ctx, keyboard, appCred.P)
				testing.ContextLog(ctx, "Password textSent? ", textSent)
				passwordEntered = true
			}

		} else if _, labelExists := yr.Data["Continue"]; labelExists {
			clicked := yr.Click(ctx, a, "Continue")
			testing.ContextLog(ctx, "Clicked cont btn? ", clicked)

			if loginEntered && passwordEntered {
				testing.ContextLog(ctx, "Submitted login form: ", clicked)
				continueSubmitted = true
				// TODO If Facebook App click 1 more continue button
				// fb_attempts = 3
				// while not self.__attempt_click_continue() and fb_attempts > 0:
				// 	fb_attempts -= 1

				return true, nil
			}

		}
	}
	return false, nil
}

func loggedInOrNahMsg(loggedIn bool, loginMethod string) string {
	msg := "App failed to log in: "
	if loggedIn {
		msg = "App logged in: "
	}
	return fmt.Sprintf("%s %s", msg, loginMethod)
}
