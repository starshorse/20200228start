#!/bin/bash
#
# 1 – Import the public repository GPG keys
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
# 2 – Register the Repository
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list)"

# 3 – Install SQL Server
sudo apt-get update
sudo apt-get install -y mssql-server

# 4 – Run Setup
sudo /opt/mssql/bin/mssql-conf setup
# 5 – Verify
systemctl status mssql-server --no-pager

# Install SQL Server Command-Line Tools

sudo apt install curl
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list

sudo apt-get update
sudo apt-get install mssql-tools unixodbc-dev

# Add to PATH
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc

# Connect to SQL Server
sqlcmd -S localhost -U SA -P '<YourPassword>'
