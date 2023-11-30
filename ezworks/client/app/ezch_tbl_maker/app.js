angular.module('ezch_tbl_maker',[
	'ngCookies',
	'mySpreadjs',
	'gc_spreadjs',
//	'spreadjs_events',
	'ezch_tbl_makerService'
])
.controller('ezch_tbl_makerCtrl', ['$scope','$injector', function( $scope, $injector ){
	var ezch_tbl_makerFactory = $injector.get('ezch_tbl_makerFactory')
	var ezch_tbl_makerService = $injector.get('ezch_tbl_makerService')
	var $cookies = $injector.get('$cookies') 
	var $http = $injector.get('$http') 

	let user_id = $cookies.get('user') 
	let db_name = $cookies.get('user_DB') 
	$scope.user_DBs    
	$scope.user_DB
	$scope.hrefs = { tbl_editor: '/app/ezch_tbl_editor' }

	$http.get(`/Hades/dba_editor/db_login_web/${ db_name }/${ user_id }`).then( async (respnose)=>{
		  if( respnose.data.STATUS == -1 ){
			  alert( respnose.data.ERRORMESSAGE );
			  return -1;
		  }
		  let login_id = respnose.data.DATA[0].login_id  
		  let result  = await $http.get(`/Hades/db_administration/db_list/${ db_name }/${ login_id }`) 
		  if( result.data.STATUS == -1 ){
			  alert( result.data.ERRORMESSAGE );
			  return -1; 
		  }
		  $scope.user_DBs =  result.data.DATA 
		  $scope.user_DB =   db_name ; 
		  $scope.$apply(); 
	})

	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		ezch_tbl_makerFactory.cur_db = user_db ;
	}
	const updateAlertInfo = ( alert_info_message )=>{
		$scope.alert_info_message = alert_info_message; 	
		if( !$scope.$$phase )$scope.$apply() 
	}
	ezch_tbl_makerFactory.update_cur_db = updateUserDB ;	
	ezch_tbl_makerFactory.updateAlertInfo = updateAlertInfo ; 
	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
		let  spread = ezch_tbl_makerFactory.spread ; 
                ezch_tbl_makerService.updateTblName( spread, db_name );
	})
}])
