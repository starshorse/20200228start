#include <stdio.h>

char *code = " \
const route = require('express').Router()\n\
const { createTbl , updateTbl } = require('../../../nosql_config/fdb_json') \n\
var sheet0_data = createTbl('학원회계')\n\
var sheet1_data = createTbl('학원일정') \n\
module.exports = ( io, app )=>{\n\
       io.on('connection', ( socket )=>{\n\
		   socket.on('getSheet0Data', ()=>{\n\
			   updateTbl('학원회계', sheet0_data )\n\
			   socket.emit('getSheet0Data', sheet0_data ) \n\
		   })\n\
		   socket.on('updateSheet0Entry', ( ent )=>{\n\
			   var ent0 = sheet0_data.find((ent1)=>ent1.id == ent.id ) \n\
			   Object.assign( ent0, ent ) \n\
			   updateTbl('학원회계', sheet0_data )\n\
			   io.sockets.emit('updateSheet0Entry', { socketId : socket.id , ent : ent } ) \n\
		   })\n\
		   socket.on('getSheet1Data', ()=>{\n\
			   updateTbl('학원일정', sheet1_data )\n\
			   socket.emit('getSheet1Data', sheet1_data )\n\
		   })\n\
		   socket.on('updateSheet1Entry', ( ent )=>{\n\
			   var ent0 = sheet1_data.find((ent1)=>ent1.id == ent.id ) \n\
			   Object.assign( ent0, ent ) \n\
			   updateTbl('학원일정', sheet1_data )\n\
			   io.sockets.emit('updateSheet1Entry', { socketId : socket.id , ent : ent } ) \n\
		   })\n\
	   })\n\
	return route\n\
}\n\
" ;
int main( int argc , char** argv ){
	FILE *pfile = NULL;
	pfile = fopen("index.js", "w"); 
	fputs( code , pfile ); 
	fclose( pfile); 
	return 0; 
}

