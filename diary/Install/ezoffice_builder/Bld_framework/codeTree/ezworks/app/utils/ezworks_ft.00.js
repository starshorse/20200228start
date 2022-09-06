/* 

        ezWorks  specific fucntions 
        need dataMan.js . spreadjs_lib.00.js 
*
*
*/
function ezWs_setInputTotalSupply( rowNum ){
    spread_data[0].data[rowNum]["총입력가격구분"] = "공급가";
if( EZWS190422CODE )    
    spread_data[0].data[rowNum]['총제품가격(공급가+부가세)'] = null; 
    spread_data[0].data[rowNum]['추가비용(총제품가격)'] = 0; 
}
function ezWs_setInputTotalProduct( rowNum ){
    spread_data[0].data[rowNum]["총입력가격구분"] = "제품가";
if( EZWS190422CODE )        
    spread_data[0].data[rowNum]['총공급가격'] = null; 
    spread_data[0].data[rowNum]['추가비용(총공급가격)'] = 0; 
}
function ezWsSetupParameter( spread_data ){
    var calParamter ={ '총제품가격방식': 1 , '부가세계산방식':0 }; 
    spread_data['파라메터']= calParamter;           
}
function ezWsInitEntry( sheetIndex ) {
    
}
// This function move to moudle fuctions. 
function ezWs_calcProuctPriceJSON( jsonData ){
// RICHARD-CHOI 2019-04-17  20 Entries room.     
    var roomEnriesCnt = 20 ; 
    for( key in jsonData ){
        if( ezJSONEntry_checkUndefined( jsonData[key] ,'거래처')) roomEnriesCnt--; 
        ezWs_calcProuctPrice( jsonData[key],jsonData['파라메터'] );
    }
    for( var i= 0 ; i < roomEntriesCnt ; i++)ezData_RowAdd_parsing(); 
}
function ezWs_calcProuctPrice( ezEntry, parameter ){
    
if( EZWS190422CODE ) if( ezJSON_Data_EmptyCheck(ezEntry['거래처']) || ezJSON_Data_EmptyCheck(ezEntry['제품명'])) return; 
    
    var handSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['수기총공급가액']);
    var handAuxMnt  = ezJSON_Data_EmptyCheck(ezEntry['수기총부가세']);
    var totalProductMnt =  ezJSON_Data_EmptyCheck(ezEntry['총제품가격(공급가+부가세)']);
    var totalSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['총공급가격']);
    var numSupply = ezJSON_Data_EmptyCheck(ezEntry['수량']);
    
    ezEntry['총공급가액'] = 0;    
    ezEntry['총부가세'] = 0; 
    
	if( sp0_sh0_co_auxTaxYN_isExempt( ezEntry )){
		sp0_sh0_co_auxTaxYN_exemptCalMnt( ezEntry );
		return 0;
	}		
// 1. Checking  수기 총공급가액 ..     
    if( !handSupplyMnt ){
          ezEntry['총공급가액'] = ezEntry['수기총공급가액'] ;
    }else{
//        if( parameter['총제품가격방식'] != 0 && !totalSupplyMnt  ) ezEntry['총공급가액'] = ezEntry['총공급가격'];
//        if( parameter['총제품가격방식'] == 0 && !totalProductMnt  ) ezEntry['총공급가액'] = ezEntry['총제품가격(공급가+부가세)'] / 1.1 ;    
        if( ezEntry["총입력가격구분"] == "공급가"  && !totalSupplyMnt  ) ezEntry['총공급가액'] = ezEntry['총공급가격'];
		 if (ezJSON_Data_EmptyCheck(ezEntry['추가비용(총제품가격)'])) ezEntry['추가비용(총제품가격)'] = 0; 
        if( ezEntry["총입력가격구분"] == "제품가"  && !totalProductMnt  ) ezEntry['총공급가액'] = Math.round((ezEntry['총제품가격(공급가+부가세)']+ezEntry['추가비용(총제품가격)']) / 1.1) ;             
    }        
// 2. Checking  수기 총부가세 
    totalSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['총공급가액']);
    if( !handAuxMnt ){
        ezEntry['총부가세'] = ezEntry['수기총부가세'] ;
    }else{     
        if( !totalSupplyMnt ) 
        ezEntry['총부가세'] = Math.round( ezEntry['총공급가액']*0.1 );    
    }    
   
