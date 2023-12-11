angular.module('myMain_0',[
	'ngCookies',
	'ngRoute',
	'myMain_1',
//	'myApp.rest_api',
	'myMain_0Header',
	'myFooter' ,
//	'work_space',
//	'templates',
//	'work_space.collections',
//	'admin_app',
//	'form_control',
])
.config(['$locationProvider', '$routeProvider', function( $locationProvider , $routeProvider){
	$locationProvider.html5Mode( { enabled: true , requireBase: false } )   
	$routeProvider.when('/', {
		template:`
			 <ng-include src="'/company/file_manager/company/'  +  server_name +  '/main.html'"></ng-include>
		`
	})
	.when('/download', {
		template:`
		<div class='flex-cc mt-5 container'>
		<h1>DOWNLOAD</h1>
		<table class='sec-table'>
		<tr>
		<th>Num</th>
		<th>File Name</th>
		<th>Owner</th>
		<th>Down Load</th>
		<tr ng-repeat='file in download_list'>
			  <td>{{ file.seq }}</td>
			  <td>{{ file.file_name }}</td>
			  <td>{{ file.user_id }}</td>
			  <td>
				<a ng-href={{ file.path }}" download><button class='btn btn-secondary' >다운로드</button></a>
			  </td>
		</table>
		</div>
		`,
		controller:'upload_downloadCtrl'
	})
	.otherwise({ redirectTo:'/'})
}])
.controller('upload_downloadCtrl',['$scope','$http', function( $scope , $http ){
	let user_DB = $scope.server_name 
	$http.get(`/company/data/${ user_DB }/uploadFile?db=mssql`).then((response)=>{
		console.log( response.data.tbl_data );
		$scope.download_list = response.data.tbl_data 
		$scope.$apply() 
	})
}])
angular.module('myMain_1',[])
.controller('myMain_0Ctrl',['$scope','$injector', '$cookies',  
	function( $scope, $injector , $cookies ){	
	var $location = $injector.get('$location'); 
	console.log( $location.host() ) 	

	$scope.my_collection ='main' 
	$scope.server_name = $cookies.get('user_DB', { path: '/' }) 	
	$scope.openApp = ()=>{
		// TBD 
	}
	socket = io() 
			}])
