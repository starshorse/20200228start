#! /bin/bash

sudo apt install -y curl
# curl -O https://repo.anaconda.com/archive/Anaconda3-5.2.0-Linux-x86_64.sh 
curl -O https://repo.anaconda.com/archive/Anaconda3-2022.05-Linux-x86_64.sh
#bash Anaconda3-5.2.0-Linux-x86_64.sh
bash Anaconda3-2022.05-Linux-x86_64.sh
source ~/.bashrc
sudo apt install -y python3-pip 