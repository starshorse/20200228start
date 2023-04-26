var sidebarsCtrl = function( $injector, $scope, workSpace_service, createApp_service , adminApp_service , spreadJs_service, workSpaceCollections_factory, toggleSidebar_factory){
//	var routeParams = $injector.get('$routeParams') 
	var $location = $injector.get('$location') 
//	console.log( routeParams ) 
/*
	followings need for sidebars html binding . controll.
*/
	$scope.apps_list = [] 
	$scope.app_cur
	$scope.apps_list_parent = [] 
	$scope.app_apps_list = null  
	$scope.app_collection_list = null   
//	$scope.frame_type = 'workspace' | 'DbEdit' 
	$scope.cmdControlOptions= { 'fileUpload': 0 }
	$scope.dataMode = 0  // 0: spreadjs 1: form 2: jsoneditor. 
/////////////////////////////////////////////////////////////////////////////////////////////////////
//   navbar show/hide 
////////////////////////////////////////////////////////////////////////////////////////////////////		
	const setNavbar_flag = ()=>{
	      console.log('[parts/sidebars]setNavbar_flag _start_')  
// first Enable $scope.navbar_flag 1 		
          $scope.navbar_flag = 1 
		  workSpace_factory = workSpace_service.getWorkSpace_factory() 
		  if( workSpace_factory.frame_type == 'workspace'){
			let appConfiguration = spreadJs_service.getAppConfiguration()
			switch( appConfiguration.type ){
				case 'form_only':
				case 'page_only':
					$scope.navbar_flag = 0
					break;
				default:	  
			}
// no Access show get toggle. 
		   if( $scope.tbl_name == 'noAccess' )$scope.navbar_flag = 1 
		  }
	}
	spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( setNavbar_flag ) 
	console.log('[parts/sidebars] spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( setNavbar_flag )')  
/////////////////////////////////////////////////////////////////////////////////////////////////////
//   sideBar.. 
////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////
//   sideBar.. link function.  
////////////////////////////////////////////////////////////////////////////////////////////////////		
	$scope.history_back =()=>{
		console.log('[parts/sidebars] $scope.history _start' ) 
        history.go(-1)   		
	}
	$scope.openParent = ( item = null )=>{
		toggleSidebar_factory.toggleSidebar_flag = 1 
	}
	$scope.openApp = ( item = null )=>{
		console.log('[parts/sidebars] $scope.openApp _start with item:', item ) 
//		toggleSidebar_factory.toggleSidebar_flag = 1 
		let openApp_can 
		if( item == null ){
			openApp_can = $scope.app_apps_list 
			if( adminApp_service.authenticateApp( openApp_can ) ){
						openApp_can = adminApp_service.checkAvailableApp( $scope.apps_list ) 
		//		        if (openApp_can.edit_level == -1 ) openApp_can = null ;
			            if( openApp_can == null )adminApp_service.goBack() 
			            else if(openApp_can.edit_level == -1 )adminApp_service.goBack() ;
			}
// First Ext link not allowed. 
			if( openApp_can.ext_link ){
				openApp_can = workSpace_service.getAppNoAccess_post() 
			}
		}
		else{  openApp_can = item 
//Wed Mar 16 11:51:24 KST 2022
//		Check app access right. 
			if( adminApp_service.authenticateApp( openApp_can ) ){
	//			alert(" no app access-right!") 
				console.log(" no app access-right", $scope.cur_user_info.name ) 
	//			return  // authenticateApp failure 
				var app_noAcess = workSpace_service.getAppNoAccess_post() 
				openApp_can = app_noAcess 	
			}
		}
		$scope.app_cur = openApp_can 
	    $scope.dataMode = 0  // 0: spreadjs 1: form 2: jsoneditor. 
		workSpace_service.setAppCur_post( $scope.app_cur ) 
		try{
 			if( $scope.app_cur.stage == 5 ) $scope.cmdControlOptions.fileUpload = 0 
		}catch(err){
			console.log( err ) 
			$scope.cmdControlOptions.fileUpload = 0 
		}
		workSpace_service.execPost_initSidebars_f_list() 	

		$scope.tbl_name = $scope.app_cur.name  
// Ezworks adding. 		
//		if( $scope.app_cur.ext_link )$location.path($scope.app_cur.ext_link) 
		if( $scope.app_cur.ext_link ){ 
			let host = $location.host() 
// bug.			$scope.app_cur.ext_link = `http://${ host }${ $scope.app_cur.ext_link }`
			let ext_link_2 = `https://${ host }${ $scope.app_cur.ext_link }`
			window.open(ext_link_2) 
			return 
		}
/* Tue May 24 02:23:20 UTC 2022
		make call this function available.. 
*/
//		if( $scope.openTbl != undefined )
			$scope.openTbl( $scope.tbl_name ) 
//     		spreadJs_service.call_openTbl( $scope.tbl_name ) 
	}
	$scope.newAppByClick= ()=>{
		$scope.modals[0].callback = ( args , modal )=>{
			const { tbl_name , newApp_cur }  = createApp_service.tempApp( modal.input_1.text )
// set dummy $scope.app_cur for title.
/*			
			$scope.app_cur = JSON.parse( JSON.stringify( {'name': modal.input_1.text , 'title': modal.input_1.text }))  
			$scope.tbl_name = modal.input_1.text 
*/
			$scope.app_cur = newApp_cur 
			$scope.tbl_name = tbl_name 
		}
		$scope.doModal(1) 
	}	
	$scope.$parent.sidebars_init = ()=>{
		console.log('[pars/sidebars]  sidebars_init _start_ with $scope.frame_type: ', $scope.frame_type ) 
		let workSpace_factory = workSpace_service.getWorkSpace_factory() 
//		switch( $scope.frame_type ){
		switch( workSpaceCollections_factory.my_collection.name ){ 
/*
		type :
			1.workspace- init app_apps_list = $scope.apps_list[0] 
			2.DbEdit - init app_apps_list = apps_list.. 
*/
			case 'AppEdit':
				$scope.apps_list_parent = workSpace_factory.apps_list_parent 
				$scope.apps_list        = workSpace_factory.apps_list  	
				$scope.app_cur          = workSpace_factory.app_cur  	
				$scope.cur_user_info    = workSpace_factory.cur_user_info  	
				$scope.app_collection_list = workSpace_factory.collection_list  
				$scope.app_apps_list    = workSpace_factory.app_apps_list  
			        $scope.app_server_list  = workSpace_factory.app_server_list
	                        $scope.$parent.app_server_list = $scope.app_server_list 
			    break; 
			case 'workspace':
				$scope.apps_list_parent = workSpace_factory.apps_list_parent 
				$scope.apps_list        = workSpace_factory.apps_list  	
				$scope.app_cur          = workSpace_factory.app_cur  	
				$scope.cur_user_info    = workSpace_factory.cur_user_info  	
				$scope.app_apps_list = $scope.apps_list[0]
			    break; 
			case 'DbEdit':
				$scope.apps_list_parent = workSpace_factory.apps_list_parent_all 
				$scope.apps_list        = workSpace_factory.apps_list_all 	
				$scope.app_apps_list    = workSpace_factory.app_apps_list  
				$scope.app_collection_list = workSpace_factory.collection_list  
			    break;
		    default:	
				$scope.apps_list_parent = workSpace_factory.apps_list_parent 
				$scope.apps_list        = workSpace_factory.apps_list  	
				$scope.app_cur          = workSpace_factory.app_cur  	
				$scope.cur_user_info    = workSpace_factory.cur_user_info  	
				$scope.app_apps_list = $scope.apps_list[0]
			    break;
		}
	}
	$scope.$parent.openApp = $scope.openApp 
}
angular.module('myDbEditSidebar',['ngRoute'])
.config(['$routeProvider', function( $routeProvider ){
	console.log('[parts/sidebars]  angular.module configuration start') 
// Thu May 26 00:24:29 UTC 2022  
	$routeProvider.when('/:my_collection/:tbl_name/:view_mode/:id',{ 
		templateUrl: function(params){ 
			console.log('[parts/sidebars]', params )
			return '/parts/views/view_main.html' 
		}, 
		controller:'myRouteCtrl' 
	})
}])
.controller('myRouteCtrl',['$scope','$routeParams', function( $routeParams ){
	console.log('[parts/sidebars]',  $routeParams.my_collection , $routeParams.tbl_name )
}])
.controller('myDbEditSidebarCtrl',['$injector','$scope','restApiServiceDbEdit','workSpace_service' ,'createApp_service','adminApp_service',
'spreadJs_service','workSpaceCollections_factory','toggleSidebar_factory',
	function($injector ,$scope, restApiServiceDbEdit, workSpace_service , createApp_service, adminApp_service, spreadJs_service, workSpaceCollections_factory, toggleSidebar_factory ){
//	$scope.frame_type ='DbEdit'
	angular.extend( this, new sidebarsCtrl($injector,$scope, workSpace_service, createApp_service, adminApp_service , spreadJs_service, workSpaceCollections_factory, toggleSidebar_factory ) ) 
	$scope.cmdControlOptions = { fileUpload : 0 } 
	$scope.app_app_list = workSpace_service.app_app_list  
	$scope.saveApp = ()=>{
		workSpace_service.saveApp( $scope )  
	}
}]) 