//     if( !ezJSON_Data_EmptyCheck(ezEntry['수기총공급가액'])) ezEntry['총공급가액'] = ezEntry['수기총공급가액'] ; 
//     if( !ezJSON_Data_EmptyCheck(ezEntry['수기총부가세']) ) ezEntry['총부가세'] = ezEntry['수기총부가세'];  
//    ezEntry['총제품가격(공급가+부가세)'] = ezEntry['총공급가액'] + ezEntry['총부가세'] ; 
    if( numSupply)ezEntry['수량'] = 1; 
        ezEntry['제품단가\n(공급가액)'] = ezEntry['총공급가액'] / ezEntry['수량'] ;
    if ( ezJSON_Data_EmptyCheck(!ezEntry['추가비용(총공급가격)']))ezEntry['총공급가액'] += ezEntry['추가비용(총공급가격)']; 
    if (ezJSON_Data_EmptyCheck(ezEntry['추가비용(총제품가격)'])) ezEntry['추가비용(총제품가격)'] = 0; 
// EZWS190528CODE    ezEntry['실질총제품가격'] = ezEntry['총공급가액'] + ezEntry['총부가세'] + ezEntry['추가비용(총제품가격)'] ; 
		ezEntry['실질총제품가격'] = ezEntry['총공급가액'] + ezEntry['총부가세']; 
    
// EZWS190514CODE
   if( ezEntry['보류,취소,하자'] == '취소' ){ ezEntry['선지급액'] = 0 , ezEntry['미지급액'] = 0 ,  ezEntry['지급액'] = 0; return } 
    
//     if( !ezJSON_Data_EmptyCheck(ezEntry['매입대금\n지급액'])){
//         var remainedMnt =  ezEntry['총제품가격(공급가+부가세)'] - ezEntry['매입대금\n지급액']; 
         var remainedMnt =  ezEntry['실질총제품가격'] - ezEntry['매입대금\n지급액']; 
         if( ezJSON_Data_EmptyCheck(ezEntry['입고일'])) ezEntry['선지급액'] = ezEntry['매입대금\n지급액'], ezEntry['지급액'] = 0 ; 
         else   ezEntry['지급액'] = ezEntry['매입대금\n지급액'] ; 
         
         if( !ezJSON_Data_EmptyCheck(ezEntry['입고일']))ezEntry['미지급액'] = remainedMnt; 
         else   ezEntry['미지급액'] = 0; 
