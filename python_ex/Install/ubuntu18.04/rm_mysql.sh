sudo apt-get purge mysql-server
sudo apt-get purge mysql-common

sudo rm -rf /etc/mysql /var/lib/mysql
sudo rm -rf /var/log/mysql
sudo rm -rf /var/log/mysql.*
sudo rm /var/lib/dpkg/info/*
sudo apt-get autoremove
sudo apt-get autoclean
# 재설치

sudo apt-get install mysql-server --fix-missing --fix-broken
