angular.module('myMain_0Header',[])
.controller('myMain_0HeaderCtrl',['$scope','$location','$cookies','$http', async function($scope, $location, $cookies,$http ){
    	$scope.host = $location.host(); 		
	$scope.port = $location.port();
	$scope.app_info = { hades_address: '' ,DBMS : ''  }
	let server_name = $cookies.get('server_name');
	let user = $cookies.get('user');
	let user_DB = $cookies.get('user_DB');
	$scope.companyName = user_DB ; 
	if( server_name == 'ezoffice')
		$scope.is_ezoffice = true ; 
	$scope.hrefs = { 
		work_config :`http://${ $scope.host }:${ $scope.port }/admin/exists/index_gc.html`,
		logOut:`/#!login`, 
		db_work:`http://${ $scope.host }:${ $scope.port }/app/ezch_tbl_editor/`, 
		tbl_editor:`http://${ $scope.host }:${ $scope.port }/app/ezch_tbl_editor/`, 
		tbl_maker:`http://${ $scope.host }:${ $scope.port }/app/ezch_tbl_maker/`, 
	        upload_file:`http://${ $scope.host }:${ $scope.port }/company/file_manager/`,
		emPower:`http://${ $scope.host }:${ $scope.port }/admin/`, 
		authentication:`http://${ $scope.host }:5010/ui?company=${ user_DB }`, 
		auth_esr:`http://${ $scope.host }:5010/ui?company=${ user_DB }`, 
		auth_cert:`http://${ $scope.host }:5010/bootstrap`, 
		work_space :`https://${ $scope.host }:3004/company/workspace/?my_collection=collectionIntro`, 
	} 
	let curUser_info = await $http.get(`/Hades/dba_editor/web_user/${ user_DB }/${ user }`);
	let DBMS_info = await $http.get('/Hades/Info').catch((err)=>console.log(err)); 
	$scope.app_info.DBMS = DBMS_info.data.DBMS 
	let curApp_info = await $http.get('/info').catch((err)=>console.log(err)); 
	$scope.app_info.hades_address = curApp_info.data.hades_address ;
	$scope.app_info.client_tar  =  curApp_info.data.client_tar ;
//1    $scope.cur_user_info = curUser_info.data.DATA[0] 
        $scope.cur_user_info = curUser_info.data.DATA 
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
