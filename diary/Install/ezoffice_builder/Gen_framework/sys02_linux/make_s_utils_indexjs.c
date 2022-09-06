#include <stdio.h>

char *code = " \
const url = require('url') , querystring = require('querystring')\n\
const getQuery = ( url_ ) => querystring.parse( ( url.parse( url_)).query )\n\
const { getSQL_insertStmt , getSQL_updateStmt } = require('./sql_stmt')\n\
const { Queue } = require('./queue')\n\
module.exports = { getQuery , getSQL_insertStmt , getSQL_updateStmt , Queue }\n\
";

int main( int argc, char** argv ){
	FILE *pfile = NULL ;
	pfile = fopen("index.js", "w" );
	fputs( code, pfile ); 
	fclose( pfile );
	return 0;
}
