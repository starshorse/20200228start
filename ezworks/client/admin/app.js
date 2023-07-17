 angular.module('adminWeb', [
	'ui.router',
	'ngCookies',
	'mySpreadjs',
	'myFooter', 
	'gc_spreadjs',
	'spreadjs_events',
	'jupitor_admin_editor',
	'jupitor_service_admin_editor'
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
	template: `
	      <div>
	      <h3>서비스 권한제한방식설정</h3>
			<table>
		  <tr>
			<th>SEQ</th>
			<th>ORGANIZATION</th>
			<th>METHOD</th>
		  </tr>
			  <tr ng-repeat="limit_org in limit_orgList">
			<td>{{ $index + 1 }}</td> 
			<td>{{ limit_org.organization }}</td> 
			<td>
		<select ng-model="limit_orgList[$index].name">
		   <option ng-repeat="limit in limit_list">{{ limit }}</option> 
	 <!-- 
		   <option selected>{{ limit_org.name }}</option>
	   -->
		</select>
		</td> 
			  </tr>
		</table>
	    </div>
		`,
  controller:'limit_orgListCtrl' ,
  resolve:{
	  limit_orgList: async function( limit_orgListService ){
		  return await limit_orgListService.getAllData()
	  },
	  limit_list: async function( limit_orgListService ){
		  return await limit_orgListService.getLimit_list() 
	  }
  },
}	
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(limit_orgListState);
  $urlRouterProvider.otherwise('/hello'); 
})
.component('hello', {
  template:'<my-spreadjs></my-spreadjs>',
})
.controller('limit_orgListCtrl', ['$scope','limit_orgList','limit_list',function( $scope, limit_orgList, limit_list  ){
	       $scope.limit_orgList = limit_orgList 
	       $scope.limit_list = limit_list 
}]) 
.service('limit_orgListService',['$injector','$q',function($injector, $q ){
	var $http = $injector.get('$http') 
	this.getAllData = async ()=>{
//		let result_2 = await $http.get('/web_admin_editor/service_limit_orglist') 
		let result_2 = await $http.get('/Hades/service_admin/service_orglist') 
		let org_access_method = result_2.data.DATA 
		return org_access_method 
	}
	this.getLimit_list = async ()=>{
//		let result = await $http.get('/web_admin_editor/service_limit_list') 
//		let limit_list = result.data.DATA.map((ent)=>ent.name) 
		let limit_list = ['Organization','User','MachineKey'] ;
		let defered = $q.defer();
        defered.resolve( limit_list ) 
		return defered.promise ;
	}
}])
.controller('adminWebCtrl', ['$scope', function($scope){
}])
	
