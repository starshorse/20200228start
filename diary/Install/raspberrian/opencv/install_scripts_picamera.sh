#!bin/bash 

#Compile OpenCV 4.5.5 
wget https://github.com/Qengineering/Install-OpenCV-Raspberry-Pi-32-bits/raw/main/OpenCV-4-5-5.sh
sudo chmod 755 ./OpenCV-4-5-5.sh
./OpenCV-4-5-5.sh


#Camera On.
vcgencmd get_camera 

sudo raspi-config 
sudo modprobe bcm2835-v4l2

ls /dev/video0 -l 

sudo vim /etc/modules

# Insert .. bcm2835-v4l2 
