#! /bin/bash 

sudo apt install curl gnupg2 ca-certificates lsb-release -y

# mainline 버전의 nginx packages 설치시
sudo echo "deb http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" \
| sudo tee /etc/apt/sources.list.d/nginx.list

# stable 버전의 nginx packages 설치시
# ubuntu$ echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
# | sudo tee /etc/apt/sources.list.d/nginx.list

sudo curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
sudo apt install nginx

cd /etc/nginx
cat nginx.conf | grep conf

sudo vim nginx.conf
sudo systemctl reload nginx
