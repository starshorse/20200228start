#include <stdio.h>

char *html = " \
const { readFileSync , writeFileSync ,existsSync } = require('fs') \n\
const createTbl = ( tbl_name ) =>{\n\
	if( existsSync( tbl_name ))return JSON.parse( readFileSync( tbl_name , 'utf-8'))\n\
	var _fileExt = tbl_name.substring( tbl_name.lastIndexOf('.'), tbl_name.length ).toLowerCase() \n\
	var first_c = [{ id:1}]\n\
	switch( _fileExt ){\n\
		case '.hdr':\n\
	first_c = [{'name':'id','displayName':'ID','size':70,'formatter':'* ##-#-####','locked':true,'data-type':'int'}]\n\
			break\n\
		default:\n\
\n\
	}\n\
		writeFileSync( tbl_name, JSON.stringify( first_c ),'utf-8' )\n\
		return first_c \n\
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
