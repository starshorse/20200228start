angular.module('myFooter',[])
.controller('myFooterCtrl',['$scope', function($scope){
}])
.directive('myFooter', function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/footer.html',
		controller:'myFooterCtrl'
	}
})
