#!/bin/bash
compile="gcc -Wall -o "
bin="./bin_linux/"
sub_app="./ezworks/sub_app/"
db_edit="./db_edit/"
environment="./environment/"

${compile}${bin}make_cmdinput_htmlexe make_cmdinput_html.c 
${compile}${bin}make_db_edit_appjsexe make_db_edit_appjs.c 
${compile}${bin}make_db_edit_htmlexe make_db_edit_html.c 
${compile}${bin}make_db_edit_spreadjsjsexe make_db_edit_spreadjsjs.c
${compile}${bin}make_db_edit_sqlite3_appjsexe make_db_edit_sqlite3_appjs.c
${compile}${bin}make_db_edit_sqlite3_indexhtmlexe make_db_edit_sqlite3_indexhtml.c
${compile}${bin}make_ezworks_appjsexe make_ezworks_appjs.c
${compile}${bin}make_ezworks_htmlexe make_ezworks_html.c
${compile}${bin}make_rest_api_servicejsexe make_rest_api_servicejs.c 
${compile}${bin}make_s_appjsexe make_s_appjs.c
${compile}${bin}make_s_db_edit_indexjsexe make_s_db_edit_indexjs.c 
${compile}${bin}make_s_ezworks_indexjsexe make_s_ezworks_indexjs.c 
${compile}${bin}make_s_nosqlConfig_fdbJson_indexjsexe make_s_nosqlConfig_fdbJson_indexjs.c 
${compile}${bin}make_s_packageJsonexe make_s_packageJson.c  
${compile}${bin}make_s_utils_sql_stmtjsexe make_s_utils_sql_stmtjs.c  
${compile}${bin}make_s_utils_queuejsexe make_s_utils_queuejs.c  
${compile}${bin}make_s_utils_indexjsexe make_s_utils_indexjs.c  
${compile}${bin}make_s_db_config_sqlite3jsexe make_s_db_config_sqlite3js.c
${compile}${bin}make_s_db_config_json2sqlite3jsexe make_s_db_config_json2sqlite3js.c 
${compile}${bin}make_s_db_config_json2sqlite3_specjsexe make_s_db_config_json2sqlite3_specjs.c
${compile}${bin}make_s_db_edit_sqlite3_indexjsexe make_s_db_edit_sqlite3_indexjs.c 
${compile}${bin}s_institute_indexjsexe ${sub_app}make_s_institute_indexjs.c
${compile}${bin}institute_appjsexe ${sub_app}make_institute_appjs.c
${compile}${bin}institute_indexhtmlexe ${sub_app}make_institute_indexhtml.c
${compile}${bin}institute_sheet0jsexe ${sub_app}make_institute_sheet0js.c
${compile}${bin}institute_sheet1jsexe ${sub_app}make_institute_sheet1js.c
${compile}${bin}institute_mobile_appjsexe ${sub_app}make_institute_mobile_appjs.c
${compile}${bin}institute_mobile_dragDropjsexe ${sub_app}make_institute_mobile_drapDropjs.c
${compile}${bin}institute_mobile_indexhtmlexe ${sub_app}make_institute_mobile_indexhtml.c
${compile}${bin}s_sheet0Dataexe ${sub_app}make_s_sheet0Data.c
${compile}${bin}s_sheet1Dataexe ${sub_app}make_s_sheet1Data.c
${compile}${bin}make_db_edit_eventsjsexe ${db_edit}make_db_edit_eventsjs.c
${compile}${bin}make_db_edit_sheet1jsexe ${db_edit}make_db_edit_sheet1js.c
${compile}${bin}make_e_vimrcexe ${environment}make_e_vimrc.c
${compile}${bin}make_e_vimrc2exe ${environment}make_e_vimrc2.c
