#!/bin/bash 
cd ../Gen_framework/sys02_linux
sh ./build_exe.sh
cp ./bin_linux/* ../../Bld_framework/bin/
cd ../../Bld_framework
./make_ez.sh $1

