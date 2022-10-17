#!/bin/bash 

sudo apt install transmission-cli -y 


wget https://mirror.kakao.com/ubuntu-releases/bionic/ubuntu-18.04.6-desktop-amd64.iso
wget http://mirror.kakao.com/ubuntu-releases/16.04.7/ubuntu-16.04.6-desktop-i386.iso
wget https://releases.ubuntu-mate.org/archived/18.04/ubuntu-mate-18.04.5-desktop-i386.iso
wget https://mirror.kakao.com/ubuntu-releases/jammy/ubuntu-22.04.1-desktop-amd64.iso
curl -O https://k.kakaocdn.net/dn/GRcZm/btrOq3hdpDB/ybHKAct6uwAE9GSksXl0u1/Windows%2010%2021H2%28%EB%B9%8C%EB%93%9C%2019044.2130%29%20Pro%20Home%20LTSC%20LITE.torrent?attach=1&knm=tfile.torrent
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
transmission-cli  *.torrent  .
