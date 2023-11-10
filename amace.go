// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package arc

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"strconv"
	"strings"
	"time"

	"go.chromium.org/tast-tests/cros/common/android/ui"
	"go.chromium.org/tast-tests/cros/local/arc"
	"go.chromium.org/tast-tests/cros/local/bundles/cros/arc/amace"

	"go.chromium.org/tast-tests/cros/local/chrome/ash"
	"go.chromium.org/tast-tests/cros/local/chrome/display"

	"go.chromium.org/tast-tests/cros/local/input"
	"go.chromium.org/tast/core/ctxutil"
	"go.chromium.org/tast/core/errors"

	"go.chromium.org/tast/core/testing"
)

func init() {
	testing.AddTest(&testing.Test{
		Func: AMACE,
		Desc: "Checks Apps for AMACE",
		Contacts: []string{
			"candaya@google.com", // Optional test contact
		},
		Attr:         []string{"group:mainline", "informational"},
		Data:         []string{"AMACE_app_list.tsv", "AMACE_secret.txt"},
		SoftwareDeps: []string{"chrome", "android_vm"},
		Timeout:      36 * 60 * time.Minute,
		Fixture:      "arcBootedWithPlayStore",
		BugComponent: "b:1234",
		LacrosStatus: testing.LacrosVariantUnneeded,
	})
}

// -var=arc.AccessVars.globalPOSTURL="http://192.168.1.229:3000/api/amaceResult"
// postURL is default "https://appvaldashboard.com/api/amaceResult" || -var=arc.AccessVars.globalPOSTURL
var hostIP = testing.RegisterVarString(
	"arc.amace.hostip",
	"192.168.1.1337",
	"Host device ip on local network to reach image server.",
)
var postURL = testing.RegisterVarString(
	"arc.amace.posturl",
	"https://appvaldashboard.com/api/amaceResult",
	"Url for api endpoint.",
)
var runTS = testing.RegisterVarString(
	"arc.amace.runts",
	"na",
	"Run timestamp for current run.",
)
var runID = testing.RegisterVarString(
	"arc.amace.runid",
	"na",
	"Run uuid for current run.",
)
var device = testing.RegisterVarString(
	"arc.amace.device",
	"na",
	"Run uuid for current run.",
)
var startat = testing.RegisterVarString(
	"arc.amace.startat",
	"na",
	"App index to start at.",
)
var account = testing.RegisterVarString(
	"arc.amace.account",
	"na",
	"Automation account.",
)
var creds = testing.RegisterVarString(
	"arc.amace.creds",
	"na",
	"App account creds by package name.",
)
var skipAmace = testing.RegisterVarString(
	"arc.amace.skipamace",
	"na",
	"Skips amace status check.",
)
var skipBrokenCheck = testing.RegisterVarString(
	"arc.amace.skipbrokencheck",
	"na",
	"Skips broken app check.",
)
var skipLoggIn = testing.RegisterVarString(
	"arc.amace.skiploggin",
	"na",
	"Skips log in.",
)
var dSrcPath = testing.RegisterVarString(
	"arc.amace.dsrcpath",
	"na",
	"Firebase document path to get app list data",
)
var dSrcType = testing.RegisterVarString(
	"arc.amace.dsrctype",
	"na",
	"Tells where to look for APK, Playstore or Pythonstore.",
)
var driveURL = testing.RegisterVarString(
	"arc.amace.driveurl",
	"na",
	"Tells where to look for package name when using Pythonstore.",
)

