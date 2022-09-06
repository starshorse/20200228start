#include <stdio.h>

char *html = " \
const route = require('express').Router()\n\
const { createTbl , updateTbl } = require('../nosql_config/fdb_json')\n\
const csvtojson = require('csvtojson') \n\
\n\
module.exports = ( io, app )=>{\n\
\n\
route.get('/data/:tbl_name', (req, res)=>{\n\
    const tbl_name = req.params.tbl_name\n\
    res.json( createTbl( tbl_name ))\n\
\n\
})\n\
route.post('/data/conv2json', ( req, res )=>{\n\
	console.log( req.body.text ) \n\
	csvtojson().fromString( req.body.text ).then(( jsonObj )=>{\n\
//		console.log( jsonObj )\n\
		res.json( jsonObj ) \n\
	})\n\
})\n\
route.post('/data/:tbl_name', (req, res)=>{\n\
    const tbl_name = req.params.tbl_name\n\
    updateTbl( tbl_name, req.body )\n\
    const new_tbl = createTbl( tbl_name )\n\
    io.sockets.emit('getData', new_tbl )\n\
    res.json( new_tbl)\n\
})\n\
// module.exports = route\n\
    return route\n\
}\n\
";

int main( int argc , char** argv){
	FILE *pfile = NULL ;
	pfile = fopen("index.js", "w" );
	fputs( html, pfile ); 
	fclose( pfile ); 
}

