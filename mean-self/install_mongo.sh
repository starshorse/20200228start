#! /bin/bash
# add key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
# add library repo to repo list
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
# update repos
sudo apt-get update
# install mongodb
sudo apt-get install -y mongodb-org

