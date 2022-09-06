#include <stdio.h> 

char *code = " \
const sqlite3 = require('sqlite3').verbose() \n\
const { promisify } = require('util') \n\
var db = new sqlite3.Database('sargonI.db')\n\
const query_sync = promisify( db.all ).bind( db ) \n\
const exec_sync = promisify( db.run).bind( db ) \n\
const exec_sqlite3 = ( stmt )=>db.run( stmt ) \n\
const execSync_sqlite3 = async( stmt )=>{\n\
	await exec_sync( stmt ) \n\
}\n\
const queryAll_sqlite3 = ( stmt, cb_f  )=>{\n\
       db.all( stmt , (err, rows )=>{\n\
		   if(err) throw err\n\
		   cb_f( rows )\n\
	   } ) \n\
}\n\
const queryAllSync_sqlite3 = async ( stmt )=>{\n\
	return await query_sync( stmt ) \n\
}\n\
module.exports = { exec_sqlite3 , queryAll_sqlite3, execSync_sqlite3, queryAllSync_sqlite3 } \n\
" ;

int main( int argc , char** argv ){
	FILE *pfile = NULL ;
	pfile = fopen("index.js","w" );
	fputs( code, pfile ); 
	fclose( pfile );
	return 0;
}

