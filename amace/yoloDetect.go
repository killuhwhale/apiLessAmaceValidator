// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"time"

	"go.chromium.org/tast-tests/cros/local/arc"
	"go.chromium.org/tast-tests/cros/local/input"
	"go.chromium.org/tast/core/testing"
)

// #########################
//  Example Code to use in amace.go
// #########################
// // GoBigSleepLint Wait for app to load some more and potentially fail...
// testing.Sleep(ctx, 15*time.Second)
// 	yr, err := amace.YoloDetect(ctx, hostIP.Value())  # Returns a yoloResult
// 	if err != nil {
// 		testing.ContextLog(ctx, "Failed to get YoloResult: ", err)
// 	}
// 	_, labelExists := yr.Data["Continue"]
// 	if labelExists {
// 		clicked := yr.Click(ctx, a, "Continue")
// 		testing.ContextLog(ctx, "Clicked btn? ", clicked)

// 	// GoBigSleepLint Wait for app to load some more and potentially fail...
// 	testing.Sleep(ctx, 3*time.Second)
// 	idx--
// }
// break

// possible keys to map
// Close
// Continue
// FBAuth
// GoogleAuth
// Slider
// Two
// loginfield
// passwordfield
type YoloResult struct {
	Data map[string][]struct {
		Coords [2][2]int `json:"coords"`
		Conf   float64   `json:"conf"`
	} `json:"data"`
}

func (yr *YoloResult) SendText(ctx context.Context, a *arc.ARC, text string) bool {
	cmd := a.Command(ctx, "input", "text", text)
	_, err := cmd.Output()
	if err != nil {
		testing.ContextLog(ctx, "Failed to send text")
		return false
	}
	testing.ContextLog(ctx, "Sent: ", text)
	return true
}

func (yr *YoloResult) SendTextCr(ctx context.Context, keyboard *input.KeyboardEventWriter, text string) bool {
	if err := keyboard.Type(ctx, text); err != nil {
		testing.ContextLog(ctx, "Failed to write events: ", err)
		return false
	}

	testing.ContextLog(ctx, "Sent: ", text)
	return true
}

func (yr *YoloResult) Click(ctx context.Context, a *arc.ARC, label string) bool {
	_, exists := yr.Data[label]
	if !exists {
		return false
	}

	btns := yr.Data[label]                             // TODO Sort by cond
	btn, btns := btns[len(btns)-1], btns[:len(btns)-1] // pop operation, store last element, update slice w/out last element
	x := (btn.Coords[0][0] + btn.Coords[1][0]) / 2     // mid point
	y := (btn.Coords[0][1] + btn.Coords[1][1]) / 2
	testing.ContextLog(ctx, "Tapping: ", fmt.Sprint(x), ", ", fmt.Sprint(y))
	cmd := a.Command(ctx, "input", "tap", fmt.Sprint(x), fmt.Sprint(y))
	output, err := cmd.Output()
	if err != nil {
		testing.ContextLog(ctx, "Failed to tap")
		return false
	}
	testing.ContextLog(ctx, "Tapped!", output)
	return true
}

func (yr *YoloResult) Keys() []string {
	keys := make([]string, 0, len(yr.Data))
	for k := range yr.Data {
		keys = append(keys, k)
	}
	return keys
}

func (yr *YoloResult) Dequeue(ctx context.Context, label string) bool {

	data, exists := yr.Data[label]
	if !exists {
		return false
	}

	if len(data) == 1 {
		// Remove label entirely
		delete(yr.Data, label)
	} else {
		yr.Data[label] = yr.Data[label][1:]
	}

	return true
}

func YoloDetect(ctx context.Context, hostIP string) (YoloResult, error) {
	start := time.Now()

	var yoloResult YoloResult
	ss, err := GetSS()
	if err != nil {
		testing.ContextLog(ctx, "Error getting SS for Yolo: ", err)
		return yoloResult, err
	}

	// Create a new multipart buffer
	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	// Add the screenshot file
	imageField, err := writer.CreateFormFile("image", "img.png")
	if err != nil {
		testing.ContextLog(ctx, "Err: ", err)
		return yoloResult, err
	}

	// Write the image data to the form file field
	if _, err = imageField.Write(ss); err != nil {
		testing.ContextLog(ctx, "Err: ", err)
		return yoloResult, err
	}
	// Close the multipart writer
	writer.Close()

	// testing.ContextLog(ctx, "JSON data: ", body)

	req, err := http.NewRequest("POST", fmt.Sprintf("http://%s:8000/yolo/", hostIP), body)

	// Set the Content-Type header to the multipart form data boundary
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		testing.ContextLog(ctx, "Error unexpected: ", err)
		return yoloResult, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		testing.ContextLog(ctx, "Error: ", fmt.Errorf("unexpected status code: %d", resp.StatusCode))
		// return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
		return yoloResult, errors.New("Unexpected status code while getting yolo result")
	}

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		testing.ContextLog(ctx, "Error:", err)
		return yoloResult, err
	}

	testing.ContextLog(ctx, "bodyBytes: ", string(bodyBytes))

	err = json.Unmarshal([]byte(bodyBytes), &yoloResult)
	if err != nil {
		testing.ContextLog(ctx, "Error w/ yolo result:", err)
		return yoloResult, err
	}

	testing.ContextLog(ctx, "")
	testing.ContextLog(ctx, "")
	testing.ContextLog(ctx, "")
	testing.ContextLog(ctx, "Yolo: ")
	testing.ContextLog(ctx, "num diff names/labels: ", len(yoloResult.Data))

	keys := make([]string, 0, len(yoloResult.Data))
	for k := range yoloResult.Data {
		keys = append(keys, k)
	}
	testing.ContextLog(ctx, "Labels Found: ", keys)

	// if len(yoloResult.Data) == 0 {
	// 	// GoBigSleepLint Wait for app to load some more and potentially fail...
	// 	testing.Sleep(ctx, 5*time.Second)
	// }

	// for key, values := range yoloResult.Data {
	// 	if key == "Continue" {
	// 		testing.ContextLog(ctx, "Contine Button Found")
	// 		testing.ContextLog(ctx, "Found %d buttons.", len(values))
	// 		for _, button := range values {
	// 			topLeft := button.Coords[0]
	// 			bottomRight := button.Coords[1]

	// 			testing.ContextLogf(ctx, "Found button at: %v, %v w/ conf: %.3f", topLeft, bottomRight, button.Conf)

	// 		}

	// 	}
	// }
	testing.ContextLog(ctx, "")
	testing.ContextLog(ctx, "")
	testing.ContextLog(ctx, "")
	elapsed := time.Since(start)
	testing.ContextLogf(ctx, "Detection took: %s\n", elapsed)
	return yoloResult, nil
}

// def __attempt_click_continue(self):
// 	'''
// 		Attempts new detection and clicks a continue button.

// 		Used to click 'save' when loggin into Facebook app.
// 	'''
// 	results: defaultdict = self.__detect()
// 	if CONTINUE in results:
// 		results[CONTINUE], tapped = self.__click_button(results[CONTINUE])
// 		return True
// 	return False
