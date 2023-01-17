angular.module('ezch_tbl_maker',[
	'mySpreadjs',
	'gc_spreadjs',
//	'spreadjs_events',
	'ezch_tbl_makerService'
])
.controller('ezch_tbl_makerCtrl', ['$scope','$injector', function( $scope, $injector ){
	var ezch_tbl_makerFactory = $injector.get('ezch_tbl_makerFactory')
	var ezch_tbl_makerService = $injector.get('ezch_tbl_makerService')
	$scope.user_DB
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
                ezch_tbl_makerService.updateTblData( spread, db_name );
	})
}])
