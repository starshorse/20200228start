angular.module('mySumtbl',[])
.controller('mySumtblCtrl',['$scope',function(){
}])
.directive('mySumtbl',function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/sumtbl.html',
		controller:'mySumtblCtrl'
	}
})
