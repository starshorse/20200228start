angular.module('ezworks',[
	'ui.router',
	'ngCookies',
	'myLogin.login',
	'myLogin.register',
	'myMain_0Header'
])
.config( function( $stateProvider, $urlRouterProvider){
	var login ={
		name:'login',
		url:'/login',
		templateUrl:'/parts/admin/login/login.parts.html', 
		resolve:{
			users: async function($http){
				let users = await $http.get('/Hades/dba_editor/web_users') 
	        	return users.data.DATA  		
			},
			companies: async function($http){
                let companies = await  $http.get('/Jupiter/db_edit/jupiter/server_list'); 
				return companies.data.DATA 
			}
		},
		controller:'loginCtrl'
	}
	var companies_list = {
		name:'companies_list',
		url:'/companies_list/{ myParam: json }',
		params: { myParam: null },
		templateUrl:'/parts/admin/mainGate/mainGate.parts.html',
		controller:'companies_listCtrl' 
	}
	var main_page = {
		name: 'main_page',
		url:'/main_page',
		templateUrl:'/parts/mainPage/main/main.parts.html',
	    controller:'main_pageCtrl'
	}
	$stateProvider.state(login) 
	$stateProvider.state(companies_list ) 
	$stateProvider.state(main_page )
	$urlRouterProvider.otherwise('/login') 
})
.controller('ezworksCtrl', ['$scope', function($scope){

}])
.controller('main_pageCtrl',['$scope','$injector','$stateParams',function( $scope, $injector, $stateParams  ){
}])
.controller('companies_listCtrl',['$scope','$injector','$stateParams',function( $scope, $injector, $stateParams  ){
	    var $Cookies = $injector.get('$cookies') 
		var $state = $injector.get('$state') 
        $scope.login_companies = $stateParams.myParam 
	    $scope.go = ( company )=>{
               $Cookies.put('user_DB' , company.db_name , { path: '/' })
			   $Cookies.put('org_name', company.name  , { path: '/ ' }) 
			   $Cookies.put('server_name', company.server_name , { path: '/ ' }) 
//			   window.location.href ='http://localhost:9000/admin'
			   $state.go('main_page') 
			   
		}
}])
.controller('loginCtrl',['$scope','$injector','users','companies', function( $scope, $injector, users, companies ){
		var $state = $injector.get('$state') 
		var $Cookies = $injector.get('$cookies') 
		$scope.user_id 
		$scope.password 
		$scope.users = users
		$scope.login = users  
		$scope.companies = companies.data 
		$scope.login_companies = companies.data 
		$scope.cur_view = 'login' 
		$scope.isCurView = ( curView )=>curView == $scope.cur_view 
		$scope.setCurView = ( curView )=>$scope.cur_view = curView 
	    $scope.getLogin = ( user_id, password )=>{
			$scope.login = $scope.users.filter((ent)=> ent.email == user_id && ent.password == password );  
			$scope.login_companies = [] 
			for( login of $scope.login ){
                  let company = $scope.companies.find((ent)=>ent.db_name == login.db_name )
				 if( company ) 
					$scope.login_companies.push(company) 
			}
			if( $scope.login_companies.length ==  0){
				alert(" no company avaiable" );
				return -1 ;
			}
			console.log( user_id );
            $Cookies.put('user', user_id, { path: '/' })  
			$state.go("companies_list",{ myParam: $scope.login_companies } )
		}
}])
