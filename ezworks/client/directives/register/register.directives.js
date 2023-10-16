angular.module('myLogin.register',[])
.controller('myLogin_registerCtrl', ['$scope', function($scope){
}]) 
.directive('myRegister', function(){
	return {
		restrict:'E', 
		templateUrl:'/directives/register/register.directives.html', 
        controller:'myLogin_registerCtrl'
	}
})

