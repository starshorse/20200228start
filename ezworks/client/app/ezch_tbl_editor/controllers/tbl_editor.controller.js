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
		$scope.modal = { title: 'Config 적용 ' , content: `${ config_name }  적용중입니다. 잠시만 기다려 주세요` , callback : async function(){} , flags: { is_infoModal: 1 } }
//		$scope.$broadcast('doModal');
		const modal = document.getElementById('modalWrap')
		modal.style.display = 'block'
		document.title = config_name ;   // Title Change.
		if( !event ){ // call by manual .. 
				$cookies.remove('config_name')
				await  ezch_tbl_editorService.updateConfig( $scope.spread , config_name ) 
	            $scope.$broadcast('hideModal' ); 	
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
//	    $scope.$broadcast('hideModal' ); 	
		modal.style.display = 'none'
	}
	$scope.edit_item_remove_click = async( config_name, event )=>{
		$scope.modal = { title: 'Config 삭제' , content: `${ config_name }항목를 삭제하시겠습니까?` , params : [config_name], callback : async function( params ){
			let config_name = params[0] 
			let cur_config_name = $cookies.get('config_name') 
			await ezch_tbl_editorService.removeConfig( config_name )
			if( config_name == cur_config_name ){
				$state.go('home')
			}
			$scope.$apply() 
		}}
		$scope.$broadcast('doModal') ;
			
	}
	$scope.click_doModal = async ( modal = null )=>{
		if( modal == null ){
		      modal = { title: 'Modal Test' , content: 'Modal Test합니다.' , callback : async function(){} }
		}
		$scope.modal = modal ;
		$scope.$broadcast('doModalImmediate') ;
	}
	$scope.hideModal = async ()=>{
	    $scope.$broadcast('hideModalImmediate'); 	
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
	ezch_tbl_editorFactory.do_modalStart = $scope.click_doModal   ; 
	ezch_tbl_editorFactory.do_modalEnd = $scope.hideModal   ; 

	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		let  db_name = document.getElementById('inputGroupSelect01').value 
//	        ezch_tbl_editorService.sheets_reset( $scope.spread, db_name ); 
	        ezch_tbl_editorService.sheets_reset( $rootScope.spread, db_name ); 

	})
// view back.. 
}])
