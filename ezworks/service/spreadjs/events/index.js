angular.module('spreadjs_events',[])
.service('spreadjs_eventsService',['$injector', function( $injector ){
	var $filter = $injector.get('$filter') 
        var spreadjs_product = $injector.get('gc_spreadjsFactory') 
	var ezch_tbl_editor_eventsService = $injector.get('ezch_tbl_editor_eventsService') 
	this.register_sheet1_bind_cellDoubleClick = ( spread, preEvent = null, postEvent = null )=>{
		let sheet1 = spread.getSheet(1) 
		sheet1.unbind( spreadjs_product.Events.CellDoubleClick )
		sheet1.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
			ezch_tbl_editor_eventsService.sheet1_cellDoubleClick( spread, sender, args ) 
		})
	}
	this.register_spread_bind_buttonClicked = ( spread,  preEvent = null , postEvent = null )=>{
		spread.unbind( spreadjs_product.Events.ButtonClicked ) 
		spread.bind( spreadjs_product.Events.ButtonClicked, ( sender, args )=>{
			if( preEvent != null ) preEvent() 
			let sheet_name = args.sheet.name() 
			switch( sheet_name ){
				case 'TblList':
					ezch_tbl_editor_eventsService.sheet1_buttonClicked( spread , sender, args ) 
					break;
				case 'TblView':
					ezch_tbl_editor_eventsService.sheet0_buttonClicked( spread , sender, args ) 
					break;
				default:	
			}
			if( postEvent != null ) postEvent() 
		})
	}
}])
