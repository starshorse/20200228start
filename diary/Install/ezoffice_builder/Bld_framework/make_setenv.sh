#!/bin/bash -i  
input=$1

sudo apt-get install -y git 
sudo apt-get remove vim-tiny 
sudo apt-get install vim-gnome 
sudo apt-get install vim-gtk3 
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim 

cd ../Gen_framework/sys02_linux/ 
./build_exe.sh 
cp ./bin_linux/*  ../../Bld_framework/bin 
cd ../../Bld_framework

PATH_C=$(pwd) 
echo "export PATH=\"$PATH_C/bin:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
. ~/.bashrc

if [ $input = "1" ]
then
    make_e_vimrcexe
else
    make_e_vimrc2exe
fi 
mv .vimrc ~/ 
vim +PluginInstall +qall 

sudo apt-get install -y tmux 
sudo apt-get install -y curl
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

source ~/.bashrc
. ~/.bashrc

nvm install 12.22.1
nvm use 12.22.1 
