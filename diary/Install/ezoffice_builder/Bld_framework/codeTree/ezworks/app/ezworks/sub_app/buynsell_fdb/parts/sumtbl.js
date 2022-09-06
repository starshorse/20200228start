angular.module('mySumtbl',[])
.controller('mySumtblCtrl',['$scope',function($scope){
	$scope.sumtbl = { totalProductPrice: 0 , totalSupplyPrice:0 , totalAddTax:0 , prePaid:0 , paid:0, notPaid: 0 }  
	const socket = io() 
	socket.on('updateSumTbl', ( res)=>{
		$scope.sumtbl = res 
		$scope.$apply() 
	})
}])
.directive('mySumtbl',function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/sumtbl.html',
		controller:'mySumtblCtrl'
	}
})
