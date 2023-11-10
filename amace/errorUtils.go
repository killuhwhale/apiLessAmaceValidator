// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"context"
	"fmt"
	"regexp"
	"strings"
	"time"

	"go.chromium.org/tast-tests/cros/local/arc"

	"go.chromium.org/tast/core/testing"
)

// Launch App
// If app not open, CHECK CRASH
// Get app info
// Sleep 5 sec
// CHECK CRASH
// Check for pop ups
// If app not open, CHECK CRASH

// Login process...

// NOTES::
//  cat file | grep -E "abc|fgh|xyz"    for ANR in dumpsys activity instead of using ARC version, just OR each thing
// Start time
// timestamp := int64(1624972800) // Example timestamp: July 1, 2021 00:00:00 UTC

// 	// Convert the numerical timestamp to a time.Time value
// 	t := time.Unix(timestamp, 0)

// CHECK CRASH
//   - err_detector.check_crash()
//     -

// type ErrDectector struct {
// 	PackageName string
// 	LogcatStart time.Time
// 	Logs string
// 	CleanedLogs string
// }

type ErrResult struct {
	CrashType AppBrokenStatus
	CrashMsg  string
	CrashLogs string
}

type ErrorDetector struct {
	PackageName string
	StartTime   string
	Logs        string
	CleanLogs   string
	Results     []ErrResult
	ctx         context.Context
	a           *arc.ARC
	s           *testing.State
}

func (ed *ErrorDetector) Print() string {
	r := []string{}

	ed.s.Log("Print err results: ", len(ed.Results))

	for index, er := range ed.Results {
		ed.s.Log("Err: ", er.CrashMsg)
		r = append(r, fmt.Sprintf("%d. %s", index, er.CrashMsg))
	}
	return strings.Join(r, "\n")
}

// GetHighError iterates over the errResults and returns the worst one.
func (ed *ErrorDetector) GetHighError() ErrResult {
	// Gets Logs to return
	var worstErr ErrResult
	ed.s.Log("Print err results: ", len(ed.Results))

	for _, er := range ed.Results {
		if worstErr == (ErrResult{}) {
			worstErr = er
		} else if worstErr.CrashType == WinDeath && er.CrashType == FDebugCrash {
			worstErr = er
		} else if worstErr.CrashType == WinDeath && er.CrashType == FatalException {
			worstErr = er
		} else if worstErr.CrashType == FatalException && er.CrashType == FDebugCrash {
			worstErr = er
		} else if worstErr.CrashType == ProceDied && er.CrashType == FDebugCrash {
			worstErr = er
		} else if worstErr.CrashType == ProceDied && er.CrashType == FatalException {
			worstErr = er
		}
	}
	if worstErr == (ErrResult{}) {
		worstErr = ErrResult{CrashType: Pass, CrashMsg: "Pass", CrashLogs: ""}
	}

	return worstErr
}

func NewErrorDetector(ctx context.Context, a *arc.ARC, s *testing.State) *ErrorDetector {
	// Errors
	// 06-29 18:27:57.425   391   409 E ActivityManager: Failure starting process com.runawayplay.flutter
	// 06-29 18:27:57.425   391   409 I ActivityManager: Force stopping com.runawayplay.flutter appid=10069 user=0: start failure
	// 06-29 18:27:57.453   391   409 I WindowManager:   Force finishing activity ActivityRecord{d7ca148 u0 com.runawayplay.flutter/org.cocos2dx.lua.FlutterActivity t11}
	errDetector := &ErrorDetector{
		StartTime: "",
		Logs:      "",
		CleanLogs: "",
		Results:   []ErrResult{},
		ctx:       ctx,
		a:         a,
		s:         s,
	}
	errDetector.ResetStartTime()
	return errDetector

}

func (e *ErrorDetector) GetCleanLogs() string {
	return e.CleanLogs
}

func (e *ErrorDetector) Escape(logs string) string {
	return strings.ReplaceAll(logs, "\n", "\\n")
}

func (e *ErrorDetector) GetPackageName() string {
	return e.PackageName
}

func (e *ErrorDetector) UpdatePackageName(packageName string) {
	e.PackageName = packageName
}

