angular.module('db_administration',[
	'ngCookies',
	'mySpreadjs',
	'gc_spreadjs',
	'spreadjs_events',
	'db_administrationService'
])
.controller('db_administrationCtrl', ['$scope','$injector', function( $scope, $injector ){
	var db_administrationFactory = $injector.get('db_administrationFactory')
	var db_administrationService = $injector.get('db_administrationService')
	$scope.user_DB
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		db_administrationFactory.cur_db = user_db ;
	}
	const updateAlertInfo = ( alert_info_message )=>{
		$scope.alert_info_message = alert_info_message; 	
		if( !$scope.$$phase )$scope.$apply() 
	}
	db_administrationFactory.update_cur_db = updateUserDB ;	
	db_administrationFactory.updateAlertInfo = updateAlertInfo ; 
/*	
	document.getElementById('inputGroupSelect01').addEventListener('change', async function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
		let  spread = db_administrationFactory.spread ; 
                await db_administrationService.updateTblData( spread, db_name );
                await db_administrationService.updateData_1( spread );
	})
*/	
}])
