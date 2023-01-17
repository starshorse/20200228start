angular.module('mySpreadjs',[])
.controller('mySpreadjsCtrl',['$scope','$injector',function( $scope, $injector){
        var spread_product = $injector.get('gc_spreadjsFactory') 
	$scope.spread = spread_product.create_spread( 3 ); 
	$scope.edit_lists = null 
	$scope.edit_lists_update = ( edit_lists )=>{
		$scope.edit_lists = edit_lists 
		if(!$scope.$$phase){
			$scope.$apply(); 
		}	
	}
	if( $injector.has('ezch_tbl_editorService')){
		var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService') 
		var spreadjs_eventsService = $injector.get('spreadjs_eventsService') 
		ezch_tbl_editorService.initTblView( $scope.spread ) 
		ezch_tbl_editorService.initTblList( $scope.spread ) 
	//	$scope.edit_lists = ezch_tbl_editorService.getEdit_lists()  
		ezch_tbl_editorService.setUpdate_editLists( $scope.edit_lists_update )
		spreadjs_eventsService.register_spread_bind_buttonClicked( $scope.spread ) 
		spreadjs_eventsService.register_sheet1_bind_cellDoubleClick( $scope.spread ) 
	}else if( $injector.has('ezof_log_monitorService')){
		var ezof_log_monitorService = $injector.get('ezof_log_monitorService') 
		ezof_log_monitorService.initTblView( $scope.spread ) 
	}else if( $injector.has('ezch_tbl_makerService')){
		var ezch_tbl_makerService = $injector.get('ezch_tbl_makerService')
		ezch_tbl_makerService.initTblView( $scope.spread ) 
	}

}])
.directive('mySpreadjs', function(){
	return{
		restrict : 'E',
		template : `<div id='ss' style='width:100%; height:800px; border: 1px solid gray;' ></div>`,
		controller: 'mySpreadjsCtrl'
	}
})
		
