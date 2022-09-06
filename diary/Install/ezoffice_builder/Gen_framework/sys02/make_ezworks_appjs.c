#include <stdio.h>

char* html = " \
angular.module('myEzworks', ['myApp.rest_api',\n\
	'myEzworksSpreadjs'\n\
])\n\
.controller('myEzworksCtrl',['$scope',function( $scope){\n\
	$scope.getData\n\
	$scope.updateData\n\
	const socket = io()\n\
	socket.on('getData', ( data_ )=>{\n\
		$scope.getData( data_ )\n\
	})\n\
	socket.on('updateData',( data_)=>{\n\
		if( data_.socketId != socket.id )\n\
			$scope.updateData( data_.ent )\n\
	})\n\
	$scope.updateData_req = ( ent0 )=>{\n\
		socket.emit('updateData', ent0 )\n\
	}\n\
	socket.emit('getData',{})\n\
}])\n\
angular.module('myEzworksSpreadjs',[])\n\
.service('restApiServiceEzworks',['restApiService',function( restApiService ){\n\
}])\n\
.controller('myEzworksSpreadjsCtrl', ['$timeout','$scope','restApiServiceEzworks', function( $timeout, $scope, restApiServiceEzworks ){\n\
	$('#ss').wijspread({ sheetCount: 2})\n\
	var spread = $('#ss').wijspread('spread')\n\
    const sheet0 = spread.getSheet(0)\n\
	var DbData , id_index\n\
	sheet0.bind( $.wijmo.wijspread.Events.EditEnd, ( sender, args )=>{\n\
		const id  = sheet0.getValue( args.row, id_index )\n\
		$timeout( ()=>{\n\
			var ent0 = DbData.find((ent)=>ent.id == id )\n\
			$scope.updateData_req( ent0 )\n\
		}, 1000 )\n\
\n\
	})\n\
	$scope.getData = ( data_ ) =>{\n\
		DbData = data_\n\
		sheet0.setDataSource( DbData )\n\
		for( var i =0 ; i< sheet0.getColumnCount(); i++ ){\n\
			var conText = sheet0.getValue( 0, i ,$.wijmo.wijspread.SheetArea.colHeader )\n\
			if( conText == 'id') id_index = i\n\
\n\
		}\n\
	}\n\
	$scope.updateData = ( ent0 )=>{\n\
		var ent1 = DbData.find((ent)=>ent.id == ent0.id )\n\
		spread.isPaintSuspended( true )\n\
		Object.assign( ent1 , ent0 )\n\
		spread.isPaintSuspended( false )\n\
	}\n\
}])\n\
.directive('mySpreadjs', function(){\n\
   return {\n\
	   restrict: 'E',\n\
	   template:`<div id='ss' style='width:100%; height:400px; border:1px solid gray;'></div>` ,\n\
	   controller:'myEzworksSpreadjsCtrl'\n\
   }\n\
})\n\
" ;
int main( int argc , char** argv ){
	FILE *pfile = NULL ;
	pfile = fopen("app.js", "w" );
    fputs( html, pfile ); 
	fclose( pfile ); 
}
