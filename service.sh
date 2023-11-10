#!/bin/bash
# Executing this file will write this content to a service file. This will start the Django server when the machine turns on which allows the automation program to communicate with the host.

cat << EOF > /etc/systemd/system/imageserver.service
[Unit]
Description=ImageServer Service
After=network.target

[Service]
User=appval002
Group=www-data
Environment="MYAPP_IP=$(hostname -I | awk '{print $1}')"
WorkingDirectory=/home/appval002/amace_validator
ExecStart=/bin/bash -c '/home/appval002/amace_validator/imageserver/bin/python /home/appval002/amace_validator/imageserver/manage.py runserver ${MYAPP_IP}:8000'
Restart=always

[Install]
WantedBy=multi-user.target
EOF