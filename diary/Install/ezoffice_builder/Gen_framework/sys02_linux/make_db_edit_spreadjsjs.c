#include <stdio.h>

char *html = " \
angular.module('myDbEditSpreadjs', [])\n\
.controller('myDbEditSpreadjsCtrl',['$scope','restApiServiceDbEdit',function( $scope, restApiServiceDbEdit ){\n\
	$('#ss').wijspread({ sheetCount:2 }) \n\
	var spread = $('#ss').wijspread('spread') \n\
	$scope.spread = spread \n\
	const sheet0 = spread.getSheet(0) \n\
	const sheet1 = spread.getSheet(1) \n\
//	$scope.DbData  \n\
	var  id_index \n\
	var first_c = {'name':'default','displayName':'default','size':120,'formatter':'* ##-#-####','locked':true,'data-type':'int'}\n\
	sheet0.setName('DataSheet')\n\ 
	const cb_f_main = ( res )=>{\n\
		$scope.DbData = res\n\
		sheet0.setDataSource( $scope.DbData ) \n\
		for( var i = 0 ; i < sheet0.getColumnCount() ; i++ ){\n\
                var conText = sheet0.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) \n\
			    if( conText == 'id' )id_index = i \n\
		}\n\
		if( $scope.tbl_name != '' ) $scope.loadHead( $scope.tbl_name ) \n\
		else{\n\
			$scope.retractHead( $scope.DbData[0] ) \n\
			sheet0.bindColumns( $scope.headInfos ) \n\
		}\n\
	}\n\
	$scope.updateSheet = cb_f_main \n\
	$scope.openTbl = ( tbl_name )=>{\n\
		restApiServiceDbEdit.getData( tbl_name, cb_f_main )\n\
	}\n\
	$scope.saveTbl = ( tbl_name )=>{\n\
		restApiServiceDbEdit.postData( tbl_name, $scope.DbData , cb_f_main ) \n\
		$scope.saveHead( tbl_name , $scope.headInfos ) \n\
	}\n\
	$scope.addCol = ( col_name )=>{\n\
		var i = sheet0.getColumnCount()\n\
		sheet0.addColumns( i , 1 ) \n\
		sheet0.bindColumn( i, col_name ) \n\
		first_c.name = col_name , first_c.displayName = col_name\n\
        $scope.headInfos.push( JSON.parse( JSON.stringify( first_c ))) \n\
        sheet0.bindColumns( $scope.headInfos )  \n\
		sheet1.reset() \n\
		sheet1.setDataSource( $scope.headInfos ) \n\
	}\n\
	$scope.addRow = ( rowCount )=>{\n\
		var N = sheet0.getRowCount()\n\
		sheet0.addRows( N , rowCount )\n\
		var j = sheet0.getValue( N -1 , 0 )\n\
		j++\n\
		for( var i= 0  ; i < rowCount   ; i++){\n\
			sheet0.setValue( N+i , 0, j+i )\n\
		}\n\
	}\n\
	$scope.convData = ( textCsv )=>{\n\
		$scope.tbl_name = '' \n\
		$scope.headInfos = '' \n\
		restApiServiceDbEdit.convData( { text: textCsv }, cb_f_main ) \n\
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

