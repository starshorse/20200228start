#!/bin/bash 

sudo apt install default-jdk -y
npm i mocha protractor -g 
cd ~/workdir/gitdn/20200228start/xls_node/protractor
xterm -e webdriver-manager update 
xterm -e webdriver-manager start 



