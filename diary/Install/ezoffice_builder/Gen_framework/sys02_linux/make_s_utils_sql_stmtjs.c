#include <stdio.h>

char *code = " \
const getSQL_insertStmt = ( jObj , addText='' )=>{\n\
    const clist = Object.keys( jObj ), vlist = Object.values( jObj )\n\
    var c_list = clist.join(` ${addText} ,`).concat(` ${addText}`).replace(/[\\/-]/gi,'_') \n\
    var v_list = `'` + vlist.join(`','`).concat(`'`).replace(/[\\/-]/gi,'_') \n\
    return { c_list , v_list }\n\
}\n\
const getSQL_updateStmt = ( jObj )=>{\n\
    var set_list = ''\n\
    for( item in jObj ){\n\
        set_list += ` ${item} = '${jObj[item]}',`\n\
    }\n\
    set_list.slice(0,-1).replace(/[\\/-]/gi,'_') \n\
    return { set_list }\n\
}\n\
module.exports = { getSQL_insertStmt, getSQL_updateStmt }\n\
" ;

int main( int argc, char **argv ){
     FILE *pfile = NULL;
     pfile = fopen("sql_stmt.js","w");
	 fputs( code, pfile ); 
	 fclose( pfile );
	 return 0;
}
    
