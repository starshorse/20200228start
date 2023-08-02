/*
	input: login="login" 
	*/
angular.module('myLogin.login',[])
.controller('myLogin_loginCtrl', ['$scope', function($scope){
	$scope.user_id 
	$scope.user_password 
	$scope.login_ack = ( username , password )=>{
		$scope.login.login_ack( username, password ); 
	}
}]) 
.directive('myLogin', function(){
	return {
		restrict:'E', 
		scope: {
			login: "="
		},
		templateUrl:'/directives/login/login.html', 
        controller:'myLogin_loginCtrl'
	}
})
