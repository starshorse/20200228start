 angular.module('myDbEditSpreadjs', [])
.controller('myDbEditSpreadjsCtrl',['$scope','restApiServiceDbEdit','workSpace_service','spreadJs_service','spreadjsEvents_service',
	function( $scope, restApiServiceDbEdit, workSpace_service, spreadJs_service, spreadjsEvents_service ){
	angular.extend( this, new spreadsCtrl( $scope, restApiServiceDbEdit , spreadJs_service, spreadjsEvents_service )) 
	var sheet0 = spreadJs_service.getSheet0() 	
	var first_c = {"name":"default","displayName":"default","size":120,"formatter":"* ##-#-####","locked":true,"data-type":"nvarchar"}
	sheet0.setName('DataSheet') 
	var app_opts = { is_appl_list : false }
	$scope.saveTbl = ( tbl_name )=>{
// 2021-12-27 
		$scope.DbData = $scope.DbData.filter((ent)=>ent.id_jpt != undefined || ent.id != undefined)  
		$scope.DbData.forEach((ent)=>{
			if( ent['실사용자'] == undefined ) ent['실사용자'] = ent['사용자성명'] 
		})
		restApiServiceDbEdit.postData( tbl_name, $scope.DbData , cb_f_main ) 
		$scope.headInfos = $scope.headInfos.filter((ent)=>ent.name != undefined ) 
		$scope.saveHead( tbl_name , $scope.headInfos ) 
	}
	$scope.command_db_accept = ( args  )=>{
		workSpace_service.command_db_accept( $scope, args ) 
		restApiServiceDbEdit.command_db( args.cmd_name ,$scope.tbl_name, args.data_  , (res)=>{ console.log(res)}  )  
	}
	$scope.command_db = ( cmd_name , data_  )=>{
	    workSpace_service.command_db( $scope , cmd_name , data_ ) 
		restApiServiceDbEdit.command_db( cmd_name ,$scope.tbl_name, data_  , (res)=>{ console.log(res)}  )  
	}
// Init Spreadjs Data 
}])
.directive('mySpreadjs', function(){
	return {
	restrict: 'E',
	template:`<div id='ss' style='width:85%; height:600px; border:1px solid gray;'></div>`,
	controller:'myDbEditSpreadjsCtrl'
	}
})
