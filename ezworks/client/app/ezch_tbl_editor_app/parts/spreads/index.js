/*
    parts frame , core sequencial process  management. 
*/
var spreadsCtrl = function($scope, $injector , 
//1. restApiServiceDbEdit , 
spreadJs_service, 
spreadjsEvents_service = null,
spreadJs_factory  
){
// temp.. 
//	hotLink_service = null 
	   var spreadjsEvents_factory = null  
	   if( $injector.has('spreadjsEvents_factory'))spreadjsEvents_factory = $injector.get('spreadjsEvents_factory')  

		var spreadjs_product = null
		if( $injector.has('wijmoSpreadjs_factory')){
			spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
			spreadjs_product['cur_product'] = 'wijmo'
		}else if($injector.has('gcSpreadjs_factory')){
			spreadjs_product = $injector.get('gcSpreadjs_factory') 
			spreadjs_product['cur_product'] =  'gc' 
		}

	const initSpreadjs_openTbl = ()=>{
// now Enable  Spreadjs.. 		
		$scope.spreadJs_enable = 1 
		if( !$scope.$$phase )$scope.$apply() 

		console.log('[parts/spreads] spreadJs_service.initSpreadjs() _call_') 
		spreadJs_service.initSpreadjs() 
		$scope.spread = spreadJs_service.getSpread() 
	    let sheet0 = spreadJs_service.getSheet0() 	
//	    sheet0.setName('DataSheet') 
//Mon Jun 13 10:59:46 KST 2022
//1		$scope.spread.setActiveSheet( tbl_name ) 

		console.log('[parts/spreads] set $scope.spread = spreadJs_service.getSpread() ') 
	}
	        initSpreadjs_openTbl(); 
	const message_ft = ( err_message_ )=>{
		$scope.alert_info_message.message = err_message_.message 
		$scope.alert_info_message.class = err_message_.class
		if(!$scope.$$phase ){
			$scope.$apply() 
		}
	}
	var  process_events = function(){
	    console.log('[parts/spreads] process_events ') 
//Thu May 26 06:28:32 UTC 2022
		spreadjsEvents_factory.bind_errMessage_ft( message_ft ) 
// Fri Mar  4 11:09:36 KST 2022
//1		$scope.dataMode = 0 
//1		let appConfiguration = spreadJs_service.getAppConfiguration() 
		if( spreadjsEvents_service ){
	    console.log('[parts/spreads] process_events Line :84  $scope.$$phase double $apply error. example. ') 
            spreadjsEvents_service.register_sheet0_bind_cellClick() 
            spreadjsEvents_service.register_sheet1_bind_cellClick() 
            spreadjsEvents_service.register_sheet0_bind_cellChanged() 
            spreadjsEvents_service.register_sheet1_bind_cellChanged() 
            spreadjsEvents_service.register_sheet2_bind_cellChanged() 
            spreadjsEvents_service.register_sheet2_bind_EditEnd() 
//no need			spreadjsEvents_service.register_sheet0_bind_topRowChanged() 
			spreadjsEvents_service.register_sheet0_bind_cellDoubleclick()
			spreadjsEvents_service.register_sheet1_bind_cellDoubleclick()
			spreadjsEvents_service.register_sheet2_bind_cellDoubleclick()
			spreadjsEvents_service.register_sheet0_bind_selectionChanged() 
			spreadjsEvents_service.register_spread_bind_activeSheetChanging() 
			spreadjsEvents_service.register_spread_bind_buttonClicked() 
		   	spreadjsEvents_service.register_sheet0_bind_dragDropBlockCompleted() 
		}
	}
//1.	process_events() 
	$scope.process_events = process_events ; 
//1	spreadJs_service.set_openTbl( $scope.openTbl ) 
//1. move to app.js 
	$scope.init_app(); 
//	await ezch_tbl_editor_appService.sheet2_init( spreadjs_product , spreadJs_factory )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  mySpreadJs module. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
angular.module('mySpreadjs',[
//1	'myApp.rest_api'
])
.controller('mySpreadjsCtrl',['$scope',
'$injector',
//1 'restApiServiceDbEdit',
'spreadjsEvents_service',
'spreadJs_service',
'spreadJs_factory', 
	function($scope, 
$injector, 
//1 restApiServiceDbEdit, 
spreadjsEvents_service , 
spreadJs_service , 
spreadJs_factory  
	){
// Fri May 20 06:31:03 UTC 2022
	$scope.spreadJs_enable = 1 
	angular.extend( this, new spreadsCtrl( $scope, $injector, 
spreadJs_service , 
spreadjsEvents_service, 
spreadJs_factory )) 
		var spreadjs_product = null
		if( $injector.has('wijmoSpreadjs_factory')){
			spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
			spreadjs_product['cur_product'] = 'wijmo'
		}else if($injector.has('gcSpreadjs_factory')){
			spreadjs_product = $injector.get('gcSpreadjs_factory') 
			spreadjs_product['cur_product'] =  'gc' 
		}
}]) 
.directive('mySpreadjs', function(){
    return {
		restrict :'E' ,
		template :`<div id='ss' style='width:100%; height:800px;border:1px solid gray;' ng-show='spreadJs_enable'></div>`,
		controller :'mySpreadjsCtrl'
	}
})
	
