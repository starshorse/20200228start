#include <stdio.h>

char *html = " \
const route = require('express').Router()\n\
const { createTbl , updateTbl } = require('../nosql_config/fdb_json')\n\
\n\
route.get('/data/:tbl_name', (req, res)=>{\n\
	const tbl_name = req.params.tbl_name\n\
	res.json( createTbl( tbl_name )) \n\
\n\
})\n\
route.post('/data/:tbl_name', (req, res)=>{\n\
	const tbl_name = req.params.tbl_name\n\
	res.json( updateTbl( tbl_name, req.body )) \n\
})\n\
module.exports = route \n\
";

int main( int argc , char** argv){
	FILE *pfile = NULL ;
	pfile = fopen("index.js", "w" );
	fputs( html, pfile ); 
	fclose( pfile ); 
}

