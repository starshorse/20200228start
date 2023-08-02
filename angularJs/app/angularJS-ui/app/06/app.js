angular.module('myApp',[
'ui.router',
'ngCookies',	
'myDomodal',	
'myLogin.login',	
'myHeader',	
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
		controller: function( $scope,$injector ){
			var admin_app = $injector.get('adminApp_service'); 
		    var $state = $injector.get('$state'); 	
			var vm = this;
			vm.login = login;
			admin_app.ClearCredentials();
			function login(){
				vm.dataLoading = true;
				const cb_f = ( response )=>{
					if( response.success )
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
		    <my-header header="header" changeSpace="changeSpace( collection )"></my-header> 
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
	        $scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
			const reister_state = ( apps )=>{
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
			$scope.changeSpace =( collection )=>{
				if( collection == 'logout' )
					$state.go('login'); 
				else
				    $state.go('work_space', { cur_collection: collection } ) 
			}
			$scope.changeApp = ( app )=>{
				$state.go(`${ app }`) 
			}
            if( $scope.apps )
					deregister_state( $scope.apps );

			$scope.header.header_list = $scope.collections = workSpace_service.getCollections( $stateParams.cur_collection ) 
			$scope.header.changeSpace = $scope.changeSpace ; 
			$scope.apps = workSpace_service.promise_getAppsListData( $stateParams.cur_collection ) 
		    reister_state( $scope.apps)
		}
	}	
	$stateRegistryProvider.register( login ); 
	$stateRegistryProvider.register( work_space ); 
})
.run( function( $http, $rootScope ){
/*	
	$http.get('people.json', { cache: true }) 
	$http.get('company.json', { cache: true }) 
*/
	$rootScope.$on('$locationChangeStart', function( event, next, current ){
		console.log('$location change current', current, 'to', next );
	})
	$rootScope.$on('$stateChangeStart', function( event, next, current ){
		console.log('$state change current', current, 'to', next );
	})

}) 