//     }
         
}
//   var  VendorNm =[ 'A무역' , 'B유통' , 'C무역' , 'D상사' , 'E국제' ]; 
function ezWs_createEntry_Random(startID, VendorNm, taxMethod = 0 ){
                var  ezEntry = {};
                 ezEntry['No'] =  startID ;     
                 ezEntry['진행단계']="";
                 ezEntry['입고경과']="";
                 ezEntry['매입계산서']="";
                 ezEntry['대금결제']="";                 
                 ezEntry['거래처'] = ezArray_Radom( VendorNm ); 
                 ezEntry['발주확정일'] = null ;  ezEntry['발주일'] = null ; ezEntry['발주확인일'] = null ;  ezEntry['입고예정일'] = null;  ezEntry['입고일'] = null ;
                 ezEntry['매입계산서발행일'] = null ;
                 ezEntry['미지급액'] = 0;
                 ezEntry['선지급액'] = 0; 
                  ezEntry['지급액'] =0 ;
                  ezEntry['수량']  =  ezNumber_Radom( 1, 100 ) ;  
                  ezEntry['총제품가격(공급가+부가세)'] = ezRound_10x(ezNumber_Radom( 10000, 200000), 100); 
                  ezEntry['총공급가액'] = ezEntry['총제품가격(공급가+부가세)'] / 1.1 ; 
                  ezEntry['총부가세'] =  ezEntry['총공급가액']*0.1 ;
                  ezEntry['제품단가\n(공급가액)'] = ezEntry['총공급가액'] / ezEntry['수량'] ;
                  if(taxMethod){  
                          ezEntry['총공급가액'] = ezRound_10x(ezNumber_Radom( 10000, 200000), 100);
                          ezEntry['총부가세'] =  ezEntry['총공급가액']*0.1 ;
                           ezEntry['총제품가격(공급가+부가세)']  = ezEntry['총공급가액'] + ezEntry['총부가세'];
                          ezEntry['제품단가\n(공급가액)'] = ezEntry['총공급가액'] / ezEntry['수량'] ;                  
                  }
                  if( ez01_Radom()) {
                      ezEntry['선지급액'] =ezRound_10x( ezNumber_Radom( 0, ezEntry['총제품가격(공급가+부가세)'] ), 100);
                  }
                     if( ez01_Radom()) {
                        ezEntry['발주확정일'] = randomDate( new Date(2019, 1, 1), new Date() ); 
                        ezEntry['발주일'] = new Date(  ezEntry['발주확정일'].getYear() , ezEntry['발주확정일'].getMonth() , ezEntry['발주확정일'].getDate() +3 )   ; 
                         if( ez01_Radom()){
                                ezEntry['발주확인일'] = new Date(  ezEntry['발주확정일'].getYear() , ezEntry['발주확정일'].getMonth() , ezEntry['발주확정일'].getDate() +5 )   ; 
   //                            ezEntry['발주확인일'] = $.datepicker.formatDate('yy/mm/dd', newdate.setDate(newdate.getDate() + 3 ));
   //                            debugger ;
                                if( ez01_Radom()){
                                    ezEntry['입고예정일'] = new Date(  ezEntry['발주확정일'].getYear() , ezEntry['발주확정일'].getMonth() , ezEntry['발주확정일'].getDate() +16 )   ; 
                                    if( ez01_Radom()){
                                        ezEntry['입고일'] = new Date(  ezEntry['발주확정일'].getYear() , ezEntry['발주확정일'].getMonth() , ezEntry['발주확정일'].getDate() +20 )   ; 
                                         if( ez01_Radom()) {
                                             ezEntry['매입계산서발행일'] = new Date(  ezEntry['발주확정일'].getYear() , ezEntry['발주확정일'].getMonth() , ezEntry['발주확정일'].getDate() +22 )   ;
                                             if( ez01_Radom())ezEntry['지급액'] = ezRound_10x(ezNumber_Radom( 0, ezEntry['총제품가격(공급가+부가세)'] -  ezEntry['선지급액'] ), 100);
                                             else ezEntry['지급액'] = ezEntry['총제품가격(공급가+부가세)'] -  ezEntry['선지급액'] ;
    //                                         ezEntry['미지급액']  =  ezEntry['총제품가격(공급가+부가세)'] - ezEntry['선지급액'] - ezEntry['지급액'];
                                         }                                         
                                     }       
                              }       
                         } 
                     }
                                          ezEntry['미지급액']  =  ezEntry['총제품가격(공급가+부가세)'] - ezEntry['선지급액'] - ezEntry['지급액'];                     
    return ezEntry ; 
}
function ezWs_updateHeadCols_Account( headCols ){
     spreadjs_headCol_setFormatter( headCols ,'No' , formateType = "\* ##-#-####" );
     spreadjs_headCol_setFormatter( headCols ,'총제품가격(공급가+부가세)' , formateType = "\* #,###");
     spreadjs_headCol_setFormatter( headCols ,'총공급가액' , formateType = "\* #,###");
     spreadjs_headCol_setFormatter( headCols ,'총부가세' , formateType = "\* #,###");
     spreadjs_headCol_setFormatter( headCols ,'제품단가\n(공급가액)', formateType = "\* #,###.##");
     spreadjs_headCol_setFormatter( headCols ,'지급액', formateType = "\* #,###");
     spreadjs_headCol_setFormatter( headCols ,'미지급액', formateType = "\* #,###");
     spreadjs_headCol_setFormatter( headCols ,'선지급액', formateType = "\* #,###");    
     spreadjs_headCol_setFormatter( headCols ,'매입계산서발행일', formateType =  "YY/MM/DD");
     spreadjs_headCol_setFormatter( headCols ,'발주일', formateType =  "YY/MM/DD");
     spreadjs_headCol_setFormatter( headCols ,'발주확정일', formateType =  "YY/MM/DD");
     spreadjs_headCol_setFormatter( headCols ,'발주확인일', formateType =  "YY/MM/DD");
     spreadjs_headCol_setFormatter( headCols ,'입고예정일', formateType =  "YY/MM/DD");
     spreadjs_headCol_setFormatter( headCols ,'입고일', formateType =  "YY/MM/DD");
}
function ezWs_updateHeadCols2_Account( headCols ){
     spreadjs_headCol_setFormatter( headCols ,'지급액', formateType = "\* #,###,###");
     spreadjs_headCol_setFormatter( headCols ,'미지급액', formateType = "\* #,###,###");
     spreadjs_headCol_setFormatter( headCols ,'선지급액', formateType = "\* #,###,###");    
}    
function ezWs_updateSellStatus( JsonEntry ){
//  EZWS190423CODE  - bit define.    
if( EZWS190422CODE ) if( ezJSON_Data_EmptyCheck(JsonEntry['거래처']) || ezJSON_Data_EmptyCheck(JsonEntry['제품명'])) return; 
   /* 
     Blank ( 입고일 & 매입대금 지급액 & 지급일 => Blank이거나 취소일때._ )
      0.미지급
      1.선지급
      2.선지급/일부
      3.지급 
      4.지급 /일부 */
    
    var arrSellinStatus = [ ['0.미발주 ','1.발주 ','2.발주확인 ','3.입고예정','3.입고','5.보류','6.하자','7.취소'], [null,'0.미입고 ','1.미입고/지연 ','2.입고 ','3.입고/지연'], [null,'0.미발행 ','1.선발행 ','2.발행 '], 
    [null,'0.미지급 ','1.선지급 ','2.선지급/일부' ,'3.지급 ', '4.지급/일부'] ];           
    var arr진행단계  = [{경과:'발주일',  스코어:   1},
                             {경과:'발주확인일', 스코어:  2},
                             {경과:'입고예정일',  스코어:   0},
                             {경과:'입고일',     스코어:   8 } ];     
    var arr입고경과  = [{경과:'발주일',  스코어:   1},
                             {경과:'발주확인일', 스코어:  2},
                             {경과:'입고예정일',  스코어:   4},
                             {경과:'입고일',     스코어:   8 } ];     
    var arr매입계산서  = [{경과:'매입계산서발행일',  스코어:   2},
                               {경과:'입고일',     스코어:      1  } ];     
    var arr대금결제  = [{경과:'선지급액',  스코어:   0},
                             {경과:'지급액',     스코어:   0 },
                             {경과:'미지급액',     스코어:   0 },
                             {경과:'입고일',     스코어:      1  }, 
                             {경과: '매입대금\n지급액',     스코어:      2  },
                             {경과:'지급일',     스코어:      4  }
                             ];                                                           
    var arrSellinOption = [{경과:'진행단계', 계산: arr진행단계 },
                                  {경과:'입고경과', 계산: arr입고경과 },
                                  {경과:'매입계산서', 계산: arr매입계산서},
                                  {경과:'대금결제', 계산: arr대금결제}
                                 ] ;   
    var  stateindex = 0;                                  
    for( var index in arrSellinOption ){                             
        for( var m in arrSellinOption[index].계산 ){
                        if( !ezJSON_Data_EmptyCheck( JsonEntry[arrSellinOption[index].계산[m].경과 ])) stateindex += arrSellinOption[index].계산[m].스코어 ;
                } 
if( EZWS190423CODE )
{                
// EZWS1905022CODE
                if( JsonEntry['보류,취소,하자'] == '취소' && arrSellinOption[index]['경과'] != '진행단계' ){
                    JsonEntry[arrSellinOption[index].경과] = arrSellinStatus[index][0];
                    continue;
                }                
                if( arrSellinOption[index]['경과'] == '진행단계' ){ stateindex=ezWs_progressStep(stateindex) ; // EZWS190425CODE , console.log(stateindex); 
                        if( JsonEntry['보류,취소,하자'] == '보류' ) stateindex = 5;
                        if( JsonEntry['보류,취소,하자'] == '하자' ) stateindex = 6;
						if( JsonEntry['보류,취소,하자'] == '취소' ) stateindex = 7;
                }        
                if( arrSellinOption[index]['경과'] == '대금결제' )stateindex=ezWs_payMount(JsonEntry, stateindex) ; // EZWS190425CODE , console.log(stateindex); 
                if( arrSellinOption[index]['경과'] == '입고경과' ) stateindex=sp0_sh0_co_updateStatus_importStep( JsonEntry , stateindex) ; // EZWS190425CODE , console.log(stateindex); 
}                
                JsonEntry[arrSellinOption[index].경과] = arrSellinStatus[index][stateindex];
                stateindex = 0; 
    }           
}

