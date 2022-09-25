 angular.module('myEzworks', ['myApp.rest_api',
	'myEzworksSpreadjs',
	'ezch_tbl_editor_app'
])
.controller('myEzworksCtrl',['$scope',function( $scope){
	$scope.getData
	$scope.updateData
	const socket = io()
	socket.on('getData', ( data_ )=>{
		$scope.getData( data_ )
	})
	socket.on('updateData',( data_)=>{
		if( data_.socketId != socket.id )
			$scope.updateData( data_.ent )
	})
	$scope.updateData_req = ( ent0 )=>{
		socket.emit('updateData', ent0 )
	}
//	socket.emit('getData',{})
}])
angular.module('myEzworksSpreadjs',[])
.factory('spreadjs_factory', [function(){
	var spreadjs_factory ={
		spread: null,
		getSpread : ()=>spreadjs_factory.spead 
	}
	return spreadjs_factory
}])
.service('spreadjs_service',[
'spreadjs_factory',
'ezch_tbl_editor_appService',	
'ezch_tbl_editor_eventService',	
	function(
		spreadjs_factory,
		ezch_tbl_editor_appService,
		ezch_tbl_editor_eventService
	){
		this.initSpread =( spread) =>{
			spreadjs_factory.spread = spread 
			ezch_tbl_editor_appService.initSpread( spread ) 
		}
		this.sheet1_cellDoubleClick =( sender, args )=>{
			ezch_tbl_editor_eventService.sheet1_cellDoubleClick( spreadjs_factory.spread, sender ,args )
		}
		this.sheet1_cellChanged = ( sender, args )=>{
			ezch_tbl_editor_eventService.sheet1_cellChanged( spreadjs_factory.spread , sender, args )
		}
		this.spread_buttonClicked = ( sender, args)=>{
		}
	}
])
.service('restApiServiceEzworks',['restApiService',function( restApiService ){
}])
.controller('myEzworksSpreadjsCtrl', ['$timeout','$scope','restApiServiceEzworks', 
'spreadjs_service',	
	function( $timeout, $scope, restApiServiceEzworks ,
		spreadjs_service
	){
/*	
	$('#ss').wijspread({ sheetCount: 2})
	var spread = $('#ss').wijspread('spread')
*/
	var spread = new GC.Spread.Sheets.Workbook( document.getElementById('ss') , { sheetCount : 3 }) 
    const sheet0 = spread.getSheet(0)
	const sheet1 = spread.getSheet(1) 

	spreadjs_service.initSpread( spread ) 

	var DbData , id_index
//	sheet0.bind( $.wijmo.wijspread.Events.EditEnd, ( sender, args )=>{
	sheet0.bind( GC.Spread.Sheets.Events.EditEnd, ( sender, args )=>{
		const id  = sheet0.getValue( args.row, id_index )
		$timeout( ()=>{
			var ent0 = DbData.find((ent)=>ent.id == id )
			$scope.updateData_req( ent0 )
		}, 1000 )

	})
	sheet1.bind( GC.Spread.Sheets.Events.CellDoubleClick, ( sender, args )=>{
		spreadjs_service.sheet1_cellDoubleClick( sender, args ) 
	})
	sheet1.bind( GC.Spread.Sheets.Events.CellChanged, ( sender, args )=>{
		spreadjs_service.sheet1_cellChanged( sender, args ) 
	})
	spread.bind( GC.Spread.Sheets.Events.ButtonClicked, ( sender, args )=>{
		spreadjs_service.spread_buttonClicked( sender , args ) 
	})
	$scope.getData = ( data_ ) =>{
		DbData = data_
		sheet0.setDataSource( DbData )
		for( var i =0 ; i< sheet0.getColumnCount(); i++ ){
			var conText = sheet0.getValue( 0, i ,$.wijmo.wijspread.SheetArea.colHeader )
			if( conText == 'id') id_index = i

		}
	}
	$scope.updateData = ( ent0 )=>{
		var ent1 = DbData.find((ent)=>ent.id == ent0.id )
		spread.isPaintSuspended( true )
		Object.assign( ent1 , ent0 )
		spread.isPaintSuspended( false )
	}
}])
.directive('mySpreadjs', function(){
   return {
	   restrict: 'E',
	   template:`<div id='ss' style='width:100%; height:700px; border:1px solid gray;'></div>` ,
	   controller:'myEzworksSpreadjsCtrl'
   }
})
