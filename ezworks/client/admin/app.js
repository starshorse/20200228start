 angular.module('adminWeb', [
	'ui.router',
	'ngCookies',
	'mySpreadjs',
	'myFooter', 
	'gc_spreadjs',
	'spreadjs_events',
	'jupitor_admin_editor',
	'jupitor_service_admin_editor',
	'myDomodal',
	'templateCtrl'

])
.config(function($stateProvider, $urlRouterProvider ) {
	var helloState = {
		name: 'hello',
		url: '/hello',
		//    template: '<h3>hello world!</h3>'
		component: 'hello'    
	}
	var aboutState = {
		name: 'service_admin',
		url: '/service_admin/:viewId',
		template: '<my-spreadjs id="viewId"></my-spreadjs>',
		controller: function($scope, $stateParams ){
			$scope.viewId = $stateParams.viewId 
		}
	}
	var limit_orgListState = {
		name: 'limit_orgList',
		url: '/limit_orgList',
		templateUrl: '/admin/templates/limit_orgList.html' ,
		controller:'limit_orgListCtrl' ,
		resolve:{
			limit_orgList: async function( limit_orgListService ){
				return await limit_orgListService.getAllData()
			},
			limit_list: async function( limit_orgListService ){
				return await limit_orgListService.getLimit_list() 
			},
			service_list: async function( limit_orgListService ){
				return await limit_orgListService.getServices_list() 
			}
		},
	}	
	var service_reportState = {
		name: 'service_report',
		url: '/service_report',
		templateUrl:'/admin/templates/service_report.html',
		controller:'service_reportCtrl',
		resolve:{
			service_report: async function( limit_orgListService ){
				return await limit_orgListService.getReport() 
			}
		}
	}
	var srvGrp01_item01 = {
		name:'srvGrp01_item01',
		url:'/srvGrp01_item01/:db_name',
        templateUrl:'/admin/templates/srvGrp01_item01.html',
		controller: 'templateCtrl.srvGrp01_item01',
        resolve:{
		     srvGrp01_item01:async function( $http, $transition$, $state ){
				 let org_name = $transition$.params();
				 let result = await $http.get(`/Hades/service_admin/codeFApi_collectionAccountList/${ org_name['db_name'] }`)
				 return result.data.DATA 
			 }
		}
	}
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(limit_orgListState);
  $stateProvider.state(service_reportState);
  $stateProvider.state(srvGrp01_item01 );	
  $urlRouterProvider.otherwise('/hello'); 
})
.component('hello', {
  template:'<my-spreadjs></my-spreadjs>',
})
.run( function( $injector, $rootScope ){
	    var $cookies = $injector.get('$cookies') 
	    $rootScope.server_name = $cookies.get('server_name') 
	    $rootScope.user_DB = $cookies.get('user_DB')
})
.service('limit_orgListService',['$injector','$q',function($injector, $q ){
	var $http = $injector.get('$http') 
	this.getReport = async ()=>{
		let result = await $http.get('/Hades/service_admin/service_setting') 
		let org_access_method = result.data.DATA 
		return org_access_method 
	}
	this.getAllData = async ()=>{
		let result_2 = await $http.get('/Hades/service_admin/service_orglist') 
		let org_access_method = result_2.data.DATA 
		return org_access_method 
	}
	this.getService_limits = async ( serviceFull )=>{
		let result_2 = await $http.get(`/Hades/service_admin/service_orglist/${ serviceFull }`) 
		let org_access_method = result_2.data.DATA 
		return org_access_method 
	}
	this.getLimit_list = async ()=>{
		let result = await $http.get('/Hades/service_admin/service_permissionlist') 
		if( result.data.STATUS == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1 ;
		}
		let permissionList = result.data.DATA.map((ent)=>ent.value);
		return permissionList

	}
	this.getServices_list = async ()=>{
		let result = await $http.get('/Hades/service_admin/service_servicelist') 
		if( result.data.STATUS == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1 ;
		}
		let serviceList = result.data.DATA.map((ent)=>ent.serviceFull );
		return serviceList
	}
    this.postServices_limitSetting = async ( row_data , service_id )=>{
		let orgName = row_data['orgName']
	    let data = { permissionType_2 : row_data['permissionType_2'] }
	    let	url = `/Hades/service_admin/service_setting/${ orgName }/${ service_id }`	

		let result = await $http({ method:'POST' , url , data }) 
		if( result.data.STATUS == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1 ;
		}
	}
}])
.controller('adminWebCtrl',['$scope','$injector',function($scope, $injector ){
	    var $cookies = $injector.get('$cookies') 
	    var jupitor_admin_editorFactory = $injector.get('jupitor_admin_editorFactory')
	    let org_name = $cookies.get('org_name')
	    let server_name = $cookies.get('server_name') 
//1	
		$scope.click=( modal_info )=>{
			   $scope.modal = modal_info  
			   $scope.$broadcast('doModal')
		}	
		jupitor_admin_editorFactory.do_modal = $scope.click 
	    $scope.ezoffice_only = false ;
	    if( server_name == 'ezoffice')
		     $scope.ezoffice_only = true;

}])
	
