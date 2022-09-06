#include <stdio.h> 

char *code = " \
describe('test json2sqlite3' , ()=>{\n\
	it('json2sqlite3 task', async ()=>{\n\
		const { createTbl } = require('../nosql_config/fdb_json') \n\
		const { json2createTbl , json2insertData } = require('./json2sqlite3.js')\n\
//        console.log( createTbl('test01.fdb')) \n\
		const  jsonData = createTbl('test01.fdb')\n\
		await json2createTbl('delicious', jsonData[0] ) \n\
		for( const item of jsonData ){\n\
			await json2insertData('delicious', item ) \n\
		}\n\
\n\
	})\n\
})\n\
";

int main(int argc , char** argv){
	FILE *pfile = NULL;
	pfile = fopen("json2sqlite3.spec.js","w");
	fputs( code, pfile );
	fclose( pfile );
	return 0; 
}


