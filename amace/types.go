// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import "fmt"

// AppBrokenStatus represents the final status of the broken app check
type AppBrokenStatus int

const (
	// LoggedinGoogle Successfully logged with Google
	LoggedinGoogle AppBrokenStatus = 0
	// LoggedinFacebook Successfully logged with Facebook
	LoggedinFacebook = 10
	// LoggedinEmail Successfully logged with Email
	LoggedinEmail = 20
	// Pass General Pass, didnt log in but no failures
	Pass = 30
	// WinDeath Indicates app failed with Win Death
	WinDeath = 40
	// ForceRemoved Indicates app failed with Force Removed
	ForceRemoved = 50
	// FDebugCrash Indicates app failed with F Debug Crash
	FDebugCrash = 60
	// FatalException Indicates app failed with Fatal Exception
	FatalException = 70
	// ProceDied Indicates app failed with Proc Died
	ProceDied = 80
	// ANR Indicates app failed with ANR
	ANR = 90
	// Failed Indicates app failed in general, unknown specific reason
	Failed = 100
	// FailedInstall Indicates app failed to install
	FailedInstall = 101
	// FailedLaunch Indicates app failed to install
	FailedLaunch = 102
	// FailedLaunch Indicates app failed to install
	FailedAmaceCheck = 103
)

// AppType represents the type of app.
type AppType string

const (
	// APP is a normal app
	APP AppType = "App"
	// GAME is a gaming app
	GAME AppType = "Game"
	// PWAAPP is a PWA app
	PWAAPP AppType = "PWA"
)

// AppStatus indicates the final status of checking the app for AMAC-e
type AppStatus int

// When updating AppStatus, frontend needs to be updated as well
// 1. pages/amace/processStats/reasons and add tally & graph
// 2. componenets/AmaceRResultTable/status_reasons update descriptive display text.
const (
	// Fail indicates failure
	Fail AppStatus = 0 // 0
	// Fail indicates failure
	LaunchFail = 1 // 1
	// Fail indicates failure
	Crashed = 2 // 2
	// PRICE indicates needs purchase
	PRICE = 10 // 10
	// PRICE indicates needs purchase
	PURCHASED = 11 // 10
	// OLDVERSION indicates target SDK is old, app is old.
	OLDVERSION = 20 // 20
	// INSTALLFAIL indicates App install failed, usually due to Invalid App (hangouts, country, old version, or other manifest compat issues)
	INSTALLFAIL = 30 // 30
	// TOOMANYATTEMPTS indicates App install failed too many attempst to install.
	TOOMANYATTEMPTS = 31 // 30
	// DEVICENOTCOMPAT indicates device is not comaptible: e.g. camera req-features
	DEVICENOTCOMPAT = 40 // 40
	// DEVICENOTCOMPAT indicates device is not comaptible: e.g. camera req-features
	CHROMEBOOKNOTCOMPAT = 41 // 41
	// COUNTRYNA indicates app not availble in country
	COUNTRYNA = 50 // 50
	// O4C indicates O4C
	O4C = 60 // 60
	// O4CFullScreenOnly indicates O4C but app is only fullscreen.
	O4CFullScreenOnly = 70 // 70
	// IsFSToAmacE indicates Fullscreen (no amace) to Amace(after restore)
	IsFSToAmacE = 80 // 80
	// IsLockedPAmacE indicates the app is locked to phone
	IsLockedPAmacE = 90 // 90
	// IsLockedPAmacE indicates the app is locked to tablet
	IsLockedTAmacE = 100 // 100
	// IsAmacE indicates IsAmacE in all windows and modes
	IsAmacE = 110 // 110
	// PWA indicates app is PWA (TikTok)
	PWA = 120 // 120
	// SKIPPED indicates app was skipped and not checked
	SKIPPEDAMACE = 255 // 1023
)

func (as AppStatus) String() string {
	switch as {
	case Fail:
		return "Fail"
	case LaunchFail:
		return "Launchfail"
	case Crashed:
		return "Crashed"
	case PRICE:
		return "Price"
	case PURCHASED:
		return "Purchased"
	case OLDVERSION:
		return "Oldversion"
	case INSTALLFAIL:
		return "Installfail"
	case TOOMANYATTEMPTS:
		return "Toomanyattempts"
	case DEVICENOTCOMPAT:
		return "Devicenotcompat"
	case CHROMEBOOKNOTCOMPAT:
		return "Chromebooknotcompat"
	case COUNTRYNA:
		return "Countryna"
	case O4C:
		return "O4c"
	case O4CFullScreenOnly:
		return "O4cfullscreenonly"
	case IsFSToAmacE:
		return "Isfstoamace"
	case IsLockedPAmacE:
		return "Islockedpamace"
	case IsLockedTAmacE:
		return "Islockedtamace"
	case IsAmacE:
		return "Isamace"
	case PWA:
		return "Pwa"
	case SKIPPEDAMACE:
		return "Skippedamace"
	default:
		return fmt.Sprintf("Unknown AppStatus: %d", int(as))
	}
}

// AppResult stores result of checking app
type AppResult struct {
	App          AppPackage
	RunID        string
	RunTS        int64
	AppTS        int64
	Status       AppStatus
	BrokenStatus AppBrokenStatus
	AppType      AppType
	AppVersion   string
	AppHistory   *AppHistory
	Logs         string
	LoginResults int8
	DSrcPath     string
}

func (ar AppResult) String() string {
	return fmt.Sprintf("isAmac-e: %v, Name: %s", ar.Status, ar.App.Aname)
}
