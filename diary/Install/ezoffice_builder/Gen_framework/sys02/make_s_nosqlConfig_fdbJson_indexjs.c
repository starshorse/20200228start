#include <stdio.h>

char *html = " \
const { readFileSync , writeFileSync ,existsSync } = require('fs') \n\
const createTbl = ( tbl_name ) =>{\n\
	if( existsSync( tbl_name ))return JSON.parse( readFileSync( tbl_name , 'utf-8'))\n\
	const first = [{ id:1}]\n\
	writeFileSync( tbl_name, JSON.stringify( first ),'utf-8' )\n\
	return first \n\
}\n\
const updateTbl = ( tbl_name , data_ )=>{\n\
	writeFileSync( tbl_name, JSON.stringify( data_ ), 'utf-8' )\n\
	return data_ \n\
}\n\
module.exports = { createTbl, updateTbl } \n\
";

int main( int argc , char** argv){
	FILE *pfile = NULL ;
	pfile = fopen("index.js", "w"); 
	fputs( html , pfile );
	fclose( pfile ); 
}
