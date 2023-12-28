/*
 *	Jupitor Web admin  collections and appl management. 
 */
 angular.module('myDbEditExists', ['ngRoute',
// parts components. 	 
	'myDbEditCmdInput',
	'mySpreadjs',
	'myDbEditSheet1', 
	'myDbEditAddOpts',
	'myDbEditSidebar', 
	'myFooter',
	'myDomodal', 
	'status_indicate', 
	'work_space',
	'spread_js',
	'spreadjs_filters',
	'spreadjs_events',
	'admin_app',
	'sheetFormat',
	'sheetCmd',
	'addSheets',
	'gc_spreadjs',
	'jsoneditor'
])
.controller('myDbEditExistsCtrl', 
['$scope','$injector',
'workSpace_service', 
//1 'restApiServiceDbEdit',
'adminApp_service',
	function($scope, $injector, 
workSpace_service , 
//1 restApiServiceDbEdit,
adminApp_service, 
){
	$cookies = $injector.get('$cookies')	
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
	$scope.cur_server = $cookies.get('user_DB') 	
// Here check hostname , juipter only support ezoffice365.com 
	const serverList_update = ( serverList )=>{
		$scope.server_list = serverList 
		$scope.$apply()
		document.getElementById('inputGroupSelect01').value = $scope.cur_server
 	}
	workSpace_service.set_f_serverList_update( serverList_update ); 	
	workSpace_service.update_curServer( $scope.cur_server )

	var $location = $injector.get('$location')  
	let host = $location.host() 
	if( host != 'localhost' &&  host != 'ezoffice365.com' ){
		let port = $location.port() 
		let url = $location.url() 
		console.log('host:port/url', host, port, url ) 
		window.location.href = `http://ezoffice365.com:${port}/db_edit/exists${ url }`
	}
// Wed Mar  2 14:37:01 KST 2022
	angular.extend(this, new appCtrl( $scope, $injector, 
workSpace_service , 
adminApp_service, 
// workSpaceCollections_service 
)) 
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..   company workSpace. part. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
}])
