#!/bin/bash

sudo apt upgrade
sudo apt install -y xfce4 xfce4-goodies xorg dbus-x11 x11-xserver-utils
sudo apt install -y xrdp
sudo systemctl status xrdp
sudo adduser xrdp ssl-cert
sudo systemctl restart xrdp
sudo ufw allow from 192.168.1.0/24 to any port 3389
sudo ufw allow 3389
wget http://www.c-nergy.be/downloads/Std-Xrdp-Install-0.5.3.zip # download script
unzip Std-Xrdp-Install-0.5.3.zip # Unzip the compressed package
chmod +x Std-Xrdp-Install-0.5.3.sh # Grant execution permissions
./Std-Xrdp-Install-0.5.3.sh # Just after the execution is complete
sudo add-apt-repository ppa:martinx/xrdp-next
sudo apt install -y ubuntu-mate-desktop
sudo apt install xorgxrdp-hwe-18.04
sudo reboot now