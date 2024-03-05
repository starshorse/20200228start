/*
	applist{ title .. } 
*/
angular.module('mySidebar',[])
.controller('mySidebarCtrl',['$scope',function( $scope ){
	$scope.apps_list = $scope.appslist.list 
	$scope.openApp = $scope.appslist.openApp 
}])
.controller('mySidebar2levelCtrl',['$scope',function( $scope ){
	$scope.collections_list = $scope.collectionslist.collections_list 
	$scope.apps_list = $scope.collectionslist.apps_list 
	$scope.openApp = $scope.collectionslist.openApp 
	$scope.openParent = $scope.collectionslist.openParent 
}])
.directive('mySidebar', function(){
	return {
		restrict:'E',
		scope: {
			appslist: '=',
		},
		templateUrl:'/angularJS-ui/app/07/sidebars/sidebars.html',
		controller:'mySidebarCtrl'
	}
})
.directive('mySidebar2level',function(){
	return {
		restrict:'E',
		scope:{
			collectionslist:'=',
		},
		templateUrl:'/angularJS-ui/app/07/sidebars/sidebars_appEdit.html',
		controller:'mySidebar2levelCtrl'
	}
})




