angular.module('myApp',[
'ui.router',
'ngCookies',	
'myDomodal',	
'myLogin.login',	
'admin_app',
'work_space',	
])
.config( function( $urlRouterProvider, $stateProvider, $stateRegistryProvider ){
	$urlRouterProvider.otherwise('/login'); 
	var login ={
		name: 'login',
		url:'/login',
		template:`<h1>Hello {{ name }}</h1>
		<my-login login="login"></my-login> 
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
		controller: function( $scope,$injector, people, company, setting  ){
			var admin_app = $injector.get('adminApp_service'); 
		    var $state = $injector.get('$state'); 	
			$scope.name = people[0].name 
			$scope.company = company 
			$scope.user = setting.user 
			$scope.user_DB = setting.user_DB 
			var vm = this;
			vm.login = login;
			admin_app.ClearCredentials();
			function login(){
				vm.dataLoading = true;
				const cb_f = ( response )=>{
					if( response.success )
//						$state.go('company', { org_name: 'ezchemtech' } )
						$state.go('work_space', { cur_collection: 'home' } )
				    else
						vm.dataLoading = false;
				}
				admin_app.Login( vm.username , vm.password, cb_f );  
			}
			function login_ack( user_id , password ){
				vm.username = user_id ;
				vm.password = password ;
				login() 
			}
			$scope.login = { login_ack }
		},
		controllerAs: 'vm' ,
	}
//	$stateProvider.state(login); 
	var work_space ={
		name: 'work_space',
		url: '/work_space/:cur_collection', 
		template:`
		    <h3>ezoffice</h3> 
            <p>Collection List</p>
			<ul>
				<li ng-repeat="collection in collections"  ng-click="changeSpace( collection )">{{ collection }}</li>  
		    </ul>
		    <p>Cur application list</P> 
			<ul>
				<li ng-repeat="app in apps"  ng-click="changeApp( app )">{{ app }}</li>  
		    </ul>
		    <ui-view></ui-view> 
		`,
		controller: function( $scope, $stateParams, $injector ){
			var workSpace_service = $injector.get('workSpace_service') 
			var $state = $injector.get('$state')  
			var $stateRegistry = $injector.get('$stateRegistry'); 
			const reister_state = ( apps )=>{
//				var work_spaceState = $stateRegistry.get('work_space') 
//				console.log( work_spaceState ) 	
				for( app_state of apps ){
					var nw_state ={
						name: app_state ,
						parent: 'work_space', 
						url: `/work_space.${ app_state }`,
						template:`
						<h3>current app: ${ app_state }
						`
					}	
				   if(!$stateRegistry.get(app_state))
				 	  $stateRegistry.register( nw_state ) 
				}
			}
			const deregister_state =(apps)=>{
				for( app_state of apps ){
					$stateRegistry.register( app_state ) 
				}
			}
            if( $scope.apps )
					deregister_state( $scope.apps );

			$scope.collections = workSpace_service.getCollections( $stateParams.cur_collection ) 
			$scope.apps = workSpace_service.promise_getAppsListData( $stateParams.cur_collection ) 
		    reister_state( $scope.apps)
			$scope.changeSpace =( collection )=>{
				$state.go('work_space', { cur_collection: collection } ) 
			}
			$scope.changeApp = ( app )=>{
				$state.go(`${ app }`) 

			}
		}
	}	
	$stateRegistryProvider.register( login ); 
	$stateRegistryProvider.register( work_space ); 
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
