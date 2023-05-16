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
	var $cookies = $injector.get('$cookies');
	$scope.user_DB
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	$scope.cur_config_name = ezch_tbl_editorFactory.config_name 
	$scope.edit_lists = null
	$scope.edit_lists_update = ( edit_lists )=>{
		$scope.edit_lists = edit_lists
		if(!$scope.$$phase){
			$scope.$apply();
		}
	}
	$scope.edit_list_click = async ( config_name, event )=>{
//1		let  spread = ezch_tbl_editorFactory.spread ; 
		console.log( config_name ); 
		document.title = config_name ;   // Title Change.
		if( !event ){ // call by manual .. 
				$cookies.remove('config_name')
				await  ezch_tbl_editorService.updateConfig( $scope.spread , config_name ) 
//1				await  ezch_tbl_editorService.updateData_2(  null  , spreadJs_factory, sheetFormat_service, $scope.user_DB , 1 );  // set call_source from tblList :1 
			    return ;
		}else {  // mouse click.. 
			if( event.ctrlKey ){
				$cookies.put('config_name', config_name ) 
				window.open( window.location.href )	
			}else{
				$cookies.remove('config_name')
				await  ezch_tbl_editorService.updateConfig( $scope.spread , config_name ) 
//1				await  ezch_tbl_editorService.updateData_2(  null  , spreadJs_factory, sheetFormat_service, $scope.user_DB , 1 );  // set call_source from tblList :1 
	  		 }		
		}	
	}
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		ezch_tbl_editorFactory.sheet_TblView_table.db_name = user_db ;
	}
	const updateAlertInfo = ( alert_info_message )=>{
		$scope.alert_info_message = alert_info_message; 	
		if( !$scope.$$phase )$scope.$apply() 
	}
	const updateConfigName = ( config_name )=>{
		$scope.cur_config_name = config_name ;
		if( !$scope.$$phase )$scope.$apply() 
	}
	const endPageLoading = async ()=>{
		let config_name =  $cookies.get('config_name')
		if( config_name ){
			await 	$scope.edit_list_click( config_name )
		    $cookies.remove('config_name'); 	
		}	
	}
	ezch_tbl_editorFactory.update_cur_db = updateUserDB ;	
	ezch_tbl_editorFactory.updateAlertInfo = updateAlertInfo ; 
	ezch_tbl_editorFactory.updateConfigName = updateConfigName ; 
	ezch_tbl_editorFactory.endPageLoading  = endPageLoading ; 
	ezch_tbl_editorFactory.update_editLists =  $scope.edit_lists_update 

	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
	        ezch_tbl_editorService.sheets_reset( $scope.spread, db_name ); 

	})
}])
