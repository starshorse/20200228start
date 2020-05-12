
var app;
app = angular.module('myNg',['myNg.controllers','ngRoute','ngMessages']);
// app = angular.module('myNg',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        template:'<h1>Root(/)</h1>',
    })
    .when('/view1',{
        controller:'controller1',
        template:'<h1 ng-model="name">Hello route1 {{name}}</h1>',
       //  templateUrl:'partial1.html',
    })
        .when('/view2',{
        controller:'controller2',
        template:'<h1>Hello route2</h1>',})
        .otherwise({
            template:'<h1>Default </h1>',
        })
});