func AMACE(ctx context.Context, s *testing.State) {
	s.Log("\n\n########################################")
	s.Log("Account: ", account.Value())
	s.Log("Host IP: ", hostIP.Value())
	s.Log("Post URL: ", postURL.Value())
	s.Log("Device: ", device.Value())
	s.Log("Start at: ", startat.Value())
	s.Log("App creds: ", creds.Value())
	s.Log("skipLoggIn: ", skipLoggIn.Value())
	s.Log("dSrcPath: ", dSrcPath.Value())
	s.Log("dSrcType: ", dSrcType.Value())
	s.Log("driveURL: ", driveURL.Value())
	var ac amace.AppCreds
	err := json.Unmarshal([]byte(creds.Value()), &ac)
	if err != nil {
		testing.ContextLog(ctx, "Failed unmarshalling JSON app creds")
	}
	s.Log("App creds: ", ac)
	s.Log("########################################\n\n")

	a := s.FixtValue().(*arc.PreData).ARC

	ax := s.FixtValue().(*arc.PreData)
	cr := s.FixtValue().(*arc.PreData).Chrome
	d := s.FixtValue().(*arc.PreData).UIDevice
	ax.ARC.ReadFile(ctx, "")
	RunTS, err := strconv.ParseInt(runTS.Value(), 10, 64)

	ctx, cancel := ctxutil.Shorten(ctx, 5*time.Second)
	defer cancel()

	tconn, err := cr.TestAPIConn(ctx)
	if err != nil {
		s.Fatal("Failed to create Test API connection: ", err)
	}

	if err := amace.SetDeviceNoSleepOnPower(ctx, d, tconn, s, cr); err != nil {
		s.Fatal("Failed to turn off sleep on power: ", err)
	} else {
		s.Log("Turned off sleep on power: ", err)
	}

	if runID.Value() == "na" || runTS.Value() == "na" {
		s.Fatalf("Run info not provided: ID=%s TS=%s", runID.Value(), runTS.Value())
	}

	buildInformation, err := amace.GetBuildInfo(ctx, s, a)
	if err != nil {
		s.Fatal("Failed to get build info")
	}
	buildChannel, err := amace.GetBuildChannel(ctx, s, a)
	if err != nil {
		s.Fatal("Failed to get device info ")
	}
	deviceInformation, err := amace.GetDeviceInfo(ctx, s, a)
	if err != nil {
		s.Fatal("Failed to get device info ")
	}
	arcVersion, err := amace.GetArcVerison(ctx, s, a)
	if err != nil {
		s.Fatal("Failed to get device info ")
	}

	buildInfo := fmt.Sprintf(("%s - %s (%s)"), buildInformation, buildChannel, arcVersion)
	deviceInfo := fmt.Sprintf(("%s - %s"), deviceInformation, device.Value())

	testApps, err := amace.LoadAppList(s, startat.Value())
	if err != nil {
		s.Fatal("Error loading App List.tsv: ", err)
	}
	arcV, err := a.GetProp(ctx, "ro.build.version.release")
	if err != nil {
		s.Fatal("Failed to get Arc Verson for device")
	}

	secret, err := amace.LoadSecret(s)
	if err != nil {
		s.Fatal("Failed to get secret")
	}
	s.Logf("arcV: %s, build: %s, device: %s", arcV, buildInfo, deviceInfo)

	dispInfo, err := display.GetPrimaryInfo(ctx, tconn)
	if err != nil {
		s.Fatal("Failed to get primary display info: ", err)
	}
	fmt.Println("Display info: ", dispInfo.Name)

	keyboard, err := input.Keyboard(ctx)
	if err != nil {
		s.Fatal("Failed to create a keyboard: ", err)
	}
	defer keyboard.Close(ctx)

	if dSrcType.Value() == "pythonstore" {

		if err = AskToConnectADB(ctx, hostIP.Value(), device.Value(), "kill"); err != nil {
			testing.ContextLog(ctx, "Failed to ask for ADB connect!", err)
		}
		testing.ContextLog(ctx, "\n\n\n\n\n  Attempting to click ADB Allow: \n\n\n\n\n")
		err = ConfirmADBUI(ctx, d)
		testing.ContextLog(ctx, "Clicking ADB Allow: ", err)

		if err = AskToConnectADB(ctx, hostIP.Value(), device.Value(), "nah"); err != nil {
			testing.ContextLog(ctx, "Failed to ask for ADB connect!", err)
		}
		testing.ContextLog(ctx, "\n\n\n\n\n  Attempting to click ADB Allow: \n\n\n\n\n")
		err = ConfirmADBUI(ctx, d)
		testing.ContextLog(ctx, "Clicking ADB Allow: ", err)
	}

	var arcWindow *ash.Window
	errorDetector := amace.NewErrorDetector(ctx, a, s)
	var appHistory amace.AppHistory
	var crash amace.ErrResult
	var status amace.AppStatus
	var finalLogs string
	var tmpAppType amace.AppType
	ar := amace.AppResult{}

	var fbPreLoggedIn = false
	if skipLoggIn.Value() != "t" {
		fbPreLoggedIn = amace.FacebookLogin(ctx, a, d, tconn, cr, keyboard, &appHistory, hostIP.Value(), runID.Value(), deviceInfo, ac, ash.WindowStateDefault)
		testing.ContextLog(ctx, "Pre login facebook result: ", fbPreLoggedIn)
		ar = amace.AppResult{App: amace.AppPackage{Pname: "com.facebook.katana.prelogin", Aname: "Facebook PreLogin"}, RunID: runID.Value(), RunTS: RunTS, AppTS: time.Now().UnixMilli(), Status: amace.IsAmacE, BrokenStatus: amace.Pass, AppType: tmpAppType, AppVersion: "", AppHistory: &appHistory, Logs: finalLogs, LoginResults: 10, DSrcPath: dSrcPath.Value()}
		res, err := amace.PostData(ar, s, postURL.Value(), buildInfo, secret, deviceInfo)
		if err != nil {
			s.Log("Error posting: ", err)
		}
		s.Log("Post res: ", res)
	}

	failedToInstall := false
	for _, appPack := range testApps {
		// Reset Final logs
		finalLogs = ""
		// Reset History
		appHistory = amace.AppHistory{}
		// Reset Logs
		crash = amace.ErrResult{}
		// New App TS
		appTS := time.Now().UnixMilli()
		failedToInstall = false
		// Signals a new app run to python parent manage-program
		s.Logf("--appstart@|~|%s|~|%s|~|%s|~|%s|~|%d|~|%v|~|%d|~|%s|~|%s|~|", runID.Value(), RunTS, appPack.Pname, appPack.Aname, 0, false, appTS, buildInfo, deviceInfo)

		// ####################################
		// ####   Install APP           #######
		// ####################################
		s.Log("Installing app", appPack)

		// If dSrcType == playstore
		// If dSrcType == python store
		if dSrcType.Value() == "playstore" {
			if status, err = amace.InstallARCApp(ctx, a, d, appPack, strings.Split(account.Value(), ":")[1]); err != nil {
				testing.ContextLogf(ctx, "Failed to install app: %s , Status= %s, Error: %s", appPack.Pname, status, err)
				// When an app is purchased an error is thrown but we dont want to report the error.. Instead continue with the rest of the check.
				if status != amace.PURCHASED && status != amace.SKIPPEDAMACE {
					failedToInstall = true
				} else {
					amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "Purchased app.", runID.Value(), hostIP.Value(), false)
				}
			}
		} else if dSrcType.Value() == "pythonstore" {
			// Make request to Server with package name
			// Get file, maybe a curl right into a download/ install?
			if GetAPK(ctx, hostIP.Value(), appPack.Pname, driveURL.Value(), device.Value()) != nil {
				failedToInstall = true
			}
		}

		if failedToInstall {
			testing.ContextLogf(ctx, "failedToInstall appz: %s , Status= %s", appPack.Pname, status)
			amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App failed to install.", runID.Value(), hostIP.Value(), false)
			res, err := amace.PostData(
				amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: status, BrokenStatus: amace.FailedInstall, AppType: amace.APP, AppVersion: "", AppHistory: &appHistory, Logs: finalLogs, DSrcPath: dSrcPath.Value()},
				s, postURL.Value(), buildInfo, secret, deviceInfo)
			if err != nil {
				s.Log("Error posting: ", err)

			}
			s.Log("Post res: ", res)
			continue
		}

		s.Log("App Installed", appPack)
		amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App Installed.", runID.Value(), hostIP.Value(), false)

		// ####################################
		// ####   Gather App Info       #######
		// ####################################
		appInfo := amace.NewAppInfo(ctx, tconn, s, d, a, appPack.Pname)
		s.Log("AppInfo version: ", appInfo.Info.Version)
		s.Log("AppInfo apptype: ", appInfo.Info.AppType)

		// ####################################
		// ####   Launch APP            #######
		// ####################################
		s.Log("Launching app", appPack)

		errorDetector.ResetStartTime()
		errorDetector.UpdatePackageName(appPack.Pname)

		if err := amace.LaunchApp(ctx, a, appPack.Pname); err != nil {
			// GoBigSleepLint Need to wait for act to start...
			testing.Sleep(ctx, 2*time.Second)
			// Check for misc Pop ups here.

			if err := amace.LaunchApp(ctx, a, appPack.Pname); err != nil {
				amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App failed to launch.", runID.Value(), hostIP.Value(), false)

				res, err := amace.PostData(
					amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: amace.LaunchFail, BrokenStatus: amace.FailedLaunch, AppType: amace.APP, AppVersion: "", AppHistory: &appHistory, Logs: finalLogs, DSrcPath: dSrcPath.Value()},
					s, postURL.Value(), buildInfo, secret, deviceInfo)
				if err != nil {
					s.Log("Error posting: ", err)

				}
				s.Log("Post res: ", res)
				s.Log("Error lanching app: ", err)
				if err := a.Uninstall(ctx, appPack.Pname); err != nil {
					if err := amace.UninstallApp(ctx, s, a, appPack.Pname); err != nil {
						s.Log("Failed to uninstall app: ", appPack.Aname)
					}
				}
				continue
			}
		}
		s.Log("App launched ", appPack)

		amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App Launched.", runID.Value(), hostIP.Value(), false)

		// GoBigSleepLint Need to wait for act to start...
		testing.Sleep(ctx, 5*time.Second)

		// ####################################
		// ####   Check errors          #######
		// ####################################
		s.Log("Checking errors: ")
		errorDetector.DetectErrors()

		if !amace.IsAppOpen(ctx, a, appPack.Pname) && skipBrokenCheck.Value() != "t" {
			s.Log("App is NOT open!")

			amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App closed unexpectedly.", runID.Value(), hostIP.Value(), false)
			if crash = errorDetector.GetHighError(); len(crash.CrashLogs) > 0 {
				s.Logf("App has error logs: %s/n %s/n %s/n", crash.CrashType, crash.CrashMsg, crash.CrashLogs)

				finalLogs = amace.GetFinalLogs(crash)
				res, err := amace.PostData(
					amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: amace.Crashed, BrokenStatus: crash.CrashType, AppType: tmpAppType, AppVersion: "", AppHistory: &appHistory, Logs: finalLogs, DSrcPath: dSrcPath.Value()},
					s, postURL.Value(), buildInfo, secret, deviceInfo)
				if err != nil {
					s.Log("Error posting: ", err)

				}
				s.Log("Post res: ", res)
				if err := a.Uninstall(ctx, appPack.Pname); err != nil {
					if err := amace.UninstallApp(ctx, s, a, appPack.Pname); err != nil {
						s.Log("Failed to uninstall app: ", appPack.Aname)
					}
				}
				continue
			}
		} else if skipBrokenCheck.Value() != "t" {
			s.Log("App is still open!")
		}

		// ####################################
		// ####   Check Amace Window    #######
		// ####################################
		// TODO() No need to allocate here, can do it before loop and reset

		arcWindow = nil // reset from previous runs.
		initState := ash.WindowStateNormal
		if skipAmace.Value() != "t" {
			s.Log("Checking AMAC-E: ")
			arcWindow, status, initState, err = amace.CheckAppStatus(ctx, tconn, s, d, appPack.Pname, appPack.Aname)

			if err != nil {
				s.Log("💥💥💥 App failed to check: ", appPack.Pname, err)
				res, err := amace.PostData(
					amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: amace.Fail, BrokenStatus: amace.FailedAmaceCheck, AppType: appInfo.Info.AppType, AppVersion: appInfo.Info.Version, AppHistory: &appHistory, Logs: finalLogs, DSrcPath: dSrcPath.Value()},
					s, postURL.Value(), buildInfo, secret, deviceInfo)
				if err != nil {
					s.Log("Error posting: ", err)

				}
				s.Log("Post res: ", res)
				if err := a.Uninstall(ctx, appPack.Pname); err != nil {
					if err := amace.UninstallApp(ctx, s, a, appPack.Pname); err != nil {
						s.Log("Failed to uninstall app: ", appPack.Aname)
					}
				}
				continue
			}
			// We only detect a PWA via Status (amace status), we need to override the app/game check to report its a PWA too.
			if status == amace.PWA {
				tmpAppType = amace.PWAAPP
			} else {
				tmpAppType = appInfo.Info.AppType
			}
			amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App Window Status Verification Image.", runID.Value(), hostIP.Value(), true)
		} else {
			status = amace.SKIPPEDAMACE
		}

		// ####################################
		// ####   Check Errors Again    #######
		// ####################################
		// Check if app is still open after checking window status, if not open, check error.

		if crash = errorDetector.GetHighError(); len(crash.CrashLogs) > 0 && skipBrokenCheck.Value() != "t" {
			s.Logf("App has error logs: %s/n %s/n %s/n", crash.CrashType, crash.CrashMsg, crash.CrashLogs)

			finalLogs = amace.GetFinalLogs(crash)

			if !amace.IsAppOpen(ctx, a, appPack.Pname) {
				s.Log("App is NOT open!")

				amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App closed unexpectedly.", runID.Value(), hostIP.Value(), false)
				res, err := amace.PostData(
					amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: amace.Crashed, BrokenStatus: crash.CrashType, AppType: tmpAppType, AppVersion: "", AppHistory: &appHistory, Logs: finalLogs, DSrcPath: dSrcPath.Value()},
					s, postURL.Value(), buildInfo, secret, deviceInfo)
				if err != nil {
					s.Log("Error posting: ", err)

				}
				s.Log("Post res: ", res)
				if err := a.Uninstall(ctx, appPack.Pname); err != nil {
					if err := amace.UninstallApp(ctx, s, a, appPack.Pname); err != nil {
						s.Log("Failed to uninstall app: ", appPack.Aname)
					}
				}
				continue
			} else {
				s.Log("App is still open!") // HayDay stays open and has an error, black screen. Other apps are fine....
				windowBounds := arcWindow.BoundsInRoot
				isBlkScreen, err := amace.IsBlackScreen(ctx, tconn, windowBounds)
				if err != nil {
					testing.ContextLog(ctx, "Black screen error: ", err)

				} else if isBlkScreen {
					testing.ContextLog(ctx, "App HAS black screen: ")
					amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App crashed with black screen.", runID.Value(), hostIP.Value(), false)
					res, err := amace.PostData(
						amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: amace.Crashed, BrokenStatus: crash.CrashType, AppType: tmpAppType, AppVersion: "", AppHistory: &appHistory, Logs: finalLogs, DSrcPath: dSrcPath.Value()},
						s, postURL.Value(), buildInfo, secret, deviceInfo)
					if err != nil {
						s.Log("Error posting: ", err)

					}
					s.Log("Post res: ", res)
					if err := a.Uninstall(ctx, appPack.Pname); err != nil {
						if err := amace.UninstallApp(ctx, s, a, appPack.Pname); err != nil {
							s.Log("Failed to uninstall app: ", appPack.Aname)
						}
					}
					continue

				} else {
					testing.ContextLog(ctx, "App DOES NOT have black screen: ")
					amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App open with detected error, but did not detect black screen.", runID.Value(), hostIP.Value(), false)
				}

			}

		} else if skipBrokenCheck.Value() != "t" {
			amace.AddHistoryWithImage(ctx, tconn, &appHistory, deviceInfo, appPack.Pname, "App isnt broken.", runID.Value(), hostIP.Value(), false)
			finalLogs = amace.GetFinalLogs(crash)
		}

		// ####################################
		// ####   Attemp Login      	#######
		// ####################################
		loginResults := int8(8) // bin(8) == 1000 ->indicates that 3 login methods weren't successful...
		if skipLoggIn.Value() != "t" {
			preFBLogin := false
			lr, _ := amace.AttemptLogins(ctx, a, tconn, d, cr, keyboard, &appHistory, hostIP.Value(), account.Value(), appInfo.PackageName, runID.Value(), deviceInfo, ac, initState, preFBLogin)
			loginResults = lr.Encode()
		}

		// ####################################
		// ####   Post APP Results      #######
		// ####################################
		// // Create result and post
		ar = amace.AppResult{App: appPack, RunID: runID.Value(), RunTS: RunTS, AppTS: appTS, Status: status, BrokenStatus: amace.Pass, AppType: tmpAppType, AppVersion: appInfo.Info.Version, AppHistory: &appHistory, Logs: finalLogs, LoginResults: loginResults, DSrcPath: dSrcPath.Value()}
		s.Log("💥 ✅ ❌ ✅ 💥 App Result: ", ar)
		res, err := amace.PostData(ar, s, postURL.Value(), buildInfo, secret, deviceInfo)
		if err != nil {
			s.Log("Error posting: ", err)
		}
		s.Log("Post res: ", res)

		// // Misc apps that have one off behavior that need to be dealt with.
		// amace.CheckMiscAppForKnownBehavior(ctx, keyboard, appPack.Pname)

		s.Log("Uninstalling app: ", appPack.Pname)
		if err := a.Uninstall(ctx, appPack.Pname); err != nil {
			if err := amace.UninstallApp(ctx, s, a, appPack.Pname); err != nil {
				s.Log("Failed to uninstall app: ", appPack.Aname)
			}
		}
	}
	s.Log("--~~rundone") // Signals python parent manage-program that the run is over.

}

