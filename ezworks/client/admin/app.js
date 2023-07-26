 angular.module('adminWeb', [
	'ui.router',
	'ngCookies',
	'mySpreadjs',
	'myFooter', 
	'gc_spreadjs',
	'spreadjs_events',
	'jupitor_admin_editor',
	'jupitor_service_admin_editor',
	'myDomodal' 

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
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(limit_orgListState);
  $stateProvider.state(service_reportState);
  $urlRouterProvider.otherwise('/hello'); 
})
.component('hello', {
  template:'<my-spreadjs></my-spreadjs>',
})
.controller('service_reportCtrl',['$scope',
'$injector',	
'service_report',
	function(
		$scope, 
		$injector,
		service_report
	){
	    var $cookies = $injector.get('$cookies') 
		server_name = $cookies.get('server_name') 
		if( server_name == 'ezoffice')
			$scope.service_report = service_report ; 
		else{
			user_DB = $cookies.get('user_DB')
			$scope.service_report = service_report.filter((ent)=>ent.organization == user_DB);
		}
		$scope.nameList = Object.keys( service_report[0] ) 
	}
])
.controller('limit_orgListCtrl', ['$scope',
'limit_orgList',
'limit_list',
'service_list',
'limit_orgListService',  
 function( 
		$scope, 
		limit_orgList, 
		limit_list, 
		service_list,
		limit_orgListService
	){
	       $scope.modal = { title: '업데이트' , content:'변경사항을 업데이트 하시겠습니까?' , callback: async function(){ 
               await $scope.updateService_limits_DB();
			   alert("update done!")} 
		   }
//	       $scope.limit_orgList = limit_orgList 
	       $scope.service_limits 
	       $scope.limit_list = limit_list 
	       $scope.service_list = service_list 
	       $scope.cur_service = service_list[0] 
	       this.changes_index = [] 
//	       $scope.service_limits = limit_orgListService.getService_limits( $scope.cur_service );
	       $scope.updateService = ()=>{
			   limit_orgListService.getService_limits( $scope.cur_service ).then((data)=>{
				   $scope.service_limits = data ;
				   $scope.$apply(); 
		   })}
	       $scope.updateService();
	       $scope.service_changed =( service )=>{
			   console.log( service ) 
			   $scope.updateService();
		   }
	       $scope.service_limit_changed = ( index )=>{
//			   alert("index" + index + $scope.cur_service );
			   console.log( $scope.service_limits[index] )
			   this.changes_index.push( index )
			   this.changes_index = [...new Set(this.changes_index)] 
		   }
	       $scope.button_click =()=>{
			   $scope.$broadcast('doModal'); 
		   }
	       $scope.updateService_limits_DB = async ()=>{
			   for( index of this.changes_index ){
				  await limit_orgListService.postServices_limitSetting( $scope.service_limits[index] , $scope.cur_service )
			   }
		   }

}]) 
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
	    let org_name = $cookies.get('org_name')
	    let server_name = $cookies.get('server_name') 
	    $scope.ezoffice_only = false ;
	    if( server_name == 'ezoffice')
		     $scope.ezoffice_only = true;

}])
	
