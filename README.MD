# TL;DR
1. Start Chroot and WSSClient
    ./startCROS.sh
    cd wssTriggerEnv
    source bin/activate
    cd wssTrigger
    DNAME=APPVAL002 TASTACCOUNT=tastarcplusplusappcompat14@gmail.com:password python3 wssClient.py
2. Ensure Image Server is running
    lsof -i :8000
    - If not running:
        source bin/activate
        ./imageserver/manage.py runserver 192.168.1.229:8000
3. Start web server
    cd dashboard
    npm run dev


# Capablilities/ Features
1. Install App
2. Launch App
3. Check Logcat Errors on Launch
    - winDeath
    - forceRmRecord
    - fDebug
    - fatalException
    - procDied
    - anr
4. Check App for Black Screen
5. Get App Version
6. Get App Type - App, Game, PWA
7. Get AMACE Status
8. Attempt Login w/ Google, Facebook and Email.
9. Multi device execution.


# Enter Chroot
./startCROS.sh
    - (cd /$HOME/chromiumos/src/scripts && cros_sdk)

# Update Chroot
 (inside) ./update_chroot

# Delete Chroot
If you need to delete your chroot, use cros_sdk --delete to delete it properly. Using rm -rf could end up deleting your source tree due to the active bind mounts.


# Image Server
    Django server running on Host to accept:
    - Send images from DUTs and push to Server for Apphistory
    - Send email
    - Object detection

## dev start
    DNAME=BRAIN python3 wssClient.py

    source bin/activate
    ./imageserver/manage.py runserver 192.168.1.229:8000

    ./manage.py runserver hostIP:8000



# Start AMACE Validator
./startCROS.sh
cd wssTriggerEnv
source bin/activate
cd wssTrigger
DNAME=APPVAL002 TASTACCOUNT=tastarcplusplusappcompatxx@gmail.com:password python3 wssClient.py


# Test Command
python3 /home/killuh/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc/amace.py -a tastarcplusplusappcompatxx@gmail.com:password -p /home/killuh/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc/data/AMACE_secret.txt -u http://192.168.1.229:3000/api/amaceResult -l  t --dsrcpath AppLists/TestList --dsrctype playstore -d  192.168.1.125


# Run Raw TAST command
## Push data to server(default "https://appval-387223.wl.r.appspot.com/api/amaceResult")
tast -verbose run  -var=ui.gaiaPoolDefault=testacct@gmail.com:password root@192.168.1.238 arc.AMACE
./startAMACE.sh root@192.168.1.125 http://192.168.1.229:3000/api/amaceResult

## Push data to localhost (or other url)
tast -verbose run -var=arc.amace.globalPOSTURL="http://192.168.1.229:3000/api/amaceResult" -var=ui.gaiaPoolDefault=testacct@gmail.com:password root@192.168.1.238 arc.AMACE