func ConfirmADBUI(ctx context.Context, d *ui.Device) error {
	allowText := d.Object(ui.TextMatches("Allow"))
	if err := allowText.WaitForExists(ctx, time.Second*5); err != nil {
		testing.ContextLog(ctx, "Allow button not found: ", err)
		return err
	}
	if err := allowText.Click(ctx); err != nil {
		return errors.New("Failed to click Allow button.")
	}
	return nil
}

// device.Value()
// AskToConnectADB sends ip address to connect host device to DUT via ADB
func AskToConnectADB(ctx context.Context, hostIP, dutIP, killServer string) error {

	testing.ContextLogf(ctx, "Host ip: %s => %s, ", hostIP, dutIP, driveURL)

	// Create a new multipart buffer
	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	dutIPField, err := writer.CreateFormField("dutIP")
	if err != nil {
		return err
	}

	// Write the image data to the form file field
	if _, err = dutIPField.Write([]byte(dutIP)); err != nil {
		return err
	}

	killServerField, err := writer.CreateFormField("killServer")
	if err != nil {
		return err
	}

	// Write the image data to the form file field
	if _, err = killServerField.Write([]byte(killServer)); err != nil {
		return err
	}

	// Close the multipart writer
	writer.Close()

	req, err := http.NewRequest("POST", fmt.Sprintf("http://%s:8000/connectADB/", hostIP), body)
	if err != nil {
		testing.ContextLog(ctx, "Error unexpected: ", err)
		return err
	}

	// Set the Content-Type header to the multipart form data boundary
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		testing.ContextLog(ctx, "Error unexpected: ", err)
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		testing.ContextLog(ctx, "Error: ", fmt.Errorf("unexpected status code: %d", resp.StatusCode))
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	bodyString := string(bodyBytes)
	testing.ContextLog(ctx, "Connect to ADB response: ", bodyString)
	return nil
}

