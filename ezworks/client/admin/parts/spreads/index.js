/*
    parts frame , core sequencial process  management. 
*/
var spreadsCtrl = function($scope, $injector , 
spreadJs_service, 
spreadjsEvents_service = null,
spreadjsFilters_service = null , 
spreadJs_factory  
){
// temp.. 
	   var sheetCmd_service = null 
	   var spreadjsEvents_factory = null  
	   if( $injector.has('sheetCmd_service'))sheetCmd_service = $injector.get('sheetCmd_service')  
	   if( $injector.has('spreadjsEvents_factory'))spreadjsEvents_factory = $injector.get('spreadjsEvents_factory')  

		var spreadjs_product = null
		if( $injector.has('wijmoSpreadjs_factory')){
			spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
			spreadjs_product['cur_product'] = 'wijmo'
		}else if($injector.has('gcSpreadjs_factory')){
			spreadjs_product = $injector.get('gcSpreadjs_factory') 
			spreadjs_product['cur_product'] =  'gc' 
		}
	    
	   var $rootScope = $injector.get('$rootScope') 
	   
// openTbl is init function from External.. 	
// let change $scope.openTbl to promise.. 
	const spreadjs_openTbl_cb = ( Data_s )=>{
		spreadJs_service.initData( Data_s[0] ) 
//1		spreadJs_factory.post_lockColumns_ft = []
		spreadJs_service.initHead( Data_s[1] ) 

		spreadJs_service.setIndex()
		spreadJs_factory.Spread.setActiveSheetIndex(0) 
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

		console.log('[parts/spreads] set $scope.spread = spreadJs_service.getSpread() ') 
	}
	$rootScope.openTbl = async( tbl_name  )=>{
	    console.log('[parts/spreads] spreadsCtrl  $scope.openTbl _start_ ', tbl_name ) 
	    console.log('[parts/spreads] spreadsCtrl  spreadJs_service.openTbl _call_ ', tbl_name ) 

//1		$scope.spreadJs_enable = 0 
		if( !$scope.$$phase )$scope.$apply() 
		await spreadJs_service.openTbl_appEdit( tbl_name, initSpreadjs_openTbl, spreadjs_openTbl_cb ) 
	        console.log('$$$[parts/spreads] spreadsCtrl if( !$scope.$$phase ) ') 
		if(!$scope.$$phase){
			$scope.$apply() 
		}
	    console.log('[parts/spreads] spreadsCtrl  spreadJs_service.openTbl return  $scope.mode', $scope.mode ) 
/*		
Thu May 19 08:04:14 UTC 2022
*/
	}
        $scope.updateSheet = spreadJs_service.cb_f_main
	const process_head = ()=>{	
	    console.log('[parts/spreads] process_head ') 
// following $scope.loadHead from parts/sheetFormat ..		
		try{
		 	  $scope.loadHead() 
		}catch(err){
			 console.log( ' no $scope.loadHead ', err ) 
		}
	}			
	const message_ft = ( err_message_ )=>{
		$scope.alert_info_message.message = err_message_.message 
		$scope.alert_info_message.class = err_message_.class
		if(!$scope.$$phase ){
			$scope.$apply() 
		}
	}
	const process_events = ()=>{
	    console.log('[parts/spreads] process_events ') 
//Thu May 26 06:28:32 UTC 2022
		spreadjsEvents_factory.bind_errMessage_ft( message_ft ) 
// Fri Mar  4 11:09:36 KST 2022
		if( spreadjsEvents_service ){
	    		console.log('[parts/spreads] process_events Line :84  $scope.$$phase double $apply error. example. ') 
                    spreadjsEvents_service.register_sheet0_bind_cellClick() 
                    spreadjsEvents_service.register_sheet0_bind_cellDoubleclick() 
            		spreadjsEvents_service.register_sheet1_bind_cellClick() 
	    		spreadjsEvents_service.register_spread_bind_activeSheetChanging() 
		}
     }
      const process_colFilter =()=>{
	    console.log('[parts/spreads] process_colFilters ') 
		if( spreadjsFilters_service ){
		   let AppEdit = 1 
     		    spreadjsFilters_service.doColFilter( 0, AppEdit ) 
		    $scope.$apply()
		}
      }
      const process_filters = ()=>{
	    console.log('[parts/spreads] process_filters ') 
		if( spreadjsFilters_service ){
		  let AppEdit = 1 
     		  spreadjsFilters_service.doColFilter( 0, AppEdit ) 
		}
	}
// global variable. 	
	console.log('[parts/spreads] register spreadJs_service.addPost_loadHead_f_lists') 
	spreadJs_service.addPost_loadHead_f_list( process_head ) 
	spreadJs_service.addPost_loadHead_f_list( process_events ) 
	spreadJs_service.addPost_loadHead_f_list( process_filters ) 
	spreadJs_factory.process_filters =  process_filters 
	spreadJs_factory.process_colFilter = process_colFilter

// how first call $scope.openTbl  with tbl_name.. 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  mySpreadJs module. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
angular.module('mySpreadjs',[
//1	'myApp.rest_api'
])
.controller('mySpreadjsCtrl',['$scope','$injector',
//1 'restApiServiceDbEdit',
'spreadjsFilter_service',
'spreadjsEvents_service',
'spreadJs_service',
'spreadJs_factory', 
	function($scope, $injector, 
spreadjsFilter_service , spreadjsEvents_service , spreadJs_service , 
spreadJs_factory, 
	){
// Fri May 20 06:31:03 UTC 2022
		$scope.spreadJs_enable = 0 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  dependency $injector..  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	angular.extend( this, new spreadsCtrl( $scope, $injector, 
		spreadJs_service , 
		spreadjsEvents_service, 
		spreadjsFilter_service, 
		spreadJs_factory,
	 	)) 

		var spreadjs_product = null
		if( $injector.has('wijmoSpreadjs_factory')){
			spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
			spreadjs_product['cur_product'] = 'wijmo'
		}else if($injector.has('gcSpreadjs_factory')){
			spreadjs_product = $injector.get('gcSpreadjs_factory') 
			spreadjs_product['cur_product'] =  'gc' 
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   DbEdit  First. / workspace Second. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	var first_c = {"name":"default","displayName":"default","size":120,"formatter":"* ######","locked":true,"type":"NVARCHAR(120)"}
	var app_opts = { is_appl_list : false }
        document.getElementById("ss").style.width = "100%";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   workspace Second. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
}]) 
.directive('mySpreadjs', function(){
    return {
		restrict :'E' ,
//		template :`<div id='ss' style='width:100%; height:800px;border:1px solid gray;' ng-show='spreadJs_enable'></div>`,
		template :`<div id='ss' style='width:100%; height:800px;border:1px solid gray;'></div>`,
		controller :'mySpreadjsCtrl'
	}
})
	
