#!/bin/bash 

wget https://mirror.kakao.com/ubuntu-releases/bionic/ubuntu-18.04.6-desktop-amd64.iso
wget http://mirror.kakao.com/ubuntu-releases/16.04.7/ubuntu-16.04.6-desktop-i386.iso
wget https://releases.ubuntu-mate.org/archived/18.04/ubuntu-mate-18.04.5-desktop-i386.iso
wget https://mirror.kakao.com/ubuntu-releases/jammy/ubuntu-22.04.1-desktop-amd64.iso
##########################################
#  unetbootin 
##########################################
sudo add-apt-repository ppa:gezakovacs/ppa
sudo apt-get update
sudo apt-get install unetbootin

##########################################
#  virtualbox 
##########################################
sudo apt install virtualbox
