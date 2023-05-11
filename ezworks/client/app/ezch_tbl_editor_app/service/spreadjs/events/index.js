angular.module('spreadjs_events', [])
.factory('spreadjsEvents_factory',function(){
	var spreadjsEvents_factory ={
		  err_message: {} ,
		  message_ft: null, 
		  bind_errMessage_ft : ( message_ft_ )=>{
			   spreadjsEvents_factory.message_ft = message_ft_
		  },
	}
	return spreadjsEvents_factory
})
.service('spreadjsEvents_service',['$injector','spreadJs_service',
'spreadJs_factory',
'sheetFormat_service',	
'asyncJob_service',
	function( $injector, spreadJs_service,
spreadJs_factory, 
sheetFormat_service, 		
asyncJob_service, 
){
	var $filter = $injector.get('$filter')   
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')) spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
	else if( $injector.has('gcSpreadjs_factory')) spreadjs_product = $injector.get('gcSpreadjs_factory') 
	var spreadjsEvents_factory = $injector.get('spreadjsEvents_factory') 
	var ezch_tbl_editor_eventsService = null  
	if( $injector.has('ezch_tbl_editor_eventsService')) ezch_tbl_editor_eventsService = $injector.get('ezch_tbl_editor_eventsService') 
	var ezch_tbl_editor_appService = null  
	if( $injector.has('ezch_tbl_editor_appService')) ezch_tbl_editor_appService = $injector.get('ezch_tbl_editor_appService') 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Bind cellClick Event .. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.register_sheet0_bind_cellClick = () => {
			let sheet0 = spreadJs_service.getSheet0() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellClick() 		
//	        sheet0.unbind( cellClick )
//	        sheet0.unbind( $.wijmo.wijspread.Events.CellClick )
	        sheet0.unbind( spreadjs_product.Events.CellClick )
//	        sheet0.bind( $.wijmo.wijspread.Events.CellClick, ( sender, args )=>{
	        sheet0.bind( spreadjs_product.Events.CellClick, ( sender, args )=>{
		})
	}
	this.register_sheet1_bind_cellClick = () => {
			let sheet1 = spreadJs_service.getSheet1() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellClick() 		
//	        sheet1.unbind( $.wijmo.wijspread.Events.CellClick )
	        sheet1.unbind( spreadjs_product.Events.CellClick )
//	        sheet1.bind( $.wijmo.wijspread.Events.CellClick, ( sender, args )=>{
	        sheet1.bind( spreadjs_product.Events.CellClick, ( sender, args )=>{
		})
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Bind CellChanged Event .. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.register_sheet0_bind_cellChanged = () => {
			let sheet0 = spreadJs_service.getSheet0() 
	        sheet0.unbind( spreadjs_product.Events.CellChanged )
	        sheet0.bind( spreadjs_product.Events.CellChanged, ( sender, args )=>{
                    ezch_tbl_editor_eventsService.cellChanged_event_sheet0( spreadjs_product , spreadJs_factory , args, sheetFormat_service ) 
		})
	}
	this.register_sheet1_bind_cellChanged = () => {
			let sheet1 = spreadJs_service.getSheet1() 
	        sheet1.unbind( spreadjs_product.Events.CellChanged )
	        sheet1.bind( spreadjs_product.Events.CellChanged, ( sender, args )=>{
		         let cell = sheet1.getRange('AB4:AB4', GC.Spread.Sheets.SheetArea.viewport ); 
				if( args.row == cell.row && args.col == cell.col ){
				 		const  key  = sheet1.getValue( args.row , args.col ) 
					    console.log( key ) 
//					    spreadJs_service.updateSchema_1_data( key ) 
					    spreadJs_service.updateTable_1_col( key ) 
                }else if( args.col == cell.col ){
					    spreadJs_service.updateTable_1_sql() 
				}
		})
	}
	this.register_sheet2_bind_cellChanged = () => {
			let sheet2 = spreadJs_service.getSheet2() 
	        sheet2.unbind( spreadjs_product.Events.CellChanged )
	        sheet2.bind( spreadjs_product.Events.CellChanged, ( sender, args )=>{
                    ezch_tbl_editor_eventsService.cellChanged_event_sheet2( spreadjs_product , spreadJs_factory , args, sheetFormat_service ) 
		})
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Bind CellDoubleClick Event .. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.register_sheet2_bind_cellDoubleclick = () => {
		   	let sheet2 = spreadJs_service.getSheet2() 
		    sheet2.unbind( spreadjs_product.Events.CellDoubleClick )
		    sheet2.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
				   ezch_tbl_editor_eventsService.doubleClick_event_sheet2( spreadjs_product, spreadJs_factory , args , sheetFormat_service ) 
			})
	}
	this.register_sheet0_bind_cellDoubleclick = ( postEvent_ft  ) => {
		   	let sheet0 = spreadJs_service.getSheet0() 
			let spread_data = spreadJs_service.getDbData() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellDoubleClick() 		
		    sheet0.unbind( spreadjs_product.Events.CellDoubleClick )
		    sheet0.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
    	})
	}	
	this.register_sheet1_bind_cellDoubleclick = ( postEvent_ft_ )=>{
		    var postEvent_ft = postEvent_ft_
		   	let sheet1 = spreadJs_service.getSheet1() 
			let spread_data = spreadJs_service.getDbData() 
//  let cellClick =   SpreadJs_product( wijmoSpreadjs_factory ).Events.CellDoubleClick() 		
		    sheet1.unbind( spreadjs_product.Events.CellDoubleClick )
		    sheet1.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
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
	this.register_sheet0_bind_selectionChanged = ()=>{
		    let sheet0 = spreadJs_service.getSheet0() 
		    sheet0.unbind( spreadjs_product.Events.SelectionChanged ) 
		    sheet0.bind( spreadjs_product.Events.SelectionChanged, ( sender, args )=>{
				ezch_tbl_editor_eventsService.sheet0_selectionChanged( spreadJs_factory ,sender, args ) 
			})
	}
	this.register_spread_bind_activeSheetChanging = ()=>{
		let spread = spreadJs_service.getSpread() 
//  let ActiveSheetChanging =   SpreadJs_product( wijmoSpreadjs_factory ).Events.ActiveSheetChanging()  		
		spread.unbind(spreadjs_product.Events.ActiveSheetChanging )
		spread.bind(spreadjs_product.Events.ActiveSheetChanging, ( sender, args )=>{
		})
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Bind ButtonClicked Event .. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.register_spread_bind_buttonClicked = ()=>{
		let spread = spreadJs_service.getSpread() 
//  let ActiveSheetChanging =   SpreadJs_product( wijmoSpreadjs_factory ).Events.ActiveSheetChanging()  		
		spread.unbind(spreadjs_product.Events.ButtonClicked )
		spread.bind(spreadjs_product.Events.ButtonClicked, ( sender, args )=>{
		      let spread = spreadJs_service.getSpread() 
			  let sheet_name = args.sheet.name() 
			  switch( sheet_name ){
				  case 'TblList':
					  	ezch_tbl_editor_eventsService.sheet2_buttonClicked( spreadJs_factory , sender , args ) 
					  break;
				  case 'TblView':
					  	ezch_tbl_editor_eventsService.sheet0_buttonClicked( spreadJs_factory , sender , args ) 
					  break;
				  default:
			  }
		})
	}
	this.register_sheet0_bind_rt_save = this.register_sheet0_bind_dragDropBlockCompleted 
	this.register_sheet0_bind_non_dragDropBlockCompleted = ()=>{
		let sheet0 = spreadJs_service.getSheet0() 
		sheet0.unbind( spreadjs_product.Events.EditEnd )
		sheet0.bind( spreadjs_product.Events.EditEnd, ( sender, args )=>{
		})
	}
	this.register_sheet0_bind_dragDropBlockCompleted = ()=>{
//////////////////////////////////////////////////////////////////////////////////////////////////
//  Copy & Paste communication with DataBase.. 
///////////////////////////////////////////////////////////////////////////////////////////////// 		
		let sheet0 = spreadJs_service.getSheet0() 
//////////////////////////////////////////////////////////////////////////////////////////////////
//  Block Fill  communication with DataBase.. 
///////////////////////////////////////////////////////////////////////////////////////////////// 		
		const save_data = ( rowRange_start, rowRange_end ) =>{
// Table start from 17 Data .
			if( rowRange_start < 17 )return ;
			let i 
			let id_index_obj = spreadJs_service.getId_index_obj() 
			let DbData = spreadJs_service.getDbData() 
			let headInfos = ezch_tbl_editor_appService.getHeadInfos() 

			let tbl_name = spreadJs_service.getTbl_name() 
			for( i = rowRange_start ; i < rowRange_end ; i++ ){
				let index = sheet0.getValue( i, id_index_obj.index ) 
				let working_row = DbData.find((ent)=>ent[ id_index_obj.key ] == index ) 
				if( headInfos )
				{
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   1.  empty field normalize to '' 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							
					for( key of Object.keys( working_row )){
						if( working_row[key] == 'null' || working_row[key] == null || working_row[key] == 'undefined' )working_row[key] = ''    
					}
				} 	
				let mode = 0  // mode: 0 update 
				asyncJob_service.enqueue( tbl_name , working_row, mode  ) 
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
			setTimeout( save_data , 2000, args.row , args.row + 1 ) 
		})
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Sheet 2 Event Bind 
///////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.register_sheet2_bind_EditEnd = ()=>{
		let sheet2 = spreadJs_service.getSheet2() 
		sheet2.unbind( spreadjs_product.Events.EditEnd )
		sheet2.bind( spreadjs_product.Events.EditEnd, ( sender, args )=>{
			console.log( args ) 
		})
	}
}])







