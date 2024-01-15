angular.module('ezof_dba_editor',[
	'ngCookies',
	'mySpreadjs',
	'myDomodal',
	'myFooter',
	'gc_spreadjs',
	'spreadjs_events',
	'ezof_dba_editorService'
])
.controller('ezof_dba_editorCtrl', ['$scope','$injector', function( $scope, $injector ){
	var ezof_dba_editorFactory = $injector.get('ezof_dba_editorFactory')
	var ezof_dba_editorService = $injector.get('ezof_dba_editorService')
	$scope.user_DB
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		ezof_dba_editorFactory.cur_db = user_db ;
	}
	const updateAlertInfo = ( alert_info_message )=>{
		$scope.alert_info_message = alert_info_message; 	
		if( !$scope.$$phase )$scope.$apply() 
	}
	$scope.click_doModal = async ( modal = null )=>{
		if( modal == null ){
		      modal = { title: 'Modal Test' , content: 'Modal Test합니다.' , callback : async function(){} }
		}
		$scope.modal = modal ;
//		$scope.$broadcast('doModalImmediate') ;
		$scope.$broadcast('doModal') ;
	}
	$scope.hideModal = async ()=>{
	    $scope.$broadcast('hideModalImmediate'); 	
	}
	ezof_dba_editorFactory.update_cur_db = updateUserDB ;	
	ezof_dba_editorFactory.updateAlertInfo = updateAlertInfo ; 
	ezof_dba_editorFactory.doModalStart = $scope.click_doModal ;
	ezof_dba_editorFactory.doModalEnd = $scope.hideModal ;
/*	
	document.getElementById('inputGroupSelect01').addEventListener('change', async function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
		let  spread = ezof_dba_editorFactory.spread ; 
                await ezof_dba_editorService.updateTblData( spread, db_name );
                await ezof_dba_editorService.updateData_1( spread );
	})
*/	
}])
