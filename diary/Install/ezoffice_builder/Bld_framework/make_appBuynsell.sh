#!/bin/bash
baseDir="../../ezoffice_builder/Bld_framework/codeTree/"
cp -r  ${baseDir}ezworks/server/ezworks/sub_app/buynsell   ./server/ezworks/sub_app  
#cp -r  ${baseDir}ezworks/app/ezworks/sub_app/buynsell_fdb   ./app/ezworks/sub_app  
#cp -r  ${baseDir}ezworks/app/ezworks/sub_app/buynsell_v01   ./app/ezworks/sub_app  
#cp -r  ${baseDir}ezworks/app/ezworks/sub_app/buynsell      ./app/ezworks/sub_app
cp -r  ${baseDir}ezworks/app/ezworks/*     ./app/ezworks/
cp -r  ${baseDir}ezworks/app/lib/*         ./app/lib
cp -r  ${baseDir}ezworks/app/apps          ./app/
cp -r  ${baseDir}ezworks/app.js            ./
cp -r  ${baseDir}ezworks/package.json      ./

if [ -d "./app/utls" ]
then	
	cp -r  ${baseDir}ezworks/app/utils/*      ./app/utils
else
	mkdir ./app/utils
	cp -r  ${baseDir}ezworks/app/utils/*      ./app/utils
fi
