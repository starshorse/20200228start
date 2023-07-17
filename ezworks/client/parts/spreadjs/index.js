/*
	note: 
		1. initWorkBbook should be sync with await before regsiter events. 
		   spreadjs_eventsService.register_sheet0_bind_cellDoubleClick( $scope.spread ) 
		

*/
angular.module('mySpreadjs',[])
.controller('mySpreadjsCtrl',['$scope','$injector',async function( $scope, $injector){
        var spread_product = $injector.get('gc_spreadjsFactory') 
	var $http = $injector.get('$http');
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
		spreadjs_eventsService.register_sheet0_bind_selectionChanged( $scope.spread ) 
	}else if( $injector.has('ezof_log_monitorService')){
		var ezof_log_monitorService = $injector.get('ezof_log_monitorService') 
		ezof_log_monitorService.initTblView( $scope.spread ) 
	}else if( $injector.has('ezch_tbl_makerService')){
		var ezch_tbl_makerService = $injector.get('ezch_tbl_makerService')
		ezch_tbl_makerService.initTblView( $scope.spread ) 
	}else if( $injector.has('ezof_dba_editorService')){
		var ezof_dba_editorService = $injector.get('ezof_dba_editorService')
		var spreadjs_eventsService = $injector.get('spreadjs_eventsService') 
		await ezof_dba_editorService.initWorkbook( $scope.spread );
		spreadjs_eventsService.register_spread_bind_buttonClicked( $scope.spread ) 
		spreadjs_eventsService.register_sheet0_bind_cellDoubleClick( $scope.spread ) 
		spreadjs_eventsService.register_sheet1_bind_cellDoubleClick( $scope.spread ) 
	}else if( $injector.has('db_administrationService')){
		var db_administrationService = $injector.get('db_administrationService')
		var spreadjs_eventsService = $injector.get('spreadjs_eventsService') 
		await db_administrationService.initWorkbook( $scope.spread );
		spreadjs_eventsService.register_spread_bind_buttonClicked( $scope.spread ) 
		spreadjs_eventsService.register_sheet0_bind_cellDoubleClick( $scope.spread ) 
		spreadjs_eventsService.register_sheet1_bind_cellDoubleClick( $scope.spread ) 
		spreadjs_eventsService.register_sheet0_bind_cellChanged( $scope.spread ) 
		spreadjs_eventsService.register_sheet1_bind_cellChanged( $scope.spread ) 
		spreadjs_eventsService.register_sheet2_bind_cellChanged( $scope.spread ) 
	}else if( $injector.has('jupitor_admin_editorService')){
		if( $scope.viewId && $scope.viewId == '1'){
			  alert("we on service admin");
			var jupitor_service_admin_editorService = $injector.get('jupitor_service_admin_editorService') 	
			var spreadjs_eventsService = $injector.get('spreadjs_eventsService') 
			spreadjs_eventsService.change_eventsService('jupitor_service_admin_editor_eventsService') 
			await jupitor_service_admin_editorService.initWorkbook( $scope.spread )
			spreadjs_eventsService.register_spread_bind_buttonClicked( $scope.spread ) 
			spreadjs_eventsService.register_sheet0_bind_cellDoubleClick( $scope.spread ) 
			spreadjs_eventsService.register_sheet1_bind_cellDoubleClick( $scope.spread ) 
			spreadjs_eventsService.register_sheet2_bind_cellChanged( $scope.spread ) 
			  return; 
        }
		var jupitor_admin_editorService = $injector.get('jupitor_admin_editorService') 	
		var spreadjs_eventsService = $injector.get('spreadjs_eventsService') 
			spreadjs_eventsService.change_eventsService('jupitor_admin_editor_eventsService') 
		await jupitor_admin_editorService.initWorkbook( $scope.spread )
		spreadjs_eventsService.register_spread_bind_buttonClicked( $scope.spread ) 
		spreadjs_eventsService.register_sheet0_bind_cellDoubleClick( $scope.spread ) 
		spreadjs_eventsService.register_sheet1_bind_cellDoubleClick( $scope.spread ) 
		spreadjs_eventsService.register_sheet2_bind_cellChanged( $scope.spread ) 
	}

}])
.directive('mySpreadjs', function(){
	return{
		restrict : 'E',
		template : `<div id='ss' style='width:100%; height:800px; border: 1px solid gray;' ></div>`,
		controller: 'mySpreadjsCtrl'
	}
})
		
