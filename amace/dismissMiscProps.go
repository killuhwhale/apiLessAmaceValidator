// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"context"

	"go.chromium.org/tast-tests/cros/local/input"

	"go.chromium.org/tast/core/testing"
)

func CheckMiscAppForKnownBehavior(ctx context.Context, k *input.KeyboardEventWriter, pkgName string) error {
	switch pkgName {
	case "bn.ereader":
		closeBNobleWifi(ctx, k)
	}
	return nil
}

// CloseBNobleWifi will check and close WiFi popup.
func closeBNobleWifi(ctx context.Context, k *input.KeyboardEventWriter) error {
	testing.ContextLog(ctx, "Closing Wifi w/ back key")
	return k.TypeKeyAction(input.KEY_BACK)(ctx)
}

// func DismissSmartLock(ctx context.Context, a *arc.ARC){
// 	cred_picker_acts := []string{"com.google.android.gms.auth.api.credentials.ui.CredentialPickerActivity", ".auth.api.credentials.ui.CredentialPickerActivity"}
// 	curAct := CurrentActivity(ctx, a)
// 	if cred_picker_acts

// }

// def check_and_close_smartlock(driver: Remote):
//     cred_picker_acts = ["com.google.android.gms.auth.api.credentials.ui.CredentialPickerActivity", ".auth.api.credentials.ui.CredentialPickerActivity"]
//     if driver.current_activity in cred_picker_acts:
//         try:
//             text = "NONE OF THE ABOVE"
//             content_desc = f'''new UiSelector().className("android.widget.Button").text("{text}")'''
//             el = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value=content_desc)
//             el.click()
//         except Exception as error:
//             print("Failed to click NONE OF THE ABOVE on Google Smart Lock.")
