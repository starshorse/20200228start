/*
var arrSellinStatus = [ ['0.미발주 ','1.발주 ','2.발주확인 ','3.입고'],
var arr진행단계  = [{경과:'발주일',  스코어:   1},
                             {경과:'발주확인일', 스코어:  2},
                             {경과:'입고예정일',  스코어:   4},
                             {경과:'입고일',     스코어:   8 } ];    
*/
function ezWs_progressStep(stateindex){
    var tmpIndex = stateindex; 
    stateindex = 0; 
    while( parseInt(tmpIndex) ){
        stateindex++; 
        tmpIndex /= 2 ; 
    }   
    return stateindex;    
}
/*
[null,'0.미지급 ','1.선지급 ','2.선지급/일부' ,'3.지급 ', '4.지급/일부']
var arr대금결제  = [{경과:'선지급액',  스코어:   0},
                             {경과:'지급액',     스코어:   0 },
                             {경과:'미지급액',     스코어:   0 },
                             {경과:'입고일',     스코어:      1  }, 
                             {경과: '매입대금\n지급액',     스코어:      2  },
                             {경과:'지급일',     스코어:      4  }
                             ];               
*/                             
function ezWs_payMount( jsonEntry, stateindex){
   if( !stateindex ) return stateindex ; 
    var tmp = stateindex ; 
    var inDate = null, payDate = null;
    var isPayDate = parseInt( tmp/4);
     tmp  %= 4 ; 
    var isPayMnt = parseInt( tmp/2);
    var isInport = tmp%2 ;
// EZWS190604CODE     
//    if( !isPayDate && !isInport && !isPayMnt )return 0 ;
     if( !isPayMnt )return (isInport)? 1: 0; 
// EZWS190514CODE     
//    if( !isPayDate && !isInport ){
    if( !isInport  ){
        return (jsonEntry['실질총제품가격'] > jsonEntry['매입대금\n지급액'])? 3: 2 ; 
    }else{
        return (jsonEntry['실질총제품가격'] > jsonEntry['매입대금\n지급액'])? 5: 4 ; 
    }        
/*    
    if( !isPayDate && isPayMnt ){
          var now = returnTodayDate();
          var dateText = jsonEntry['입고일'].toString().match( /\((\d+)/ ); 
         if( dateText != null ) {
              inDate = Number(dateText[1]);
              if( now >  inDate )return 5 ; // 지급 일부 
              else return 3 ; // 선지급 일부 ..              
         } 
    }
*/    
// EZWS20190528CODE block auto calc
/*	
    if(ezJSON_Data_EmptyCheck(jsonEntry['매입대금\n지급액'] )) 
            jsonEntry['매입대금\n지급액'] =  jsonEntry['실질총제품가격'] ; 
*/		
//    if( isPayDate && !isPayMnt ){
// EZWS190426       var now = new Date(); 
//            var now = returnTodayDate(); 
            if( (typeof jsonEntry['입고일']) == "string" ) var dateText = jsonEntry['입고일'].toString().match( /\((\d+)/ ); 
			else var dateText = null; 
			
            var payDateText = jsonEntry['지급일'].toString().match( /\((\d+)/ ); 
           if( dateText != null  && payDateText != null ){
// EZWS190426    inDate = eval('new '+ dateText[0] ); 
                 inDate = Number(dateText[1]);
                 payDate = Number(payDateText[1]);
                 if( inDate > payDate ){
                       return 2 ; // 선지급 
//                     if( isPayMnt ) return  3 ;  // 선지급 일부 
//                     else return 2 ;   // 선지급 
                 }else {
                       return 4 ;// 지급 
//                     if( isPayMnt ) return  5 ;  // 지급 일부 
//                     else return 4 ;   // 지급 
                  
                 }                     
            }             
//    }        
    return 0 ; // Blank 
}
function ezWs_importStep( jsonEntry, stateindex){
    if( !stateindex ) return stateindex ; 
    var tmp = stateindex ; 
    var isInport = parseInt( tmp/2);
    var isInportExp = tmp%2 ; 
    var inDate = null , inExpDate = null ;
    if( isInport ){
        stateindex = 3 ; 
           var dateText = jsonEntry['입고일'].toString().match( /\((\d+)/ ); 
           if( dateText != null ){
// EZWS190426    inDate = eval('new '+ dateText[0] ); 
                 inDate = Number(dateText[1]);
            }       
        if( isInportExp ){
           var dateText = jsonEntry['입고예정일'].toString().match( /\((\d+)/ );  // ( /(Date\(\d+\))/ ); 
           if( dateText != null ){
// EZWS190426    inExpDate = eval('new '+ dateText[0] ); 
                 inExpDate = Number(dateText[1]); 
                 if( inDate > inExpDate ) stateindex = 4;   
            }       
        }              
    }else if( isInportExp ) {
        stateindex = 1; 
// EZWS190426       var now = new Date(); 
            var now = returnTodayDate(); 
            var dateText = jsonEntry['입고예정일'].toString().match( /\((\d+)/ );  // ( /(Date\(\d+\))/ ); 
           if( dateText != null ){
// EZWS190426    inExpDate = eval('new '+ dateText[0] ); 
                 inExpDate = Number(dateText[1]); 
                 if( inExpDate != null )
                        if( now > inExpDate ) stateindex = 2; 
           }       
    }    
//    console.log( jsonEntry['입고일']);
//  jsonEntry['입고일'] = Date(2019,5,100);
//   debugger; 
    return stateindex; 
}
function returnTodayDate(){
    var initDate = new Date( 1899, 11,30 ) ;
    var nowDate = new Date(); 
    var diff = Math.abs(nowDate.getTime() - initDate.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}