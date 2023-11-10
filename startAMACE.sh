#!/bin/bash
# tast -verbose run  -var=ui.gaiaPoolDefault=tastarcplusplusappcompat14@gmail.com:lb0+LT8q $device_address arc.AMACE
# ./startAMACE.sh -d root@192.168.1.125 -d root@192.168.1.141 -u  http://192.168.1.229:3000/api/amaceResult

function usage {
    echo ""
    echo "Starts automation."
    echo ""
    echo "usage:  -d root@192.168.1.123 -d root@192.168.123 -u http://192.168.1.229:3000/api/amaceResult"
    echo ""
    echo "  -d  string             Device to test on."
    echo "                          (example: root@192.168.1.123 root@192.168.123)"
    echo "  -u  string             Url of server to post results to."
    echo "                          (example: http://192.168.1.229:3000/api/amaceResult)"
    echo "  -a  string             Account for DUT."
    echo "                          (example: email@addr.com:password)"
    echo "  -w  string             Skip amace check."
    echo "                          (example: t)"
    echo "  -b  string             Skip broken check."
    echo "                          (example: t)"
    echo "  -l  string             Skip login."
    echo "                          (example: t)"
    echo ""
}


samace="f"
sbroken="f"
slogin="f"

# Parse command-line options
while getopts ":d:u:a:w:b:l:" opt; do
  case ${opt} in
    d)
      # Device addresses
      device_addresses+=("$OPTARG")
      ;;
    u)
      # URL
      url=$OPTARG
      ;;
    a)
      # Account
      account=$OPTARG
      ;;
    w)
      # Skip amace
      samace=$OPTARG
      ;;
    b)
      # Skip broken check
      sbroken=$OPTARG
      ;;
    l)
      # Skip login
      slogin=$OPTARG
      ;;
    *)
      usage
      exit 1
      ;;
  esac
done

devices=""
for device_address in "${device_addresses[@]}"; do
  devices="${devices} ${device_address}"
done


if [[ -z ${url} ]]; then
  echo "Using default URL"
#   ~/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc
  python3 ../platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc/amace.py -d "${devices}" -a "${account}" -w "${samace}" -b "${sbroken}" -l "${slogin}"
else
  echo "Using URL: ${url}"
  python3 ../platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc/amace.py -d "${devices}" -u "${url}" -a "${account}" -w "${samace}" -b "${sbroken}" -l "${slogin}"
fi
