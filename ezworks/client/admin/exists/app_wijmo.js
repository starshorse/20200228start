 angular.module('myDbEditExists', ['ngRoute','myApp.rest_api',
// parts components. 	 
	'myDbEditCmdInput',
	'myMainbtn',
//	'myDbEditSpreadjs',
	'mySpreadjs',
	'myDbEditSheet1', 
	'myDbEditAddOpts',
//	'myDbEditEvents',
	'myWorkspaceHeader',
	'myDbEditSidebar', 
	'myFooter',
	'myDomodal',
	'toggle_sidebar',
	'status_indicate', 
	 'jsoneditor',
	 'ckEditor',
// service components.
// 	 comd_input components 	 
	 'work_space',
	 'work_space.cmd_input', 
	 'work_space.collections',
	 'main_buttons', 
//	 'work_spaceDbEdit',
	 'spread_js',
	 'spreadjs_filters',
	 'spreadjs_events',
	 'async_job',
	 'danfo_js',
	 'parse_str',
//	 'ui_service', 
     'hotLink',
	 'admin_app',
	 'sheetFormat',
	 'sheetCmd',
	 'sheetLock',
	 'addSheets',
	 'formulas', 
	 'wijmo_spreadjs',
//	 'gc_spreadjs',
	 'uploadFile_csv',
	 'do_modal',
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
'workSpaceCollections_service','hotLink_service',
	function($scope, $injector, workSpace_service , restApiServiceDbEdit, adminApp_service, 
		workSpaceCollections_service, hotLink_service ){
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
/*		
 no need anymore 
Wed Mar  9 11:52:40 KST 2022
	 $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });*/
// Wed Mar  2 14:37:01 KST 2022
	$scope.frame_type = 'DbEdit' 	
	angular.extend(this, new appCtrl( $scope, $injector, workSpace_service , restApiServiceDbEdit ,adminApp_service, workSpaceCollections_service )) 
	$scope.headerMenu_list.push('DashBoard') 
	$scope.headerMenu_list.push('WorkSpace_link') 
	$scope.headerMenu_list.push('Admin_link') 

}])
	
//angular.module('myDbEditExists').$inject = ['wijmo_spreadjs'] 
