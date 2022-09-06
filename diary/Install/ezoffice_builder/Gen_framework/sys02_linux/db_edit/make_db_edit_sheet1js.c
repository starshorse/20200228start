#include <stdio.h>

char *code = " \
angular.module('myDbEditSheet1',[])\n\
.controller('myDbEditSheet1Ctrl',['$scope','restApiServiceDbEdit', function( $scope, restApiServiceDbEdit ){\n\
	const sheet1 = $scope.spread.getSheet(1)\n\
	const sheet0 = $scope.spread.getSheet(0)\n\
	sheet1.setName('Format') \n\
	const defaultHInfo = { name: '', displayName: '', formatter: '', size: 120, resizable: false , visible: true }\n\
	$scope.retractHead = ( DbData_1 )=>{\n\
         const headers = Object.keys( DbData_1 ) \n\
		 $scope.headInfos = [] \n\
		 for( idx in headers ){\n\
			var newHeader = JSON.parse( JSON.stringify( defaultHInfo )) \n\
			newHeader.name = newHeader.displayName = headers[idx] \n\
			$scope.headInfos.push( newHeader ) \n\
		 }\n\
		 sheet1.setDataSource( $scope.headInfos ) \n\
		 sheet0.bindColumns( $scope.headInfos ) \n\
		 return $scope.headInfos\n\
	}\n\
	const cb_f_sheet1 = ( headInfos )=>{\n\
		$scope.headInfos = headInfos \n\
		sheet0.bindColumns( headInfos ) \n\
		sheet1.setDataSource( $scope.headInfos ) \n\
	}\n\
	$scope.loadHead = ( tbl_name )=>{\n\
		tbl_name = tbl_name + '.hdr'\n\
		restApiServiceDbEdit.getData( tbl_name, cb_f_sheet1 ) \n\
	}\n\
	$scope.saveHead = ( tbl_name , headData )=>{\n\
		tbl_name = tbl_name + '.hdr'\n\
		restApiServiceDbEdit.postData( tbl_name, headData, cb_f_sheet1 ) \n\
	}\n\
}])\n\
.directive('mySheet1', function(){\n\
    return {\n\
		restrict: 'E',\n\
		controller:'myDbEditSheet1Ctrl' \n\
	}\n\
})\n\
" ;
int main( int argc, char** argv ){
	FILE *pFile = NULL;
	pFile = fopen("sheet1.js","w");
	fputs( code, pFile );
	fclose( pFile );
	return 0; 
}
