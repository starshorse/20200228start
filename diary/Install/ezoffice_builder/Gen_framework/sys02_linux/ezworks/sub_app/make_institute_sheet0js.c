#include <stdio.h>
char *code = " \
angular.module('myInstituteSheet0',[])\n\
.controller('myInstituteSheet0Ctrl',['$scope','$timeout', function($scope, $timeout){\n\
	const sheetNum = 0 \n\
	const tbl_name = '학원회계'\n\
	const sheet0 = $scope.spread.sheets[sheetNum]\n\
	var sheet0_data , id_index \n\
	sheet0.setName( tbl_name ) \n\
	const socket = io()\n\
	socket.on('getSheet0Data', (res)=>{\n\
		sheet0_data = res\n\
	    sheet0.setDataSource( sheet0_data )\n\
		for( var i = 0; i < sheet0.getColumnCount() ; i++ ){\n\
			var conText = sheet0.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) \n\
			if( conText == 'id' ) id_index =  i \n\
		}\n\
	})\n\
	socket.on('updateSheet0Entry', (res)=>{\n\
		if( socket.id != res.socketId ){\n\
			var ent0 = sheet0_data.find(( ent)=> ent.id == res.ent.id )\n\
			$scope.spread.isPaintSuspended(true) \n\
			Object.assign( ent0, res.ent ) \n\
			$scope.spread.isPaintSuspended(false) \n\
		}\n\
	})\n\
	sheet0.bind( $.wijmo.wijspread.Events.EditEnd , ( sender, args )=>{\n\
		const id = sheet0.getValue( args.row, id_index ) \n\
        $timeout(()=>{\n\
			const ent0 = sheet0_data.find((ent)=>ent.id == id )\n\
			socket.emit('updateSheet0Entry', ent0 ) \n\
		}, 1000)\n\
	})\n\
	socket.emit('getSheet0Data',{}) \n\
}])\n\
.directive('mySheet0', function(){\n\
     return {\n\
		 restrict: 'E',\n\
		 template:'<div></div>',\n\
		 controller:'myInstituteSheet0Ctrl'\n\
	 }\n\
})\n\
" ;
int main( int argc, char** argv){
	FILE *pfile = NULL;
	pfile = fopen("sheet0.js","w");
	fputs(code,pfile);
	fclose(pfile);
	return 0; 
}
