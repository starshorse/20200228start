sudo apt install build-essential npm -y 

DIR="$( cd "$( dirname "$0" )" && pwd -P )"
echo $DIR

cp make_setenv.sh  /home/rrr/workdir/gitdn/20200228start/diary/Install/ezoffice_builder/Bld_framework/
cp make_ez.sh  /home/rrr/workdir/gitdn/20200228start/diary/Install/ezoffice_builder/Bld_framework/
cd /home/rrr/workdir/gitdn/20200228start/diary/Install/ezoffice_builder/Gen_framework/sys02_linux/
bash build_exe.sh 
cp ./bin_linux/* /home/rrr/workdir/gitdn/20200228start/diary/Install/ezoffice_builder/Bld_framework/bin/
cd /home/rrr/workdir/gitdn/20200228start/diary/Install/ezoffice_builder/Bld_framework/ 
chmod +777 *.sh && chmod +777 ./bin/* 
./make_setenv.sh


