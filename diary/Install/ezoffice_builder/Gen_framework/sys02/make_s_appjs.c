#include <stdio.h>

char *html = " \
const http = require('http') \n\
const express = require('express')\n\
const path = require('path')\n\
// const routeUser = require('./server/user') \n\
const logger = require('morgan') \n\
var app = express()\n\
	app.use(logger())\n\
	app.use( express.json())\n\
	app.use( express.urlencoded({ extended: true } ) )\n\
	app.use( express.static( path.join( __dirname , 'app' ))) \n\
//	app.use('/user',routeUser ) \n\
	const server = http.createServer(app)\n\
	const io = require('socket.io')(server ) \n\
	const routeEzworks = require('./server/ezworks')( io, app ) \n\
	const routeDbEdit = require('./server/db_edit') \n\
	app.use('/ezworks',routeEzworks ) \n\
	app.use('/db_edit',routeDbEdit )\n\
	server.listen(3000) \n\
	";
int main( int argc, char** argv){
	FILE *pfile =NULL;
	pfile = fopen("app.js", "w" );
	fputs( html, pfile );
	fclose(pfile);
		return 0; 
}
