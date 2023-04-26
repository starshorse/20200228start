angular.module('myDesignHeader',[])
.controller('myDesignHeaderCtrl',['$scope', function($scope){

}])
.directive('myHeader',function(){
	return{
		restrict:'E',
		templateUrl:'/db_edit/parts/header.html',
		controller:'myDesignHeaderCtrl'
	}
})
