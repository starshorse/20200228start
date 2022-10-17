#! /bin/bash

sudo apt-get remove --purge ubuntu-mate-desktop xorgxrdp-hwe-18.04 -y 
sudo apt-get clean 
sudo apt install -y ubuntu-mate-desktop
sudo apt install -y xorgxrdp-hwe-18.04
sudo reboot now

