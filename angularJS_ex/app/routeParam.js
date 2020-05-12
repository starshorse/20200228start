angular.module('routeParam',['ngRoute']).config(function($routeProvider){
 $routeProvider
 .when('/',{
     template: '<h1>Hello routeParam</h1>' })
 .when('/routeParam/:a/:b',{
     template: '<h3>{{ name }} + {{ age }}</h3>',
     controller: 'ctlRouteParam',
 })
 });