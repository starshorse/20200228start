angular.module('spreadjs_events',[])
.service('spreadjs_eventsService',['$injector', function( $injector ){
	var $filter = $injector.get('$filter') 
        var spreadjs_product = $injector.get('gc_spreadjsFactory') 
//	var ezch_tbl_editor_eventsService = $injector.get('ezch_tbl_editor_eventsService') 
	var asyncJob_service = null
	if( $injector.has('asyncJob_service'))
		asyncJob_service = $injector.get('asyncJob_service') 

	var eventsService = null 
	if( $injector.has('ezch_tbl_editor_eventsService') ){
		eventsService = $injector.get('ezch_tbl_editor_eventsService');	
	}else if( $injector.has('ezof_dba_editor_eventsService') ){
		eventsService = $injector.get('ezof_dba_editor_eventsService');
	}else if( $injector.has('db_administration_eventsService') ){
		eventsService = $injector.get('db_administration_eventsService');
	}else if( $injector.has('jupitor_admin_editor_eventsService') ){
		eventsService = $injector.get('jupitor_admin_editor_eventsService');
	}	
	this.change_eventsService = ( service_name )=>{
		eventsService = $injector.get( service_name  );
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//      cellDoubleChick 
////////////////////////////////////////////////////////////////////////////////////////////////////
	this.register_sheet0_bind_cellDoubleClick = ( spread, preEvent = null, postEvent = null )=>{
		let sheet0 = spread.getSheet(0) 
		sheet0.unbind( spreadjs_product.Events.CellDoubleClick )
		sheet0.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
			eventsService.sheet0_cellDoubleClick( spread, sender, args ) 
		})
	}
	this.register_sheet1_bind_cellDoubleClick = ( spread, preEvent = null, postEvent = null )=>{
		let sheet1 = spread.getSheet(1) 
		sheet1.unbind( spreadjs_product.Events.CellDoubleClick )
		sheet1.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
			eventsService.sheet1_cellDoubleClick( spread, sender, args ) 
		})
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//       buttonClicked 
////////////////////////////////////////////////////////////////////////////////////////////////////
	this.register_spread_bind_buttonClicked = ( spread,  preEvent = null , postEvent = null )=>{
		spread.unbind( spreadjs_product.Events.ButtonClicked ) 
		spread.bind( spreadjs_product.Events.ButtonClicked, ( sender, args )=>{
			if( preEvent != null ) preEvent() 
			if( $injector.has('ezch_tbl_editor_eventsService')){	
				let sheet_name = args.sheet.name() 
				switch( sheet_name ){
					case 'TblList':
						eventsService.sheet1_buttonClicked( spread , sender, args ) 
						break;
					case 'TblView':
						eventsService.sheet0_buttonClicked( spread , sender, args ) 
						break;
					default:	
				}
			}else{
				eventsService.spread_buttonClicked( spread, sender, args ); 
			}
			if( postEvent != null ) postEvent() 
		})
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//       CellChanged 
////////////////////////////////////////////////////////////////////////////////////////////////////
	this.register_sheet0_bind_cellChanged = ( spread, preEvent = null, postEvent = null )=>{
		let sheet = spread.getSheet(0); 
		sheet.unbind( spreadjs_product.Events.CellChanged )
		sheet.bind( spreadjs_product.Events.CellChanged , ( sender, args )=>{
			eventsService.sheet0_cellChanged( spread , sender, args )
		})
	}	
	this.register_sheet1_bind_cellChanged = ( spread, preEvent = null, postEvent = null )=>{
		let sheet = spread.getSheet(1); 
		sheet.unbind( spreadjs_product.Events.CellChanged )
		sheet.bind( spreadjs_product.Events.CellChanged , ( sender, args )=>{
			eventsService.sheet1_cellChanged( spread , sender, args )
		})
	}	
	this.register_sheet2_bind_cellChanged = ( spread, preEvent = null, postEvent = null )=>{
		let sheet = spread.getSheet(2); 
		let sheet_cellChanged = eventsService.sheet2_cellChanged 
		sheet.unbind( spreadjs_product.Events.CellChanged )
		sheet.bind( spreadjs_product.Events.CellChanged , ( sender, args )=>{
			sheet_cellChanged( spread , sender, args )
		})
	}	
/////////////////////////////////////////////////////////////////////////////////////////////////////
//       selectionChanged 
////////////////////////////////////////////////////////////////////////////////////////////////////
	this.register_sheet0_bind_selectionChanged = ( spread, preEvent = null, postEvent = null )=>{
		let sheet0 = spread.getSheet(0); 
		sheet0.unbind( spreadjs_product.Events.SelectionChanged )
		sheet0.bind( spreadjs_product.Events.SelectionChanged , ( sender, args )=>{
			eventsService.sheet0_selectionChanged( spread , sender, args )
		})
	}	
	this.register_sheet1_bind_selectionChanged = ( spread, preEvent = null, postEvent = null )=>{
		let sheet1 = spread.getSheet(1); 
		sheet1.unbind( spreadjs_product.Events.SelectionChanged )
		sheet1.bind( spreadjs_product.Events.SelectionChanged , ( sender, args )=>{
			eventsService.sheet1_selectionChanged( spread , sender, args )
		})
	}	
/////////////////////////////////////////////////////////////////////////////////////////////////////
//       runtime data updata module.  need async_Job_service.. 
////////////////////////////////////////////////////////////////////////////////////////////////////
	this.register_sheet0_bind_dragDropBlockCompleted = ( spread , seq_col_index , getTbl_name , getViewData  )=>{
//////////////////////////////////////////////////////////////////////////////////////////////////
//  Copy & Paste communication with DataBase.. 
///////////////////////////////////////////////////////////////////////////////////////////////// 		
		var sheet0 = spread.getSheet(0); 
//////////////////////////////////////////////////////////////////////////////////////////////////
//  Block Fill  communication with DataBase.. 
///////////////////////////////////////////////////////////////////////////////////////////////// 		
		const save_data = ( rowRange_start, rowRange_end ) =>{
			if( asyncJob_service == null ){
				console.log("no asyncJob_service, Error")
				return -1 ; 
			}
// Table start from 17 Data .
			if( rowRange_start < 17 )return ;
			let i 
			let DbData = getViewData() 
			let tbl_name = getTbl_name() 
			for( i = rowRange_start ; i < rowRange_end ; i++ ){
				let index = sheet0.getValue( i, seq_col_index ) 
				let working_row = DbData.find((ent)=>ent['seq'] == index ) 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   1.  empty field normalize to '' 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							
					for( key of Object.keys( working_row )){
						if( working_row[key] == 'null' || working_row[key] == null || working_row[key] == 'undefined' )working_row[key] = ''    
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
}])
