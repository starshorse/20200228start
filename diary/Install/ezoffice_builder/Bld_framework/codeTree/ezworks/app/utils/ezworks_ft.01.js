/*
*
    2.  메인 버튼  클릭시 발생하는  이벤트 paring  관련 작업.. 

*  ROW 추가시   필수 항목   생성 합니다. 
*/
function ezData_RowAdd_parsing(spread, spread_data, showactiverow = 0){
  var activeSheet = spread.getActiveSheet();
  var activeSheetIndex = spread.getActiveSheetIndex();	
  var row_id 
  switch( activeSheetIndex ){
		case 0: 
 // RICAHRD-CHOI 2019-01-26  Enable Add Row in  매입 시트        
//			break; 
		case 1:
                var sell_num = ezCountUpNum( activeSheetIndex, spread_data ); 
				if(showactiverow){
					activeSheet.addRows( working_row +1, 1 );   // 뒤에 ROW 추가 
                    activeSheet.setValue( working_row +1 , 0 , sell_num ); 
				}else{ 
					var row = activeSheet.getRowCount();
					activeSheet.addRows( row, 1 ); 
                    activeSheet.setValue( row , 0 , sell_num ); 
				} 
		  	    row_id = sell_num 
			break; 
		case 2:
		    var index_국내업체명 = spread_data[2].columns.map( e => e.name).indexOf('국내업체명') ;
		    var data_업체이름 = prompt(" 생성할려는 업체이름을 입력하세요 .","");  
			if( data_업체이름 != null ){
				var row = activeSheet.getRowCount();
                var dp_check = 0; 
				for( k_d = 0;  k_d < row ; k_d++ ){
					if( activeSheet.getValue( k_d , index_국내업체명 ) == data_업체이름 ){
						dp_check = 1; 
						break; 
					}						
				}					
				if( !dp_check ){ 
					activeSheet.addRows( row, 1 ); 
					activeSheet.setValue( row, index_국내업체명, data_업체이름 );
  // RICAHRD-CHOI 2019-02-09 
                    var sell_num = ezCountUpNum( activeSheetIndex, spread_data );
                    activeSheet.setValue( row , 0 , sell_num ); 
				}else{
					alert(" 이미 같은 업체가 등록되어 있습니다. !"); 
				}					
			}
		    break;
        case 3:
            var row = activeSheet.getRowCount();
            activeSheet.addRows( row, 1 ); 
  // RICAHRD-CHOI 2019-02-09 
             var sell_num = ezCountUpNum( activeSheetIndex, spread_data );
             activeSheet.setValue( row , 0 , sell_num );                   
            break;        
		case 4:
		    var index_제품명 = spread_data[4].columns.map( e => e.name).indexOf('제품명') ;
		    var data_제품이름 = prompt(" 생성할려는 제품이름을 입력하세요 .","");  
			if( data_제품이름 != null ){
				var row = activeSheet.getRowCount();
                var dp_check = 0; 
				for( k_d = 0;  k_d < row ; k_d++ ){
					if( activeSheet.getValue( k_d , index_제품명 ) == data_제품이름 ){
						dp_check = 1; 
						break; 
					}						
				}					
				if( !dp_check ){ 
					activeSheet.addRows( row, 1 ); 
					activeSheet.setValue( row, index_제품명, data_제품이름 );
  // RICAHRD-CHOI 2019-02-09 
                    var sell_num = ezCountUpNum( activeSheetIndex, spread_data );
                    activeSheet.setValue( row , 0 , sell_num );                    
				}else{
					alert(" 이미 같은 제품이 등록되어 있습니다. !"); 
				}					
			}
		    break;	
		default:	
			
  }	  
 
	return row_id
}	
 // RICHARD-CHOI 2019-02-09  numbering each sheet.  move    
 // return number . 
function ezCountUpNum( sheetIndex, spread_data ){
 //        ezCheckNum( sheetIndex );
//         var num = parseInt(localStorage.getItem(arNumName[sheetIndex])); 
           var num =  ++ spread_data[sheetIndex].Lastnumber ;
//            ezls_SaveDataAll();
//         num++; 
//          localStorage.removeItem(arNumName[sheetIndex]);
//          localStorage.setItem(arNumName[sheetIndex], num );  
         
          return num; 
}   
