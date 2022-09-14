#!/bin/bash 

google-chrome --version 
# 버전에 맟추어 chromedriver 다운로드 
wget https://chromedriver.storage.googleapis.com/105.0.5195.19/chromedriver_linux64.zip
sudo apt-get install unzip -y
# Unzip 다운로드
unzip chromedriver_linux64.zip
# 압축 해제
pip3 install xlrd
sudo apt-get install xvfb -y
pip3 install pyvirtualdisplay
pip3 install selenium