// GetAPK send package name and drive folder id to host server to download and ADB install...
func GetAPK(ctx context.Context, hostIP, pkgName, driveURL, dutIP string) error {

	testing.ContextLogf(ctx, "Host ip: %s => %s, %s", hostIP, pkgName, driveURL)

	// Create a new multipart buffer
	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	// Add the screenshot file
	pkgNameField, err := writer.CreateFormField("pkgName")
	if err != nil {
		return err
	}

	// Write the image data to the form file field
	if _, err = pkgNameField.Write([]byte(pkgName)); err != nil {
		return err
	}

	// Add the additional data field
	driveURLField, err := writer.CreateFormField("driveURL")
	if err != nil {
		return err
	}
	driveURLField.Write([]byte(driveURL))

	// Add the additional data field
	dutIPField, err := writer.CreateFormField("dutIP")
	if err != nil {
		return err
	}
	dutIPField.Write([]byte(dutIP))

	// Close the multipart writer
	writer.Close()

	req, err := http.NewRequest("POST", fmt.Sprintf("http://%s:8000/pythonstore/", hostIP), body)
	if err != nil {
		testing.ContextLog(ctx, "Error unexpected: ", err)
		return err
	}

	// Set the Content-Type header to the multipart form data boundary
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		testing.ContextLog(ctx, "Error unexpected: ", err)
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		testing.ContextLog(ctx, "Error: ", fmt.Errorf("unexpected status code: %d", resp.StatusCode))
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	bodyString := string(bodyBytes)
	testing.ContextLog(ctx, "ADB install: ", bodyString)
	if strings.Contains(bodyString, "Failed to install") {
		return errors.New("Failed to install app!")
	}

	return nil
}
