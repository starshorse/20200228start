/*
   Init condition management. registerataion concept..
   argument from  app.js from [ DbEdit, company/workspace , company/main/0 .. 
   		[1]$scope.frame_type 
*/
var appCtrl = function( $scope, $injector,workSpace_service, restApiServiceDbEdit, adminApp_service, workSpaceCollections_service ){
///////////////////////////////////////////////////////////////////////////////////////////
//   optional injection. introduced.. 
//////////////////////////////////////////////////////////////////////////////////////////	
   var hotLink_service = null			
   if( $injector.has('hotLink_service')){  
	  hotLink_service = $injector.get('hotLink_service') 
   }
/*	
   var spreadJs_factory = null			
   if( $injector.has('spreadJs_factory')){  
	  spreadJs_factory = $injector.get('spreadJs_factory') 
   }
*/  
  var $rootScope = $injector.get('$rootScope') 

   var workSpace_factory = workSpace_service.getWorkSpace_factory() 
	workSpace_factory.frame_type = $scope.frame_type 
//Thu May 26 01:20:16 UTC 2022
//	spreadJs_factory.frame_type = $scope.frame_type 

	console.log('[parts/appCtrl] now set frame_type:', workSpace_factory.frame_type ) 
//	debugger; 
	
//	$scope.frame_type = 'workspace'
	$scope.cur_user_info = { 'name': 'TBD' }  
	$scope.headerMenu_list = ['Home','LogOut_link','LogIn_info']
	$scope.sidebars_init = ()=>{ console.log('sidebars_init no defined. no sidebars') }
	$scope.headers_init = ()=>{ console.log('headers_init no defined. no headers') }
// 3 .reInit..from menu..	
	$scope.reInit_appList = ( app_list_parent_name )=>{
        console.log('[parts/appCtrl] : $scope.reInit_appList ') 	
//	    workSpace_service.getAppsList_parent( $scope.apps_list_all , $scope )
        workSpace_service.initAppsList_by_parent_id( app_list_parent_name )	
	}
//    $scope.init_appList() 
	const cb_f_initAppsList = (args_list = null )=>{
        console.log('[parts/appCtrl] :![callback]initAppsList with args_list', args_list ) 	
		$scope.cur_user_info = workSpace_factory.cur_user_info 
        console.log('[parts/appCtrl] :![callback] $scope.cur_user_info', $scope.cur_user_info  ) 	
// no need..	    $scope.headers_init( $scope.cur_user_info ) 
	}
	const process_sidebars = ()=>{
    console.log('[parts/appCtrl] :  process_sidebars _start_ ') 	
		let hotLink_service_flag = 0 
		if( hotLink_service )hotLink_service_flag = 1
		if( hotLink_service_flag){
			if( hotLink_service.getHotLink_enable() ){
				let params_ = hotLink_service.getParams() 
/*				
				if( params_.my_collection ){
					// re initialize for workspace collections.. 				
					workSpaceCollections_service.overrideCollection( params_.my_collection , ()=>{} ) 
				}
*/				
			}}
	    $scope.sidebars_init() 
		if( hotLink_service_flag){
			if( hotLink_service.getHotLink_enable()  ){
				var  { hotLink_flag, req_app }  = hotLink_service.path_url2go()  
			}}
// application init 
		if( req_app )$scope.openApp( req_app )
		else $scope.openApp() 
	}
	const process_collections = ()=>{
        console.log('[parts/appCtrl]: process_collections _start_') 	
		if( hotLink_service){
			let params_ = hotLink_service.getParams() 
//1 temp force. $location not working . 
			params_ = { my_collection: $rootScope.my_collection } 

			if( params_.my_collection == undefined  ){
				let path = hotLink_service.getPath() 
				let arr_collection_tbl_name = path.substring(1).split('/') 
				params_.my_collection = arr_collection_tbl_name[0] 
				params_.tbl_name = arr_collection_tbl_name[1]
                console.log('[parts/appCtrl]: getPath', path ) 	
			}
			if( params_.my_collection )$scope.my_collection = params_.my_collection 
            console.log('[parts/appCtrl]: process_collections collection set as', $scope.my_collection ) 	
			if( tbl_name = params_.tbl_name )hotLink_service.setHotLink_enable(1) 
		}
        console.log('[parts/appCtrl]: process_collections workSpaceCollections_service.initCollection _call_', $scope.my_collection ) 	
		workSpaceCollections_service.initCollection($scope.my_collection , process_sidebars ) 
	}
/* 다 필요없다.	
//    workSpace_service.addPost_initAppsList_f_list( process_sidebars ) 
	process_collections()
//    workSpace_service.addPost_initAppsList_f_list( process_collections ) 
    console.log('[parts/appCtrl]: [1]workSpace_service.initAppsList _call_') 	
	workSpace_service.initAppsList( cb_f_initAppsList )  
*/	
}
