angular.module('myWorkspaceHeader',['ngCookies'])
.controller('myWorkspaceHeaderCtrl',['$scope','$cookies','workSpace_service','workSpaceCollections_service','parseStr_service',
	function($scope,$cookies, workSpace_service, workSpaceCollections_service, parseStr_service ){
	$scope.header_list = [] 
	$scope.isHeaderEnabled = 1 	
	const initHeader = ()=>{
		$scope.header_list = workSpaceCollections_service.getHeaderList() 
		$scope.header_list.forEach(( ent)=>{
			ent.url = parseStr_service.parse_str_f( ent.url ) 
		})
		$scope.companyName = workSpace_service.getAppCompanyInfo_post()[0].CorporationName 
//		$scope.companyName = workSpace_service.getAppCompanyInfo_post()[0].title 
		$scope.$apply() 
	}
    workSpaceCollections_service.initCollection_f.addPost_initCollection_f_list( initHeader ) 
    workSpaceCollections_service.initCollection_f.addPost_overrideCollection_f_list( initHeader ) 
	$scope.updateApps_list2 = ( apps_list_parent_name )=>{
		console.log( apps_list_parent_name ) 
//        workSpace_service.initAppsList_by_parent_id( apps_list_parent_name , $scope ,$scope.openTbl )
		$scope.reInit_appList( apps_list_parent_name ) 
	}
	$scope.headerIf_show = ( menuName ) =>{
		if( $scope.headerMenu_list.find( ent=> ent == menuName )) return 1 
		return 0 
	}
}])
.directive('myHeader',function(){
	return{
		restrict:'E',
		templateUrl:'/parts/headers/header.html',
		controller:'myWorkspaceHeaderCtrl'
	}
})
.filter('ezC_name', function(){
	return function( input){
		return ( angular.isString(input) && input.length > 0 )? input.charAt(0).toUpperCase() + input.charAt(1).toUpperCase() + input.slice(2)  : input ; 
	}
})
