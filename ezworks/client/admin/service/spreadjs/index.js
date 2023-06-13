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
		affected_recordsId: [],
		hook_initHead : { 'pre': [] , 'post':[] }, 
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
//////////////////////////////////////////////////////////////////////////////////////////
// spreadJs  parts from functions.   
//////////////////////////////////////////////////////////////////////////////////////////
		 process_filters: null ,
		 process_colFilter: null
	 }
	 return spreadJs_var
}])
.service('spreadJs_service',['$injector',
'workSpace_factory',
'spreadJs_factory',
	function($injector , 
workSpace_factory, 
spreadJs_factory, 
){
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
	var DbData 
	var id_index 
	var id_index_obj = {} 
	var cur_headInfos 
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
	this.openTbl_appEdit = async( tbl_name_, initSpreadjs_openTbl = null , spreadjs_openTbl_cb = null )=>{
		spreadJs_factory.tbl_name = tbl_name_ 
		console.log('*[spreadJs_service].openTbl  _start_') 
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
	 			temp_data = await $http.get(`/Jupiter/db_edit/jupiter/app_list/${ cur_server }`).catch((err)=>{ console.log( err )})	//  proxy middleware.. 
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
	                case 'app_list_common':
	 			temp_data = await $http.get(`/Jupiter/db_edit/jupiter/app_list/`).catch((err)=>{ console.log( err )})	//  proxy middleware.. 
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
			case 'collection_list':
	 			temp_data = await $http.get(`/Jupiter/db_edit/jupiter/collection_list/${ cur_server }`).catch((err)=>{ console.log( err )})	// option 1  
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
			case 'collection_list_common':
	 			temp_data = await $http.get(`/Jupiter/db_edit/jupiter/collection_list/`).catch((err)=>{ console.log( err )})	// option 1  
	 			Data_s[0] = temp_data.data.DATA.data
				Data_s[1] = temp_data.data.DATA.hdr 
			        spreadjs_openTbl_cb( Data_s ) 
				break;
			case '관리회사':
	 			temp_data = await $http.get(`/Jupiter/db_edit/jupiter/server_list/`).catch((err)=>{ console.log( err )})	// option 1  
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

	    if( spreadjs_product['cur_product'] == 'gc'){
		    sheet0.name('DataSheet') 
		    sheet1.name('FormatSheet')
	    }
	    else{
		    sheet0.Name('DataSheet')
		    sheet0.name('FormatSheet')
	    }
   //     sheet0.setRowCount(2,$.wijmo.wijspread.SheetArea.colHeader);
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
	this.getTbl_name = ()=>spreadJs_factory.tbl_name 	
	this.setTbl_name = ( tbl_name_ )=>{ spreadJs_factory.tbl_name = tbl_name_ } 
// Fri Mar  4 10:21:23 KST 2022
///////////////////////////////////////////////////////////////////////////////////////////
// Head format  service. part..
//////////////////////////////////////////////////////////////////////////////////////////	
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
//1		sheet0.bindColumns(spreadJs_factory.headInfos ) 
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
//		this.rowFilter() 
//		this.lockColumns( sheet0, headInfos_ )
//Thu May 26 05:34:37 UTC 2022
// clear all Timeout  and set again.. 
	}
///////////////////////////////////////////////////////////////////////////////////////////
// run time service. part..
//////////////////////////////////////////////////////////////////////////////////////////	
	var pre_saveTbl_f_list = [] 
	this.addPre_saveTbl_f_list = ( ft_name )=>{
		pre_saveTbl_f_list.push( ft_name ) 
	}
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
		spreadJs_factory.headInfos = spreadJs_factory.headInfos.filter((ent)=>ent.name != undefined ) 
			debugger;
			let temp_data = null 
			let cur_server = workSpace_factory.cur_server ; 
			let data = { data: DbData , hdr: spreadJs_factory.headInfos };  
			switch( tbl_name_ ){
				case 'app_list':
					temp_data = await $http({ method: 'POST' , url:`/Jupiter/db_edit/jupiter/app_list/${ cur_server }`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				case 'app_list_common':
					temp_data = await $http({ method: 'POST' , url:`/Jupiter/db_edit/jupiter/app_list/`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				case 'collection_list':
					temp_data = await $http({ method: 'POST' , url:`/Jupiter/db_edit/jupiter/collection_list/${ cur_server }`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				case 'collection_list_common':
					temp_data = await $http({ method: 'POST' , url:`/Jupiter/db_edit/jupiter/collection_list/`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				case '관리회사':
					temp_data = await $http({ method: 'POST' , url:`/Jupiter/db_edit/jupiter/server_list/`, data }).catch((err)=>{ console.log( err )})	// option 1  
					break;
				default:
					alert("frame_type AppEdit only support app_list , collections_list") 
					break;

			}
	}	
}])
