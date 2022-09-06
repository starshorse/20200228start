angular.module('mySheet0Service.co_auxTaxYN',[])
.service('mySheet0ServiceCoAuxTaxYN', function(){
/*
  sp0_sh0_co_auxTaxYN.js
 
*/
this.co_auxTaxYN_cellClick_parsing =  (sheet, columns,  args) => {
	if( args.col == ezJSON_Index_Byname( columns, '부가세구분' )){
		var arr_auxTaxYN = [ "", "부가세제외"];
		spreadjs_cellType2( sheet, args.col, args.row, arr_auxTaxYN );
	}
}
this.co_auxTaxYN_isExempt = ( ezEntry ) =>{
	if( ezEntry['부가세구분'] == "부가세제외" )return 1;
	return 0; 
}
this.co_auxTaxYN_exemptCalMnt = ( ezEntry )=>{
	
	var handSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['수기총공급가액']);
    var handAuxMnt  = ezJSON_Data_EmptyCheck(ezEntry['수기총부가세']);
    var totalProductMnt =  ezJSON_Data_EmptyCheck(ezEntry['총제품가격(공급가+부가세)']);
    var totalSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['총공급가격']);
    var numSupply = ezJSON_Data_EmptyCheck(ezEntry['수량']);
    
    ezEntry['총공급가액'] = 0;    
    ezEntry['총부가세'] = 0; 
// 1. Checking  수기 총공급가액 ..     
    if( !handSupplyMnt ){
          ezEntry['총공급가액'] = ezEntry['수기총공급가액'] ;
    }else{
        if( ezEntry["총입력가격구분"] == "제품가"  && !totalProductMnt  ) ezEntry['총공급가액'] = (ezEntry['총제품가격(공급가+부가세)']+ezEntry['추가비용(총제품가격)'])  ;             
    }        
// 2. Checking  수기 총부가세 
    totalSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['총공급가액']);
	ezEntry['수기총부가세'] = 0; 
	ezEntry['총부가세'] =0 ;
    if( numSupply)ezEntry['수량'] = 1; 
        ezEntry['제품단가\n(공급가액)'] = ezEntry['총공급가액'] / ezEntry['수량'] ;
    if ( ezJSON_Data_EmptyCheck(!ezEntry['추가비용(총공급가격)']))ezEntry['총공급가액'] += ezEntry['추가비용(총공급가격)']; 
    if (ezJSON_Data_EmptyCheck(ezEntry['추가비용(총제품가격)'])) ezEntry['추가비용(총제품가격)'] = 0; 
		ezEntry['실질총제품가격'] = ezEntry['총공급가액'] + ezEntry['총부가세']; 
    
// EZWS190514CODE
   if( ezEntry['보류,취소,하자'] == '취소' ){ ezEntry['선지급액'] = 0 , ezEntry['미지급액'] = 0 ,  ezEntry['지급액'] = 0; return } 
         var remainedMnt =  ezEntry['실질총제품가격'] - ezEntry['매입대금\n지급액']; 
         if( ezJSON_Data_EmptyCheck(ezEntry['입고일'])) ezEntry['선지급액'] = ezEntry['매입대금\n지급액'], ezEntry['지급액'] = 0 ; 
         else   ezEntry['지급액'] = ezEntry['매입대금\n지급액'] ; 
         
         if( !ezJSON_Data_EmptyCheck(ezEntry['입고일']))ezEntry['미지급액'] = remainedMnt; 
         else   ezEntry['미지급액'] = 0; 
//     }
         
}
})
