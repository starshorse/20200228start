#include <stdio.h>

char *code = "\ 
const { execSync_sqlite3 } = require('./sqlite3')\n\
const { getSQL_insertStmt , getSQL_updateStmt } = require('../utils')\n\
const json2createTbl = async ( tbl_name , jObj )=>{\n\
	const { c_list } = getSQL_insertStmt( jObj, 'TEXT' )\n\
	const stmt = ` create table if not exists ${ tbl_name }( idx integer NOT NULL primary key autoincrement, ${ c_list} )` \n\
    await execSync_sqlite3( stmt ) \n\
}\n\
const json2insertData = async ( tbl_name , jObj )=>{\n\
	const { set_list } = getSQL_updateStmt( jObj ) \n\
	const { c_list , v_list } = getSQL_insertStmt( jObj )\n\
//	console.log( set_list )\n\
	const stmt = ` insert into ${tbl_name}( ${ c_list } ) values( ${ v_list }) `\n\
	console.log( stmt )\n\
	await execSync_sqlite3( stmt ) \n\
}\n\
module.exports = { json2createTbl, json2insertData } \n\
";

int main( int argc , char** argv ){
    FILE *pfile = NULL ; 
	pfile = fopen("json2sqlite3.js","w");
	fputs( code , pfile ); 
	fclose( pfile ); 
	return 0; 
}
