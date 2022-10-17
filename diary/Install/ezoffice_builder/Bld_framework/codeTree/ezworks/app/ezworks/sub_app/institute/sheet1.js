angular.module('myInstituteSheet1',[])
.controller('myInstituteSheet1Ctrl',['$scope','$timeout', function($scope,$timeout){
	const sheetNum = 1 
	const tbl_name = '학원일정'
	const sheet1 = $scope.spread.sheets[sheetNum]
	var sheet1_data , id_index
	sheet1.setName( tbl_name ) 
	const socket = io()
	socket.on('getSheet1Data', (res)=>{
		sheet1_data = res
	    sheet1.setDataSource( sheet1_data )
		for( var i = 0; i < sheet1.getColumnCount() ; i++ ){
			var conText = sheet1.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) 
			if( conText == 'id' ) id_index =  i 
		}
	})
	socket.on('updateSheet1Entry', (res)=>{
		if( socket.id != res.socketId ){
			var ent0 = sheet1_data.find(( ent)=> ent.id == res.ent.id )
			$scope.spread.isPaintSuspended(true) 
			Object.assign( ent0, res.ent ) 
			$scope.spread.isPaintSuspended(false) 
		}
	})
	sheet1.bind( $.wijmo.wijspread.Events.EditEnd , ( sender, args )=>{
		const id = sheet1.getValue( args.row, id_index ) 
        $timeout(()=>{
			const ent0 = sheet1_data.find((ent)=>ent.id == id )
			socket.emit('updateSheet1Entry', ent0 ) 
		}, 1000)
	})
	const del_ft = ()=>{
		const row = sheet1.getActiveRowIndex() 
		const col = sheet1.getActiveColumnIndex() 
		sheet1.setValue( row, col, '')
		const id = sheet1.getValue( row, id_index ) 
        $timeout(()=>{
			const ent0 = sheet1_data.find((ent)=>ent.id == id )
			socket.emit('updateSheet1Entry', ent0 ) 
		}, 1000)
	}
	sheet1.addKeyMap($.wijmo.wijspread.Key.del , false, false,false, del_ft ) 
	socket.emit('getSheet1Data',{}) 
}])
.directive('mySheet1', function(){
     return {
		 restrict: 'E',
		 template:'<div></div>',
		 controller:'myInstituteSheet1Ctrl'
	 }
})
