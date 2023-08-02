var myApp = angular.module('hellogalaxy', ['ui.router']);

myApp.config(function($stateProvider) {
  // An array of state definitions
  var states = [ helloGalaxy, peopleState ];
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});
    
    
var helloGalaxy = {
    name: 'hello',
    url: '/hello',
    component: 'hello'
}
var peopleState = {
    name: 'people',
    url: '/people',
    component: 'people',
    resolve: {
        people: function(PeopleService) {
            return PeopleService.getAllPeople();
        }
    }
}
angular.module('hellogalaxy').component('hello', {
    template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
        '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
    controller: function() {
        this.greeting = 'hello';
        this.toggleGreeting = function() {
            this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
        }
    }
})
angular.module('hellogalaxy').component('people', {
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

