#include <stdio.h>

char *html = " \
angular.module('myDbEditSpreadjs', [])\n\
.controller('myDbEditSpreadjsCtrl',['$scope','restApiServiceDbEdit',function( $scope, restApiServiceDbEdit ){\n\
	$('#ss').wijspread({ sheetCount:2 }) \n\
	var spread = $('#ss').wijspread('spread') \n\
	const sheet0 = spread.getSheet(0) \n\
	$scope.DbData  \n\
	var  id_index \n\
	const cb_f_main = ( res )=>{\n\
		$scope.DbData = res\n\
		sheet0.setDataSource( $scope.DbData ) \n\
		for( var i = 0 ; i < sheet0.getColumnCount() ; i++ ){\n\
                var conText = sheet0.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) \n\
			    if( conText == 'id' )id_index = i \n\
		}\n\
	}\n\
		$scope.openTbl = ( tbl_name )=>{\n\
			restApiServiceDbEdit.getData( tbl_name, cb_f_main )\n\
		}\n\
		$scope.saveTbl = ( tbl_name )=>{\n\
			restApiServiceDbEdit.postData( tbl_name, $scope.DbData , cb_f_main ) \n\
		}\n\
		$scope.addCol = ( col_name )=>{\n\
			var i = sheet0.getColumnCount()\n\
			sheet0.addColumns( i , 1 ) \n\
			sheet0.bindColumn( i, col_name ) \n\
		}\n\
		$scope.addRow = ( rowCount )=>{\n\
			var i = sheet0.getRowCount()\n\
			sheet0.addRows( i, rowCount ) \n\
		}\n\
\n\
}])\n\
.directive('mySpreadjs', function(){\n\
	return {\n\
	restrict: 'E',\n\
	template:`<div id='ss' style='width:100%; height:400px; border:1px solid gray;'></div>`,\n\
	controller:'myDbEditSpreadjsCtrl'\n\
	}\n\
})\n\
";

int main( int argc , char** argv){
	FILE *pfile = NULL ;
	pfile = fopen( "spreadjs.js", "w");
	fputs( html, pfile ); 
	fclose( pfile ); 
}

