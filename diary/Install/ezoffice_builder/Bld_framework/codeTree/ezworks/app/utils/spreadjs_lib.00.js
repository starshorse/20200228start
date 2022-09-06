/*
*  SpreadJS Lib version 0.01 
############################################################################################################### 
#file need.js:  jquery.js / dataman.js 
###############################################################################################################
1. Include  SpreadJS / CSS/ JSfiel.
    need SpreadJS  js including.
    https://cdn.grapecity.com/spreadjs/hosted/css/gc.spread.sheets.excel2016colorful.10.1.1.css  
    https://cdn.grapecity.com/spreadjs/hosted/scripts/gc.spread.sheets.all.10.1.1.min.js
<link rel="stylesheet" type="text/css" href="https://cdn.grapecity.com/spreadjs/hosted/css/gc.spread.sheets.excel2016colorful.10.1.1.css">
<script src="https://cdn.grapecity.com/spreadjs/hosted/scripts/gc.spread.sheets.all.10.1.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script src="./libs/spreadjs_lib.00.js"></script>
need following in html..
<div id="ss" style="width:100%; height:350px;border: 1px solid gray;" class="spread"></div>

2. Html Korean Support. 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
*/
function spreadjs_initHtml(){
    $('<div id="ss" style="width: 2000px; height: 768px; border: 1px solid gray">').appendTo('body');  
}
function spreadjs_initHtml2(id = "ss"){
    $('<div id=\"'+ id + '\"style="width: 2000px; height: 768px; border: 1px solid gray">').appendTo('body');  
}
function spreadjs_initspread_ft01( idSpread = 'ss' ){
     var spread = new GC.Spread.Sheets.Workbook(document.getElementById(idSpread), {
                sheetCount: 7
            });
     return spread;
}
function spreadjs_initspread_ft02( idSpread = 'ss' , sheetCount ){
     var spread = new GC.Spread.Sheets.Workbook(document.getElementById(idSpread), {
                sheetCount: sheetCount 
            });
     return spread;
}
function spreadjs_initSpread(spread){
            initSpread(spread);
}
function spreadjs_getActiveSheetIndex(spread){
    return spread.getActiveSheetIndex();
}
/*
################ DATA     ######################################
*/
/*
*     Disaplay for lock and unlock field .
      Handle Data.. 
*/
function spreadjs_createHeadCols( ){
    var HeadCols =[];
    for (var i = 0; i < arguments.length; i++) {
         HeadCols.push( { "name": arguments[i],
                                    "displayName": arguments[i],
                                    "size": arguments[i].length*10+40,
                                    "formatter": "",
                                    "locked": true 
         }); 
  }
  return HeadCols ; 
}
function spreadjs_createHeadCols_Data( JsonObject ){ 

    var HeadCols =[];
    for ( key in JsonObject ) {
         HeadCols.push( { "name": key,
                                    "displayName": key,
                                    "size": key.length*10+40,
                                    "formatter": "",
                                    "locked": true 
         }); 
  }
 return HeadCols ; 
}
// # formateType "\* ##-#-####" / "YY/MM/DD" /"\* #,###"
function spreadjs_headCol_setFormatter( cols ,colvalue, formateType = "YY/MM/DD" ){
 	ezJSON_Data_Edit( cols, "name" , colvalue , "formatter" , formateType );
}
function spreadjs_headCol_setSize( cols ,colvalue, colsize ){
 	ezJSON_Data_Edit( cols, "name" , colvalue , "size" , colsize );
}
function spreadjs_headCol_hide( cols, colvalue, showFlag ){
    ezJSON_Data_Edit( cols, "name" , colvalue , "hide" , showFlag );
}
function spreadjs_resetData( sheet, cols, data ){
    sheet.reset();
	sheet.setDataSource(data);
    sheet.bindColumns(cols); 	 
}
function speadjs_returnList( sheet , colsInfo, colsName ) {
    arrayList =[];
	var indexName = colsInfo.map( e => e.name).indexOf(colsName);
	for( var i = 0 ; i < sheet.getRowCount() ; i++ )arrayList.push( sheet.getValue( i, indexName)); 
    arrayList.push("새로생성");    
    return arrayList ; 
}
function speadjs_returnList_noEmpty( sheet, colsInfo, colsName ){
    arrayList =[];
	var indexName = colsInfo.map( e => e.name).indexOf(colsName);
	for( var i = 0 ; i < sheet.getRowCount() ; i++ ){
        var data = sheet.getValue( i, indexName) ;
        if( !ezJSON_Data_EmptyCheck(data))arrayList.push( sheet.getValue( i, indexName)); 
    }
    arrayList.push("새로생성");    
    return arrayList ;      
}
/*

/*
################ DATA DISPLAY ######################################
*/
// Checking  Column Information Field  -> 'locked'  .. 
function spreadjs_unlockCols( sheet , column_info ){
    	 for( ezk = 0 ; ezk < column_info.length ; ezk++){
			if( column_info[ezk]['locked'] != true ) {
					sheet.getRange(-1,ezk , -1, 1).locked(false);
					sheet.getRange(-1,ezk , -1, 1).backColor('#FFFFFF');
			}
            if( column_info[ezk]['select_type2'] == true ){ 
					sheet.getRange(-1,ezk , -1, 1).backColor('#99FFFF');                
            }
     }
}
function spreadjs_unlockColsRow( sheet , ezRow , column_info , ezColor){
    	 for( ezk = 0 ; ezk < column_info.length ; ezk++){
			if( column_info[ezk]['locked'] != true ) {
					sheet.getRange(ezRow,ezk , 1, 1).locked(false);
					sheet.getRange(ezRow,ezk , 1, 1).backColor(ezColor);
			}
                       if( column_info[ezk]['select_type2'] == true ){ 
					sheet.getRange(-1,ezk , -1, 1).backColor('#99FFFF'); 
                    // Checking unlocking color ?
                    if( ezColor == '#FFFFFF' )sheet.getRange(ezRow,ezk , 1, 1).backColor('#99FFFF');                     
            }
	}
}
/*
*   Search Sheet area  specific  Column..  2019-02-09 - return search result.
*/
function spreadjs_colSearchString( sheetIndex, coln, srString  ){
    var searchCondition = new GC.Spread.Sheets.Search.SearchCondition();
    searchCondition.searchString = srString;
    searchCondition.startSheetIndex = sheetIndex;
    searchCondition.endSheetIndex = sheetIndex;
    searchCondition.columnStart = coln;
    searchCondition.columnEnd = coln;
    searchCondition.rowStart = 0;
    searchCondition.rowEnd = -1;
    searchCondition.sheetArea = GC.Spread.Sheets.SheetArea.viewport;
    searchCondition.searchOrder = GC.Spread.Sheets.Search.SearchOrder.nOrder;
    searchCondition.searchTarget = GC.Spread.Sheets.Search.SearchFoundFlags.cellText;
    searchCondition.searchFlags = GC.Spread.Sheets.Search.SearchFlags.blockRange;
    var searchresult= spread.search(searchCondition);
 //   var str ="[searchFoundFlag:"+ searchresult.searchFoundFlag+",\r\n foundSheetIndex:"+searchresult.foundSheetIndex+",foundRowIndex:" + searchresult.foundRowIndex+", foundColumnIndex:"+searchresult.foundColumnIndex+", foundString:"+searchresult.foundString+"]";
 //   alert(str);
    return searchresult ;
}
/*
*	 Apply all . filtering. 
     ezFilterall( sheet0 , colInfos.length ); 
*/
function spreadjs_filterall( sheet , cols_num ){
		 sheet.rowFilter(new GC.Spread.Sheets.Filter.HideRowFilter(new GC.Spread.Sheets.Range(-1, 1, -1, cols_num ))); // col should start from 1..
         rowFilter = sheet.rowFilter();
         rowFilter.filter(0);
}
function spreadjs_defilterall( spread ){
         var rowFilter = spread.getActiveSheet().rowFilter();
	     var sheet = spread.getActiveSheet(); 
         rowFilter.unfilter();
         sheet.rowFilter(new GC.Spread.Sheets.Filter.HideRowFilter(new GC.Spread.Sheets.Range(-1, 1, -1, sheet.getColumnCount() ))); // col should start from 1..
         rowFilter = sheet.rowFilter();
         rowFilter.filter(0);
}
function spreadjs_cellType2( sheet, col, row, arrlist ){
         var cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
		        cellType2.items(arrlist);
				sheet.getCell(row, col).cellType(cellType2);
}
function spreadjs_setColHead( spread, row, col, title ){
       spread.getActiveSheet().setValue(row,col,title, GC.Spread.Sheets.SheetArea.colHeader);	
} 
/*
################ DISPLAY ######################################
*/
function spreadjs_suspendPaint(spread){
      var sheet = spread.getActiveSheet(); 
//      spread.suspendPaint();
      sheet.suspendPaint();
}    
function spreadjs_resumePaint(spread){
      var sheet = spread.getActiveSheet(); 
//      spread.resumePaint();
      sheet.resumePaint();
}  

