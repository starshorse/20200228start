angular.module('myApp',[
'ui.router',
'myDomodal',	
])
.config( function( $urlRouterProvider, $stateProvider ){
	$urlRouterProvider.otherwise('/'); 
	var home ={
		name: 'home',
		url:'/',
		template:`<h1>Hello {{ name }}</h1>
			    <table>
					<tr><th>ID</th><th>ORG_NAME</th><th>mainDB</th><th>Level</th><th>Start</th><th>Contact</th></tr>
		            <tbody ng-repeat="org in company">
		             <tr>
		  				<td>{{ org.id }}</td>
		  				<td>{{ org.org_name }}</td>
		  				<td>{{ org.mainDB }}</td>
		  				<td>{{ org.service_level }}</td>
		  				<td>{{ org.start_date }}</td>
		  				<td>{{ org.contact }}</td>
		            </tr>
		            </tbody> 
		        </table>
		`,
		resolve:{
			people:async function($http){
				let result =  await $http.get('people.json') 
				return result.data 
			},
			company:async function($http){
				let result =  await $http.get('company.json') 
				return result.data 
			},
			setting: function( $q , $timeout ){
				let deferred = $q.defer() 
				$timeout( function(){
					return deferred.resolve({user:'star_horse@naver.com', user_DB: 'ezchemtech' })} , 1000 )
				return deferred.promise 
			}
		},
		controller: function( $scope, people, company, setting ){
              $scope.name = people[0].name 
			  $scope.company = company 
			  $scope.user = setting.user 
              $scope.user_DB = setting.user_DB 
		},
		controllerAs: 'vm' ,
	}
	$stateProvider.state(home); 
	$stateProvider.state({
		name: 'company',
		url:'/company/:org_name',
		template:`
			<h1 ng-click="show_popup()">user_DB: {{ user_DB }}</h1> 
		    <a ui-sref="company.detail">Detail Information</a> 
		    <my-domodal modal="modal"></my-domodal> 
		    <ui-view></ui-view> 
		`,
		controller: function( $scope, $stateParams ){
			$scope.org_name = $stateParams.org_name 
			$scope.user_DB = 'ezchemtech'
			$scope.user = 'star_horse@naver.com'
			$scope.modal = { title : "Intro" , content: "hello start_horse on ezchemtech" }
			$scope.show_popup = ()=>{
					$scope.$broadcast('doModal'); 
			}
//		$('#exampleModalCenter').modal() 
		}
	},
	).state({
		name: 'company.detail',
		url: '/company.detail', 
		template:`
			<table>
				<tr><th>name</th><th>mainDB</th><th>contact</th></tr>
		        <tr><td>{{ user }}</td><td>{{ user_DB }}</td><td>star_horse@naver.com</td></tr>
		    </table>
		`
	}
	)
})
.run( function( $http, $rootScope ){
//	$http.get('/angularJS-ui/app/04/people.json', { cache: true }) 
	$http.get('people.json', { cache: true }) 
	$http.get('company.json', { cache: true }) 

	$rootScope.$on('$locationChangeStart', function( event, next, current ){
		console.log('$location change current', current, 'to', next );
	})
	$rootScope.$on('$stateChangeStart', function( event, next, current ){
		console.log('$state change current', current, 'to', next );
	})

}) 
