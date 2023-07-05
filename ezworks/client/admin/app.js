 angular.module('adminWeb', [
	'ui.router',
	'ngCookies',
	'mySpreadjs',
	'myFooter', 
	'gc_spreadjs',
	'spreadjs_events',
	'jupitor_admin_editor'
])
.config(function($stateProvider, $urlRouterProvider ) {
  var helloState = {
    name: 'hello',
    url: '/hello',
//    template: '<h3>hello world!</h3>'
    component: 'hello'    
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }
  var personState = {
  name: 'people',
  url: '/people',
  component: 'people',
  resolve:{
	  people: async function( PeopleService ){
		  return await PeopleService.getAllData()
	  },
	  limit_list: async function( PeopleService ){
		  return await PeopleService.getLimit_list() 
	  }
  }
/*	  
  resolve: {
    person: function(PeopleService, $transition$) {
      return PeopleService.getPerson($transition$.params().personId);
    }
  }
*/  
}	
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(personState);
  $urlRouterProvider.otherwise('/hello'); 
})
.component('hello', {
/*	
  template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
             '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
*/	     
  template:'<my-spreadjs></my-spreadjs>',
  controller: function() {
    this.greeting = 'hello';
  
    this.toggleGreeting = function() {
    this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
    }
  }
})
.component('people', {
  bindings: { people: '<' },
  template: `<h3>서비스 권한제한방식설정</h3>
            <table>
	      <tr>
	      	<th>SEQ</th>
	      	<th>ORGANIZATION</th>
	      	<th>METHOD</th>
	      </tr>
              <tr ng-repeat="person in $ctrl.people.limit_orgList">
	      	<td>{{ person.seq }}</td> 
	      	<td>{{ person.orgName }}</td> 
	      	<td>
		<select>
		   <option ng-repeat="limit in $ctrl.limit_list">{{ limit.name }}</option> 
		   <option selected>{{ person.name }}</option>
		</select>
		</td> 
              </tr>
            </table>'
	    `
/*	
  template: '<h3>Some people:</h3>' +
            '<ul>' +
            '  <li ng-repeat="person in $ctrl.people">' +
            '    <a ui-sref="person({ personId: person.id })">' +
            '      {{person.name}}' +
            '    </a>' +
            '  </li>' +
            '</ul>'
*/	    
})
.service('PeopleService',['$injector',function($injector){
/*	
	var org_access_method =[ 
		{"seq":1 ,"org_name":"ezchemtech","access_method":"MachineKey" },	
		{"seq":2 ,"org_name":"ezoffice","access_method":"User" },	
		{"seq":3 ,"org_name":"orientpi","access_method":"User" },	
		{"seq":4 ,"org_name":"unionlogis","access_method":"Organization" },	
		{"seq":5 ,"org_name":"asiafni","access_method":"Organization" },	
		
	]
*/	
	var $http = $injector.get('$http') 
	this.getAllData = async ()=>{
		let result_1 = await $http.get('/web_admin_editor/service_limit_list') 
		let result_2 = await $http.get('/web_admin_editor/service_limit_orglist') 
		let org_access_method = {}
		org_access_method['limit_list']	= result_1.data.DATA
		org_access_method['limit_orgList'] = result_2.data.DATA 
		return org_access_method 
	}
	this.getLimit_list = async ()=>{
		let result = await $http.get('/web_admin_editor/service_limit_list') 
		let limit_list = result.data.DATA.map((ent)=>ent.name) 
		return limit_list 
	}
}])
.controller('adminWebCtrl', ['$scope', function($scope){
}])
	
