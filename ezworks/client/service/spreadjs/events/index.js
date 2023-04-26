angular.module('spreadjs_events', [])
.factory('spreadjsEvents_factory',function(){
	var spreadjsEvents_factory ={
		  err_message: {} ,
		  message_ft: null, 
		  bind_errMessage_ft : ( message_ft_ )=>{
			   spreadjsEvents_factory.message_ft = message_ft_
		  },
                  sell_cell : { 'col_sel': null , 'row_sel': null } 
	}
	return spreadjsEvents_factory
})
.service('spreadjsEvents_service',['$injector','spreadJs_service','spreadjsFilter_service','sheetFormat_service','jsonEditor_service',
	'addSheets_service','asyncJob_service','spreadJs_factory','formulas_service',
	function( $injector, spreadJs_service,spreadjsFilter_service, sheetFormat_service , jsonEditor_service, addSheets_service, asyncJob_service , spreadJs_factory, formulas_service){
	var $filter = $injector.get('$filter')   
	var spreadjsEvents_factory = $injector.get('spreadjsEvents_factory') 
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')) spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
	else if( $injector.has('gcSpreadjs_factory')) spreadjs_product = $injector.get('gcSpreadjs_factory') 
	
	var post_cellClick_f_list = [] 
   //    var spreadjsEvents_factory.sell_cell = { 'col_sel': null , 'row_sel': null } 
	this.addPost_cellClick_f_list = ( ft_name )=>{ 
		post_cellClick_f_list.push( ft_name ) 
	 }
	this.getSel_cell = ()=> spreadjsEvents_factory.sell_cell 
	this.register_sheet0_bind_cellClick = () => {
			let sheet0 = spreadJs_service.getSheet0() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellClick() 		
//	        sheet0.unbind( cellClick )
//	        sheet0.unbind( $.wijmo.wijspread.Events.CellClick )
	        sheet0.unbind( spreadjs_product.Events.CellClick )
//	        sheet0.bind( $.wijmo.wijspread.Events.CellClick, ( sender, args )=>{
	        sheet0.bind( spreadjs_product.Events.CellClick, ( sender, args )=>{
				let headInfos = spreadJs_service.getHeadInfos()
			    let sheet0 = spreadJs_service.getSheet0() 
//  let colHeader = SpreadJs_product( wijmoSpreadjs_factory ).getColHeader() 				
				var col_title = sheet0.getValue( 0, args.col , spreadjs_product.SheetArea.colHeader ) 
//				var col_title = sheet0.getValue( 0, args.col , $.wijmo.wijspread.SheetArea.colHeader ) 
				const col_name = headInfos.find((ent)=>ent.displayName == col_title ).name  
			    spreadjsEvents_factory.sell_cell.col_sel =  col_name 
				spreadjsEvents_factory.sell_cell.row_sel =  args.row 
				const  key  = sheet0.getValue( args.row , args.col ) 
				spreadjsFilter_service.setFilter_key( key , col_name )
				spreadJs_service.setFreezeCol(args.col)   
				post_cellClick_f_list.forEach((ent)=>ent( key )) 
// update affected_recordsId ... 				
				let id_index_obj = spreadJs_service.getId_index_obj() 
				if( id_index_obj['key'] == 'id'){
					let index = sheet0.getValue( args.row , id_index_obj.index ) 
					if( spreadJs_factory.current_dataMode ) spreadJs_factory.add_affected_recordsId( index )
				}
		})
	}
	this.register_sheet1_bind_cellClick = () => {
			let sheet1 = spreadJs_service.getSheet1() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellClick() 		
//	        sheet1.unbind( $.wijmo.wijspread.Events.CellClick )
	        sheet1.unbind( spreadjs_product.Events.CellClick )
//	        sheet1.bind( $.wijmo.wijspread.Events.CellClick, ( sender, args )=>{
	        sheet1.bind( spreadjs_product.Events.CellClick, ( sender, args )=>{
				let headInfos = sheetFormat_service.getHeadInfos()
//  let colHeader = SpreadJs_product( wijmoSpreadjs_factory ).getColHeader() 				
//				var col_title = sheet1.getValue( 0, args.col , $.wijmo.wijspread.SheetArea.colHeader ) 
				var col_title = sheet1.getValue( 0, args.col , spreadjs_product.SheetArea.colHeader ) 
				const col_name = headInfos.find((ent)=>ent.displayName == col_title ).name  
			    spreadjsEvents_factory.sell_cell.col_sel =  col_name 
				spreadjsEvents_factory.sell_cell.row_sel =  args.row 
				const  key  = sheet1.getValue( args.row , args.col ) 
				spreadjsFilter_service.setFilter_key( key , col_name )
//Mon Jun 20 09:59:59 KST 2022

				spreadJs_service.setFreezeCol(args.col)   
				post_cellClick_f_list.forEach((ent)=>ent( )) 
// Mon Jun 20 10:12:52 KST 2022 
//  addd 1st argment :key 
		})
	}
	this.register_sheet0_bind_cellDoubleclick = ( postEvent_ft  ) => {
		   	let sheet0 = spreadJs_service.getSheet0() 
			let spread_data = spreadJs_service.getDbData() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellDoubleClick() 		
		    sheet0.unbind( spreadjs_product.Events.CellDoubleClick )
		    sheet0.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
		    	let id_index = spreadJs_service.getId_index() 
				let collection_configuration = spreadJs_service.getCollection_configuration() 
				const working_id = sheet0.getValue( args.row, id_index ) 
				let working_row = spread_data.find(( ent)=> ent.id_jpt == working_id ) 
				spreadJs_service.setWorking_ent( working_row ) 
//  let colHeader = SpreadJs_product( wijmoSpreadjs_factory ).getColHeader() 				
				let col_title = sheet0.getValue( 0, args.col , spreadjs_product.SheetArea.colHeader ) 
// following code move to postEvent_ft/..				
			    let dataMode = 1 
//Thu May 26 01:21:36 UTC 2022
			    if( collection_configuration.sheetEditMode == 1 && spreadJs_factory.frame_type == 'DbEdit' ){
					if( col_title == 'html'){
						const  html_  = sheet0.getValue( args.row , args.col ) 
						jsonEditor_service.changeCkEditor_cell( html_ , args.row , args.col , sheet0, working_row ) 
                        dataMode = 3   // html ckeditor entry.. 
					}else if( args.col == id_index || args.col == 0 ){
						jsonEditor_service.changeJSONEditor_row( working_row , args.row , sheet0 ) 	
						dataMode = 2 
					}else {
						const  key  = sheet0.getValue( args.row , args.col ) 
				        let json_check
						try{ json_check = JSON.parse( key ) }catch(err){ console.log( err ) }
						if( Array.isArray(json_check ) || typeof json_check === 'object' ){
							console.log( json_check ) 
							jsonEditor_service.changeJSONEditor_cell( json_check , args.row , args.col , sheet0, working_row ) 
							dataMode = 2 
						}
					}	
				}
				postEvent_ft( dataMode ) 
//				scope.mode = 1
//				scope.change_dataedit() 
//				scope.$apply() 
    	})
	}	
	this.register_sheet1_bind_cellDoubleclick = ( postEvent_ft_ )=>{
		    var postEvent_ft = postEvent_ft_
		   	let sheet1 = spreadJs_service.getSheet1() 
			let spread_data = spreadJs_service.getDbData() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellDoubleClick() 		
		    sheet1.unbind( spreadjs_product.Events.CellDoubleClick )
		    sheet1.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
				let headInfos = sheetFormat_service.getHeadInfos()
		   	    let sheet1 = spreadJs_service.getSheet1() 
//  let colHeader = SpreadJs_product( wijmoSpreadjs_factory ).getColHeader() 				
				var col_title = sheet1.getValue( 0, args.col , spreadjs_product.SheetArea.colHeader ) 
				const col_name = headInfos.find((ent)=>ent.displayName == col_title ).name  
		    	let id_index = spreadJs_service.getId_index() 
				const working_id = sheet1.getValue( args.row, id_index ) 
			    spreadjsEvents_factory.sell_cell.col_sel =  col_name 
				spreadjsEvents_factory.sell_cell.row_sel =  args.row 
				const  key  = sheet1.getValue( args.row , args.col ) 
				let json_check
				try{
				    json_check = JSON.parse( key ) 
				}catch(err){
					console.log( err ) 
				}
				let dataMode = 0
				if( Array.isArray(json_check ) || typeof json_check === 'object' ){
					console.log( json_check ) 
					jsonEditor_service.changeJSONEditor_cell( json_check , args.row , args.col , sheet1) 
					dataMode = 2 
				}
// following code move to postEvent_ft/..				
    			postEvent_ft_( dataMode ) 
//				scope.mode = 1
//				scope.change_dataedit() 
//				scope.$apply() 
    	})

	}
	this.register_sheet0_bind_topRowChanged = ()=>{
		   	let sheet0 = spreadJs_service.getSheet0() 
//  let topRowChanged =   SpreadJs_product( wijmoSpreadjs_factory ).Events.TopRowChanged()  		
		    sheet0.unbind( spreadjs_product.Events.TopRowChanged)
		    sheet0.bind( spreadjs_product.Events.TopRowChanged, ( sender, args )=>{
				console.log( args.newTopRow )  
			    sheetFormat_service.updateColFormula( args.newTopRow ) 	
			})
	}
	this.register_spread_bind_activeSheetChanging = ()=>{
		let spread = spreadJs_service.getSpread() 
//  let ActiveSheetChanging =   SpreadJs_product( wijmoSpreadjs_factory ).Events.ActiveSheetChanging()  		
		spread.unbind(spreadjs_product.Events.ActiveSheetChanging )
		spread.bind(spreadjs_product.Events.ActiveSheetChanging, ( sender, args )=>{
			spreadJs_service.setHeadInfos()  // null. 
			console.log( args.newSheet._name ) 
			if( args.newSheet._name == 'FormatSheet' )addSheets_service.updateSheetFormat() 
		})
	}
	this.register_sheet0_bind_rt_save = this.register_sheet0_bind_dragDropBlockCompleted 
	this.register_sheet0_bind_non_dragDropBlockCompleted = ()=>{
		let sheet0 = spreadJs_service.getSheet0() 
//  let editEnd  =   SpreadJs_product( wijmoSpreadjs_factory ).Events.EditEnd()  		
		sheet0.unbind( spreadjs_product.Events.EditEnd )
		sheet0.bind( spreadjs_product.Events.EditEnd, ( sender, args )=>{
//			save_data( args.row , args.row + 1 ) 
			let id_index_obj = spreadJs_service.getId_index_obj() 
		   	let sheet0 = spreadJs_service.getSheet0() 
			if( id_index_obj['key'] == 'id'){
		     	let index = sheet0.getValue( args.row , id_index_obj.index ) 
   				if( spreadJs_factory.current_dataMode ) spreadJs_factory.add_affected_recordsId( index )
			}
		})
	}
	this.register_sheet0_bind_dragDropBlockCompleted = ()=>{
//////////////////////////////////////////////////////////////////////////////////////////////////
//  Copy & Paste communication with DataBase.. 
///////////////////////////////////////////////////////////////////////////////////////////////// 		
		let sheet0 = spreadJs_service.getSheet0() 
/*		
		var cutCopyRange 
		origionalCopyAction = $.wijmo.wijspread.SpreadActions.copy 
		origionalPasteAction = $.wijmo.wijspread.SpreadActions.paste 
		$.wijmo.wijspread.SpreadActions.copy = () => {
			cutCopyRange = sheet0.getSelections()[0] 
			origionalCopyAction.call( sheet0 ) 
		}
		$.wijmo.wijspread.SpreadActions.paste = ()=>{
				console.log('paste action') 
			if( cutCopyRange ){
				let pasteRanges = sheet0.getSelections() 
				let start = pasteRanges[0].row , end = start + pasteRanges.length  
			    save_data( start , end ) 
//				console.log('paste action') 
//				setTimeout( save_data , 2000 , start, end ) 
			}
			origionalPasteAction.call( sheet0 ) 
	    }
*/		
//////////////////////////////////////////////////////////////////////////////////////////////////
//  Block Fill  communication with DataBase.. 
///////////////////////////////////////////////////////////////////////////////////////////////// 		
		const save_data = ( rowRange_start, rowRange_end ) =>{
			const df_type_join = ( working_row_ , headInfos_ )=>{
				  var join_working_row = {} 
				  for( const [key, value] of Object.entries( working_row_ )){
					   let headEntry = headInfos_.find((ent)=>ent.name == key )
					   if( headEntry.locked == false ){
						   if(join_working_row[ headEntry.fromTbl ] == undefined ) join_working_row[ headEntry.fromTbl ] = {} 
						   join_working_row[ headEntry.fromTbl ][key] = value   
					   }
			     }
				 let join_tbl_arr = Object.keys( join_working_row ) 
				 join_tbl_arr.forEach((ent)=>{
					 let db_name = ''
					 if( db_name = spreadJs_factory.appConfiguration.db_name ) tbl_name = db_name +'@'+ ent   
					 let mode = 0 
					 if( working_row_['tanker_seq'] ) join_working_row[ent]['seq'] = working_row_['tanker_seq'] 
					 else{
						 mode = 1  
//Tue Jun 21 09:06:47 KST 2022
						 join_working_row[ent]['tanker_seq'] = working_row_['seq'] 
					 }	 
      				 asyncJob_service.enqueue( tbl_name , join_working_row[ent] , mode  ) 
				 })
			 }
			let i 
			let id_index_obj = spreadJs_service.getId_index_obj() 
			let DbData = spreadJs_service.getDbData() 
			let headInfos = spreadJs_service.getHeadInfos()
			let tbl_name = spreadJs_service.getTbl_name() 
			let dbMode = spreadJs_service.getDb_mode() 
			switch( dbMode) {
				case 'mssql':
					for( i = rowRange_start ; i < rowRange_end ; i++ ){
						let index = sheet0.getValue( i, id_index_obj.index ) 
						let working_row = DbData.find((ent)=>ent[ id_index_obj.key ] == index ) 
						let date_cols = headInfos.filter((ent)=>ent.formatter =='YYYY-MM-DD')
						if( date_cols ){
							date_cols.forEach((ent)=>{
								if( !working_row[ent.name] )return 
								if( typeof working_row[ent.name] == 'number' )working_row[ent.name] = formulas_service.oaDate2yyyymmdd( working_row[ent.name]) 
								else if( working_row[ent.name].includes('OADate')){
									  const regex = /[^0-9]/g
									  const result = working_row[ent.name].replace( regex, "" ) 
									  let intOADate = parseInt( result )
									  working_row[ent.name]  = formulas_service.oaDate2yyyymmdd( intOADate ) 
								}
								else 	
								working_row[ent.name] = formulas_service.ostStr2yyyymmdd( working_row[ent.name]) 
							})
						}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   1.  empty field normalize to '' 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							
						for( key of Object.keys( working_row )){
							if( working_row[key] == 'null' || working_row[key] == null || working_row[key] == 'undefined' )working_row[key] = ''    
						}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   2. remove not Null  '' 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							
//						let filter_nullable = $filter('filter')( headInfos , { IS_NULLABLE : 'TRUE' } )  
						let filter_nullable = $filter('filter')( headInfos , { ALLOWNULL : 'TRUE' } )  
                        filter_nullable.forEach((ent)=>{
							if( working_row[ent.name] == '' ) delete working_row[ent.name]
						})
//Thu May 26 02:10:50 UTC 2022
						// need   if  full field  all fill.. 
//						let filter_notNull = $filter('filter')( headInfos , { IS_NULLABLE : 'FALSE' } )  
						let filter_notNull = $filter('filter')( headInfos , { ALLOWNULL : 'FALSE' } )  
						let notNull_unfilled =  filter_notNull.reduce(( acc , cur , index )=>{
							    if( working_row[cur.name] == '' || working_row[cur.name] == undefined )acc.push( cur.name ) 
							    return acc 
						},[])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   #Asisfni specific code..  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							
// Fri Jun 17 14:17:58 KST 2022
// branch to  join .   appConfiguration.df.type == 'join' 						
						if( spreadJs_factory.appConfiguration.df?.type == 'join' ){
								df_type_join( working_row, headInfos  ) 
							    return 
						}

						if( !working_row['seq'] ){ 
							working_row['seq'] = working_row['tanker_seq'] 
							delete working_row['tanker_seq'] 
						}
						if( notNull_unfilled.length ){
							spreadjsEvents_factory.err_message['message']  = `id[${ working_row['seq']}] ##항목기입오류##\n ${ notNull_unfilled.join(',') }`
							spreadjsEvents_factory.err_message['class'] ='warning'
							spreadjsEvents_factory.message_ft( spreadjsEvents_factory.err_message ) 
							continue 
						}
						let mode = 0  // 0: update 1: create. 
						if( working_row['id_jpt'] == spreadJs_factory.get_db_factory_newId_jpt() ){ 
								mode = 1  
							    working_row['id'] = working_row['id_jpt'] 
								console.log(' new Entry edited..!') 
							} 
							//						spreadJs_service.setWorking_ent( working_row ) 
							//						spreadJs_service.saveTbl() 
							spreadjsEvents_factory.err_message['message']  = `id[${ working_row['seq']}] ## Data Insert _start_`
							spreadjsEvents_factory.err_message['class'] ='success'
							spreadjsEvents_factory.message_ft( spreadjsEvents_factory.err_message ) 
//Wed Jun 15 16:21:55 KST 2022
						    let db_name = ''
						    if( db_name = spreadJs_factory.appConfiguration.db_name ) tbl_name = db_name +'@'+ tbl_name  
							asyncJob_service.enqueue( tbl_name , working_row, mode  ) 
						}
						break ;
					case 'fdb':
						default:
						spreadJs_service.saveTbl() 
					}
		}
//  let dragDropBlockCompleted =   SpreadJs_product( wijmoSpreadjs_factory ).Events.DragDropBlockCompleted  		
		sheet0.unbind( spreadjs_product.Events.DragDropBlockCompleted )
		sheet0.bind( spreadjs_product.Events.DragDropBlockCompleted, ( sender, args )=>{
			console.log( args ) 
		})
//  let dragFillBlockCompleted =   SpreadJs_product( wijmoSpreadjs_factory ).Events.DragFillBlockCompleted  		
		sheet0.unbind( spreadjs_product.Events.DragFillBlockCompleted )
		sheet0.bind( spreadjs_product.Events.DragFillBlockCompleted, ( sender, args )=>{
			console.log( args ) 
			let start = args.fillRange.row , end = args.fillRange.row + args.fillRange.rowCount 
			save_data( start , end ) 
		})
//  let clipboardPasted =   SpreadJs_product( wijmoSpreadjs_factory ).Events.ClipboardPasted
		sheet0.unbind( spreadjs_product.Events.ClipboardPasted )
		sheet0.bind( spreadjs_product.Events.ClipboardPasted, ( sender, args )=>{
			console.log( args ) 
			let start = args.cellRange.row , end = args.cellRange.row + args.cellRange.rowCount 
			save_data( start , end ) 
		})
//  let editEnd  =   SpreadJs_product( wijmoSpreadjs_factory ).Events.EditEnd  		
		sheet0.unbind( spreadjs_product.Events.EditEnd )
		sheet0.bind( spreadjs_product.Events.EditEnd, ( sender, args )=>{
			console.log( args ) 
//			save_data( args.row , args.row + 1 ) 
//			if( spreadJs_factory.current_dataMode ) spreadJs_factory.affected_recordsId.push(  )
			setTimeout( save_data , 2000, args.row , args.row + 1 ) 
		})
	}
}])







