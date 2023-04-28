angular.module('spreadjs_events',[])
.service('spreadjs_eventsService',['$injector', function( $injector ){
	var $filter = $injector.get('$filter') 
        var spreadjs_product = $injector.get('gc_spreadjsFactory') 
//	var ezch_tbl_editor_eventsService = $injector.get('ezch_tbl_editor_eventsService') 
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
			if( $injector.has('ezch_tbl_editor_eventService')){	
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
}])
