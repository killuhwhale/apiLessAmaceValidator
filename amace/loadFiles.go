// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Package amace does some light work.
package amace

import (
	"fmt"
	"io/ioutil"
	"strings"

	"go.chromium.org/tast/core/testing"
)

// AppPackage holds App Info
type AppPackage struct {
	Pname string // Install app package name
	Aname string // launch app name
}

// LoadSecret secret from file to post to backend
func LoadSecret(s *testing.State) (string, error) {
	b, err := ioutil.ReadFile(s.DataPath("AMACE_secret.txt"))
	if err != nil {
		fmt.Println("Error:", err)
		return "", err
	}
	return string(b), nil
}

// LoadAppList loads list to use to check status of AMAC-E
func LoadAppList(s *testing.State, startat string) ([]AppPackage, error) {
	idx := 0

	b, err := ioutil.ReadFile(s.DataPath("AMACE_app_list.tsv"))
	if err != nil {
		fmt.Println("Error:", err)
		return nil, err
	}

	// Convert file content to string
	fileContent := string(b)

	// Print the file content
	// fmt.Println(fileContent)
	var pgks []AppPackage
	lines := strings.Split(fileContent, "\n")
	s.Log("Startat param: ", startat)
	// Split each line by tabs
	for lineIdx, line := range lines {
		fields := strings.Split(line, "\t")
		pgks = append(pgks, AppPackage{fields[1], fields[0]})
		fmt.Println(fields)
		if fields[1] == startat {
			s.Logf("Starting at(%s): %s (matched: %s)", idx, fields[1], startat)
			idx = lineIdx
		}
	}
	s.Log("Loaded packages: ", pgks)
	return pgks[idx:], nil
}
