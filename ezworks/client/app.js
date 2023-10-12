angular.module('ezworks',[
	'ui.router',
	'ngCookies'

])
.config( function( $stateProvider, $urlRouterProvider){
	var login ={
		name:'login',
		url:'/login',
		template:`
		<label for "user_id">user id
		<input type="email" name="user_id" placeholder="richard.choi@ez-office.co.kr" ng-model="user_id" />
		</label>	
		<label for "user_id">password
		<input type="password" name="user_id" ng_model="password" />
		</label>	
		<button ng-click="getLogin( user_id, password )">OK</button> 
		{{ login | json  }} 
		`,
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
		template:`
		<table>
		<tr>
		<th>Server</th>
		<th>Organization</th>
		<th>GO</th>
		</tr>
		<tr ng-repeat="company in login_companies">
		<td>{{ company.server_name}}</td>
		<td>{{ company.name }}</td>
		<td><button ng-click="go( company )">GO</button></td>
		</tr> 
		</table> 
		`,
		controller:'companies_listCtrl' 
	}
	$stateProvider.state(login) 
	$stateProvider.state(companies_list ) 
	$urlRouterProvider.otherwise('/login') 
})
.controller('ezworksCtrl', ['$scope', function($scope){

}])
.controller('companies_listCtrl',['$scope','$injector','$stateParams',function( $scope, $injector, $stateParams  ){
	    var $Cookies = $injector.get('$cookies') 
        $scope.login_companies = $stateParams.myParam 
	    $scope.go = ( company )=>{
               $Cookies.put('user_DB' , company.db_name , { path: '/' })
			   $Cookies.put('org_name', company.name  , { path: '/ ' }) 
			   $Cookies.put('server_name', company.server_name , { path: '/ ' }) 
			   window.location.href ='http://localhost:9000/admin'
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
            $Cookies.put('user', $scope.user_id, { path: '/' })  
			$state.go("companies_list",{ myParam: $scope.login_companies } )
		}
}])
