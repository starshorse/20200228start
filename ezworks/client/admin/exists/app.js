 angular.module('myDbEditExists', ['ngRoute','myApp.rest_api',
// parts components. 	 
	'myDbEditCmdInput',
	'myMainbtn',
	'mySpreadjs',
	'myDbEditSheet1', 
	'myDbEditAddOpts',
	'myWorkspaceHeader',
	'myDbEditSidebar', 
	'myFooter',
//1	'myDomodal',
	'toggle_sidebar',
	'status_indicate', 
	 'jsoneditor',
//1	 'ckEditor',
// service components.
	 'work_space',
	 'work_space.cmd_input', 
	 'work_space.collections',
	 'main_buttons', 
	 'spread_js',
	 'spreadjs_filters',
	 'spreadjs_events',
	 'async_job',
//1	 'danfo_js',
	 'parse_str',
	 'service_ui', 
//1         'hotLink',
	 'admin_app',
	 'sheetFormat',
	 'sheetCmd',
	 'sheetLock',
	 'addSheets',
	 'formulas', 
	 'gc_spreadjs',
	 'uploadFile_csv',
//1	 'do_modal',
	 'sce_modalHelp',
	 'create_app',
	 'templates',
	 'myApp.rest_api',
])
.config( function($locationProvider, $routeProvider ){
	$locationProvider.html5Mode({ enabled:true , requireBase: false} )
//	$routeProvider.when('/',{ templateUrl:'/parts/views/view_main.html' }) 
})
.controller('myDbEditExistsCtrl', ['$scope','$injector','workSpace_service', 'restApiServiceDbEdit','adminApp_service',
'workSpaceCollections_service',
//1 'hotLink_service',
	function($scope, $injector, workSpace_service , restApiServiceDbEdit, adminApp_service, 
workSpaceCollections_service, 
//1 hotLink_service 
){
 	var hotLink_service = null 
	if( $injector.has( hotLink_service)){ hotLink_service = $injector.get('hotLink_service') }
	$cookies = $injector.get('$cookies')	
	$scope.DbData	
	$scope.tbl_name =''
	$scope.addCol 
	$scope.addRow 
	$scope.openTbl 
	$scope.saveTbl
//	$scope.setTbl_name =( tbl_name)=>{ $scope.tbl_name = tbl_name } 
	$scope.extendCmdOpts = ( cmdOpts )=>{} 
	$scope.convData  
	$scope.spread
	$scope.retractHead 
	$scope.loadHead 
	$scope.saveHead
	$scope.headInfos
//1   
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..  part function.. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
	$scope.cur_server = 'ezoffice' 
	$scope.server_list = ['demo','ezoffice','ezchemtech','unionlogis','orientpi'] 
	$scope.openApp_1 = ( app_server_list )=>{
		if( $scope.cur_server != 'ezoffice' ){
			alert("Only ezoffice menu!")
			return -1; 
		}
		$scope.openApp( app_server_list ); 
	}
	const user_DB = $cookies.get('user_DB') 	
// Here check hostname , juipter only support ezoffice365.com 
	debugger;	 
	document.getElementById('inputGroupSelect01').addEventListener('change', function(e){
		$scope.cur_server = document.getElementById('inputGroupSelect01').value 
		workSpace_service.update_curServer( $scope.cur_server )
		let app_cur = workSpace_service.getAppCur_post(); 
		$scope.openApp( app_cur ); 
		$scope.$apply();
	})
	const serverList_update = ( serverList )=>{
		$scope.server_list = serverList 
		$scope.$apply()
		document.getElementById('inputGroupSelect01').value = user_DB
 	}
	workSpace_service.set_f_serverList_update( serverList_update ); 	
	workSpace_service.update_curServer( user_DB )


	var $location = $injector.get('$location')  
	let host = $location.host() 
	if( host != 'localhost' &&  host != 'ezoffice365.com' ){
		let port = $location.port() 
		let url = $location.url() 
		console.log('host:port/url', host, port, url ) 
		window.location.href = `http://ezoffice365.com:${port}/db_edit/exists${ url }`
	}
	
// Wed Mar  2 14:37:01 KST 2022
	$scope.frame_type = 'DbEdit' 	
// re-define $scope.frame_type 
        $scope.frame_type = 'AppEdit' 
	angular.extend(this, new appCtrl( $scope, $injector, workSpace_service , restApiServiceDbEdit ,adminApp_service, workSpaceCollections_service )) 
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..   company workSpace. part. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
	$scope.headerMenu_list.push('DashBoard') 
	$scope.headerMenu_list.push('WorkSpace_link') 
	$scope.headerMenu_list.push('Admin_link') 

}])
