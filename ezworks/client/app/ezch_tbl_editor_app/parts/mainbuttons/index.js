/* this module need spreadjsFilter_service. 
*/
// angular.module('main_buttons',[])
// .controller('main_buttonsCtrl', ['$scope', function($scope){
var main_buttonsCtrl =  function($scope, $injector, spreadjsFilter_service, mainbuttons_service, spreadJs_service, sheetLock_service  ){
//	var workSpace_service = $injector.get('workSpace_service') 
//	var jsonEditor_service = $injector.get('jsonEditor_service') 
	$scope.menuList = [] 
	$scope.autofilter_mode = 0 
	$scope.fullCol_mode = 0 
	$scope.unlockSelection = 0 
	const fullCol_title = { 'on':'전체보기' , 'off':'간략보기' } 
	const unlockSelection_title = { 'on':'락 영역' , 'off':'lock Clear' } 
	$scope.get_autofilter_mode = ()=>{ return !$scope.autofilter_mode } 
	$scope.create_menuEntry = ( name, title, objEvents_functions, objDependency )=>{
		return {
			name, title, objEvents_functions , objDependency 
		}
	}
// require filter_key , spreadjsFilter_service 	
	$scope.autofilter = (item = null ) =>{
	   if(spreadjsFilter_service.doFilter($scope))$scope.autofilter_mode = 1
		return 
	}
// require spreadjsFilter_service, unfilterSpreadjs //	
	$scope.rel_autofilter = (item = null ) =>{
		spreadjsFilter_service.clearFilter($scope) 
		$scope.autofilter_mode = 0 
//		$scope.unfilterSpreadjs() 
	}
	const setAutoFilter = (init_mode = 1)=>{ 
		$scope.autofilter_mode = init_mode 
//		$scope.$apply() 
	} 
// link to Service. 
// Mon Feb 28 09:51:52 KST 2022
	mainbuttons_service.set_autofilter_mode() 
	mainbuttons_service.set_autofilter_mode.addPost( setAutoFilter )

	$scope.fullCol_click = ( item = null )=>{
		$scope.fullCol_mode = !$scope.fullCol_mode 
		mainbuttons_service.set_fullCol_mode($scope.fullCol_mode) 
		if( item != null ){
			if( $scope.fullCol_mode ){
				item.title = fullCol_title['off'] 
			}else{
				item.title = fullCol_title['on'] 
			}
		}
		spreadjsFilter_service.doColFilter( setAutoFilter ) 
	}
	$scope.unlockSelection_click = (item = null)=>{
		$scope.unlockSelection = !$scope.unlockSelection 
		if( $scope.unlockSelection ){ 
			item.title = unlockSelection_title['off'] 
			sheetLock_service.unlockSelection( spreadJs_service.getSheet0() , spreadJs_service.getCur_headInfos() ) 
		}
		else{  
			item.title = unlockSelection_title['on'] 
			sheetLock_service.lockSelection( spreadJs_service.getSheet0() , spreadJs_service.getCur_headInfos() ) 
		}
	}
// require setFreezeColSpreadjs 	
	$scope.setFreezeCol =()=>{
		$scope.freezeCol = spreadJs_service.getFreezeCol() 
		console.log( $scope.freezeCol )
		$scope.setFreezeColSpreadjs( $scope.freezeCol )
	}
	$scope.row_add = ()=>{
//Fri May 27 08:56:45 UTC 2022
		$scope.openApp( $scope.app_cur ) 
	}
	$scope.request_update = ()=>{
		$scope.openTbl('ezch_tbl_editor_app') 
		$scope.alert_info_message.class = 'warning' 
		$scope.alert_info_message.message = '메세지 초기화' 
		if( !$scope.$$phase )$scope.$apply() 
	}
	$scope.view_table = async ()=>{
	   let result =	await spreadJs_service.get_tabl_data_sql()
		console.log( result ) 
	}
	$scope.update_table = ()=>{
	}
//Thu Aug  4 11:34:01 KST 2022 ezch_tbl_maker_app specific 
	var ezch_tbl_maker_service = null 
	if( $injector.has('ezch_tbl_maker_service')) ezch_tbl_maker_service = $injector.get('ezch_tbl_maker_service') 
	$scope.request_qt_info = async ()=>{
		$scope.alert_info_message.class = 'warning' 
		$scope.alert_info_message.message = '메세지 초기화' 
		if( !$scope.$$phase )$scope.$apply() 

		let result_status  = await ezch_tbl_maker_service.request_tbl_maker( spreadJs_service.getDbData() )  
		$scope.alert_info_message.class = result_status.RESULT 
		$scope.alert_info_message.message = result_status.ERRORMESSAGE
		if( !$scope.$$phase )$scope.$apply() 
	}
	$scope.request_rest = ()=>{
		$scope.openTbl('tbl_maker_input') 
		ezch_tbl_maker_service.clear_qt_seq() 
		$scope.alert_info_message.class = 'warning' 
		$scope.alert_info_message.message = '메세지 초기화' 
		if( !$scope.$$phase )$scope.$apply() 
	}
	$scope.make_table = async ()=>{
		$scope.alert_info_message.class = 'warning' 
		$scope.alert_info_message.message = '테이블 생성중' 
		if( !$scope.$$phase )$scope.$apply() 
		let result = await spreadJs_service.createTable_sql() 
		if( result.data?.RESULT == 'success' ){
			$scope.alert_info_message.class = 'success' 
			$scope.alert_info_message.message = '테이블 생성완료' 
		}else{
			$scope.alert_info_message.class = 'warning' 
		    $scope.alert_info_message.message = 'Unknown Failure!' 
			$scope.alert_info_message.message = result.data?.ERRORMESSAGE 
		}
		if( !$scope.$$phase )$scope.$apply() 
	}
	$scope.config_app = async ()=>{
		let apps_list = await workSpace_service.promise_getAppsListData() 
		let app_cur = apps_list.find((ent)=> ent.name  == $scope.app_cur.name ) 
		let appCongiuration = JSON.parse( app_cur.configuration )
		const cb_f = async ( appCongiuration_str )=>{
			app_cur.configuration = appCongiuration_str 
			console.log( apps_list )
			let res_ = await workSpace_service.promise_postAppsListData( apps_list ) 
		}
        jsonEditor_service.changeJSONEditor_btn( appCongiuration, $scope.tbl_name , cb_f  )  
		$scope.dataMode =  2 
        if(!$scope.$$phase)$scope.$apply() 
	}
// inital menu default. 
/*	
	$scope.menuList.push( $scope.create_menuEntry( 'autoFilter', '자동필터', { 'click': $scope.autofilter },{ 'show': $scope.get_autofilter_mode }   ) )
	$scope.menuList.push( $scope.create_menuEntry( 'clearFilter_all', '전체필터해제',{ 'click': $scope.rel_autofilter }, {'hide': $scope.get_autofilter_mode }  ) )
	$scope.menuList.push( $scope.create_menuEntry( 'full_col',fullCol_title['on'] ,{ 'click':$scope.fullCol_click }, null  ) )
	$scope.menuList.push( $scope.create_menuEntry( 'freezePanel', '틀고정',{ 'click': $scope.setFreezeCol }, null ) )
*/	
//	if( $scope.frame_type == 'workspace' ){	
/*	
		$scope.menuList.push( $scope.create_menuEntry( 'request_qt_info', '견적정보요청',{ 'click': $scope.request_qt_info }, null ) )
		$scope.menuList.push( $scope.create_menuEntry( 'request_rest', '요청초기화',{ 'click': $scope.request_rest }, null ) )
		$scope.menuList.push( $scope.create_menuEntry( 'unlockSelection',unlockSelection_title['on'] ,{ 'click':$scope.unlockSelection_click }, null  ) )
*/		
//	}else if( $scope.frame_type == 'DbEdit' ){
//		$scope.menuList.push( $scope.create_menuEntry( 'appCongiuration', '앱설정',{ 'click': $scope.config_app }, null ) )
//	}
/*		$scope.menuList.push( $scope.create_menuEntry( 'table maker', 'Table생성',{ 'click': $scope.make_table }, null ) )
		$scope.menuList.push( $scope.create_menuEntry( 'clear', '입력값지우기',{ 'click': $scope.clear }, null ) )
*/		
		$scope.menuList.push( $scope.create_menuEntry( 'view table', '가져오기',{ 'click': $scope.view_table }, null ) )
		$scope.menuList.push( $scope.create_menuEntry( 'update table', '업데이트(D)',{ 'click': $scope.update_table }, null ) )
		$scope.menuList.push( $scope.create_menuEntry( 'update_all', '업데이트',{ 'click': $scope.request_update }, null ) )
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	  Angular. module merged.. 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
angular.module('myMainbtn',[])
.controller('myMainbtnCtrl',['$scope','$injector','spreadjsFilter_service','mainButtons_service', 
	'spreadJs_service','sheetLock_service',
	function($scope,$injector, spreadjsFilter_service, mainButtons_service, spreadJs_service ,
	sheetLock_service ){
	angular.extend(this , new main_buttonsCtrl($scope,$injector,spreadjsFilter_service, mainButtons_service, spreadJs_service , sheetLock_service )) 
	$scope.isMainButton_enabled = 1 
	$scope.row_add = ()=>{
//		ezData_RowAdd_parsing($scope.spread, $scope.spread_data) 
		$scope.working_ent = JSON.parse( JSON.stringify( $scope.spread_data[0] ))  
// $scope.mode 2 is creation mode mode=1 insert/update mode. 		
		$scope.mode = 2 
		$scope.change_dataedit() 
// 2021-12-21		$scope.$apply() 	
	}
	const post_initCollection_mainButton = ()=>{
		let collectionConfiguration = workSpaceCollections_service.getMyCollectionConfiguration() 
		$scope.isMainButton_enabled = collectionConfiguration.component.mainButtons.enable 

		let workSpace_factory = workSpace_service.getWorkSpace_factory() 
		if( workSpace_factory.frame_type == 'DbEdit' )$scope.isMainButton_enabled = 1 
        console.log('[parts/mainbuttons] : post_initCollection_mainButton  $scope.isMainButton_enabled ', $scope.isMainButton_enabled ) 		

		$scope.$apply() 
	}
	const process_appConfiguration = ()=>{
			  let appConfiguration = spreadJs_service.getAppConfiguration() 
			  try{     
			       $scope.isMainButton_enabled = appConfiguration.component.mainButtons.enable 
			  }catch(err){
				   $scope.isMainButton_enabled = 0 
				  console.log(err) 
			  }
				let workSpace_factory = workSpace_service.getWorkSpace_factory() 
				if( workSpace_factory.frame_type == 'DbEdit' )$scope.isMainButton_enabled = 1 
				console.log('[parts/mainbuttons] : process_appConfiguration  $scope.isMainButton_enabled ', $scope.isMainButton_enabled ) 		
		}
//ezch_tbl_maker_app	spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( process_appConfiguration ) 
//	workSpaceCollections_service.initCollection_f.addPost_initCollection_f_list( post_initCollection_mainButton ) 	
}])
.directive('myMainbtn', function(){
	return{
		restrict:'E',
		templateUrl:'/apps/ezch_tbl_editor_app/parts/mainbuttons/mainbtn.html',
		controller:'myMainbtnCtrl'
	}
})
