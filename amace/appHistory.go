// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"context"
	"encoding/json"
	"fmt"

	"go.chromium.org/tast-tests/cros/local/chrome"
	"go.chromium.org/tast/core/testing"
)

type AppHistoryStep struct {
	Msg string `json:"msg"`
	Url string `json:"url"`
}

func (ahs AppHistoryStep) MarshalJSON() ([]byte, error) {
	// Marshal the struct fields directly
	return json.Marshal(struct {
		Msg string `json:"msg"`
		URL string `json:"url"`
	}{
		Msg: ahs.Msg,
		URL: ahs.Url,
	})
}

func (ahs *AppHistoryStep) UnmarshalJSON(data []byte) error {
	// Unmarshal into a temporary struct
	temp := struct {
		Msg string `json:"msg"`
		Url string `json:"url"`
	}{}

	err := json.Unmarshal(data, &temp)
	if err != nil {
		return err
	}

	// Assign the temporary struct fields to the AppHistoryStep
	ahs.Msg = temp.Msg
	ahs.Url = temp.Url

	return nil
}

type AppHistory struct {
	History []AppHistoryStep `json:"history"`
}

func (ah *AppHistory) AddHistory(msg, url string) {
	ah.History = append(ah.History, AppHistoryStep{Msg: msg, Url: url})
}

// Implement MarshalJSON for AppHistory
func (ah AppHistory) MarshalJSON() ([]byte, error) {
	// Marshal the History field directly
	return json.Marshal(ah.History)
}

// Implement UnmarshalJSON for AppHistory
func (ah *AppHistory) UnmarshalJSON(data []byte) error {
	// Unmarshal into a temporary slice
	var history []AppHistoryStep
	err := json.Unmarshal(data, &history)
	if err != nil {
		return err
	}

	// Assign the temporary slice to the History field
	ah.History = history
	return nil
}

func AddHistoryWithImage(ctx context.Context, tconn *chrome.TestConn, ah *AppHistory, device, packageName, histMsg, runID, hostIP string, viaChrome bool) {
	hs := fmt.Sprint(len(ah.History))
	testing.ContextLog(ctx, "Getting history len: ", ah.History, len(ah.History))
	imgPath := PostSS(ctx, tconn, device, packageName, hs, runID, hostIP, viaChrome)
	ah.AddHistory(histMsg, imgPath)
}
