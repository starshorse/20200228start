angular.module('ezof_log_monitor',[
	'mySpreadjs',
	'gc_spreadjs',
//	'spreadjs_events',
	'ezof_log_monitorService'
])
.controller('ezof_log_monitorCtrl', ['$scope','$injector', function( $scope, $injector ){
	var ezof_log_monitorFactory = $injector.get('ezof_log_monitorFactory')
	var ezof_log_monitorService = $injector.get('ezof_log_monitorService')
	$scope.user_DB
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		ezof_log_monitorFactory.cur_db = user_db ;
	}
	const updateAlertInfo = ( alert_info_message )=>{
		$scope.alert_info_message = alert_info_message; 	
		if( !$scope.$$phase )$scope.$apply() 
	}
	ezof_log_monitorFactory.update_cur_db = updateUserDB ;	
	ezof_log_monitorFactory.updateAlertInfo = updateAlertInfo ; 
	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
		let  spread = ezof_log_monitorFactory.spread ; 
                ezof_log_monitorService.updateTblData( spread, db_name );
	})
}])
