angular.module('myApp', ['ui.router'])
.config(function( $stateProvider, $urlRouterProvider ){
	$stateProvider
	.state('home', {
		url:'/home', 
		templateUrl: '/angularJS-ui/app/03/home.html',
		controller: function($scope){
			$scope.welcome="hello world"; 
		}
	})
	.state('order',{
		url:'/order/:orderid',
//1		templateUrl:'/angularJS-ui/app/03/order.html'
		template: function( $stateParams ){
			return `<h3> You ordered : ${ $stateParams.orderid } .hehe</h3>`
		}
	})   	
	$urlRouterProvider.otherwise('/home')
})
