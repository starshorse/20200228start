var myApp = angular.module('myApp', ['ui.router']);
var helloState = {
      name: 'hello',
        url: '/hello',
          template: '<h3>hello world!</h3>'
}
myApp.config(function($stateProvider, $urlRouterProvider) {
      var helloState = {
              name: 'hello',
                  url: '/hello',
                      template: '<h3>hello world!</h3>'
                            }

        var aboutState = {
                name: 'about',
                url: '/about',
                template: '<h3>Its the UI-Router hello world app!</h3>',
/*			
			    controller: function( $scope, person ){
					$scope.persion = person 
					console.log( person ) 
				}
*/				
          }
/*	
		 var priorityState = {
			 	name: 'priority', 
			    url:'/priority',
			    template:'<h2>your priority inbox </h2>',
		  }	
	      $stateProvider.state(priorityState) */
          $stateProvider.state(helloState);
          $stateProvider.state(aboutState, { resolve:{
			  person : function(){ return { name:'Ari', age: 45 , company:  'ez-office.co.kr' }
		  }
		  }
		  });
	      $stateProvider.state('inbox', {
			  url:'/inbox/:inboxId/{sorted:[0-9a-fA-F]{6}}',
			  template: "<div><h1>Welcome to your inbox</h1>  \
				<a ui-sref='inbox.priority'>show priority</a> \
			    <div ui-view></div></div>",
			  controller: function( $scope, $stateParams ){
				  $scope.inboxId = $stateParams.inboxId 
			  }})
			  .state('inbox.priority', {
				  url:'/priority',
				  template:'<h2>your priority inbox </h2>'
			  })	
});