func (e *ErrorDetector) GetLogs() {
	// cmd := exec.Command("adb", "-t", e.TransportID, "logcat", "time", "-t", fmt.Sprintf("'%s'", e.StartTime))
	e.s.Log("Getting logs w/ start time: ", e.StartTime)

	// cmd := e.a.Command(e.ctx, "logcat", "time", "-t", fmt.Sprintf("'%s'", e.StartTime))
	cmd := e.a.Command(e.ctx, "logcat", "ExperimentPackageManage:S", "time", "-t", e.StartTime)
	output, err := cmd.Output()
	if err != nil {
		e.s.Log("Error executing 'adb logcat' command:", err)
		return
	}
	e.Logs = string(output)
}

func (e *ErrorDetector) PerformCleanLogs(match *regexp.Regexp) string {
	if match == nil {
		return ""
	}
	lineLen := 160 * 10 // Chars per line * num_lines
	start := match.FindStringIndex(e.Logs)[0] - lineLen
	if start < 0 {
		start = 0
	}
	end := match.FindStringIndex(e.Logs)[1] + lineLen
	if end > len(e.Logs) {
		end = len(e.Logs)
	}
	// e.CleanLogs = e.Logs[start:end]
	return e.Logs[start:end]
}

func (e *ErrorDetector) CheckForWinDeath() (string, string) {
	winDeath := fmt.Sprintf(`\d+-\d+\s\d+:\d+:\d+\.\d+\s*\d+\s*\d+\s*I WindowManager: WIN DEATH: Window{.*\s.*\s%s/.*}`, e.PackageName)
	winDeathPattern := regexp.MustCompile(winDeath)
	match := winDeathPattern.FindStringSubmatch(e.Logs)
	e.s.Log("checking win death")
	if match != nil {
		e.s.Log("Match found! Win death")
		failedActivity := strings.TrimSuffix(strings.Split(match[0], "/")[1], "}")
		return failedActivity, e.PerformCleanLogs(winDeathPattern)
	}
	return "", ""
}

func (e *ErrorDetector) CheckForceRemoveRecord() (string, string) {
	// 06-29 19:00:08.865   389  1516 W ActivityTaskManager: Force removing ActivityRecord{20d4cf5 u0 com.runawayplay.flutter/org.cocos2dx.lua.FlutterActivity t12}: app died, no saved state
	// 06-29 19:16:01.253   386  3276 W ActivityTaskManager: Force removing ActivityRecord{414e3d3 u0 com.runawayplay.flutter/org.cocos2dx.lua.FlutterActivity t10}: app died, no saved state
	// 06-29 19:23:49.259   389  1795 W ActivityTaskManager: Force removing ActivityRecord{17fe6b u0 com.runawayplay.flutter/org.cocos2dx.lua.FlutterActivity t12}: app died, no saved state
	forceRemoved := fmt.Sprintf(`\d+-\d+\s\d+:\d+:\d+\.\d+\s*\d+\s*\d+\s*W (?:ActivityTaskManager|ActivityManager): Force removing ActivityRecord{.*\s.*\s%s/.*\s.*}: app died, no saved state`, e.PackageName)
	forceRemovedPattern := regexp.MustCompile(forceRemoved)
	match := forceRemovedPattern.FindStringSubmatch(e.Logs)
	e.s.Log("checking Force rm")
	if match != nil {
		e.s.Log("Match found! Force remove")
		// TODO() Extract activity from string
		// failedActivity := strings.TrimSuffix(strings.Split(match[0], "/")[1], "}")

		failedActivity := match[0]
		return failedActivity, e.PerformCleanLogs(forceRemovedPattern)
	}

	forceStopped := fmt.Sprintf(`\d+-\d+\s\d+:\d+:\d+\.\d+\s*\d+\s*\d+\s*I ActivityManager: Force stopping %s appid=\d+ user=\d+: start failure`, e.PackageName)

	forceStoppedPattern := regexp.MustCompile(forceStopped)
	match = forceStoppedPattern.FindStringSubmatch(e.Logs)
	e.s.Log("checking Force stop")
	if match != nil {
		e.s.Log("Match found! Force stopping")
		// TODO() Extract activity from string
		// failedActivity := strings.TrimSuffix(strings.Split(match[0], "/")[1], "}")
		failedActivity := match[0]
		return failedActivity, e.PerformCleanLogs(forceStoppedPattern)
	}

	return "", ""
}

