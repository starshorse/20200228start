var sidebarsCtrl = function( $injector, $scope, workSpace_service, 
	adminApp_service , 
	spreadJs_service, 
	toggleSidebar_factory
){
	var $location = $injector.get('$location') 
//	console.log( routeParams ) 
/*
	followings need for sidebars html binding . controll.
*/
	$scope.app_cur
	$scope.app_apps_list = null  
	$scope.app_collection_list = null   
	$scope.cmdControlOptions= { 'fileUpload': 0 }
/////////////////////////////////////////////////////////////////////////////////////////////////////
//   navbar show/hide 
////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////
//   sideBar.. 
////////////////////////////////////////////////////////////////////////////////////////////////////		
	debugger;	 
	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		$scope.$parent.cur_server = $scope.cur_server = document.getElementById('inputGroupSelect01').value 
		workSpace_service.update_curServer( $scope.cur_server )
		$scope.$parent.initAppsList(); 
		$scope.$apply();
	})
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
				console.log(" no app access-right", $scope.cur_user_info.name ) 
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
		if( $scope.app_cur.ext_link ){ 
			let host = $location.host() 
			let ext_link_2 = `https://${ host }${ $scope.app_cur.ext_link }`
			window.open(ext_link_2) 
			return 
		}
/* Tue May 24 02:23:20 UTC 2022
		make call this function available.. 
*/
			$scope.openTbl( $scope.tbl_name ) 
	}
	$scope.newAppByClick= ()=>{
		$scope.modals[0].callback = ( args , modal )=>{
			const { tbl_name , newApp_cur }  = createApp_service.tempApp( modal.input_1.text )
// set dummy $scope.app_cur for title.
			$scope.app_cur = newApp_cur 
			$scope.tbl_name = tbl_name 
		}
		$scope.doModal(1) 
	}	
	$scope.$parent.sidebars_init = ()=>{
		console.log('[pars/sidebars]  sidebars_init _start_ with $scope.frame_type: ', $scope.frame_type ) 
		let workSpace_factory = workSpace_service.getWorkSpace_factory() 
		$scope.app_cur          = workSpace_factory.app_cur  	
		$scope.cur_user_info    = workSpace_factory.cur_user_info  	
		$scope.app_collection_list = workSpace_factory.collection_list  
		$scope.app_apps_list    = workSpace_factory.app_apps_list  
		$scope.app_server_list  = workSpace_factory.app_server_list
		$scope.$parent.app_server_list = $scope.app_server_list 
		$scope.cur_server = $scope.$parent.cur_server 
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
.controller('myDbEditSidebarCtrl',['$injector','$scope',
'workSpace_service' ,
'adminApp_service',
'spreadJs_service',
	function($injector ,$scope, 
	workSpace_service , 
	adminApp_service, 
	spreadJs_service, 
){
	angular.extend( this, new sidebarsCtrl($injector,$scope, 
			workSpace_service, 
			adminApp_service , 
			spreadJs_service, 
	) ) 
	$scope.cmdControlOptions = { fileUpload : 0 } 
}]) 
