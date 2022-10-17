 angular.module('myInstituteSheet0',[])
.controller('myInstituteSheet0Ctrl',['$scope','$timeout', function($scope, $timeout){
	const sheetNum = 0 
	const tbl_name = '학원회계'
	const sheet0 = $scope.spread.sheets[sheetNum]
	var sheet0_data , id_index 
	sheet0.setName( tbl_name ) 
	const socket = io()
	socket.on('getSheet0Data', (res)=>{
		sheet0_data = res
	    sheet0.setDataSource( sheet0_data )
		for( var i = 0; i < sheet0.getColumnCount() ; i++ ){
			var conText = sheet0.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) 
			if( conText == 'id' ) id_index =  i 
		}
	})
	socket.on('updateSheet0Entry', (res)=>{
		if( socket.id != res.socketId ){
			var ent0 = sheet0_data.find(( ent)=> ent.id == res.ent.id )
			$scope.spread.isPaintSuspended(true) 
			Object.assign( ent0, res.ent ) 
			$scope.spread.isPaintSuspended(false) 
		}
	})
	sheet0.bind( $.wijmo.wijspread.Events.EditEnd , ( sender, args )=>{
		const id = sheet0.getValue( args.row, id_index ) 
        $timeout(()=>{
			const ent0 = sheet0_data.find((ent)=>ent.id == id )
			socket.emit('updateSheet0Entry', ent0 ) 
		}, 1000)
	})
	socket.emit('getSheet0Data',{}) 
}])
.directive('mySheet0', function(){
     return {
		 restrict: 'E',
		 template:'<div></div>',
		 controller:'myInstituteSheet0Ctrl'
	 }
})
