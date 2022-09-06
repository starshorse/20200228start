#include <stdio.h>

char *html = " \
const route = require('express').Router()\n\
const { createTbl , updateTbl } = require('../nosql_config/fdb_json') \n\
const tbl_name ='test.fdb'\n\
var DbData = createTbl( tbl_name ) \n\
\n\
module.exports = ( io, app)=>{\n\
	io.on('connection',( socket )=>{\n\
	     socket.on('getData', ()=>{\n\
		     DbData = createTbl( tbl_name ) \n\
			 socket.emit('getData', DbData ) \n\
		 })\n\
		 socket.on('updateData', ( ent0 )=>{\n\
			 var ent1 = DbData.find((ent)=>ent.id == ent0.id ) \n\
			 Object.assign( ent1, ent0 ) \n\
			 io.sockets.emit('updateData', { socketId: socket.id , ent : ent0 } ) \n\
		 })\n\
\n\
	})\n\
	return route\n\
}\n\
";

int main( int argc, char** argv){
	FILE *pfile = NULL; 
	pfile = fopen("index.js", "w" );
	fputs( html, pfile ); 
	fclose( pfile);
	return 0;
}
