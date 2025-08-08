// angular.module('myApp',['myApp.controllers','ngRoute']);
angular.module('myNg').config(function($routeProvider){
    $routeProvider.when('/view1',{
        controller:'controller1',
        template:'<h1 ng-init ng-model="name" >Hello route1 {{name}}</h1>',
       //  templateUrl:'partial1.html',
    })
        .when('/view2',{
        controller:'controller2',
        template:'<h1>Hello route2</h1>',})
        .otherwise({
            template:'<h1>Default </h1>',
        })           
});
angular.module('myNg').controller('controller1',['$scope',function($scope){
       $scope.name = 'RICHARD CHOI'; 
}]);
angular.module('myNg.controllers',[]).controller('controller2',function($scope){});
