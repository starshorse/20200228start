#include <stdio.h>
char *code = " \
 angular.module('myInstituteMobile',[\n\
	 'myDrapDrop'])\n\
.controller('myInstituteMobileCtrl',['$scope',function($scope){\n\
	var sheet1_data , indx = 0\n\
	const socket = io()\n\
	$scope.lesson_list = {\n\
		mon:[],\n\
		tue:[],\n\
		wed:[],\n\
		thu:[],\n\
		fri:[],\n\
		sat:[],\n\
		sun:[]\n\
	}\n\
	const newOne = ( item )=>{\n\
		var new1 = {}\n\
		new1.id = indx++\n\
		new1.idx = item.id\n\
		new1.name = item.이름\n\
		new1.duration = item.수업시간\n\
		if( item.시간 != undefined ){\n\
			var times = item.시간.split('-') \n\
			new1.hour = times[0] \n\
			new1.min  = times[1]  \n\
			new1.time = parseInt( times[0] )*100 + parseInt( times[1]) \n\
		}\n\
		return new1 \n\
	}\n\
	const updateData = ( res )=>{\n\
		$scope.lesson_list.mon = []\n\
        $scope.lesson_list.tue = []\n\
        $scope.lesson_list.wed = []\n\
        $scope.lesson_list.thu = []\n\
        $scope.lesson_list.fri = []\n\
        $scope.lesson_list.sat = []\n\
        $scope.lesson_list.sun = []\n\
		indx = 0\n\
		for( const item of res ){\n\
			if( item.요일 == undefined ) continue ;\n\
			var days = item.요일.split(',')\n\
			for( const day of days ){\n\
				switch( day ){\n\
					case '월': \n\
						$scope.lesson_list.mon.push( newOne( item )  ) \n\
						break;\n\
					case '화': \n\
						$scope.lesson_list.tue.push( newOne( item )  ) \n\
						break;\n\
					case '수': \n\
						$scope.lesson_list.wed.push( newOne( item )  ) \n\
						break;\n\
					case '목': \n\
						$scope.lesson_list.thu.push( newOne( item )  ) \n\
						break;\n\
					case '금': \n\
						$scope.lesson_list.fri.push( newOne( item )  ) \n\
						break;\n\
					case '토': \n\
						$scope.lesson_list.sat.push( newOne( item )  ) \n\
						break;\n\
					case '일': \n\
						$scope.lesson_list.sun.push( newOne( item )  ) \n\
						break;\n\
					default:\n\
				}\n\
			}\n\
		}\n\
		$scope.lesson_list.mon.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.lesson_list.tue.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.lesson_list.wed.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.lesson_list.thu.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.lesson_list.fri.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.lesson_list.sat.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.lesson_list.sun.sort((a,b)=>{return (a.time -b.time) })\n\
		$scope.$apply()\n\
	}\n\
	socket.on('getSheet1Data',(res)=>{\n\
		console.log( res ) \n\
		sheet1_data = res \n\
		updateData( res )\n\
	})\n\
	socket.on('updateSheet1Entry',(res)=>{\n\
		var  ent0 = sheet1_data.find((ent)=>ent.id == res.ent.id ) \n\
		Object.assign( ent0, res.ent ) \n\
		updateData( sheet1_data ) \n\
	})\n\
	socket.emit('getSheet1Data', {} )\n\
}])\n\
" ;
int main(int argc , char** argv){
	FILE *pfile = NULL;
	pfile = fopen("app.js","w");
	fputs(code,pfile);
	fclose(pfile);
	return 0;
}
