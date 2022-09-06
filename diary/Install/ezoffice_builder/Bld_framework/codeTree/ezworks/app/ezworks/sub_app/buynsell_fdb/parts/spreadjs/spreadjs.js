angular.module('myBuynsellSpreadjs',[
'myhighLightRow',	
'myOptsel1',	
'mySheet0',
'mySheet1',
'mySheet2'
])
.controller('myBuynsellSpreadjsCtrl',['$scope','mySheet0Service', function($scope, mySheet0Service){
	$scope.spread = spreadjs_initspread_ft01()
	var spreadNS = GC.Spread.Sheets
	mySheet0Service.initSheet0( $scope.spread , $scope.spread_data ) 
    $scope.spread.bind(spreadNS.Events.CellClick, function (e, args) {
		   const activeSheetIndex = spreadjs_getActiveSheetIndex($scope.spread )
		   $scope.event_click.sheet0( args, activeSheetIndex ) 
		   $scope.event_click.sheet1( args, activeSheetIndex ) 
		   $scope.event_click.sheet2( args, activeSheetIndex ) 
//		   $scope.event_click.sheet3( args, activeSheetIndex ) 
//		   $scope.event_click.sheet4( args, activeSheetIndex ) 
//		   $scope.event_click.sheet5( args, activeSheetIndex ) 
//		   $scope.event_click.sheet6( args, activeSheetIndex ) 

    })
	$scope.spread.bind( spreadNS.Events.EditEnded, function( sender, args ){
		  const activeSheetIndex = spreadjs_getActiveSheetIndex($scope.spread )
		  mySheet0Service.updateData( args, activeSheetIndex )  
		  mySheet0Service.edit_ended( activeSheetIndex ) 
	})
}])
