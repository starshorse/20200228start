 angular.module('adminWeb', [
	'ui.router',
	'ngCookies',
	'mySpreadjs',
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
  url: '/people/{personId}',
  component: 'people',
  resolve: {
    person: function(PeopleService, $transition$) {
      return PeopleService.getPerson($transition$.params().personId);
    }
  }
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

  template: '<h3>Some people:</h3>' +
            '<ul>' +
            '  <li ng-repeat="person in $ctrl.people">' +
            '    <a ui-sref="person({ personId: person.id })">' +
            '      {{person.name}}' +
            '    </a>' +
            '  </li>' +
            '</ul>'
})
.controller('adminWebCtrl', ['$scope', function($scope){
}])
	
