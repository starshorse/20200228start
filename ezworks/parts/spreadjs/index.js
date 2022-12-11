angular.module('mySpreadjs',[])
.controller('mySpreadjsCtrl',['$scope','$injector',function( $scope, $injector){
        var spread_product = $injector.get('gc_spreadjsFactory') 
	spread_product.create_spread( 3 ); 
}])
.directive('mySpreadjs', function(){
	return{
		restrict : 'E',
		template : `<div id='ss' style='width:100%; height:800px; border: 1px solid gray;' ></div>`,
		controller: 'mySpreadjsCtrl'
	}
})
		
