/*
	This module service for Table base... 
	Sperate : frameType : 1. AppEdit : 
	                      2. DbEdit  : Application DB SQL analysis
			      3. Company : Show Window.. 
*/
angular.module('spread_js',[])
.factory('spreadJs_factory',[function(){
	 const compareField = 'id' 
	 var spreadJs_var =  {
	    spreadCreate_flag : 0 ,	 
//////////////////////////////////////////////////////////////////////////////////////////
// herit var..  
//////////////////////////////////////////////////////////////////////////////////////////
	   frame_type : null , 	 
	   appConfiguration : null , 
//////////////////////////////////////////////////////////////////////////////////////////
// spreadJs var..  
//////////////////////////////////////////////////////////////////////////////////////////
		Spread : null ,
		sheet0 : null ,
		sheet1 : null , 
		tbl_name: null , 
		current_dataMode: 0, //  sheet0.dataSource : 0: Dbdata , 1: filter_data 
		DbData: null ,
		filter_data: null, 
		headInfos : null , 
		colIndex_lockException : [],
		colIndex_lockException_bk : [],
		freezeCol : null ,
		affected_recordsId: [],
		hook_initHead : { 'pre': [] , 'post':[] }, 
	    execPandas_p : null ,	
	    execFilter_p : null ,
	    execSQL_p : null ,
		parts_spreadOpen_tbl_f : null ,
		newId_jpt: null, 
//////////////////////////////////////////////////////////////////////////////////////////
// spreadJs  en list decoration functions.  
//////////////////////////////////////////////////////////////////////////////////////////
		sync_records: ( DbData_ = spreadJs_var.DbData, filter_data_ = spreadJs_var.filter_data )=>{
			 if( spreadJs_var.current_dataMode == 0 )return  
			 while( spreadJs_var.affected_recordsId.length ){
			 	let id = spreadJs_var.affected_recordsId.pop()
			 	let affected_record = filter_data_.find((ent)=>ent[compareField] == id ) 
				if( affected_record == -1 || affected_record == undefined )continue 
				let target_record = DbData_.find((ent)=>ent[compareField] == id )
				if( target_record == -1 || target_record == undefined)DbData_.push( affected_record ) 
				else Object.assign( target_record , affected_record )  
			 }
		},
		add_affected_recordsId: ( index_ )=>{
			if( !spreadJs_var.affected_recordsId.includes( index_ ) ) spreadJs_var.affected_recordsId.push( index_ ) 
		},
// hook_initHead :
	        addHook_initHead_pre : ( hook_ft )=>spreadJs_var.hook_initHead.pre.push( hook_ft ) ,
		addHook_initHead_post : ( hook_ft )=>spreadJs_var.hook_initHead.post.push( hook_ft ) , 
		exeHook_initHead : ( spot_name, headInfos_ )=>{
			let hook_fts = eval( `spreadJs_var.hook_initHead.${ spot_name }`) 
			console.log(`[spreadJs_factory] exeHeook ${ spot_name} `) 
			hook_fts.forEach((ent)=>ent(  headInfos_ )) 
		},
		set_ft_execPandas_p : ( danfoJs_service_execPandas_p )=>{ spreadJs_var.execPandas_p = danfoJs_service_execPandas_p } , 	
		set_ft_execFilter_p : ( danfoJs_service_execFilter_p )=>{ spreadJs_var.execFilter_p = danfoJs_service_execFilter_p } , 	
		set_ft_execSQL_p    : ( danfoJs_service_execSQL_p )=>{    spreadJs_var.execSQL_p = danfoJs_service_execSQL_p } , 	
		get_db_factory_newId_jpt : ()=>{ return  spreadJs_var.newId_jpt },
// speradJs_service lockColumns hook function. 
		 pre_lockColumns_ft : [],
		 post_lockColumns_ft : [],
//////////////////////////////////////////////////////////////////////////////////////////
// spreadJs  parts from functions.   
//////////////////////////////////////////////////////////////////////////////////////////
		 process_filters: null ,
		 process_colFilter: null
	 }
	 return spreadJs_var
}])
.service('spreadJs_service',['$injector','restApiServiceDbEdit','workSpace_factory','workSpaceCollections_factory',
	'spreadJs_factory','spreadJs_db_factory',
	function($injector , restApiServiceDbEdit ,workSpace_factory, workSpaceCollections_factory, 
	spreadJs_factory, spreadJs_db_factory ){
///////////////////////////////////////////////////////////////////////////////////////////
//   optional injection. introduced.. 
//////////////////////////////////////////////////////////////////////////////////////////	
	var toggleSidebar_factory = null			
	if( $injector.has('toggleSidebar_factory')){  
	  toggleSidebar_factory = $injector.get('toggleSidebar_factory') 
	}
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')){
		spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
		spreadjs_product['cur_product'] = 'wijmo'
	}else if($injector.has('gcSpreadjs_factory')){
		spreadjs_product = $injector.get('gcSpreadjs_factory') 
		spreadjs_product['cur_product'] =  'gc' 
	}
	var serviceUi_service = null
	if( $injector.has('serviceUi_service')) $injector.get('serviceUi_service') 	
	var $http  = $injector.get('$http') 	
///////////////////////////////////////////////////////////////////////////////////////////
// Service configuration parameter.. read from file..  
//////////////////////////////////////////////////////////////////////////////////////////	
//	var tbl_name 
	var DbData 
//	var Spread 
//	var sheet0  
//	var sheet1  
	var id_index 
	var id_index_obj = {} 
//	var headInfos 
	var cur_headInfos 
	var freezeCol 
	var working_entry 
	var db_mode = 'fdb'    // 'mssql' / 'fdb' / 'mysql'...  
	var collection_configuration = { 'sheetEditMode': 0 } 
//	var appConfiguration 
	var this_configuartion = { 'ot_saveTbl_refresh' : 0 } 
	var lock_processFlag = 0 	
	var pageHtml = null 	
//	var execPandas_p = null 	
//	var execFilter_p = null 
//	var execSQL_p = null 
	var pageCb_f_p = null 
	var chartCb_f_p = null 
	var formCb_f_p = null 
	var parseStr_f_p = null 	
///////////////////////////////////////////////////////////////////////////////////////////
// Call back functions.  
//////////////////////////////////////////////////////////////////////////////////////////	
	var post_loadHead_f_list = [] 
	var pre_openTbl_f_list = [] 
// Fri Feb 25 15:51:26 KST 2022
	var post_saveTbl_f_list = [] 
	this.addPost_loadHead_f_list = ( ft_name )=>{
		post_loadHead_f_list.push( ft_name ) 
	}
	this.openTbl_f_list = ()=>{
		this.openTbl_f_list.addPost_openTbl_f_list = this.addPost_loadHead_f_list 
		this.openTbl_f_list.addPre_openTbl_f_list = ( ft_name )=>{
			pre_openTbl_f_list.push( ft_name ) 
		}
	}
	this.openTbl_f_list() 

	this.addPost_saveTbl_f_list = ( ft_name )=>{
		post_saveTbl_f_list.push( ft_name ) 
	}
	const cb_f_hdr = ( headInfos )=>{
		this.initHead( headInfos )
		post_loadHead_f_list.forEach(( ent_f )=>{
			ent_f() 
		})
	}
// another entry updateSheet... 	
// Call back function to  primise.. 	
	this.cb_f_main = ( Data_ )=>{
	    this.initData( Data_ ) 
		if( spreadJs_factory.tbl_name != '' ) this.loadHead( spreadJs_factory.tbl_name, cb_f_hdr ) 
	}
///////////////////////////////////////////////////////////////////////////////////////////
// Init part
//////////////////////////////////////////////////////////////////////////////////////////	
	this.promise_getHdr = ( tbl_name_ )=>{
		return new Promise(( resolve, reject )=>{
			this.loadHead( tbl_name_ , ( Data_ )=>{
				resolve( Data_) 
	})})}
	this.promise_getData = ( tbl_name_ )=>{
		if( spreadJs_factory.appConfiguration.db_mode == 'mssql' ){
			let db_name = ''
//			if( db_name = spreadJs_factory.appConfiguration.db_name )tbl_name_ = db_name +'@'+ tbl_name_  
		    db_name = spreadJs_factory.appConfiguration.db_name   
		}
		return new Promise(( resolve, reject )=>{
			restApiServiceDbEdit.getData( tbl_name_ , ( Data_ )=>{
					resolve( Data_ ) }, { db_mode : this.getDb_mode() } )
	})}
	this.openTbl_appEdit = async( tbl_name_, initSpreadjs_openTbl = null , spreadjs_openTbl_cb = null )=>{
		spreadJs_factory.tbl_name = tbl_name_ 
		console.log('*[spreadJs_service].openTbl  _start_') 
// ui reest 
		if( serviceUi_service )serviceUi_service.windowPos_init() 
// set db_mode , workspace specific 
		let myCollectionConfiguration =  workSpaceCollections_factory.my_collectionConfiguration 
//		let app_cur = workSpaceCollections_factory.getAppCur_post() 
		let app_cur = workSpace_factory.app_cur  
		 pageHtml = app_cur.html
		console.log('*[spreadJs_service] app_cur.html load', pageHtml ) 
//Fri Mar  4 17:18:45 KST 2022
		spreadJs_factory.appConfiguration = JSON.parse( app_cur.configuration )
		 if( spreadJs_factory.appConfiguration.db_mode == 'mssql' ) db_mode = 'mssql'   
		 try{
		 	if( myCollectionConfiguration.component.noOverride.enable != 1 )Object.assign( spreadJs_factory.appConfiguration , myCollectionConfiguration ) 
		 }	 
		 catch(err){
			 console.log( err ) 
		 }
		console.log('*[spreadJs_service] spreadJs_factory.appConfiguration.db_mode check:', spreadJs_factory.appConfiguration.db_mode ) 
		console.log('*[spreadJs_service] pre_openTbl_f_list _call_ ', pre_openTbl_f_list  ) 
		pre_openTbl_f_list.forEach((ent)=>ent()) 
		spreadJs_factory.colIndex_lockException = []

/*
Thu May 19 08:34:59 UTC 2022  auto close sidebar. 
*/ 
//	 console.log('*[spreadJs_service] initSpreadjs _call_ ' ) 
//	 this.initSpreadjs() 	
	 if( initSpreadjs_openTbl != null )initSpreadjs_openTbl() 	 
	 if(toggleSidebar_factory)toggleSidebar_factory.hide_sidebar() 

// 1. call back.. 		
//		restApiServiceDbEdit.getData( tbl_name, this.cb_f_main )
// 2. Promise then 		
/*1		 
// 3. Promise All ..		
		Promise.all([ this.promise_getData( tbl_name_ ), this.promise_getHdr( tbl_name_ )]).then((Data_s)=>{
//Fri Mar  4 10:22:19 KST 2022
//			this.setCollection_configuration( workSpaceCollections_factory.getMyCollection() ) 
			spreadjs_openTbl_cb( Data_s ) 
		    console.log('*[spreadJs_service]![async_callback] post_loadHead_f_list ', post_loadHead_f_list ) 
		    post_loadHead_f_list.forEach(( ent_f )=>{ ent_f() }) 
		})
*/		
		let Data_s = Array(2); 
		let temp_data = null 
		let cur_server = workSpace_factory.cur_server ; 
		switch( tbl_name_ ){
	                case 'app_list':
	 			temp_data = await $http.get(`/web_admin_editor/apps_list/${ cur_server }/1`).catch((err)=>{ console.log( err )})	// option 1  
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
			case 'collection_list':
	 			temp_data = await $http.get(`/web_admin_editor/collections_list/${ cur_server }/1`).catch((err)=>{ console.log( err )})	// option 1  
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
			case '관리회사':
	 			temp_data = await $http.get(`/web_admin_editor/servers_list/1`).catch((err)=>{ console.log( err )})	// option 1  
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
			default:
				alert("frame_type AppEdit only support app_list , collections_list") 
				break;

		}
		console.log('*[spreadJs_service]![async_callback] post_loadHead_f_list ', post_loadHead_f_list ) 
		post_loadHead_f_list.forEach(( ent_f )=>{ ent_f() }) 
		return 0 
	}		
	this.openTbl = ( tbl_name_, initSpreadjs_openTbl = null , spreadjs_openTbl_cb = null )=>{
		spreadJs_factory.tbl_name = tbl_name_ 
		console.log('*[spreadJs_service].openTbl  _start_') 
// ui reest 
		if( serviceUi_service )serviceUi_service.windowPos_init() 
// set db_mode , workspace specific 
		let myCollectionConfiguration =  workSpaceCollections_factory.my_collectionConfiguration 
//		let app_cur = workSpaceCollections_factory.getAppCur_post() 
		let app_cur = workSpace_factory.app_cur  
		 pageHtml = app_cur.html
		console.log('*[spreadJs_service] app_cur.html load', pageHtml ) 
//Fri Mar  4 17:18:45 KST 2022
		spreadJs_factory.appConfiguration = JSON.parse( app_cur.configuration )
		 if( spreadJs_factory.appConfiguration.db_mode == 'mssql' ) db_mode = 'mssql'   
		 try{
		 	if( myCollectionConfiguration.component.noOverride.enable != 1 )Object.assign( spreadJs_factory.appConfiguration , myCollectionConfiguration ) 
		 }	 
		 catch(err){
			 console.log( err ) 
		 }
		console.log('*[spreadJs_service] spreadJs_factory.appConfiguration.db_mode check:', spreadJs_factory.appConfiguration.db_mode ) 
		console.log('*[spreadJs_service] pre_openTbl_f_list _call_ ', pre_openTbl_f_list  ) 
		pre_openTbl_f_list.forEach((ent)=>ent()) 
		spreadJs_factory.colIndex_lockException = []

//		tbl_name = tbl_name_
//		Spread.setActiveSheet( tbl_name )
// Mon Apr  4 16:51:54 KST 2022
/*
		if( typeof myCollectionConfiguration.component.sidebar.enable == 'undefined' || !myCollectionConfiguration.component.sidebar.enable || 
			typeof myCollectionConfiguration.component.sidebar.frame_type == 'undefined' || myCollectionConfiguration.component.sidebar.frame_type != 'DbEdit' ){ 
*/
		switch( spreadJs_factory.appConfiguration.type ){
			case 'page_only':
				return  2  // no need load Data from Server. mode ==2 
			case 'page':	
				if( spreadJs_factory.appConfiguration.df.enable ){
					spreadJs_factory.appConfiguration.df.pandas = parseStr_f_p( spreadJs_factory.appConfiguration.df.pandas ) 
					spreadJs_factory.execPandas_p( tbl_name_ , spreadJs_factory.appConfiguration.df.pandas, pageCb_f_p  )                      
				}
				return 2
			case 'chart':
				if( spreadJs_factory.appConfiguration.df.enable ){
					spreadJs_factory.appConfiguration.df.pandas = parseStr_f_p( spreadJs_factory.appConfiguration.df.pandas ) 
					spreadJs_factory.execPandas_p( tbl_name_ , spreadJs_factory.appConfiguration.df.pandas, pageCb_f_p ,chartCb_f_p  )                      
				}
				return 3 
			case 'form_only':
				if( spreadJs_factory.appConfiguration.df.enable ){
					spreadJs_factory.appConfiguration.df.pandas = parseStr_f_p( spreadJs_factory.appConfiguration.df.pandas ) 
					spreadJs_factory.execPandas_p( tbl_name_ , spreadJs_factory.appConfiguration.df.pandas, pageCb_f_p ,null , formCb_f_p  )                      
				}
				return 1 
			default:	
		}
/*
Thu May 19 08:34:59 UTC 2022  auto close sidebar. 
*/ 
//	 console.log('*[spreadJs_service] initSpreadjs _call_ ' ) 
//	 this.initSpreadjs() 	
	 if( initSpreadjs_openTbl != null )initSpreadjs_openTbl() 	 
	 if(toggleSidebar_factory)toggleSidebar_factory.hide_sidebar() 

// 1. call back.. 		
//		restApiServiceDbEdit.getData( tbl_name, this.cb_f_main )
// 2. Promise then 		
// 3. Promise All ..		
		Promise.all([ this.promise_getData( tbl_name_ ), this.promise_getHdr( tbl_name_ )]).then((Data_s)=>{
//Fri Mar  4 10:22:19 KST 2022
//			this.setCollection_configuration( workSpaceCollections_factory.getMyCollection() ) 
			spreadjs_openTbl_cb( Data_s ) 
		    console.log('*[spreadJs_service]![async_callback] post_loadHead_f_list ', post_loadHead_f_list ) 
		    post_loadHead_f_list.forEach(( ent_f )=>{ ent_f() }) 
		})
		return 0 
	}		
	this.initSpreadjs = ( sheetCount_ = 2 )=>{
		if( !spreadJs_factory.spreadCreate_flag ){ 
//			$('#ss').wijspread({ sheetCount: sheetCount_ }) 
			spreadjs_product.create_spread( sheetCount_ ) 
			spreadJs_factory.spreadCreate_flag = 1 
		}
//		let Spread = spreadJs_factory.Spread =  $('#ss').wijspread('spread') 
        	let Spread = spreadJs_factory.Spread =  spreadjs_product.getSpread()  
	    let sheet0 = spreadJs_factory.sheet0 =  Spread.getSheet(0) 
	    let sheet1 = spreadJs_factory.sheet1 =  Spread.getSheet(1) 

	    if( spreadjs_product['cur_product'] == 'gc')sheet0.name('DataSheet') 
		else sheet0.setName('DataSheet')
   //     sheet0.setRowCount(2,$.wijmo.wijspread.SheetArea.colHeader);
//Thu May 26 02:04:06 UTC 2022
		if( spreadJs_factory.frame_type == 'DbEdit' ){ 
	      if( spreadjs_product['cur_product'] == 'gc')sheet1.name('FormatSheet') 
		  else  sheet1.setName('FormatSheet')
		}
///////////////////////////////////////////////////////////////////////////////////////////
//   Init Spread options.. 
//////////////////////////////////////////////////////////////////////////////////////////	
		Spread.options.allowSheetReorder = false ; 
		Spread.options.tabEditable = false; 
		
	}
	this.getHeadIndex = ( col_name )=>{
	    let sheet0 = spreadJs_factory.sheet0  
		for( var i = 0 ; i < sheet0.getColumnCount() ; i++ ){
            //   var conText = sheet0.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) 
                var conText = sheet0.getValue( 0, i , spreadjs_product.SheetArea.colHeader ) 
			    if( conText == col_name )return i  
		}
		return -1 
	}
	this.setIndex = ()=>{
	    let sheet0 = spreadJs_factory.sheet0  
		for( var i = 0 ; i < sheet0.getColumnCount() ; i++ ){
           //     var conText = sheet0.getValue( 0, i , $.wijmo.wijspread.SheetArea.colHeader ) 
                var conText = sheet0.getValue( 0, i , spreadjs_product.SheetArea.colHeader ) 
			    conText = conText.toLowerCase() 
			    if( conText == 'id_jpt'){ 
					id_index = i 
					id_index_obj['key'] = 'id_jpt' , id_index_obj['index'] = i 
					break 
				}	
			    else if( conText == 'id' ){ 
					id_index = i 
					id_index_obj['key'] = 'id' , id_index_obj['index'] = i 
				}
			   else if( conText == 'seq' ){
				    id_index_obj['key'] = 'seq', id_index_obj['index'] = i 
			   }
		}
	}
	this.initData = ( Data_ ) =>{
		if( Data_ == undefined )return 
//Wed May 11 04:55:31 UTC 2022
       spreadJs_factory.DbData =	DbData = Data_ 		
       spreadJs_factory.current_dataMode = 0 
	   let sheet0 = spreadJs_factory.sheet0  
    //   spreadJs_factory.sync_records() 
	// id_jpt assign for indexing. 		
			if( DbData.find((ent)=>ent.id_jpt == undefined )){
					let id_assign = 1 
					DbData.forEach((ent)=>{
									if( ent != null ) 
									ent.id_jpt = id_assign++ 
							})
		}
		sheet0.reset() 
    //    sheet0.setColumnHeaderAutoTextIndex(0)
    //    sheet0.autoGenerateColumns = false
		try{
			if(  spreadJs_factory.appConfiguration.df == 'undefined' ||  spreadJs_factory.appConfiguration.df.enable == 'undefined' || !spreadJs_factory.appConfiguration.df.enable  ){
				sheet0.setDataSource( DbData ) 
			}	
			else{
					spreadJs_factory.appConfiguration.df.filter = parseStr_f_p( spreadJs_factory.appConfiguration.df.filter) 
					let filter_data = execFilter_p( DbData , spreadJs_factory.appConfiguration.df.filter )
				    if( !filter_data.length ) throw 'no filtered Data' 
// Wed May 11 08:34:13 UTC 2022
				    spreadJs_factory.filter_data = filter_data 
				    spreadJs_factory.current_dataMode = 1 
					sheet0.setDataSource( filter_data ) 
			}
		}catch(err){
			console.log(err) 
		    sheet0.setDataSource( DbData ) 
		}
// Fri Jun 17 13:49:23 KST 2022
        if( spreadjs_product['cur_product'] == 'gc' )sheet0.clearSelection() 

		this.rowFilter() 

//		this.setIndex() 
	}
	this.getSpread = ()=>{ return spreadJs_factory.Spread }
	this.getSheet0 = ()=>{ return spreadJs_factory.sheet0 }
	this.getSheet1 = ()=>{ return spreadJs_factory.sheet1 }
	this.getDbData = ()=>{ return spreadJs_factory.DbData }
	this.getHeadInfos = ()=>{ return spreadJs_factory.headInfos } 
	this.getCur_headInfos = ()=>{ return cur_headInfos } 
	this.setHeadInfos = ( headInfos_ = null ) =>{ 
		let sheet0 = spreadJs_factory.sheet0 
		if( headInfos_ ) spreadJs_factory.headInfos = headInfos_ 
		sheet0.bindColumns(spreadJs_factory.headInfos ) 
//1		
		spreadJs_factory.process_colFilter(); 
                	
	}
	this.getId_index = ()=>{ return id_index } 
	this.getId_index_obj = ()=>{ return id_index_obj } 
	this.setDbData = ( DbData_ )=>{  DbData = DbData_ }
	this.setDb_mode = ( db_mode_ ) =>{ db_mode = db_mode_ } 
	this.getDb_mode = () =>{ return db_mode } 
	this.getTbl_name = ()=>spreadJs_factory.tbl_name 	
	this.setTbl_name = ( tbl_name_ )=>{ spreadJs_factory.tbl_name = tbl_name_ } 
// Fri Mar  4 10:21:23 KST 2022
	this.setCollection_configuration = ( collection_info )=>{
//    
		let configuration = JSON.parse( collection_info.configuration ) 
        Object.assign( collection_configuration, configuration ) 		
//		collection_configuration.sheetEditMode = configuration.sheetEditMode 
	}
	this.getCollection_configuration = ()=> collection_configuration 	
	this.getAppConfiguration = ()=> spreadJs_factory.appConfiguration 
	this.getThis_configuration = ()=> this_configuartion 
	this.setThis_configuration =( configuration_ )=>{  this_configuartion = configuration } 
	this.getPageHtml = ()=> pageHtml 
/*		
	this.set_ft_execPandas_p = ( danfoJs_service_execPandas_p )=>{ execPandas_p = danfoJs_service_execPandas_p }  	
	this.set_ft_execFilter_p = ( danfoJs_service_execFilter_p )=>{ execFilter_p = danfoJs_service_execFilter_p }  	
	this.set_ft_execSQL_p = ( danfoJs_service_execSQL_p )=>{ execSQL_p = danfoJs_service_execSQL_p }  	
*/	
	this.set_pageCb_f_p = ( pageCtrl_cb_f_p ) =>{ pageCb_f_p = pageCtrl_cb_f_p } 
	this.set_chartCb_f_p = ( chartCtrl_cb_f_p ) =>{ chartCb_f_p = chartCtrl_cb_f_p } 
	this.set_formCb_f_p = ( formCtrl_cb_f_p ) =>{ formCb_f_p = formCtrl_cb_f_p } 
	this.set_parseStr_f_p = ( parseStrService_f_p )=>{  parseStr_f_p = parseStrService_f_p } 	
///////////////////////////////////////////////////////////////////////////////////////////
// Head format  service. part..
//////////////////////////////////////////////////////////////////////////////////////////	
	this.loadHead = ( tbl_name, cb_f_hdr  )=>{
		console.log('*[spreadJs_service] LoadHead _start_' ) 
		tbl_name = tbl_name + '.hdr'
		restApiServiceDbEdit.getData( tbl_name, cb_f_hdr ) 
	}
	this.saveHead = ( tbl_name, headInfos_, cb_f_hdr )=>{
		tbl_name = tbl_name + '.hdr'
		restApiServiceDbEdit.postData( tbl_name, headInfos_ , cb_f_hdr ) 
	}
// dependency: loadHead .. 	
//1. 
	this.initHead = ( headInfos_ )=>{
		spreadJs_factory.exeHook_initHead('pre', headInfos_ ) 
	    	let sheet0 = spreadJs_factory.sheet0  
		console.log('*[spreadJs_service]![async_callback] initHead' ) 
		spreadJs_factory.headInfos = headInfos_ 
	    	spreadJs_factory.headInfos.sort( (a,b)=>{
			 return ( a.order - b.order) 
		 })
// Wed Mar 16 17:50:50 KST 2022
		sheet0.bindColumns(spreadJs_factory.headInfos ) 
		spreadJs_factory.exeHook_initHead('post', headInfos_ ) 
	}
	this.updateHead = ( headInfos_, filter_rows = null  )=>{
		console.log('*[spreadJs_service] updateHead _start_' ) 
	    let sheet0 = spreadJs_factory.sheet0  
		let DbData = spreadJs_factory.DbData
	    headInfos_.sort( (a,b)=>{
			 return ( a.order - b.order) 
		 })
    //    sheet0.setColumnHeaderAutoTextIndex(0)
	//	sheet0.setColumnHeaderAutoText($.wijmo.wijspread.HeaderAutoText.numbers)
		cur_headInfos = headInfos_ 
		sheet0.reset() 
		if( filter_rows == null )sheet0.setDataSource( DbData ) 
		else sheet0.setDataSource( filter_rows )
		sheet0.bindColumns(headInfos_ ) 
		this.rowFilter() 
//		this.lockColumns( sheet0, headInfos_ )
//Thu May 26 05:34:37 UTC 2022
// clear all Timeout  and set again.. 
		let id = window.setTimeout( function(){}, 0) 
		while( id -- ){
             window.clearTimeout(id) 
	    }
	    setTimeout( this.lockColumns, 1000, sheet0 , headInfos_ ) 
   //     sheet0.setColumnHeaderAutoTextIndex(1)
	}
    const all_lockColumns = ( sheet , headInfos_ )=>{
		let i 
		if( spreadjs_product['cur_product'] == 'gc' ){
			sheet.options.isProtected = false   
			for( i = 0 ; i< headInfos_.length ; i++ ){
//				sheet.getColumn(i).backColor("#FFFFCC") 
//				sheet.getColumn(i).borderBottom("blue")
			    spreadjs_product.getColumn0(i).backColor('#FFFFCC')  
			    spreadjs_product.borderRight( sheet.getColumn(i) , '#cddbf7' ) 
			}
			sheet.options.isProtected = true 
		}else{  
			sheet.isProtected = false   
			for( i = 0 ; i< headInfos_.length ; i++ ){
				sheet.getColumn(i).backColor("#FFFFCC") 
				sheet.getColumn(i).borderBottom("blue")
			}
			sheet.isProtected = true 
		}

	}
	this.lockColumns = ( sheet , headInfos_ )=>{		
		console.log('*[spreadJs_service] lockColumns _start_' ) 
		if( spreadjs_product['cur_product'] == 'gc' ) sheet.getColumn = spreadjs_product.getColumn0 
//Mon Jun 13 11:37:45 KST 2022
		if( workSpaceCollections_factory.my_collection.name == 'AppEdit' || workSpaceCollections_factory.my_collection.name == 'DbEdit' ){ 
			if( workSpace_factory.cur_user_info.level > -1 )all_lockColumns( sheet, headInfos_ ) 
			return 
		} 
		try{
			if( collection_configuration.component.spreadJs.disable_lockColumns)return 
		}catch(err){
			console.log(err) 
		}
		//Thu Mar 17 10:00:08 KST 2022
		let i 
	   if( spreadjs_product['cur_product'] == 'gc' ) sheet.options.isProtected = false  
	   else sheet.isProtected = false   
		
		 for( i = 0 ; i< headInfos_.length ; i++ ){
				if( !headInfos_[i].locked ){
//					sheet.getColumn(i).locked(false) 
					sheet.getColumn(i).backColor("#FFFFCC") 
				}else{
					sheet.getColumn(i).backColor('#f0eeeb') 
				}
			 if( spreadjs_product['cur_product'] == 'gc' ){
				  spreadjs_product.borderBottom( sheet.getColumn(i) , '#cddbf7' ) 
				  spreadjs_product.borderRight( sheet.getColumn(i) , '#cddbf7' ) 
			 }
			 else{
				sheet.getColumn(i).borderBottom("blue")
				sheet.getColumn(i).borderRight("blue")
			 }
		}
//  unlock selection comboBox.. 
		spreadJs_factory.colIndex_lockException_bk = JSON.parse(JSON.stringify( spreadJs_factory.colIndex_lockException )) 
		while( spreadJs_factory.colIndex_lockException.length ){
		     let col_indx  = spreadJs_factory.colIndex_lockException.pop()
			 sheet.getColumn( col_indx ).locked( false )
		     sheet.getColumn( col_indx ).backColor("#FFFFFF") 
		}	
//Thu May 26 08:37:20 UTC 2022
		spreadJs_factory.post_lockColumns_ft.forEach((ent)=>ent()) 
	   if( spreadjs_product['cur_product'] == 'gc' ) sheet.options.isProtected = true 
	   else sheet.isProtected = true 
//		lock_processFlag = 0 
	}
	this.setColumnType = ( col_name, cell_type , arr_dataSet )=>{
		let sheet0 = spreadJs_factory.sheet0 
        switch( cell_type ){
			case 'comboBox':
				let combo
				if( spreadjs_product['cur_product'] == 'gc' ) combo = spreadjs_product.ComboBoxCellType() 
				else combo = new $.wijmo.spread.ComboBoxCellType() 

//Mon Jun 13 14:57:12 KST 2022
				arr_dataSet = arr_dataSet.map((ent)=> { return {'text':ent , 'value':ent }  } ) 
				combo.items( arr_dataSet ) 
				let col_indx = this.getHeadIndex( col_name ) 

	            if( spreadjs_product['cur_product'] == 'gc' )spreadjs_product.getColumn0( col_indx).cellType( combo ) 
				else sheet0.getColumn( col_indx ).cellType( combo ) 

				spreadJs_factory.colIndex_lockException.push( col_indx ) 
				break;
		}
	}
///////////////////////////////////////////////////////////////////////////////////////////
// run time service. part..
//////////////////////////////////////////////////////////////////////////////////////////	
	this.setFreezeCol = ( freezeCol_ ) =>{ spreadJs_factory.freezeCol = freezeCol_ } 
	this.getFreezeCol = ()=>spreadJs_factory.freezeCol 
    this.doFreezeCol = ()=>{
		if( spreadJs_factory.freezeCol == null )return 
		if( spreadjs_product['cur_product'] == 'gc' )sheet0.frozenColumnCount( freezeCol ) 
		else sheet0.setFrozenCount( -1 ,spreadJs_factory.freezeCol )
    }
	this.getWorking_entry = () =>{ return working_entry } 
	this.setWorking_ent = ( ent )=>{
		working_entry = ent 
	}
	var pre_saveTbl_f_list = [] 
	this.addPre_saveTbl_f_list = ( ft_name )=>{
		pre_saveTbl_f_list.push( ft_name ) 
	}
	this.promise_postHdr = ( tbl_name_, headInfos_ )=>{
		return new Promise(( resolve, reject )=>{
			this.saveHead( tbl_name_ , headInfos_ , ( Data_ )=>{
				resolve( Data_) 
	})})}
	this.promise_postData = ( tbl_name_ , DbData_ , mode )=>{
		return new Promise(( resolve, reject )=>{
			restApiServiceDbEdit.postData( tbl_name_ ,DbData_ , ( Data_ )=>{
					resolve( Data_ ) }, mode , working_entry, { db_mode: this.getDb_mode()} )
	})}
	this.saveTbl = async ( tbl_name_ = spreadJs_factory.tbl_name, mode = 1, cb_f =()=>{} )=>{
// 2021-12-27 
		if( tbl_name_ == 'app_list' || tbl_name_ == 'collection_list' ){
			DbData = DbData.filter((ent)=>ent.id_jpt != undefined || ent.id != undefined || ent.seq != undefined )  
			DbData = DbData.filter((ent)=>{ 
	//			 if( ent.id != undefined )return ent.id != null 
				 return ent.id != null  
			})  
		}
// Wed May 11 08:51:26 UTC 2022
		spreadJs_factory.sync_records( DbData) 
		 
		pre_saveTbl_f_list.forEach(( ent_f )=>{
			ent_f() 
		})
/*	move to tbl specific.. 	
		DbData.forEach((ent)=>{
			if( ent['실사용자'] == undefined ) ent['실사용자'] = ent['사용자성명'] 
		})
*/		
		spreadJs_factory.headInfos = spreadJs_factory.headInfos.filter((ent)=>ent.name != undefined ) 
		if( spreadJs_factory.frame_type == 'AppEdit'){
			debugger;
			let temp_data = null 
			let cur_server = workSpace_factory.cur_server ; 
			let data = { data: DbData , hdr: spreadJs_factory.headInfos };  
			switch( tbl_name_ ){
				case 'app_list':
					temp_data = await $http({ method: 'POST' , url:`/web_admin_editor/apps_list/${ cur_server }/1`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				case 'collection_list':
					temp_data = await $http({ method: 'POST', url:`/web_admin_editor/collections_list/${ cur_server }/1`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				case '관리회사':
					temp_data = await $http({ method: 'POST', url:`/web_admin_editor/servers_list/1`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				default:
					alert("frame_type AppEdit only support app_list , collections_list") 
					break;

			}
		}else{
			Promise.all([ this.promise_postData( tbl_name_, DbData, mode ), this.promise_postHdr( tbl_name_, spreadJs_factory.headInfos )]).then((Data_s)=>{
	// Mon Mar 21 09:21:17 KST 2022 - this_configuartion.ot_saveTbl_refresh added..
				try{
			  if( spreadJs_factory.appConfiguration.component.spreadJs.rt_save.ignore_dataRefresh && !this_configuartion.ot_saveTbl_refresh )return 
				}catch(err){
					console.log(err)
				}
				this_configuartion.ot_saveTbl_refresh = 0 
		
				this.initData( Data_s[0] ) 
				this.initHead( Data_s[1] ) 
		    post_loadHead_f_list.forEach(( ent_f )=>{ ent_f() })
	// Fri Feb 25 15:50:44 KST 2022
		    post_saveTbl_f_list.forEach(( ent_f )=>{ ent_f() })
				cb_f() 
			})
	    	}
	}	
/*
	async promise using args ptr.. 
*/
	this.promise_getData_withArgs = ( tbl_name_ , in_args )=>{
		return new Promise((resolve, reject )=>{
			restApiServiceDbEdit.getData( tbl_name_ , ( Data_ )=>{ resolve( Data_ ) }, in_args ) 
		})
	}
	this.loadTbl = ( tbl_name_ , callback , in_args = null ) =>{
		 this.promise_getData_withArgs( tbl_name_ , in_args ).then(( Data_ )=>{ callback( Data_ , in_args )}) 
	}
///////////////////////////////////////////////////////////////////////////////////////////
// run time filter service. part..
//////////////////////////////////////////////////////////////////////////////////////////	
   this.rowFilter = ()=>{
	      let sheet0 = spreadJs_factory.sheet0  
//		  sheet0.rowFilter(new $.wijmo.wijspread.HideRowFilter(new $.wijmo.wijspread.Range( 0,0,sheet0.getRowCount() ,sheet0.getColumnCount() )))
	      spreadjs_product.rowFilter_enable( sheet0 ) 
   }
// from spreadJs_factory		parts_spreadOpen_tbl_f : null ,
	this.call_openTbl = ( tbl_name_ )=>{
		 spreadJs_factory.parts_spreadOpen_tbl_f( tbl_name_ ) 
	}
	this.set_openTbl = ( openTbl_ft )=>{
		 spreadJs_factory.parts_spreadOpen_tbl_f = openTbl_ft 
	}
}])
//////////////////////////////////////////////////////////////////////////////////////////
//  spreadJs_db_factory/service.  for MSSQL communication. 
//////////////////////////////////////////////////////////////////////////////////////////
.factory('spreadJs_db_factory',['$injector','spreadJs_factory', function( $injector , spreadJs_factory ){
	 var $filter = $injector.get('$filter') 	
	var spreadJs_db_factory = {
		// spreadJs_factory / spreadJs_service. 
		get_spreadJs_factory : ()=>spreadJs_factory ,
		get_Spread : ()=>spreadJs_factory.Spread ,
		get_headInfos : ()=>spreadJs_factory.headInfos ,
		get_sheet0: ()=>spreadJs_factory.sheet0 , 
		get_colIndex_lockException_bk : ()=>spreadJs_factory.colIndex_lockException_bk ,
		unFill_color : "lightgreen" ,		 
		edit_color :'white' ,
		newId_jpt : null,
		newId_row : { row_num : null , unfill_col_nums_info :[] }	 
	}
	 return spreadJs_db_factory
}])
.service('spreadJs_db_service',['$injector','spreadJs_service','spreadJs_db_factory',
	function( $injector, spreadJs_service,spreadJs_db_factory){
	var $filter = $injector.get('$filter') 	

	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')){
		spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
		spreadjs_product['cur_product'] = 'wijmo'
	}else if($injector.has('gcSpreadjs_factory')){
		spreadjs_product = $injector.get('gcSpreadjs_factory') 
		spreadjs_product['cur_product'] =  'gc' 
	}
	var spreadJs_factory = spreadJs_db_factory.get_spreadJs_factory()

	this.indicateNotNull_tempRow = ()=>{
         console.log('*[spreadJs_db_service] indicateNotNull_tempRow:', spreadJs_db_factory.newId_jpt ) 	
		try{
			if( spreadJs_factory.appConfiguration.component.spreadJs.rt_save.type != 'insert_first' ){
				console.log('*[spreadJs_db_service] indicateNotNull_tempRow: appConfiguration.component.spread_js.type not insert_first return') 	
				return 
			}
		}catch(err){
			console.log(err) 
			return 
		}
//		 let filter_notNull = $filter('filter')( spreadJs_db_factory.get_headInfos(), { IS_NULLABLE : 'FALSE' } ) 
		 let filter_notNull = $filter('filter')( spreadJs_db_factory.get_headInfos(), { ALLOWNULL : 'FALSE' } ) 
		 let filter_nonLocked = $filter('filter')( spreadJs_db_factory.get_headInfos(), { locked : 'FALSE' } ) 
		 spreadJs_db_factory.newId_row.unfill_col_nums_info = []  
		 let newRow_num = spreadJs_db_factory.newId_row.row_num  
		 let sheet0 =  spreadJs_db_factory.get_sheet0() 
		 let Spread =  spreadJs_db_factory.get_Spread() 
		 sheet0.isProtected = false
		 filter_notNull.forEach((ent)=>{
			 let col_num = spreadJs_service.getHeadIndex( ent.name ) 
			 let cell = sheet0.getCell( newRow_num, col_num ) 
			 let backColor = cell.backColor()
			 spreadJs_db_factory.newId_row.unfill_col_nums_info.push( { row_num : newRow_num , col_num : col_num , backColor: backColor, cell_lock : cell.locked() } ) 	
//			 spreadJs_factory.sheet0.suspendEvent()
			 Spread.isPaintSuspended( true )
			 cell.backColor( spreadJs_db_factory.unFill_color )  
//			 sheet0.getCell( newRow_num, col_num ).backColor("lightgreen") 
// Mon May 30 00:20:07 UTC 2022  .. unlocked the cells 
//			 cell.locked( false )
			 Spread.isPaintSuspended( false ) 
//			 sheet0.resumeEvent() 
		 })
		 filter_nonLocked.forEach((ent)=>{
			 let col_num = spreadJs_service.getHeadIndex( ent.name ) 
			 let cell = sheet0.getCell( newRow_num, col_num ) 
			 if( cell.backColor() != spreadJs_db_factory.unFill_color )cell.backColor( spreadJs_db_factory.edit_color )  
			 cell.locked( false ) 
		 })
		 sheet0.isProtected = true 
//Tue May 31 01:00:14 UTC 2022
//		 Spread.showActiveCell( spreadjs_product.VerticalPosition.bottom , spreadjs_product.HorizontalPosition.left ) 
//		 Spread.showActiveCell( 56 , spreadjs_product.HorizontalPosition.left ) 
//		 console.log('t', Spread.getTabStripRatio() ) 
//		 Spread.showRow( newRow_num , spreadjs_product.VerticalPosition.center ) 
		 sheet0.showRow( newRow_num , spreadjs_product.VerticalPosition.center ) 
//Mon Jun 13 14:51:32 KST 2022
//		 Spread.setTabStripRatio(1) 
// Test function call.. 
//		this.convertTo_updateRow() 
	}
	this.convertTo_updateRow = ()=>{
		try{
			if( spreadJs_factory.appConfiguration.component.spreadJs.rt_save.type != 'insert_first' ){
				console.log('*[spreadJs_db_service] convertTo_updateRow : appConfiguration.component.spread_js.type not insert_first return') 	
				return 
			}
		}catch(err){
			console.log(err)
			return 
		}
		 let sheet0 =  spreadJs_db_factory.get_sheet0() 
		 let Spread =  spreadJs_db_factory.get_Spread() 
		 sheet0.isProtected = false
/*		
		 spreadJs_db_factory.newId_row.unfill_col_nums_info.forEach((ent)=>{
			let cell = sheet0.getCell( ent.row_num, ent.col_num )
			cell.backColor( ent.backColor ) 
		 })
*/		 
		 let headInfos_ = spreadJs_db_factory.get_headInfos()  
		 let newRow_num = spreadJs_db_factory.newId_row.row_num  
		 let i 
		 Spread.isPaintSuspended( true )
		 for( i = 0 ; i< headInfos_.length ; i++ ){
		        let cell = sheet0.getCell( newRow_num, i ) 
				if( !headInfos_[i].locked ){
					cell.backColor("#FFFFCC") 
				}else{
					cell.backColor('#f0eeeb') 
				}
//			cell.borderBottom("blue")
//			cell.borderRight("blue")
		}
	    Spread.isPaintSuspended(false)
//  unlock selection comboBox.. 
		let colIndex_lockException = spreadJs_db_factory.get_colIndex_lockException_bk() 
		i = colIndex_lockException.length
		 Spread.isPaintSuspended( true )
		do{
			 let col_indx = colIndex_lockException[i]
		     let cell = sheet0.getCell( newRow_num, col_indx ) 
			 cell.locked( false )
		     cell.backColor("#FFFFFF") 
		}while( i-- ) 	
	    Spread.isPaintSuspended(false)
		sheet0.isProtected = true 
		sheet0.showRow( newRow_num , spreadjs_product.VerticalPosition.center ) 
	}
}])
