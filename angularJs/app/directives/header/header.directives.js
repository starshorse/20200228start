/*
		    <my-header header="header"></my-header> 
	        $scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
*/			
angular.module('myHeader',[])
.controller('myWorkspaceHeaderCtrl',['$scope',
	function($scope ){
    $scope.changeState = ( item )=>{
		console.log('chageState', item );
		$scope.header.changeSpace( item );
	}
}])
.directive('myHeader',function(){
	return{
		restrict:'E',
		scope:{
			header: '=',
			changeSpace: '&'
		},
		templateUrl:'/directives/header/header.html',
		controller:'myWorkspaceHeaderCtrl'
	}
})
.filter('ezC_name', function(){
	return function( input){
		return ( angular.isString(input) && input.length > 0 )? input.charAt(0).toUpperCase() + input.charAt(1).toUpperCase() + input.slice(2)  : input ; 
	}
})