func (e *ErrorDetector) checkFDebugCrash() (string, string) {
	fdebug := fmt.Sprintf(`.*>>> %s <<<.*`, e.PackageName)
	fdebugPattern := regexp.MustCompile(fdebug)
	match := fdebugPattern.FindStringSubmatch(e.Logs)
	e.s.Log("checking F Debug Crash")
	if match != nil {
		e.s.Log("Match found! F Debug crash")
		return "", e.PerformCleanLogs(fdebugPattern)
	}
	return "", ""
}

func (e *ErrorDetector) checkFatalException() (string, string) {
	// tsPattern := `^\d+-\d+\s\d+\:\d+\:\d+\.\d+\s*\d+\s*\d+\s*`
	fatalException := fmt.Sprintf(`\d+-\d+\s\d+\:\d+\:\d+\.\d+\s*\d+\s*\d+\s*E AndroidRuntime: FATAL EXCEPTION.*\n.*%s.*\n.*\n.*`, e.PackageName)
	fatalExceptionPattern := regexp.MustCompile(fatalException)
	match := fatalExceptionPattern.FindStringSubmatch(e.Logs)
	e.s.Log("checking Fatal Exception")
	if match != nil {
		e.s.Log("Match found! Fatal Exception")

		failedActivity := "Failed to open due to crash"
		// noTimestampString := regexp.MustCompile(tsPattern).ReplaceAllString(match[0], "")
		// failedMsg := strings.ReplaceAll(strings.Join(strings.Split(noTimestampString, "E AndroidRuntime: "), " ~ "), "\n", "")
		// failedMsg = strings.ReplaceAll(failedMsg, "\t", "")
		// failedMsg = strings.TrimSpace(failedMsg)
		// return failedActivity, failedMsg
		return failedActivity, e.PerformCleanLogs(fatalExceptionPattern)

	}
	return "", ""
}

func (e *ErrorDetector) checkProcDied() (bool, string) {
	// 06-29 19:00:08.790   389  1516 I ActivityManager: Process com.runawayplay.flutter (pid 3465) has died: vis+2 TOP
	// tsPattern := `^\d+-\d+\s\d+\:\d+\:\d+\.\d+\s*\d+\s*\d+\s*`
	procDied := fmt.Sprintf(`\d+-\d+\s\d+\:\d+\:\d+\.\d+\s*\d+\s*\d+\s*I ActivityManager: Process %s .*pid .* has died:.*`, e.PackageName)
	procDiedPattern := regexp.MustCompile(procDied)
	match := procDiedPattern.FindStringSubmatch(e.Logs)
	e.s.Log("checking proc died")
	if match != nil {
		e.s.Log("Match found! Proc died")
		return true, e.PerformCleanLogs(procDiedPattern)
	}
	return false, ""
}

// def dumpysys_activity() -> str:
//     try:
//         keyword = "mFocusedWindow"
//         cmd = ('adb', '-t', transport_id, 'shell', 'dumpsys', 'activity', '|', 'grep', keyword)
//         return subprocess.run(cmd, check=False, encoding='utf-8',
//             capture_output=True).stdout.strip()
//     except Exception as err:
//             print("Err dumpysys_activity ", err)
//     return ''

//	func (e *ErrorDetector) checkForANR() bool {
//		dumpsysActText := dumpysysActivity(e.TransportID, e.ArcVersion)
//		return isANR(dumpsysActText, e.PackageName)
//	}

func searchForCurrentActivity(text string) string {
	foundLine := ""

	lines := strings.Split(text, "\n")
	for _, line := range lines {
		if strings.Contains(line, "mFocusedWindow") || strings.Contains(line, "mResumedActivity") {
			foundLine = line
		}
	}

	return foundLine
}

// searchForPackageANR seaches for ANR for a specific package
func searchForPackageANR(text, pkgName string) string {
	foundLine := ""
	// ANR Text: mFocusedWindow=Window{afc9fce u0 Application Not Responding: com.thezeusnetwork.www}
	lines := strings.Split(text, "\n")
	for _, line := range lines {
		if strings.Contains(line, fmt.Sprintf("Application Not Responding: %s", pkgName)) {
			foundLine = line
		}
	}

	return foundLine
}