function spreadjs_optionSpread_op1( spread ){
     spread.options.newTabVisible = false ; 
	 spread.options.tabEditable = false ;
     spread.options.allowUserDragDrop = false;
}
function spreadjs_optionSheet_op1( sheet) {
     sheet.autoGenerateColumns = false;
}
function spreadjs_frozenColumnCount( sheet, colnum ){
    sheet.frozenColumnCount(colnum);
}
function spreadjs_showRowTop( spread, working_row ){
     spread.getActiveSheet().showRow( working_row, GC.Spread.Sheets.VerticalPosition.top );
	 spread.getActiveSheet().setActiveCell( working_row, 1);  
	 spread.refresh();
}
/*
*    spreadjs_setdefaultstyle( sheet0, "#cccccc", GC.Spread.Sheets.LineStyle.thin ); 
*/
function spreadjs_setdefaultstyle( sheet, color, linestyle){
        var defaultStyle = new GC.Spread.Sheets.Style();
		defaultStyle.backColor = "LemonChiffon";
		defaultStyle.hAlign = GC.Spread.Sheets.HorizontalAlign.center;
        defaultStyle.borderLeft = new GC.Spread.Sheets.LineBorder(color,linestyle);
        defaultStyle.borderTop = new GC.Spread.Sheets.LineBorder(color,linestyle);
        defaultStyle.borderRight = new GC.Spread.Sheets.LineBorder(color,linestyle);
        defaultStyle.borderBottom = new GC.Spread.Sheets.LineBorder(color,linestyle);
        sheet.setDefaultStyle(defaultStyle, GC.Spread.Sheets.SheetArea.viewport);
}
/*
*  ROW highlight  
*/
/*
*         mode : 0 - Clear / 1 - Set / 2 - Toggle.. 
           colInfos :  spread_data[sheet_index].columns
*/
// function spreadjs_ezHighlightrow( spread , working_row , showactiverow, colInfos , mode ){
 function spreadjs_ezHighlightrow( spread , working_row ,colInfos , mode ){
		var sheet = spread.getActiveSheet(); 
		var sheet_index = spread.getActiveSheetIndex();
		var row = sheet.getRange(working_row, -1,1,-1);
	//	   var mp = sheet.getRange(working_row, 2 , 1, 5);
 	sheet.suspendPaint();
		switch( mode ){
			case 0:
				  showactiverow = 0; 
                   row.backColor("LemonChiffon");
//				    sheet.getRange(working_row, 2 , 1, 5).backColor("#FFFFFF");
					spreadjs_unlockColsRow( sheet , working_row , colInfos , "#FFFFFF" );

				   break;
		    case 1:
  			      showactiverow = 1; 
				  row.backColor("#e5c93d");
				  spreadjs_unlockColsRow( sheet , working_row , colInfos, "#e5c93d" );

				  break;
            case 2:
				 if(showactiverow == 0 ){
                            showactiverow = 1;
                            row.backColor("#e5c93d");
							spreadjs_unlockColsRow( sheet , working_row , colInfos, "#e5c93d" );
                 }else{
                            showactiverow = 0; 
                            row.backColor("LemonChiffon");		
 //                   	     sheet.getRange(working_row, 2 , 1, 5).backColor("#FFFFFF");	
                            spreadjs_unlockColsRow( sheet , working_row , colInfos, "#FFFFFF"  ); 
                 }

                 break;
           default:		   			
	    }	
		sheet.resumePaint(); 		
}	
function spreadjs_setCellColor( row, col, color){
    var activeSheet = spread.getActiveSheet();
    activeSheet.getCell( row, col).backColor(color); 
}
