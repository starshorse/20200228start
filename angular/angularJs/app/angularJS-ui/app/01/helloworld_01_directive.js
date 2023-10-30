var myApp = angular.module('myApp', [
'ui.router',
'myView2'	
]);
myApp.config( function( $stateProvider, $urlRouterProvider ){
	var helloState ={ 
		name: 'hello',
		url:'/hello',
		template:'<h3>hello world!</h3>'
	}
	var aboutState ={
		name: 'about',
		url:'/about',
		template:'<h3>Its the UI-Router hello world app!</h3>',
		resolve:{ person: function(){ return { name:'Ari', age:45 , company:'ez-office.co.kr'} }},
		controller:['$scope','person',function( $scope ,person ){
			console.log( person )
		}]
	}
	var priorityState ={
		name: 'priority',
		url:'/priority/:viewId',
		controller:function($scope , $stateParams ){
			this.viewId = $stateParams.viewId ;
			$scope.test = '1234';
		},
		controllerAs: 'ctrl',
		template:'<my-view2 test="ctrl.viewId"></my-view2>'
	}
	$stateProvider.state(helloState);
	$stateProvider.state(aboutState); 
	$stateProvider.state(priorityState); 

/* nested  component example */	
	$stateProvider.state('inbox', {
		url:'/inbox/:inboxId/{sorted:[0-9a-fA-F]{6}}',
		template:"<div><h1>Welcome to your inbox</h1> \
			<a ui-sref='inbox.priority'>show priority</a> \
		<div ui-view></div></div>",
		controller: function( $scope, $stateParams ){
			$scope.inboxId = $stateParams.inboxId 
		}})
		.state('inbox.priority', {
			url:'/priority',
			template:`<h2>your priority inbox {{ inboxId }}</h2>
				     <a ui-sref='inbox'>return2priority</a> 
			`
		})
})
angular.module('myView2',[])
.controller('myView2Ctrl',['$scope','$injector', function( $scope, $injecctor ){
	   console.log( $scope.test );
}])
.directive('myView2', function(){
	return {
		restrict:'EA',
		scope:{
			test:'=' 
		},
		template:'<h1>This is myView2 !{{ test  }}</h1>', 
		controller:'myView2Ctrl' 
	}	
})