// searchForANR searches for a general ANR
func searchForANR(text string) string {
	foundLine := ""
	// ANR Text: mFocusedWindow=Window{afc9fce u0 Application Not Responding: com.thezeusnetwork.www}
	lines := strings.Split(text, "\n")
	for _, line := range lines {
		if strings.Contains(line, "Application Not Responding:") {
			foundLine = line
		}
	}

	return foundLine
}

func (e *ErrorDetector) DumpsysAct() string {
	cmd := e.a.Command(e.ctx, "dumpsys", "activity")
	output, err := cmd.Output()
	if err != nil {
		e.s.Log("Error running surfaceflinger command.")
	}

	// e.s.Log("DumpSysAct: ", string(output))
	// curAct := searchForCurrentActivity(string(output))
	// e.s.Log("DumpSysAct: ", curAct)
	return string(output)
}

func (e *ErrorDetector) CurrentActivity() string {
	output := e.DumpsysAct()
	return searchForCurrentActivity(output)
}

func (e *ErrorDetector) IsANR() bool {
	output := e.DumpsysAct()
	return len(searchForANR(output)) > 0
}

func (e *ErrorDetector) IsPackageANR() (bool, string) {
	output := e.DumpsysAct()
	anrText := searchForPackageANR(output, e.PackageName)
	return len(anrText) > 0, anrText
}

func (e *ErrorDetector) DetectErrors() {
	// Step 1: Get the logs
	e.GetLogs()
	e.ResetStartTime()
	e.Results = []ErrResult{} // Reset old results.

	// Step 2: Check for WindowManager Win Death
	winDeath, winDeathLog := e.CheckForWinDeath()
	if winDeath != "" {
		// return "Win Death", winDeath, winDeathLog
		e.Results = append(e.Results, ErrResult{CrashType: WinDeath, CrashMsg: winDeath, CrashLogs: e.Escape(winDeathLog)})
	}

	// Step 3: Check for Force Remove Record
	forceRmRecord, forceRemovedLog := e.CheckForceRemoveRecord()
	if forceRmRecord != "" {
		// return "Force Remove Record", forceRmRecord, forceRemovedLog
		e.Results = append(e.Results, ErrResult{CrashType: ForceRemoved, CrashMsg: forceRmRecord, CrashLogs: e.Escape(forceRemovedLog)})
	}

	// Step 4: Check for F Debug Crash
	fDebug, fDebugLogs := e.checkFDebugCrash()
	if fDebug != "" {
		e.Results = append(e.Results, ErrResult{CrashType: FDebugCrash, CrashMsg: fDebug, CrashLogs: e.Escape(fDebugLogs)})
	}

	// Step 5: Check for Force Remove Record
	fatalException, fatalExceptionLogs := e.checkFatalException()
	if fatalException != "" {
		// return "Fatal exception", fatalException, fatalExceptionLogs
		e.Results = append(e.Results, ErrResult{CrashType: FatalException, CrashMsg: fatalException, CrashLogs: e.Escape(fatalExceptionLogs)})
	}

	// Step 6: Check for Force Remove Record
	procDied, procDiedLogs := e.checkProcDied()
	if procDied {
		// return "Proc died", "Proc died", procDiedLogs
		e.Results = append(e.Results, ErrResult{CrashType: ProceDied, CrashMsg: "Proc died", CrashLogs: e.Escape(procDiedLogs)})
	}

	// Step 6: Check for Force Remove Record
	anr, anrText := e.IsPackageANR()
	if anr {
		// return "Proc died", "Proc died", procDiedLogs
		e.Results = append(e.Results, ErrResult{CrashType: ANR, CrashMsg: "ANR", CrashLogs: e.Escape(anrText)})
	}

}

func (e *ErrorDetector) getStartTime() string {
	currentTime := time.Now()
	formattedTime := currentTime.Format("01-02 15:04:05.000") // "MM-DD HH:MM:SS.ms"
	return formattedTime
}

func (e *ErrorDetector) ResetStartTime() {
	e.StartTime = e.getStartTime()
}

func GetFinalLogs(crash ErrResult) string {
	if (crash == ErrResult{}) {
		return ""
	}
	return crash.CrashLogs
}
