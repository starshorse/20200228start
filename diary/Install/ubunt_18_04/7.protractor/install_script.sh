#!/bin/bash 

sudo apt install default-jdk -y
npm i mocha protractor -g 
cd ~/workdir/gitdn/20200228start/xls_node/protractor
gnome-terminal -- webdriver-manager update 
gnome-terminal -- webdriver-manager start 



