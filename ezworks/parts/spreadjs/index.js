angular.module('mySpreadjs',[])
.controller('mySpreadjsCtrl',['$scope','$injector',function( $scope, $injector){
        var spread_product = $injector.get('gc_spreadjsFactory') 
	var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService') 
	var spreadjs_eventsService = $injector.get('spreadjs_eventsService') 
	$scope.spread = spread_product.create_spread( 3 ); 
	ezch_tbl_editorService.initTblList( $scope.spread ) 
	spreadjs_eventsService.register_spread_bind_buttonClicked( $scope.spread ) 
	spreadjs_eventsService.register_sheet1_bind_cellDoubleClick( $scope.spread ) 

}])
.directive('mySpreadjs', function(){
	return{
		restrict : 'E',
		template : `<div id='ss' style='width:100%; height:800px; border: 1px solid gray;' ></div>`,
		controller: 'mySpreadjsCtrl'
	}
})
		
