angular.module('ezch_tbl_editorCtrl',[])
.controller('ezch_tbl_editorCtrl', ['$scope','$injector','$stateParams', function( $scope, $injector, $stateParams ){
	var ezch_tbl_editorFactory = $injector.get('ezch_tbl_editorFactory')
	var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService')
	var $cookies = $injector.get('$cookies');
	var $state = $injector.get('$state');
	var $rootScope = $injector.get('$rootScope')

	$scope.user_DB
	$scope.isDbSelectionDisabled = true 
	$scope.alert_info_message = { class: 'warning' ,message: 'init' }
//move to main	$scope.hrefs = { tbl_maker: '/app/ezch_tbl_maker' }
	$scope.cur_config_name = ezch_tbl_editorFactory.config_name 
	$scope.user_DB = $cookies.get('user_DB')
	if( !$scope.$$phase )$scope.$apply() 
    let user = $cookies.get('user')
	if( user == 'star_horse@naver.com' )$scope.isDbSelectionDisabled = false 

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
			    return ;
		}else {  // mouse click.. 
			if( event.ctrlKey ){
				$cookies.put('config_name', config_name ) 
				window.open( window.location.href )	
			}else{
				$cookies.remove('config_name')
				await  ezch_tbl_editorService.updateConfig( $scope.spread , config_name ) 
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
		if( $stateParams.config_name != 'init' ){
			   config_name =  $stateParams.config_name;        
		}
		if( config_name ){
			await 	$scope.edit_list_click( config_name )
		    $cookies.remove('config_name'); 	
		}	
	}
	const toMass_upload = ()=>{
		$state.go('mass_upload'); 
	}
	ezch_tbl_editorFactory.update_cur_db = updateUserDB ;	
	ezch_tbl_editorFactory.updateAlertInfo = updateAlertInfo ; 
	ezch_tbl_editorFactory.updateConfigName = updateConfigName ; 
	ezch_tbl_editorFactory.endPageLoading  = endPageLoading ; 
	ezch_tbl_editorFactory.update_editLists =  $scope.edit_lists_update ;
	ezch_tbl_editorFactory.toMass_upload =  toMass_upload ; 

	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
//	        ezch_tbl_editorService.sheets_reset( $scope.spread, db_name ); 
	        ezch_tbl_editorService.sheets_reset( $rootScope.spread, db_name ); 

	})
// view back.. 
}])
