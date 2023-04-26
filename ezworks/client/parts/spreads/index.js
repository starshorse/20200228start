/*
    parts frame , core sequencial process  management. 
*/
var spreadsCtrl = function($scope, $injector , restApiServiceDbEdit , spreadJs_service, spreadjsEvents_service = null,
	spreadjsFilters_service = null , hotLink_service = null , workSpaceCollections_service  , spreadJs_factory , workSpaceCollections_factory 
){
// temp.. 
//	hotLink_service = null 
	   var sheetCmd_service = null 
	   var spreadJs_db_factory = null 
	   var spreadjsEvents_factory = null  
	   var spreadJs_db_service = null 
	   if( $injector.has('sheetCmd_service'))sheetCmd_service = $injector.get('sheetCmd_service')  
	   if( $injector.has('spreadJs_db_factory'))spreadJs_db_factory = $injector.get('spreadJs_db_factory')  
	   if( $injector.has('spreadjsEvents_factory'))spreadjsEvents_factory = $injector.get('spreadjsEvents_factory')  
	   if( $injector.has('spreadJs_db_service'))spreadJs_db_service = $injector.get('spreadJs_db_service')  

		var spreadjs_product = null
		if( $injector.has('wijmoSpreadjs_factory')){
			spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
			spreadjs_product['cur_product'] = 'wijmo'
		}else if($injector.has('gcSpreadjs_factory')){
			spreadjs_product = $injector.get('gcSpreadjs_factory') 
			spreadjs_product['cur_product'] =  'gc' 
		}
	   
// openTbl is init function from External.. 	
// let change $scope.openTbl to promise.. 
	const spreadjs_openTbl_cb = ( Data_s )=>{
		spreadJs_service.setCollection_configuration( workSpaceCollections_factory.my_collection ) 
		spreadJs_service.initData( Data_s[0] ) 
		spreadJs_factory.post_lockColumns_ft = []

/* Thu Jun 16 10:37:51 KST 2022
        following code valid only appConfiguration.component.spreadJs.rt_save.type[ insert_first ] / tempalte_app.id[ realTime_edit_type01 ] 
*/ 
		if( spreadJs_factory.appConfiguration.component?.spreadJs?.rt_save?.type == 'insert_first' ){
			let newId = sheetCmd_service.addRow(1) 
			spreadJs_factory.newId_jpt = newId.newId 
			spreadJs_db_factory.newId_jpt = newId.newId 
			spreadJs_db_factory.newId_row.row_num = newId.newRow_num 
		}
//Thu May 26 08:44:11 UTC 2022
		//init spreadJs_db_service functions . 
		spreadJs_factory.post_lockColumns_ft.push( spreadJs_db_service.indicateNotNull_tempRow ) 
				
/*1		
		if( $scope.frame_type == 'AppEdit' )	
			spreadJs_service.initHead_appEdit( Data_s[1] ) 
		else 
*/		
			spreadJs_service.initHead( Data_s[1] ) 

		spreadJs_service.setIndex()
		spreadJs_factory.Spread.setActiveSheetIndex(0) 
//		console.log('[parts/spreads]![async_callback] post_loadHead_f_list ', post_loadHead_f_list ) 
//		spreadJs_service.post_loadHead_f_list.forEach(( ent_f )=>{ ent_f() })
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
//1 ?		$scope.spread.setActiveSheet( tbl_name ) 

		console.log('[parts/spreads] set $scope.spread = spreadJs_service.getSpread() ') 
		if( spreadjsFilters_service ) spreadjsFilters_service.clearFilter() 
		if(!$scope.$$phase){
		      $scope.$apply() 
		}

	}
	$scope.openTbl = async( tbl_name  )=>{
	    console.log('[parts/spreads] spreadsCtrl  $scope.openTbl _start_ ', tbl_name ) 
	    console.log('[parts/spreads] spreadsCtrl  spreadJs_service.openTbl _call_ ', tbl_name ) 

		$scope.spreadJs_enable = 0 
		if( !$scope.$$phase )$scope.$apply() 
//1.
		if( $scope.frame_type == 'AppEdit' ){
			await spreadJs_service.openTbl_appEdit( tbl_name, initSpreadjs_openTbl, spreadjs_openTbl_cb ) 
		}else{
			let rt_mode = spreadJs_service.openTbl( tbl_name, initSpreadjs_openTbl,  spreadjs_openTbl_cb  ) 
			$scope.mode = rt_mode 
		}	
/*		
 Mon May 23 00:12:32 UTC 2022
 */
	        console.log('$$$[parts/spreads] spreadsCtrl if( !$scope.$$phase ) ') 
		if(!$scope.$$phase){
			$scope.$apply() 
		}
	    console.log('[parts/spreads] spreadsCtrl  spreadJs_service.openTbl return  $scope.mode', $scope.mode ) 

		let myCollection = workSpaceCollections_service.getMyCollection() 
	    let myCollectionConfiguration = workSpaceCollections_service.getMyCollectionConfiguration() 
		$scope.collection_cur = myCollection 
	    console.log('[parts/spreads] spreadsCtrl set $scope.collection_cur', $scope.collection_cur ) 
/*		
Wed May 18 09:06:55 UTC 2022
		try{	
			if( myCollectionConfiguration.hot_link != 1 )hotLink_service = null  	
		}catch(err){
			console.log( err )
			hotLink_service = null 
		}*/
		if( hotLink_service ){
			console.log('[parts/spreads/] spreadsCtrl $scope.openTbl hotLink_service.path_set_app', $scope.my_collection, tbl_name ) 
			hotLink_service.path_set_app( $scope.my_collection, tbl_name ) 
		}	
/*		
Thu May 19 08:04:14 UTC 2022
*/
//		if( !$('#sidebar').hasClass('active'))$('#sidebar').addClass('active')   
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
		$scope.dataMode = 0 
		let appConfiguration = spreadJs_service.getAppConfiguration() 
		if( spreadjsEvents_service ){
			const postCellDoubleclick_ft = (dataMode_ = 0 )=>{
//Thu May 26 01:43:16 UTC 2022
				try{ 
					 if( appConfiguration.component.spreadJs.rt_save.enable )dataMode_ = 0 
				}catch(er){
	                 console.log('[parts/spreads] process_events appConfiguration.component.spreadJs.rt_save.enable need define' ) 
				}
				if( dataMode_ == 1  ){
					$scope.mode = 1
					try{
					     $scope.change_dataedit() 
					}catch(err){
						console.log( err ) 
					}
				}else{	
						$scope.dataMode = dataMode_ 
				}
				if(!$scope.$$phase){
						$scope.$apply() 
				}
			}
	    console.log('[parts/spreads] process_events Line :84  $scope.$$phase double $apply error. example. ') 
            spreadjsEvents_service.register_sheet0_bind_cellClick() 
            spreadjsEvents_service.register_sheet1_bind_cellClick() 
			spreadjsEvents_service.register_sheet0_bind_topRowChanged() 
			spreadjsEvents_service.register_sheet0_bind_cellDoubleclick( postCellDoubleclick_ft )
			spreadjsEvents_service.register_sheet1_bind_cellDoubleclick( postCellDoubleclick_ft )
			spreadjsEvents_service.register_spread_bind_activeSheetChanging() 
			try{
				if( appConfiguration.component.spreadJs.rt_save.enable ) 
			      	spreadjsEvents_service.register_sheet0_bind_dragDropBlockCompleted() 
				else spreadjsEvents_service.register_sheet0_bind_non_dragDropBlockCompleted()  // add EditEnd.. 
			}catch(err){
				console.log(err) 
				spreadjsEvents_service.register_sheet0_bind_non_dragDropBlockCompleted() 
			}
		}
	}
      const process_colFilter =()=>{
	    console.log('[parts/spreads] process_colFilters ') 
		if( spreadjsFilters_service ){
		   let AppEdit = 0 
		   if( $scope.frame_type == 'AppEdit' )AppEdit = 1 
     		    spreadjsFilters_service.doColFilter( 0, AppEdit ) 
		    $scope.$apply()
		}
      }
      const process_filters = ()=>{
	    console.log('[parts/spreads] process_filters ') 
		if( spreadjsFilters_service ){
		   let AppEdit = 0 
		   if( $scope.frame_type == 'AppEdit' )AppEdit = 1 
		   if(spreadjsFilters_service.doFilter( 0 , AppEdit )){
			   $scope.autofilter_mode = 1 
		       $scope.$apply()
		   } 
// parts/mainbuttons/index, for update buttons options. 			
//	        $scope.autofilter_mode = 1 
     		  spreadjsFilters_service.doColFilter( 0, AppEdit ) 
		}
	}
	const process_hotLink = ()=> {
	    console.log('[parts/spreads] process_hotLink ') 
		if( hotLink_service && hotLink_service.getHotLink_enable() ){
			if( hotLink_service.path_dataedit2go() ){
				 $scope.mode = 1 
				 $scope.change_dataedit() 
				$scope.$apply() 
			}
		}
	}
    $scope.setFreezeColSpreadjs = ( freezeCol = null  )=>{
		spreadJs_service.doFreezeCol() 
	}
// global variable. 	
/*	
	$('#ss').wijspread({ sheetCount:2 }) 
	var spread = $('#ss').wijspread('spread') 
	$scope.spread = spread 
*/
	console.log('[parts/spreads] register spreadJs_service.addPost_loadHead_f_lists') 
	spreadJs_service.addPost_loadHead_f_list( process_head ) 
	spreadJs_service.addPost_loadHead_f_list( process_events ) 
	spreadJs_service.addPost_loadHead_f_list( process_filters ) 
	spreadJs_service.addPost_loadHead_f_list( process_hotLink ) 
	spreadJs_factory.process_filters =  process_filters 
	spreadJs_factory.process_colFilter = process_colFilter

// how first call $scope.openTbl  with tbl_name.. 
//	$scope.openTbl( $scope.tbl_name ) 
	spreadJs_service.set_openTbl( $scope.openTbl ) 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  mySpreadJs module. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
angular.module('mySpreadjs',[
	'myApp.rest_api'
])
.controller('mySpreadjsCtrl',['$scope','$injector',
'restApiServiceDbEdit',
//1 'hotLink_service',
'spreadjsFilter_service','spreadjsEvents_service',
'spreadJs_service','workSpaceCollections_service','parseStr_service','spreadJs_factory', 'workSpaceCollections_factory',
	function($scope, $injector, 
restApiServiceDbEdit,  
//1 hotLink_service, 
spreadjsFilter_service , spreadjsEvents_service , spreadJs_service , 
workSpaceCollections_service, parseStr_service , spreadJs_factory, workSpaceCollections_factory  
	){
// Fri May 20 06:31:03 UTC 2022
		$scope.spreadJs_enable = 0 
// workspace specific .. mssql. 		
//	spreadJs_service.setDb_mode( 'mssql' )  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  dependency $injector..  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	var hotLink_service = null ; if( $injector.has('hotLink_service')){ hotLink_service = $injector.get('hotLink_service')} 		
	angular.extend( this, new spreadsCtrl( $scope, $injector, restApiServiceDbEdit, spreadJs_service , 
		spreadjsEvents_service, spreadjsFilter_service, hotLink_service, workSpaceCollections_service , spreadJs_factory , workSpaceCollections_factory )) 

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
/*			
	let sheet0 = spreadJs_service.getSheet0() 	
	sheet0.setName('DataSheet') 
*/	
	var first_c = {"name":"default","displayName":"default","size":120,"formatter":"* ######","locked":true,"type":"NVARCHAR(120)"}
	var app_opts = { is_appl_list : false }
    document.getElementById("ss").style.width = "100%";
	$scope.saveTbl = ( tbl_name )=>{
    	console.log('[parts/spreads] $scope.saveTbl _start_ ') 
// 2021-12-27 
		$scope.DbData = $scope.DbData.filter((ent)=>ent.id_jpt != undefined || ent.id != undefined)  
		$scope.DbData.forEach((ent)=>{
			if( ent['실사용자'] == undefined ) ent['실사용자'] = ent['사용자성명'] 
		})
		restApiServiceDbEdit.postData( tbl_name, $scope.DbData , cb_f_main ) 
		$scope.headInfos = $scope.headInfos.filter((ent)=>ent.name != undefined ) 
		$scope.saveHead( tbl_name , $scope.headInfos ) 
	}
	$scope.command_db_accept = ( args  )=>{
		workSpace_service.command_db_accept( $scope, args ) 
		restApiServiceDbEdit.command_db( args.cmd_name ,$scope.tbl_name, args.data_  , (res)=>{ console.log(res)}  )  
	}
	$scope.command_db = ( cmd_name , data_  )=>{
//	    workSpace_service.command_db( $scope , cmd_name , data_ ) 
		restApiServiceDbEdit.command_db( cmd_name ,$scope.tbl_name,  data_  , (res)=>{ console.log(res)}  )  
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   workspace Second. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	const cb_f = ( res )=>{
	    let sheet0 = spreadJs_service.getSheet0() 	
        if( !Array.isArray( res.tbl_data ))return ;
		if( res.tbl_data.find((ent)=>ent.id_jpt == undefined )){
			    var id_assign = 1 
			    res.tbl_data.forEach((ent)=>{
					            if( ent != null ) 
					            ent.id_jpt = id_assign++ 
					    })
		}
		sheet0.setDataSource(res.tbl_data )
		res.tbl_format.sort((a,b)=>{ return ( a.order - b.order )  }) 
		sheet0.bindColumns( res.tbl_format )
		$scope.spread_data = res.tbl_data 
		$scope.colInfo = res.tbl_format
// Enable Filter .. 
//      wijmoSpreadjs_factory.rowFilter_enable( sheet0  ) 		
        spreadjs_product.rowFilter_enable( sheet0 ) 		
//		sheet0.rowFilter(new $.wijmo.wijspread.HideRowFilter(new $.wijmo.wijspread.Range( 0,0,sheet0.getRowCount() ,sheet0.getColumnCount() )))
		$scope.setIndex() 
		hotLink_service.path_dataedit2go( $scope ) 
		spreadjsFilter_service.doFilter( $scope ) 
		spreadjsFilter_service.doColFilter( $scope ) 

	}
	$scope.setIndex = ()=>{
	    let sheet0 = spreadJs_service.getSheet0() 	
		for( var i = 0; i< sheet0.getColumnCount() ; i++  ){
			//     let colHeader_info =  Spreadjs_product ( wijmoSpreadjs_factory ).getColHeader() 
					var conText = sheet0.getValue( 0, i, spreadjs_product.SheetArea.colHeader  ) 
		   //			var conText = sheet0.getValue( 0, i, $.wijmo.wijspread.SheetArea.colHeader ) 
					if( $scope.colInfo.find((ent)=>ent.name == 'id_jpt').displayName == conText )spreadjsEvents_service.id_index = id_index = i 
		}
	}
	$scope.filterSpreadjs = ( filter_data )=>{
	    let sheet0 = spreadJs_service.getSheet0() 	
		sheet0.reset()
		sheet0.setDataSource( filter_data )
		sheet0.bindColumns( $scope.colInfo  )
	}
	$scope.filterSpreadjs_colInfo = ( colInfo = null )=>{
		if( colInfo == null )sheet0.bindColumns( $scope.colInfo  )
		else sheet0.bindColumns( colInfo ) 
	}
	$scope.setFreezeColSpreadjs = ( freezeCol )=>{
	    let sheet0 = spreadJs_service.getSheet0() 	
		if( freezeCol == null )return 
		if( spreadjs_product['cur_product'] == 'gc' )sheet0.frozenColumnCount( freezeCol ) 
		else sheet0.setFrozenCount( -1 ,freezeCol )
	}
	$scope.saveTbl_admin = ( mode = 0 , ent_data_ = null )=>{
		restApiServiceWorkspace.postData($scope.app_cur.name , $scope.spread_data, cb_f , mode , ent_data_ ) 
	}
	$scope.dataEnc = ( coll_orgData, cb_f ) =>{
		restApiServiceWorkspace.cryptoData( coll_orgData, cb_f ) 
	}
}]) 
.directive('mySpreadjs', function(){
    return {
		restrict :'E' ,
		template :`<div id='ss' style='width:100%; height:800px;border:1px solid gray;' ng-show='spreadJs_enable'></div>`,
		controller :'mySpreadjsCtrl'
	}
})
	
