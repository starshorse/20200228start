  angular.module('myInstituteMobile',[
	 'myDrapDrop'])
.controller('myInstituteMobileCtrl',['$scope',function($scope){
	var sheet1_data , indx = 0
	const socket = io()
	$scope.lesson_list = {
		mon:[],
		tue:[],
		wed:[],
		thu:[],
		fri:[],
		sat:[],
		sun:[]
	}
	const newOne = ( item )=>{
		var new1 = {}
		new1.id = indx++
		new1.idx = item.id
		new1.name = item.이름
		new1.duration = item.수업시간
		if( item.시간 != undefined ){
			var times = item.시간.split('-') 
			new1.hour = times[0] 
			new1.min  = times[1]  
			new1.time = parseInt( times[0] )*100 + parseInt( times[1]) 
		}
		return new1 
	}
	const updateData = ( res )=>{
		$scope.lesson_list.mon = []
        $scope.lesson_list.tue = []
        $scope.lesson_list.wed = []
        $scope.lesson_list.thu = []
        $scope.lesson_list.fri = []
        $scope.lesson_list.sat = []
        $scope.lesson_list.sun = []
		indx = 0
		for( const item of res ){
			if( item.요일 == undefined ) continue ;
			var days = item.요일.split(',')
			for( const day of days ){
				switch( day ){
					case '월': 
						$scope.lesson_list.mon.push( newOne( item )  ) 
						break;
					case '화': 
						$scope.lesson_list.tue.push( newOne( item )  ) 
						break;
					case '수': 
						$scope.lesson_list.wed.push( newOne( item )  ) 
						break;
					case '목': 
						$scope.lesson_list.thu.push( newOne( item )  ) 
						break;
					case '금': 
						$scope.lesson_list.fri.push( newOne( item )  ) 
						break;
					case '토': 
						$scope.lesson_list.sat.push( newOne( item )  ) 
						break;
					case '일': 
						$scope.lesson_list.sun.push( newOne( item )  ) 
						break;
					default:
				}
			}
		}
		$scope.lesson_list.mon.sort((a,b)=>{return (a.time -b.time) })
		$scope.lesson_list.tue.sort((a,b)=>{return (a.time -b.time) })
		$scope.lesson_list.wed.sort((a,b)=>{return (a.time -b.time) })
		$scope.lesson_list.thu.sort((a,b)=>{return (a.time -b.time) })
		$scope.lesson_list.fri.sort((a,b)=>{return (a.time -b.time) })
		$scope.lesson_list.sat.sort((a,b)=>{return (a.time -b.time) })
		$scope.lesson_list.sun.sort((a,b)=>{return (a.time -b.time) })
		$scope.$apply()
	}
	socket.on('getSheet1Data',(res)=>{
		console.log( res ) 
		sheet1_data = res 
		updateData( res )
	})
	socket.on('updateSheet1Entry',(res)=>{
		var  ent0 = sheet1_data.find((ent)=>ent.id == res.ent.id ) 
		Object.assign( ent0, res.ent ) 
		updateData( sheet1_data ) 
	})
	socket.emit('getSheet1Data', {} )
}])
