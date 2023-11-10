###############################################################
#   Opposite of linkTest.sh
#   Overwrites files in git repo from TAST tests. Updates git after development.
#
#############################################################

# Mkdir if DNE $CHROMEOS_SRC/src/platform/tast-tests/src/chromiumos/tast/local/bundles/cros/arc/amace/
# # ~/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc
# CHROMEOS_SRC="/home/$USER/chromiumos"

triggerDirectory="${CHROMEOS_SRC}/src/scripts/wssTriggerEnv/wssTrigger"
directory="${CHROMEOS_SRC}/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc"
amace_dir="$directory/amace"

echo "Looking at ${CHROMEOS_SRC}"

# Helper Functions
cp $amace_dir/amaceScreenshot.go        ./amace/amaceScreenshot.go
cp $amace_dir/appHistory.go             ./amace/appHistory.go
cp $amace_dir/appUtils.go               ./amace/appUtils.go
cp $amace_dir/colorHeap.go              ./amace/colorHeap.go
cp $amace_dir/deviceUtils.go            ./amace/deviceUtils.go
cp $amace_dir/dismissMiscProps.go       ./amace/dismissMiscProps.go
cp $amace_dir/errorUtils.go             ./amace/errorUtils.go
cp $amace_dir/facebookLogin.go          ./amace/facebookLogin.go
cp $amace_dir/installAppUtils.go        ./amace/installAppUtils.go
cp $amace_dir/loadFiles.go              ./amace/loadFiles.go
cp $amace_dir/loginUtils.go             ./amace/loginUtils.go
cp $amace_dir/requestUtils.go           ./amace/requestUtils.go
cp $amace_dir/types.go                  ./amace/types.go
cp $amace_dir/utils.go                  ./amace/utils.go
cp $amace_dir/windowUtils.go            ./amace/windowUtils.go
cp $amace_dir/yoloDetect.go             ./amace/yoloDetect.go

# Main Test
cp $directory/amace.go ./amace.go
cp $directory/amace.py ./amace.py


cp  $triggerDirectory/wssClient.py  ./wssClient.py
cp  $triggerDirectory/updateRemoteDevice.sh ./updateRemoteDevice.sh
cp  $triggerDirectory/wssReqs.txt   ./wssReqs.txt
# cp  $triggerDirectory/wssUpdater.py ./wssUpdater.py

