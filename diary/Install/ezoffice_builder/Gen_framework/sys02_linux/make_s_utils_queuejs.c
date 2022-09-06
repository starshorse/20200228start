#include <stdio.h>

char *code = " \
 class Queue{\n\
    constructor(maxNum){\n\
        this.maxNum = maxNum\n\
        this._arr = []\n\
        this.curNum = 0\n\
    }\n\
    enqueue( item ){\n\
        this.curNum++\n\
        this._arr.push( { curNum: this.curNum, data:item } )\n\
        if( this._arr.length > this.maxNum )this.dequeue()\n\
        return this.curNum\n\
    }\n\
    dequeue(){\n\
        this._arr.shift()\n\
    }\n\
    getGap( myNum ){\n\
        return this._arr.filter((ent)=>ent.curNum > myNum )\n\
    }\n\
}\n\
\n\
module.exports = { Queue }\n\
";

int main( int argc, char** argv ){
	FILE *pfile = NULL;
	pfile = fopen( "queue.js", "w" );
	fputs( code, pfile ); 
	fclose( pfile ); 
	return 0;
}


