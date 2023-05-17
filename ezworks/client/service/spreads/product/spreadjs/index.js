angular.module('gc_spreadjs',[])
.factory('gc_spreadjsFactory', ['$injector', function( $injector ){
	var gc_spreadjsFactory = {
		spread: null, 
		create_spread : ( sheetCount )=>{
			gc_spreadjsFactory.spread = new GC.Spread.Sheets.Workbook(
				document.getElementById('ss'),
				{ sheetCount }
			)
			return gc_spreadjsFactory.spread 
		},
		Events : {
			'ButtonClicked' : GC.Spread.Sheets.Events.ButtonClicked ,
			'CellDoubleClick': GC.Spread.Sheets.Events.CellDoubleClick, 
			'CellChanged': GC.Spread.Sheets.Events.CellChanged, 
			'SelectionChanged': GC.Spread.Sheets.Events.SelectionChanged, 
		        'EditEnd':  GC.Spread.Sheets.Events.EditEnd ,
		        'DragDropBlockCompleted':  GC.Spread.Sheets.Events.DragDropBlockCompleted ,
	                'DragFillBlockCompleted':  GC.Spread.Sheets.Events.DragFillBlockCompleted ,
		        'ClipboardPasted':  GC.Spread.Sheets.Events.ClipboardPasted ,
		}
	}
	return gc_spreadjsFactory 
}])