function ezWs_retriveWon (JsonEntry, JsonID, JsonData_Out)
{
             var matched = null;
             var myVen = {'거래처': null , '미지급액': 0,  '선지급액': 0,'지급액': 0 }; 
             matched =  ezJSON_Data_Find( JsonData_Out, JsonID, JsonEntry[JsonID] ); 
             if ( matched ){
                        matched['미지급액'] += JsonEntry['미지급액']; 
                        matched['선지급액'] += JsonEntry['선지급액']; 
                        matched['지급액'] += JsonEntry['지급액']; 
                }else{
                    var  myVen2 =ezJSObject_Copy( myVen);
                    myVen2['거래처'] =  JsonEntry['거래처'];
                    myVen2['미지급액'] =  JsonEntry['미지급액'];
                    myVen2['선지급액'] =  JsonEntry['선지급액'];
                    myVen2['지급액'] =  JsonEntry['지급액'];
                    ezJSON_Data_Add( JsonData_Out , myVen2 );
                }   
}
function ezWs_paybackEntry( JsonEntry, paybackMount ) {
          if( isNaN(JsonEntry['미지급액'] ))return paybackMount ; 
          paybackMount_r = paybackMount - parseInt( JsonEntry['미지급액']); 
          if( paybackMount_r  >=  0 ) {
                        JsonEntry['지급액'] =  parseInt( JsonEntry['지급액']) +  parseInt( JsonEntry['미지급액']) ;
                        JsonEntry['미지급액']  = 0 ; 
                        JsonEntry['대금결제'] = '3. 지급' ;
           }else{
                        JsonEntry['미지급액'] =  - paybackMount_r ;
                        JsonEntry['지급액']  =  parseInt( JsonEntry['지급액'] )+ paybackMount ;
          }              
          return paybackMount_r;                
}
