#include <stdio.h>

char *html = " \
angular.module('myDbEdit', ['myApp.rest_api',\n\
	'myDbEditCmdInput',\n\
	'myDbEditSpreadjs',\n\
	'myDbEditSheet1', \n\
	'myDbEditEvents'\n\
])\n\
.controller('myDbEditCtrl', ['$scope', function($scope){\n\
	$scope.DbData	\n\
	$scope.tbl_name =''\n\
	$scope.addCol \n\
	$scope.addRow \n\
	$scope.openTbl \n\
	$scope.saveTbl\n\
	$scope.extendCmdOpts = ( cmdOpts )=>{} \n\
	$scope.convData  \n\
	$scope.spread\n\
	$scope.retractHead \n\
	$scope.loadHead \n\
	$scope.saveHead\n\
	$scope.headInfos\n\
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
			case 'genHead':\n\
				$scope.retractHead( $scope.DbData[0]) \n\
				break;\n\
			case 'setTbl_name':\n\
				$scope.tbl_name = cmdOpts[1]\n\
				break;\n\
			default:	\n\
			    $scope.extendCmdOpts( cmdOpts ) \n\
		}\n\
	}\n\
    $scope.readFile = (obj) => {\n\
           const files = obj.files\n\
           const file = files[0]\n\
           var reader = new FileReader()\n\
           reader.onload = function(event) {\n\
             console.log(event.target.result)\n\
			 $scope.convData( event.target.result )   \n\
           }\n\
           reader.readAsText(file)\n\
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
