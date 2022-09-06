angular.module('mySpreadjs',[
'myhighLightRow',	
'mySheet0',
'mySheet1',
'mySheet2',
'mySheet3',
'mySheet4',
'mySheet5',
'mySheet6',
])
.controller('mySpreadjsCtrl',['$scope',function($scope){
    $scope.spread = spreadjs_initspread_ft01()
	var spreadNS = GC.Spread.Sheets
// EZWORKS190608CODE		for( i =0  i< spread.getSheetCount() i++){
    for( var i =0;  i< 7; i++){
		    var tpSheet = $scope.spread.getSheet(i) 
		    tpSheet.name($scope.spread_data[i].sheet_name)  
            spreadjs_optionSheet_op1( tpSheet)             
//			tpSheet.autoGenerateColumns = false
			$scope.spread_data[i].data = $scope.getSheetData[i]() 
			$scope.spread_data[i].columns = $scope.getSheetHeaderData[i]() 
            spreadjs_resetData( tpSheet , $scope.spread_data[i].columns, $scope.spread_data[i].data ) 
/*          
			tpSheet.setDataSource($scope.spread_data[i].data)
			tpSheet.bindColumns($scope.spread_data[i].columns)
 */           
// Set defaultSytle.. 			
// RICHARD-CHOI  Locking - Producing fields. 
			spreadjs_setdefaultstyle( tpSheet, "#cccccc", GC.Spread.Sheets.LineStyle.thin ) 
// RICHARD-CHOI 2019-01-26 tempory  disable protect            
//             tpSheet.options.isProtected = true
// RICHARD-CHOI 2018-12-19.. 			 
            spreadjs_unlockCols( tpSheet,  $scope.spread_data[i].columns ) 
// apply  filtering. 			
			spreadjs_filterall( tpSheet , $scope.spread_data[i].columns.length ) 
// RICHARD-CHOI 2018-12-18  OK..
//			tpSheet.setValue(0,2,"진행단계", GC.Spread.Sheets.SheetArea.colHeader)		
// Fix 2 columns from left and 2 rows from top.
//            tpSheet.frozenRowCount(2)
//            spreadjs_frozenColumnCount( tpSheet, arNumFzCol[i])
              spreadjs_frozenColumnCount( tpSheet, $scope.spread_data[i].WorkingLine.FreezeCol )
//            tpSheet.frozenColumnCount(arNumFzCol[i])
//            tpSheet.getRange(0, -1, 2, -1).backColor("LightCyan")
//            tpSheet.getRange(-1, 0, -1, 2).backColor("LightCyan")	
		}	
	   $scope.spread.bind(spreadNS.Events.CellClick, function (e, args) {
		   const activeSheetIndex = spreadjs_getActiveSheetIndex($scope.spread )
		   $scope.event_click.sheet0( args, activeSheetIndex ) 
		   $scope.event_click.sheet1( args, activeSheetIndex ) 
		   $scope.event_click.sheet2( args, activeSheetIndex ) 
		   $scope.event_click.sheet3( args, activeSheetIndex ) 
		   $scope.event_click.sheet4( args, activeSheetIndex ) 
		   $scope.event_click.sheet5( args, activeSheetIndex ) 
		   $scope.event_click.sheet6( args, activeSheetIndex ) 

	   })
}])
.directive('mySpreadjs',function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/spreadjs/spreadjs.html',
		controller:'mySpreadjsCtrl'
	}
})
