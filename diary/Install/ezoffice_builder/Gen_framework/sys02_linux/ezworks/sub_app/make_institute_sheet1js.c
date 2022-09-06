#include <stdio.h>
char *code = "\
angular.module('myInstituteSheet1',[])\n\
.controller('myInstituteSheet1Ctrl',['$scope','$timeout', function($scope,$timeout){\n\
	const sheetNum = 1 \n\
	const tbl_name = '학원일정'\n\
	const sheet1 = $scope.spread.sheets[sheetNum]\n\
	var sheet1_data , id_index\n\
	sheet1.setName( tbl_name ) \n\
	const socket = io()\n\
	socket.on('getSheet1Data', (res)=>{\n\
		sheet1_data = res\n\
	    sheet1.setDataSource( sheet1_data )\n\
		for( var i = 0; i < sheet1.getColumnCount() ; i++ ){\n\
			var conText = sheet1.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) \n\
			if( conText == 'id' ) id_index =  i \n\
		}\n\
	})\n\
	socket.on('updateSheet1Entry', (res)=>{\n\
		if( socket.id != res.socketId ){\n\
			var ent0 = sheet1_data.find(( ent)=> ent.id == res.ent.id )\n\
			$scope.spread.isPaintSuspended(true) \n\
			Object.assign( ent0, res.ent ) \n\
			$scope.spread.isPaintSuspended(false) \n\
		}\n\
	})\n\
	sheet1.bind( $.wijmo.wijspread.Events.EditEnd , ( sender, args )=>{\n\
		const id = sheet1.getValue( args.row, id_index ) \n\
        $timeout(()=>{\n\
			const ent0 = sheet1_data.find((ent)=>ent.id == id )\n\
			socket.emit('updateSheet1Entry', ent0 ) \n\
		}, 1000)\n\
	})\n\
	const del_ft = ()=>{\n\
		const row = sheet1.getActiveRowIndex() \n\
		const col = sheet1.getActiveColumnIndex() \n\
		sheet1.setValue( row, col, '')\n\
		const id = sheet1.getValue( row, id_index ) \n\
        $timeout(()=>{\n\
			const ent0 = sheet1_data.find((ent)=>ent.id == id )\n\
			socket.emit('updateSheet1Entry', ent0 ) \n\
		}, 1000)\n\
	}\n\
	sheet1.addKeyMap($.wijmo.wijspread.Key.del , false, false,false, del_ft ) \n\
	socket.emit('getSheet1Data',{}) \n\
}])\n\
.directive('mySheet1', function(){\n\
     return {\n\
		 restrict: 'E',\n\
		 template:'<div></div>',\n\
		 controller:'myInstituteSheet1Ctrl'\n\
	 }\n\
})\n\
";
int main( int argc, char** argv){
	FILE *pfile = NULL;
	pfile = fopen("sheet1.js","w");
	fputs(code,pfile);
	fclose(pfile);
	return 0;
}
