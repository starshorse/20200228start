/*
	input: login="login" 
	*/
angular.module('myLogin.login',[])
.run( function(){
})
.controller('myLogin_loginCtrl', ['$scope', function($scope){
	$scope.user_id 
	$scope.user_password 
	$scope.login_ack = ( username , password )=>{
		$scope.login.login_ack( username, password ); 
	}
// lgoin_no_bootstrap using codes.. 
    const signup = document.getElementById("sign-up");
	signin = document.getElementById("sign-in");
	loginin = document.getElementById("login-in");
	loginup = document.getElementById("login-up");
	signup.addEventListener("click", () => {
		loginin.classList.remove("block");
		loginup.classList.remove("none");

		loginin.classList.add("none");
		loginup.classList.add("block");
	})
	signin.addEventListener("click", () => {
		loginin.classList.remove("none");
		loginup.classList.remove("block");

		loginin.classList.add("block");
		loginup.classList.add("none");
	})
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
.directive('myLoginnobts', function(){
	return {
		restrict:'E', 
		scope: {
			login: "="
		},
		templateUrl:'/directives/login/login_no_bootstrap.html', 
        controller:'myLogin_loginCtrl'
	}
})
