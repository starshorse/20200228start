#!/bin/bash
ezoffice_path="/home/rrr/workdir/gitdn/20200228start/diary/Install/ezoffice_builder/"
ezoffice_install_path="/home/rrr/workdir/gitdn/20200228start/diary/Install/ubunt_16_04/3.jupiter/"
cd ../../
mkdir ezoffice_output
cd ezoffice_output
# force exit if no argement for project name 
if [ $# -eq 0 ]
  then
    echo "No arguments supplied , will halt!"
	exit 1
fi
mkdir $1 
cd $1
make_s_appjsexe
mkdir server |  mkdir app
cd server
mkdir ezworks | mkdir db_edit | mkdir nosql_config | mkdir utils | mkdir db_config 
cd ezworks && make_s_ezworks_indexjsexe 
mkdir sub_app && cd sub_app && mkdir institute && cd institute 
s_institute_indexjsexe
cd ../../../
cd db_edit 
make_s_db_edit_indexjsexe 
read -t 5 -p "wait 5 sec !"
mkdir sqlite3 && cd sqlite3 && make_s_db_edit_sqlite3_indexjsexe 
cd ../../ 
cd db_config && make_s_db_config_json2sqlite3jsexe && make_s_db_config_json2sqlite3_specjsexe 
mkdir sqlite3 && cd sqlite3 && make_s_db_config_sqlite3jsexe && cd ../../
cd utils 
make_s_utils_indexjsexe | make_s_utils_queuejsexe | make_s_utils_sql_stmtjsexe 
cd ..
cd nosql_config && mkdir fdb_json && cd fdb_json && make_s_nosqlConfig_fdbJson_indexjsexe && cd ../../../
# npm run copy-libs 
cd app
mkdir lib 
mkdir rest_api | mkdir ezworks | mkdir db_edit 
cd ezworks && make_ezworks_appjsexe && make_ezworks_htmlexe 
mkdir sub_app && cd sub_app && mkdir institute && cd institute
institute_appjsexe | institute_indexhtmlexe | institute_sheet0jsexe | institute_sheet1jsexe
mkdir mobile && cd mobile 
institute_mobile_appjsexe | institute_mobile_indexhtmlexe 
cd ../../../../
cd rest_api && make_rest_api_servicejsexe && cd ..
cd db_edit  
make_cmdinput_htmlexe | make_db_edit_htmlexe | make_db_edit_appjsexe | make_db_edit_spreadjsjsexe | make_db_edit_eventsjsexe | make_db_edit_sheet1jsexe 
mkdir sqlite3 && cd sqlite3 && make_db_edit_sqlite3_appjsexe && make_db_edit_sqlite3_indexhtmlexe && cd ../../
cd ..
../../ezoffice_builder/Bld_framework/make_appBuynsell.sh

shell_path=`pwd -P` 
cp_data.sh ${shell_path} 
# make_s_packageJsonexe 
cp ${ezoffice_install_path}package.json .
npm i sqlite3 
npm i 
npm run startDev 







