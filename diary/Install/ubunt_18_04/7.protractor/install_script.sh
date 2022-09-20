#!/bin/bash 

sudo apt install defualt-jdk -y
npm i mocha protractor -g 
cd ../../../../xls_node/protractor/
webdriver-manager update 
xterm -e webdriver-manager start 



