angular.module('wijmo_spreadjs',[])
.factory('wijmoSpreadjs_factory',['$injector', function( $injector){
	var wijmoSpreadjs_factory ={
		create_spread : ( sheetCount_ )=>{
			      $('#ss').wijspread({ sheetCount: sheetCount_ }) 
		},
		getSpread : ()=>{ return $('#ss').wijspread('spread') } ,
		rowFilter_enable : ( sheet0 )=>{
		        sheet0.rowFilter(new $.wijmo.wijspread.HideRowFilter(new $.wijmo.wijspread.Range( 0,0,sheet0.getRowCount() ,sheet0.getColumnCount() )))
		},
		SheetArea : { 'colHeader':  $.wijmo.wijspread.SheetArea.colHeader },
		addSheet  : ( name )=>{ return  ( new  $.wijmo.wijspread.Sheet( name )) },
		Events    : { 'CellClick':  $.wijmo.wijspread.Events.CellClick ,
		           'CellDoubleClick':  $.wijmo.wijspread.Events.CellDoubleClick ,
		           'TopRowChanged' :   $.wijmo.wijspread.Events.TopRowChanged ,
		           'ActiveSheetChanging':  $.wijmo.wijspread.Events.ActiveSheetChanging ,
		           'EditEnd':  $.wijmo.wijspread.Events.EditEnd ,
		           'DragDropBlockCompleted':  $.wijmo.wijspread.Events.DragDropBlockCompleted ,
	               'DragFillBlockCompleted':  $.wijmo.wijspread.Events.DragFillBlockCompleted ,
		           'ClipboardPasted':  $.wijmo.wijspread.Events.ClipboardPasted ,
		           'CellChanged':  $.wijmo.wijspread.Events.CellChanged ,
		},
        VerticalPosition :{
			        'top': $.wijmo.wijspread.VerticalPosition.top , 
			        'bottom': $.wijmo.wijspread.VerticalPosition.bottom , 
			        'center': $.wijmo.wijspread.VerticalPosition.center , 
		},
		HorizontalPosition :{
			        'left': $.wijmo.wijspread.HorizontalPosition.left , 
			        'right': $.wijmo.wijspread.HorizontalPosition.right , 
		},
        ComboBoxCellType : ()=>{ return  new $.wijmo.spread.ComboBoxCellType() }
	}
	return wijmoSpreadjs_factory
}])
