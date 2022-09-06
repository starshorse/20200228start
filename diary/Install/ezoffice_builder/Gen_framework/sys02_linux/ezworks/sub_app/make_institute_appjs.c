#include <stdio.h>
char *code = " \
angular.module('myInstitute',['myInstituteSpread',\n\
	'myInstituteSheet0',\n\
	'myInstituteSheet1'\n\
])\n\
.controller('myInstituteCtrl', ['$scope', function($scope){\n\
	$scope.spread \n\
	$scope.sheets =[{ sheet : null },\n\
	  	{ sheet :null }] \n\
	$scope.sheetCount = 2 \n\
	const socket = io()\n\
	socket.on('getData',( data )=>{\n\
	})\n\
}])\n\
angular.module('myInstituteSpread',[])\n\
.controller('myInstituteSpreadCtrl', ['$scope', function($scope){\n\
	$('#ss').wijspread({ sheetCount:$scope.sheetCount })\n\
	$scope.spread = $('#ss').wijspread('spread')\n\
	$scope.sheets[0].sheet = $scope.spread.getSheet(0) \n\
	$scope.sheets[1].sheet = $scope.spread.getSheet(1) \n\
}])\n\
.directive('mySpreadjs', function(){\n\
    return {\n\
		restrict :'E' ,\n\
		template :`<div id='ss' style='width:100%;height:400px;border:1px solid gray;'></div>`,\n\
		controller :'myInstituteSpreadCtrl'\n\
	}\n\
})\n\
" ;
int main( int argc, char** argv ){
	FILE *pfile = NULL; 
	pfile = fopen("app.js","w");
	fputs(code,pfile); 
	fclose(pfile);
	return 0; 
}
			  
