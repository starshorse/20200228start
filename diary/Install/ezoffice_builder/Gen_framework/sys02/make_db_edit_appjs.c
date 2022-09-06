#include <stdio.h>

char *html = " \
angular.module('myDbEdit', ['myApp.rest_api',\n\
	'myDbEditCmdInput',\n\
	'myDbEditSpreadjs'\n\
])\n\
.controller('myDbEditCtrl', ['$scope', function($scope){\n\
	$scope.tbl_name =''\n\
	$scope.addCol \n\
	$scope.addRow \n\
	$scope.openTbl \n\
	$scope.saveTbl\n\
}])\n\
angular.module('myDbEditCmdInput', [])\n\
.controller('myDbEditCmdInputCtrl', ['$scope', function( $scope ){\n\
	$scope.cmdInput = 'open test.fdb' \n\
	$scope.execCmd = ()=>{\n\
        var cmdOpts = $scope.cmdInput.split(' ')\n\
		switch( cmdOpts[0] ){\n\
			case 'open':\n\
				$scope.openTbl( cmdOpts[1] )\n\
				$scope.tbl_name = cmdOpts[1]\n\
				break;\n\
			case 'save':\n\
				$scope.saveTbl( $scope.tbl_name )\n\
				break;\n\
			case 'addCol':\n\
				$scope.addCol( cmdOpts[1] )\n\
				break;\n\
			case 'addRow':\n\
				$scope.addRow( parseInt( cmdOpts[1] )) \n\
				break;\n\
			default:	\n\
		}\n\
	}\n\
}])\n\
.directive('cmdInput', function(){\n\
	return {\n\
		restrict: 'E',\n\
		templateUrl: '/db_edit/cmdinput.html',\n\
		controller:'myDbEditCmdInputCtrl'\n\
	}\n\
})\n\
	";
int main( int argc , char** argv ){
	FILE *pfile = NULL ;
	pfile = fopen( "app.js", "w");
	fputs( html, pfile );
	fclose( pfile ); 
}
