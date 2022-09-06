angular.module('myMainbtn',[])
.controller('myMainbtnCtrl',['$scope', function($scope){
	$scope.row_add = ()=>{
		ezData_RowAdd_parsing($scope.spread, $scope.spread_data) 
	}
}])
.directive('myMainbtn', function(){
	return{
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/mainbtn.html',
		controller:'myMainbtnCtrl'
	}
})
