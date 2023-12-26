angular.module('myMain_0Header',[])
.controller('myMain_0HeaderCtrl',['$scope','$location','$cookies','$http', async function($scope, $location, $cookies,$http ){
    $scope.host = $location.host(); 		
	let server_name = $cookies.get('server_name');
	let user = $cookies.get('user');
	let user_DB = $cookies.get('user_DB');
	$scope.companyName = user_DB ; 
	if( server_name == 'ezoffice')
		$scope.is_ezoffice = true ; 
	$scope.hrefs = { 
		work_config :`http://${ $scope.host }:9000/admin/exists/index_gc.html`,
		logOut:`/#!login`, 
		db_work:`http://${ $scope.host }:9000/app/ezch_tbl_editor/`, 
			tbl_editor:`http://${ $scope.host }:9000/app/ezch_tbl_editor/`, 
			tbl_maker:`http://${ $scope.host }:9000/app/ezch_tbl_maker/`, 
	    upload_file:`http://${ $scope.host }:9000/company/file_manager/`,
		emPower:`http://${ $scope.host }:9000/admin/`, 
		authentication:`http://${ $scope.host }:5010/ui?company=${ user_DB }`, 
			auth_esr:`http://${ $scope.host }:5010/ui?company=${ user_DB }`, 
			auth_cert:`http://${ $scope.host }:5010/bootstrap`, 
		work_space :`https://${ $scope.host }:3004/company/workspace/?my_collection=collectionIntro`, 
	} 
	let curUser_info = await $http.get(`/Hades/dba_editor/web_user/${ user_DB }/${ user }`);
    $scope.cur_user_info = curUser_info.data.DATA[0] 
	$scope.$apply();

}])
.directive('myHeader',function(){
	return{
		restrict:'E',
		templateUrl:'/directives/header/main_header.directives.html',
		controller:'myMain_0HeaderCtrl'
	}
})
.filter('ezC_name', function(){
	return function( input){
		return ( angular.isString(input) && input.length > 0 )? input.charAt(0).toUpperCase() + input.charAt(1).toUpperCase() + input.slice(2)  : input ; 
	}
})
