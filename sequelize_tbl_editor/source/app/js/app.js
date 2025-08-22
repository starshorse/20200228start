
angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      template: '<h2>Welcome to AngularJS 1.x SPA!</h2><p>Edit app/js/app.js to get started. This app for sequelize.js DB table Editor</p>'
    });
});
