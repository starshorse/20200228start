angular.module('ezch_tbl_editor',[
	'ngCookies',
	'mySpreadjs',
	'gc_spreadjs',
	'spreadjs_events',
	'ezch_tbl_editorService'
])
.controller('ezch_tbl_editorCtrl', ['$scope','$injector', function( $scope, $injector ){
	var ezch_tbl_editorFactory = $injector.get('ezch_tbl_editorFactory')
	var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService')
	$scope.user_DB
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	$scope.cur_config_name = ezch_tbl_editorFactory.config_name 
	
	$scope.edit_list_click = ( config_name )=>{
		let  spread = ezch_tbl_editorFactory.spread ; 
		console.log( config_name ); 
 	        ezch_tbl_editorService.updateTblList( spread, $scope.user_DB , config_name ); 
                ezch_tbl_editorService.updateData_1( spread, $scope.user_DB , 1 );  // set call_source from tblList :1 
	}
	
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		ezch_tbl_editorFactory.cur_db = user_db ;
	}
	const updateAlertInfo = ( alert_info_message )=>{
		$scope.alert_info_message = alert_info_message; 	
		if( !$scope.$$phase )$scope.$apply() 
	}
	const updateConfigName = ( config_name )=>{
		$scope.cur_config_name = config_name ;
		if( !$scope.$$phase )$scope.$apply() 
	}
	ezch_tbl_editorFactory.update_cur_db = updateUserDB ;	
	ezch_tbl_editorFactory.updateAlertInfo = updateAlertInfo ; 
	ezch_tbl_editorFactory.updateConfigName = updateConfigName ; 
	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
		let  spread = ezch_tbl_editorFactory.spread ; 
		
		ezch_tbl_editorService.updateTblList( spread, db_name ); 
		ezch_tbl_editorService.invalid_tblView( spread )
//                ezch_tbl_editorService.updateData_1( spread, db_name );

	})
}])
