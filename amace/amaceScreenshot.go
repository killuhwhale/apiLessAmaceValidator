// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"bytes"
	"context"
	"fmt"
	"image/png"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os/exec"

	"go.chromium.org/tast-tests/cros/local/chrome"
	"go.chromium.org/tast/core/testing"
)

// postSS will grab a ss, upload it to local server on host machine which posts to GCP and returns the path
func PostSS(ctx context.Context, tconn *chrome.TestConn, device, packageName, historyStep, runID, hostIP string, viaChrome bool) string {
	var ss []byte
	var err error
	if viaChrome {
		ss, err = GetChromeSS(ctx, tconn)
	} else {
		ss, err = GetSS()
	}

	if err != nil {
		testing.ContextLog(ctx, "Err ss: ", err)
	}
	// destination_blob_name = f"appRuns/{run_id}/{device}/{package_name}/{hist_step}"
	imgPath := fmt.Sprintf("amaceRuns/%s/%s/%s/%s", runID, device, packageName, historyStep)
	PostImage(ctx, ss, hostIP, imgPath)
	return imgPath
}

func GetSS() ([]byte, error) {
	cmd := exec.Command("adb", "exec-out", "screencap", "-p")
	output, err := cmd.Output()
	if err != nil {
		return nil, err
	}
	return output, nil
}

func GetChromeSS(ctx context.Context, tconn *chrome.TestConn) ([]byte, error) {
	img, err := CaptureChromeImageWithTestAPI(ctx, tconn)
	if err != nil {
		testing.ContextLog(ctx, "Failed to get SS via Chrome.")
		return nil, err
	}

	// Create a buffer to store the encoded image bytes
	buffer := new(bytes.Buffer)

	// Encode the image into the buffer as PNG
	err = png.Encode(buffer, img)
	if err != nil {
		testing.ContextLog(ctx, "Failed enconding image from Chrome")
		return nil, err
	}

	// Convert the buffer to a byte slice
	return buffer.Bytes(), nil
}

func PostImage(ctx context.Context, image []byte, hostIP, imgPath string) error {
	// Make request to lcoal server and check response
	// get Image from device in another function
	// Send image to server to recv w/ RUNID
	// Once image is grabbed and successfully sent, upload to DATABASE via runID
	testing.ContextLogf(ctx, "Host ip: %s => %s", hostIP, imgPath)

	// Create a new multipart buffer
	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	// Add the screenshot file
	imageField, err := writer.CreateFormFile("image", "img.png")
	if err != nil {
		return err
	}

	// Write the image data to the form file field
	if _, err = imageField.Write(image); err != nil {
		return err
	}

	// Add the additional data field
	dataWriter, err := writer.CreateFormField("imgPath")
	if err != nil {
		return err
	}
	dataWriter.Write([]byte(imgPath))

	// Close the multipart writer
	writer.Close()

	req, err := http.NewRequest("POST", fmt.Sprintf("http://%s:8000/", hostIP), body)
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
		testing.ContextLog(ctx, "Error:", err)
	}

	bodyString := string(bodyBytes)
	testing.ContextLog(ctx, "Host response: ", bodyString)

	return nil
}
