angular.module('routeParam').controller('ctlRouteParam',['$scope','$routeParams',function($scope, $routeParams){
    $scope.name = $routeParams.a ;
    $scope.age = $routeParams.b ;
}])