#!/bin/bash

git clone https://github.com/ArduCAM/PCA9685.git
cd PCA9685/
make
sudo ./RunServoDem
