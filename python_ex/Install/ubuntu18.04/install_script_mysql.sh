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

