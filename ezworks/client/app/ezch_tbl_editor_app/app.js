var app  = angular.module('ezch_tbl_editor_app',[
	'ngCookies',
	'myMainbtn',
//	'myDbEditCmdInput',
	'myFooter' ,
	'mySpreadjs',
//	'work_space.cmd_input', 
	'main_buttons',
	'spread_js',
	'spreadjs_filters',
	'spreadjs_events',
	'gc_spreadjs',
	'sheetFormat',
	'sheetCmd',
	'sheetLock',
	'async_job',
	'formulas',
	'addSheets',
	'service_ui',
	'myApp.rest_api',
	'ezch_tbl_editor_app_service',
])
.controller('ezch_tbl_editor_appCtrl',['$scope', '$injector', 'restApiServiceDbEdit', 
	function($scope, $injector, restApiServiceDbEdit ){	
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')){
		spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
		spreadjs_product['cur_product'] = 'wijmo'
	}else if($injector.has('gcSpreadjs_factory')){
		spreadjs_product = $injector.get('gcSpreadjs_factory') 
		spreadjs_product['cur_product'] =  'gc' 
	}
	var  spreadJs_service = $injector.get('spreadJs_service') 
	var  spreadJs_factory = $injector.get('spreadJs_factory') 
	var  sheetFormat_service = $injector.get('sheetFormat_service') 
	var  ezch_tbl_editor_appFactory = $injector.get('ezch_tbl_editor_appFactory') 	
	var  ezch_tbl_editor_appService = $injector.get('ezch_tbl_editor_appService') 	
	var	 $cookies = $injector.get('$cookies');
	$scope.spread
	$scope.colInfo 
	$scope.spread_data 
	$scope.working_ent   
	$scope.user_DB 	
	$scope.cur_config_name 	= ezch_tbl_editor_appFactory.config_name ; 
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
	$scope.isDbSelectionDisabled = true ;	
	console.log('app.js app module appCtrl') 
	$scope.user_DB = $cookies.get('user_DB') 	
	let user = $cookies.get('user')
	if( user == 'star_horse@naver.com')$scope.isDbSelectionDisabled = false  	
	$scope.edit_lists = null 
	$scope.edit_lists_update = ( edit_lists )=>{
		$scope.edit_lists = edit_lists 
		if(!$scope.$$phase){
			$scope.$apply(); 
		}	
	}
	$scope.edit_list_click = async ( config_name, event )=>{
		let  spread = ezch_tbl_editor_appFactory.spread ; 
		console.log( config_name ); 
		document.title = config_name ;   // Title Change.
		if( !event ){ // call by manual .. 
				$cookies.remove('config_name')
				await  ezch_tbl_editor_appService.updateConfig( spreadJs_factory , config_name ) 
				await  ezch_tbl_editor_appService.updateData_2(  null  , spreadJs_factory, sheetFormat_service, $scope.user_DB , 1 );  // set call_source from tblList :1 
			    return ;
		}else {  // mouse click.. 
			if( event.ctrlKey ){
				$cookies.put('config_name', config_name ) 
				window.open( window.location.href )	
			}else{
				$cookies.remove('config_name')
				await  ezch_tbl_editor_appService.updateConfig( spreadJs_factory , config_name ) 
				await  ezch_tbl_editor_appService.updateData_2(  null  , spreadJs_factory, sheetFormat_service, $scope.user_DB , 1 );  // set call_source from tblList :1 
	  		 }		
		}	
	}
	$scope.init_app = async ( )=>{
	        await ezch_tbl_editor_appService.sheet2_init( spreadjs_product , spreadJs_factory )
		$scope.process_events(); 
	}
	const updateUserDB = ( user_db )=>{
		$scope.user_DB = user_db;
		if( !$scope.$$phase )$scope.$apply() 
		ezch_tbl_editor_appFactory.cur_db = user_db ;
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
	ezch_tbl_editor_appFactory.update_cur_db = updateUserDB ;	
	ezch_tbl_editor_appFactory.updateAlertInfo = updateAlertInfo ; 
	ezch_tbl_editor_appFactory.updateConfigName = updateConfigName ; 
	ezch_tbl_editor_appFactory.endPageLoading = endPageLoading; 	
	ezch_tbl_editor_appService.setUpdate_editLists( $scope.edit_lists_update )
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  follow code from spreadjs_service module..   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	document.getElementById("inputGroupSelect01").addEventListener("change",  function(e){
		let user_DB = document.getElementById("inputGroupSelect01").value ;
	    ezch_tbl_editor_appService.sheet2_reset( spreadjs_product , spreadJs_factory, user_DB )
	})

}])
