# Runs scripts need to setup automation

# Create service and start server
sudo bash service.sh
sudo systemctl start imageserver.service
sudo systemctl enable imageserver.service


# Copy files to TAST
bash linkTests.sh

# Enter Chroot
bash startCROS.sh



echo "Make sure to add AMACE_secret.txt to .../arc/data/AMACE_secret.txt"


echo "After running this you should be in this CHROOT @ /chromiumos/src/scripts"
echo "Run bash startAMACE.sh -d 192.168.1.123 -d 192.168.1.456 -a account@gmail.com:password"