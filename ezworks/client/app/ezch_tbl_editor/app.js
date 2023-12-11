/*
   Client Interface Logic 분리 
   1. SpreadJS vs othe Ui component 
   2. Data management 
   3. Web 
   4. DataBase connection 
*/
angular.module('ezch_tbl_editor',[
// angualrJs 	
	'ui.router',
	'ngCookies',
// web logic 	
	'async_job',
// Spreadjs 	
	'mySpreadjs',
	'myDomodal',
	'gc_spreadjs',
	'spreadjs_events',
	'ezch_tbl_editorService',
	'ezch_tbl_editorCtrl'
])
.constant('MAX_COL', 200 )
.constant('MAX_ROW', 20000 )
.constant('UPLOAD_CELL_COL_START', 1 ) 
.constant('UPLOAD_CELL_ROW_START', 1 ) 
.config( function( $stateProvider, $urlRouterProvider ){
	var initState = {
		name:'init',
		url:'/',
		controller: function( $state ){
			$state.go('home', { config_name : 'init' })
		}
	}
	var homeState = {
		name:'home',
		url:'/:config_name',
		templateUrl: '/app/ezch_tbl_editor/templates/tbl_editor.template.html',
		controller:'ezch_tbl_editorCtrl'
	}
	var mass_uploadState = {
		name:'mass_upload',
		url:'/mass_upload',
		templateUrl: '/app/ezch_tbl_editor/templates/tbl_mass_upload.template.html',
		controller:'ezch_tbl_uploadCtrl'
	}
	$stateProvider.state(initState); 
	$stateProvider.state(homeState);
	$stateProvider.state(mass_uploadState);
	$urlRouterProvider.otherwise('/'); 
})
.controller('ezch_tbl_mainCtrl', ['$scope','$injector', function( $scope, $injector ){
	$scope.hrefs = { tbl_maker: '/app/ezch_tbl_maker' }
}])
