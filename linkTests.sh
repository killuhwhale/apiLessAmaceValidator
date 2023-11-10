###############################################################
#   Overwrites files in Chroot dir for TAST tests. Allows quick setup after pulling from github.
#
#   git clone; git pull; bash linkTests.sh;
#   Move startCrosh
#############################################################

# Mkdir if DNE $CHROMEOS_SRC/src/platform/tast-tests/src/chromiumos/tast/local/bundles/cros/arc/amace/
# # ~/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc
# CHROMEOS_SRC="/home/$USER/chromiumos"
triggerDirectory="${CHROMEOS_SRC}/src/scripts/wssTriggerEnv/wssTrigger"
directory="${CHROMEOS_SRC}/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc"
amace_dir="$directory/amace"
if [ ! -d "$amace_dir" ]; then
    echo "Creating directory: $amace_dir"
    mkdir -p "$directory"
else
    echo "Directory already exists: $amace_dir"
fi


# Helper Scripts
# cp ./startCROS.sh /home/${USER}    # Starts Chroot
# cp ./startAMACE.sh ${CHROMEOS_SRC}/src/scripts  # Starts automation


# Helper Functions
cp ./amace/amaceScreenshot.go    $amace_dir/amaceScreenshot.go
cp ./amace/appHistory.go         $amace_dir/appHistory.go
cp ./amace/appUtils.go           $amace_dir/appUtils.go
cp ./amace/colorHeap.go          $amace_dir/colorHeap.go
cp ./amace/deviceUtils.go        $amace_dir/deviceUtils.go
cp ./amace/dismissMiscProps.go   $amace_dir/dismissMiscProps.go
cp ./amace/errorUtils.go         $amace_dir/errorUtils.go
cp ./amace/facebookLogin.go      $amace_dir/facebookLogin.go
cp ./amace/installAppUtils.go    $amace_dir/installAppUtils.go
cp ./amace/loadFiles.go          $amace_dir/loadFiles.go
cp ./amace/loginUtils.go         $amace_dir/loginUtils.go
cp ./amace/requestUtils.go       $amace_dir/requestUtils.go
cp ./amace/types.go              $amace_dir/types.go
cp ./amace/utils.go              $amace_dir/utils.go
cp ./amace/windowUtils.go        $amace_dir/windowUtils.go
cp ./amace/yoloDetect.go         $amace_dir/yoloDetect.go




# Data Files
# cp ./AMACE_app_list.tsv          $directory/data/AMACE_app_list.tsv
# cp ./AMACE_secret.txt            $amace_dir/data/AMACE_secret.txt


# Main Test
cp ./amace.go $directory/amace.go
cp ./amace.py $directory/amace.py
mkdir -p $triggerDirectory

cp ./wssClient.py $triggerDirectory/wssClient.py
cp ./updateRemoteDevice.sh $triggerDirectory/updateRemoteDevice.sh
cp ./wssReqs.txt $triggerDirectory/wssReqs.txt
cp ./nextAuthSecret.txt $triggerDirectory/nextAuthSecret.txt
# cp ./wssUpdater.py $triggerDirectory/wssUpdater.py # Update this script manually when needed. Not intended to update remotely.

