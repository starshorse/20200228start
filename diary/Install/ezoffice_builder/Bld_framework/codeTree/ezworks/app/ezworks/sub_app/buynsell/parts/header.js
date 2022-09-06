angular.module('myBuynsellHeader',[])
.controller('myBuynsellHeaderCtrl',['$scope', function($scope){

}])
.directive('myHeader',function(){
	return{
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/header.html',
		controller:'myBuynsellHeaderCtrl'
	}
})
