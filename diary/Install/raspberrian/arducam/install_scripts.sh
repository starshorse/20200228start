#!/bin/bash

# picamera 2 + openCV 
sudo apt update
sudo apt upgrade 

sudo apt install -y python3-opencv
sudo apt install -y opencv-data 

wget -O install_pivariety_pkgs.sh https://github.com/ArduCAM/Arducam-Pivariety-V4L2-Driver/releases/download/install_script/install_pivariety_pkgs.sh
chmod +x install_pivariety_pkgs.sh

# Install libcamera 
./install_pivariety_pkgs.sh -p libcamera_dev
./install_pivariety_pkgs.sh -p libcamera_apps

# Install Camera drivers.. 
# Install the imx519 camera kernel driver.
./install_pivariety_pkgs.sh -p imx519_kernel_driver_low_speed
# Install the 64mp Hawk-Eye camera kernel driver.
./install_pivariety_pkgs.sh -p 64mp_pi_hawk_eye_kernel_driver

#Installing Picamera2 dependencies
sudo apt install -y python3-kms++
sudo apt install -y python3-pyqt5 python3-prctl libatlas-base-dev ffmpeg python3-pip
sudo pip3 install numpy --upgrade
sudo pip3 install picamera2 --upgrade

git clone https://github.com/ArduCAM/picamera2_examples
git clone https://github.com/raspberrypi/picamera2 
sudo reboot now 
