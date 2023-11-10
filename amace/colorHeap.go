// Copyright 2023 The ChromiumOS Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package amace

import (
	"container/heap"
	"context"
	"image"
	"image/color"
	"time"

	"go.chromium.org/tast-tests/cros/local/chrome"
	"go.chromium.org/tast-tests/cros/local/coords"
	"go.chromium.org/tast/core/testing"
)

type ColorCount struct {
	Color color.Color
	Count int
}

type ColorHeap []ColorCount

func (h ColorHeap) Len() int           { return len(h) }
func (h ColorHeap) Less(i, j int) bool { return h[i].Count > h[j].Count } // Max heap based on count
func (h ColorHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *ColorHeap) Push(x interface{}) {
	*h = append(*h, x.(ColorCount))
}

func (h *ColorHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

const maxColors = 256

func countPixelColors(img image.Image) *ColorHeap {
	bounds := img.Bounds()
	colorCounts := make(map[color.Color]int)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			c := img.At(x, y)
			colorCounts[c]++
		}
	}

	// Create a max heap and keep only the top maxColors color counts
	h := &ColorHeap{}
	heap.Init(h)

	for c, count := range colorCounts {
		cc := ColorCount{Color: c, Count: count}
		heap.Push(h, cc)

		if h.Len() > maxColors {
			heap.Pop(h)
		}
	}

	return h
}

const grayThreshold int8 = 20

func isShadeOfGray(ctx context.Context, c color.Color) bool {
	r, g, b, _ := c.RGBA()
	x := AbsVal(int8(r) - int8(g))
	y := AbsVal(int8(g) - int8(b))
	z := AbsVal(int8(r) - int8(b))
	// testing.ContextLogf(ctx, "x: %d y: %d  z: %d ", x, y, z)
	maxDiff := MaxVal(MaxVal(x, y), z)
	return maxDiff <= grayThreshold
}

const percentGrayThresh float64 = 0.30

func IsBlackScreen(ctx context.Context, tconn *chrome.TestConn, bounds coords.Rect) (bool, error) {
	// GoBigSleepLint Wait for app to load some more and potentially fail...
	testing.Sleep(ctx, 5*time.Second)
	img, err := CaptureChromeImageWithTestAPI(ctx, tconn)
	if err != nil {
		return true, err
	}

	subImage := img.(interface {
		SubImage(r image.Rectangle) image.Image
	}).SubImage(image.Rect(bounds.Left, bounds.Top, bounds.Width, bounds.Height))

	colorHeap := countPixelColors(subImage)
	// testing.ContextLog(ctx, "COLOR HEAP!")
	// Access the color counts in descending order of count

	var totalPixels = subImage.Bounds().Dx() * subImage.Bounds().Dy()
	var currentNumPixels = 0
	for colorHeap.Len() > 0 {
		cc := heap.Pop(colorHeap).(ColorCount)
		// testing.ContextLogf(ctx, "Color: %v, Count: %d\n", cc.color, cc.count)

		if isShadeOfGray(ctx, cc.Color) {
			currentNumPixels += cc.Count
			// testing.ContextLog(ctx, "Shade of grey found, total percent: ", float64(currentNumPixels)/float64(totalPixels), currentNumPixels, " / ", totalPixels)
		}
		if float64(currentNumPixels)/float64(totalPixels) > percentGrayThresh {
			return true, nil
		}
	}

	return false, nil
}
