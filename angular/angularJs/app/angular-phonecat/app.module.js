// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', [
	'ngRoute',
	'ngAnimate',
	'core',
	'phoneList',
	'phoneDetail' 
]);
/*
// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});
*/
angular.module('core.phone',['ngResource']);
