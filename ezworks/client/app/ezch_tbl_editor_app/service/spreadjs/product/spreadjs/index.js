angular.module('gc_spreadjs',[])
.factory('gcSpreadjs_factory',['$injector', function( $injector){
	var spread = null 
	var sheet0 = null 
//	GC.Spread.Sheets.LicenseKey = "836863353846517";
	GC.Spread.Sheets.LicenseKey = "ezoffice365.com,149168997319653#B0DBDUdZ3iYrFGSTlUUrh4T8UEWlRWTvomRj3iUXhWe4QzTGlWUmRzdwwmcRpkTwlnT5YDUplnYYd7MjRFaw3EW4QzMoV4RKZjcGN7MhJGNnlEWiN6byUjeWJWNhZlex5mTR56ZGREWrMjW5lTNGdTa6VlZ8JUcyxWYUVmZiNmSrJ5Vzdmewp6KSxWOFtmVYVEaDFVcZZEV7ElMwA5RqdDaCZWTNRTbycUYNxWYPRVWL5kardjN9EzN58EWr4mNxhzKX96QGpWdpRDeaFWM7pUbUhjRUlmciJzLPp6LGp7KaV4UONXNkJTSxdVSC5USUJXcH3STyMFTOJiOiMlIsISRCBzMGhjNyIiOigkIsYDNxUDN9gjN0IicfJye&Qf35VfiwUQRNlI0IyQiwiI5EjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsIiMwcjM8ADI4IjNwIjMwIjI0ICdyNkIsISbvNmL5YzMlNWamZ6b0VmI0IyctRkIsICpKyOvU6OpYyOgnyOtdyuI0ISYONkIsIyM5YTOxMzN9kDO6ETO4EjI0ICZJJCL35lIlxmYhRFdvZXaQJyW0IyZsZmIsU6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3c6LOhTRmFDWUN6VRpkYzVERnhESVl5bCBlbTh7dOR5ZXFnbHNkY6hkerw4d6l4ZhBjRtljM6gzZwcjQyd4SNd4aWRDTwYFTwwEbTt4RL54aElGUUN5RQFTeMZVHzvV";
	var gcSpreadjs_factory ={
		create_spread : ( sheetCount_ )=>{
//			      $('#ss').wijspread({ sheetCount: sheetCount_ }) 
			spread = new GC.Spread.Sheets.Workbook(
				            document.getElementById( "ss" ),
				            { sheetCount: sheetCount_ }
				        );
			sheet0 = spread.getSheet(0) 
			sheet1 = spread.getSheet(1) 
			sheet2 = spread.getSheet(2) 
		},
//		getSpread : ()=>{ return $('#ss').wijspread('spread') } ,
		getSpread : ()=>{ return spread } ,
		rowFilter_enable : ( sheet0 )=>{
		        sheet0.rowFilter( new  GC.Spread.Sheets.Filter.HideRowFilter(  GC.Spread.Sheets.Range( 0,0,sheet0.getRowCount() ,sheet0.getColumnCount() )))
		},
		SheetArea : { 'colHeader':  GC.Spread.Sheets.SheetArea.colHeader },
		addSheet  : ( name )=>{ return  ( new  GC.Spread.Sheets.Sheet( name )) },
		Events    : { 'CellClick':  GC.Spread.Sheets.Events.CellClick ,
		           'CellDoubleClick':  GC.Spread.Sheets.Events.CellDoubleClick ,
		           'TopRowChanged' :   GC.Spread.Sheets.Events.TopRowChanged ,
		           'ActiveSheetChanging':  GC.Spread.Sheets.Events.ActiveSheetChanging ,
		           'EditEnd':  GC.Spread.Sheets.Events.EditEnd ,
		           'DragDropBlockCompleted':  GC.Spread.Sheets.Events.DragDropBlockCompleted ,
	               'DragFillBlockCompleted':  GC.Spread.Sheets.Events.DragFillBlockCompleted ,
		           'ClipboardPasted':  GC.Spread.Sheets.Events.ClipboardPasted ,
		           'CellChanged':  GC.Spread.Sheets.Events.CellChanged ,
				   'ButtonClicked': GC.Spread.Sheets.Events.ButtonClicked ,
				   'SelectionChanged': GC.Spread.Sheets.Events.SelectionChanged ,
		},
        VerticalPosition :{
			        'top': GC.Spread.Sheets.VerticalPosition.top , 
			        'bottom': GC.Spread.Sheets.VerticalPosition.bottom , 
			        'center': GC.Spread.Sheets.VerticalPosition.center , 
		},
		HorizontalPosition :{
			        'left': GC.Spread.Sheets.HorizontalPosition.left , 
			        'right': GC.Spread.Sheets.HorizontalPosition.right , 
		},
//        ComboBoxCellType : ()=>{ return  new $.wijmo.spread.ComboBoxCellType() }
        ComboBoxCellType : ()=>{ return  new GC.Spread.Sheets.CellTypes.ComboBox() },
		getColumn0 : ( index_ )=>{
              return sheet0.getRange( -1, index_ , -1, 1  ) 
		},
		getColumn1 : ( index_ )=>{
              return sheet1.getRange( -1, index_ , -1, 1  ) 
		},
		getColumn2 : ( index_ )=>{
              return sheet2.getRange( -1, index_ , -1, 1  ) 
		},
		borderBottom :( range_ , color_ )=>{
//			range_.borderBottom(new GC.Spread.Sheets.LineBorder( color_ , GC.Spread.Sheets.LineStyle.mediumDashed))
			range_.borderBottom(new GC.Spread.Sheets.LineBorder( color_ , GC.Spread.Sheets.LineStyle.thin))
		},
		borderRight :( range_ , color_ )=>{
//			range_.borderRight(new GC.Spread.Sheets.LineBorder( color_ , GC.Spread.Sheets.LineStyle.mediumDashed))
			range_.borderRight(new GC.Spread.Sheets.LineBorder( color_ , GC.Spread.Sheets.LineStyle.thin))
		}
	}
	return gcSpreadjs_factory
}])
