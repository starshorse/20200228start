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
		work_config :`https://${ $scope.host }:3004/admin/jupiter_web/`,
		logOut:'/#!/main_page', 
		db_work:`https://${ $scope.host }:5000/apps/ezch_tbl_maker_app/`, 
		emPower:`https://${ $scope.host }:3004/admin/jupiter_db/`, 
		authentication:`http://${ $scope.host }:5010/ui?company=${ user_DB }`, 
		work_space :`https://${ $scope.host }:3004/company/workspace/?my_collection=collectionIntro`, 
		upload:'/company/file_manager/' ,
		download:'/company/file_manager/#!download' 
	} 
	let curUser_info = await $http.get(`/Hades/dba_editor/web_user/${ user_DB }/${ user }`);
    $scope.cur_user_info = curUser_info.data.DATA[0] 
	$scope.$apply();

}])
.directive('myHeader',function(){
	return{
		restrict:'E',
		templateUrl:'/company/file_manager/parts/header.html',
		controller:'myMain_0HeaderCtrl'
	}
})
.filter('ezC_name', function(){
	return function( input){
		return ( angular.isString(input) && input.length > 0 )? input.charAt(0).toUpperCase() + input.charAt(1).toUpperCase() + input.slice(2)  : input ; 
	}
})
