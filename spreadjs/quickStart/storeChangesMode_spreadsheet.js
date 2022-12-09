function refresh_1(){
	var ss=GC.Spread.Sheets.findControl( document.getElementById("ss")); 
	var sheet = ss.getActiveSheet();
	sheet.reset();
	sheet.setColumnCount(7);
	var data = createSampleData();
	loadTable( ss, data ); 
	sheet.suspendDirty();
	sheet.getCell(0,5)
	     .backColor("yellow")
	     .value("Changes")
	     .hAlign( GC.Spread.Sheets.HorizontalAlign.center ); 
	sheet.resumeDirty()

	sheet.options.isProtected = true;
	var s = sheet.getDefaultStyle();
	s.locked = false ;
	sheet.setDefaultStyle(s);
	sheet.getRange( -1 , 5, -1 ,1 ).locked( true ) ;

}
function showChanges( ss, row , col, rowCount, colCount ){
	var sheet = ss.getActiveSheet();
	if( sheet.hasPendingChanges() ){
		ss.suspendPaint();
		ss.suspendEvent(); 
		sheet.suspendDirty();
		var dirtyDataArray = sheet.getDirtyCells( row, col, rowCount, colCount );
		for( var i = 0 ; i < dirtyDataArray.length; i++ ){
			var dirtyCell = dirtyDataArray[i];
			sheet.setValue(
				dirtyCell.row, 
				5,
				"old:" + dirtyCell.oldValue +", new:" + dirtyCell.newValue 
			)
		}
		sheet.resumeDirty();
		ss.resumeEvent()
		ss.resumePaint() 
	}
}
