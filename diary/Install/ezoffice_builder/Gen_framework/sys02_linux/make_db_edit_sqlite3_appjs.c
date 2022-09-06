#include <stdio.h>

char *code = " \
angular.module('myDbEditSqlite3',['myApp.rest_api', \n\
	'myDbEditCmdInput', \n\
	'myDbEditSpreadjs'\n\
])\n\
.controller('myDbEditSqlite3Ctrl',['$scope',function($scope){\n\
	$scope.DbData \n\
	$scope.tbl_name =''\n\
	$scope.addCol \n\
	$scope.addRow\n\
	$scope.openTbl\n\
	$scope.saveTbl\n\
	$scope.updateSheet \n\
	const socket = io()\n\
	socket.on('lsSqlite3', ( data )=>{\n\
		$scope.updateSheet( data ) \n\
	})\n\
	$scope.extendCmdOpts = ( cmdOpts )=>{\n\
		switch( cmdOpts[0]){\n\
			case 'saveTbl_db':\n\
				socket.emit('putSqlite3', { tbl_name:$scope.tbl_name, data: $scope.DbData } ) \n\
				break; \n\
			case 'delTbl_db':\n\
				socket.emit('delSqlite3', { tbl_name:cmdOpts[1] }) \n\
				break;\n\
			case 'listTbl_db':\n\
				socket.emit('lsSqlite3', {})\n\
				break;\n\
			case 'setTbl_name':\n\
				$scope.tbl_name = cmdOpts[1]\n\
				break;\n\
			default:\n\
		}\n\
	}\n\
}])\n\
" ;

int main( int argc , char** argv){
	FILE *pfile = NULL;
	pfile = fopen("app.js", "w" );
	fputs( code, pfile );
	fclose( pfile );
	return 0;
}
