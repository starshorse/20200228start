#!/bin/bash 

###############################################################
# slack  installation 
###############################################################
wget https://downloads.slack-edge.com/linux_releases/slack-desktop-4.0.2-amd64.deb
sudo apt install ./slack-desktop-*.deb

###############################################################
#  mysql installation 
###############################################################
sudo apt-cache search mysql-server

sudo apt-get update 
sudo apt-get install mysql-server -y
sudo systemctl start mysql 
sudo systemctl enable mysql 
sudo mysql -u root -p < mysql_script.sql  

echo "SHOW VARIABLES LIKE '%version%';"  


###############################################################
#  npm installation 
###############################################################

cd ../../
npm init -y
npm install grunt-cli grunt -g  
npm install grunt-contrib-connect grunt --save-dev 
cp ./Install/ubuntu18.04/Gruntfile.js  .
rm -rf www-root 
mkdir www-root  
cp ./Install/ubuntu18.04/index.html ./www-root 
grunt connect 


###############################################################
#  Django installation 
###############################################################
conda install django 
django-admin startproject mysite 
cd mysite
python manage.py runserver 





