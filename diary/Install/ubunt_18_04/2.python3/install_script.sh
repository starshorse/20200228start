#!/bin/bash

sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt install -y python3.8
sudo apt install -y python3-pip
which python2 
which python3 
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 30
sudo apt-get install -y jupyter
#sudo apt-get install python3-matplotlib