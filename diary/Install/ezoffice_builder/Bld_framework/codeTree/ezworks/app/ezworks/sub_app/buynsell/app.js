angular.module('myBuynsell',['myBuynsellHeader',
'myMainbtn',
'myConinfo',
'mySumtbl',
'myOptsel',
'myOptsel2',
'mySpreadjs',	
'myFooter'
])
.controller('myBuynsellCtrl',['$scope', function( $scope ){
	$scope.conInfo_update
    $scope.spread = spreadjs_initspread_ft01()
}])
.controller('myBuynsellSpreadjsCtrl',['$scope',function($scope){
    $scope.spread = spreadjs_initspread_ft01()
//     spreadjs data init .. 
	$scope.spread_data = []
	$scope.getSheetHeaderData = new Array(7) 
	$scope.getSheetData = new Array(7) 
	$scope.event_click = { sheet0:null , sheet1:null, sheet2:null, sheet3:null , sheet4:null, sheet5:null, sheet6:null } 
	$scope.sheet2 = { getEntry:null } 
	$scope.sheet3 = { getEntry:null } 
	$scope.sheet4 = { getEntry:null } 
	const numYear = 2100000 
	$scope.spread_data.push( {'sheet_name':'매입'       ,'Lastnumber': numYear + 1*10000 + 7 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null }) 
	$scope.spread_data.push( {'sheet_name':'매입견적' ,'Lastnumber': numYear + 2*10000 + 13 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null })  
	$scope.spread_data.push( {'sheet_name':'거래업체' ,'Lastnumber': numYear + 3*10000 + 13 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null }) 
	$scope.spread_data.push( {'sheet_name':'담당자'    ,'Lastnumber': numYear + 4*10000 + 13 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null }) 
	$scope.spread_data.push( {'sheet_name':'제품'       ,'Lastnumber': numYear + 5*10000 + 13 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null }) 
	$scope.spread_data.push( {'sheet_name':'매출'       ,'Lastnumber': numYear + 5*10000 + 13 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null }) 
	$scope.spread_data.push( {'sheet_name':'매출견적'       ,'Lastnumber': numYear + 5*10000 + 13 , 'WorkingLine': {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0, 'FreezeCol':4},
	'columns': null ,'data':null }) 
//		console.log( $scope.spread_data ) 
}])
