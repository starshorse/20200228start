'use strict';
angular.module('myApp', [
  'ui.router'
])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('layout', {
        url: "",
        //templateUrl: 'partials/layout.html',
        templateUrl: 'tpl.layout.html',
        controller:'LayoutController',
        abstract:true, 
        resolve : {
            result_data: function ($q, $timeout)//,CommonService)
            {
                 //return resolve_homepage($q,CommonService)
                 var deferred = $q.defer();
                 $timeout(function(){
                    deferred.resolve("from a parent");
                 }, 500);
                return deferred.promise;
            } 
        }
    })
    .state('homepage', {
        url: "/homepage",
        //templateUrl: 'partials/homepage.html',
        templateUrl: 'tpl.home.html',
        parent: 'layout',
        controller:'HomepageController',
        resolve : {
            result_data_child: function ($q, $timeout)//,CommonService)
            {
                 //return resolve_homepage($q,CommonService)
                 var deferred = $q.defer();
                 $timeout(function(){
                    deferred.resolve("from a child");
                 }, 500);
                return deferred.promise;
            }
        } 
    })
  })
  .controller('LayoutController', function ($scope, $state, result_data) {
    $scope.state = $state.current;
    $scope.result_data = result_data;
  })
  .controller('HomepageController', function ($scope, $state, result_data, result_data_child) {
    $scope.state = $state.current;
    $scope.result_data_parent = result_data;
    $scope.result_data_child  = result_data_child;
  })
  
  .config(['$urlRouterProvider',
    function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/homepage');
    }
  ]);
