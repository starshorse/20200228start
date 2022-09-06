#include <stdio.h>

char *code = " \
const route = require('express').Router()\n\
const { json2createTbl , json2insertData } = require('../../db_config/json2sqlite3') \n\
const { execSync_sqlite3, queryAll_sqlite3 } = require('../../db_config/sqlite3') \n\
\n\
module.exports = ( io, app )=>{\n\
  io.on('connection', ( socket )=>{\n\
	  socket.on('putSqlite3', async( data )=>{\n\
		  const tbl_name = data.tbl_name.replace('.','_')\n\
		  await json2createTbl( tbl_name, data.data[0] ) \n\
		  for( const item of data.data ){\n\
			  await json2insertData( tbl_name, item ) \n\
		  }\n\
	  })\n\
	  socket.on('delSqlite3', async( data )=>{\n\
		  const tbl_name = data.tbl_name \n\
		  await execSync_sqlite3(`drop table ${tbl_name}`) \n\
	  })\n\
	  socket.on('lsSqlite3', ( data )=>{\n\
		 const stmt = `select name from sqlite_master where type='table' AND name NOT LIKE 'sqlite_%'`\n\
		 queryAll_sqlite3( stmt , ( res )=>{\n\
			 socket.emit('lsSqlite3', res ) \n\
		 })\n\
	  })\n\
  })\n\
  return route\n\
}\n\
" ;
int main( int argc, char** argv){
	FILE *pfile = NULL;
	pfile = fopen("index.js", "w");
	fputs( code, pfile );
	fclose( pfile );
	return 0; 
}



