#!/bin/bash  

conda deactivate 
sudo apt-get update
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
pip3 install --upgrade youtube-dl

sudo apt install mplayer -y 

# Yout Tube  must watch List download 7 
# youtube-dl -i -f mp4 --yes-playlist 'https://www.youtube.com/playlist?list=PLToIYCLxFb4zoblmjxVpAPj2xfU1bBNFH' 
youtube-dl -i -f mp4 PLToIYCLxFb4zoblmjxVpAPj2xfU1bBNFH 

mplayer . 
