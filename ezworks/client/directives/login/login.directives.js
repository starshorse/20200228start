angular.module('myLogin.login',[])
.controller('myLogin_loginCtrl', ['$scope', function($scope){
	$scope.user_id 
	$scope.user_password 
}]) 
.directive('myLogin', function(){
	return {
		restrict:'E', 
		templateUrl:'/directives/login/login.directives.html', 
        controller:'myLogin_loginCtrl'
	}
})
