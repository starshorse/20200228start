#include <stdio.h>
char *html = " \
 <DIV class='justify-content-center'>                                                                \n\
	<DIV><h3>TBL name: {{ tbl_name }} </h3></DIV>                                                    \n\
	<form>                                                                                           \n\ 
	<DIV class='form-group row'>                                                                     \n\
		<label for='cmdInput' class='text-right col-md-2'>CmdInput</label>                           \n\
        <input type='TEXT' class='col-md-4 form-control' id='cmdInput' ng-model='cmdInput'>          \n\
		<button class='btn btn-primary col-md-4 form-control' ng-click='execCmd()'>ExecCmd</button>  \n\
		</DIV>                                                                                       \n\
    </form>                                                                                          \n\ 
	</DIV> ";

int main( int argc , char** argv ){
	FILE *pfile ;
	pfile = fopen( "cmdinput.html", "w" );
	fputs( html , pfile );
	fclose( pfile );
}

