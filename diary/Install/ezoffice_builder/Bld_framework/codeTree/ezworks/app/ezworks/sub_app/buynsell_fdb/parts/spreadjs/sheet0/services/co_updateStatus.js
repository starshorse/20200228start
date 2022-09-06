angular.module('mySheet0Service.co_updateStatus', []) 
.service('mySheet0ServiceCoUpdateStatus', function(){
/*
*  this.co_updateStatus.js
 sp0_sh5_co_updateStatus_importStep( jsonEntry, stateindex)
return stateindex;  
*/
this.co_updateStatus_importStep = ( jsonEntry, stateindex)=>{
    var inDate, inExpDate ; 
    switch( stateindex ){
        case 0:
            break ;
        default : 
            if( stateindex < 4 ) stateindex = 1;
            else if ( stateindex < 8) {     // 입고예정만  입력 된 상태. 
                 var now = returnTodayDate(); 
                 var dateText = jsonEntry['입고예정일'].toString().match( /\((\d+)/ );  // ( /(Date\(\d+\))/ ); 
                if( dateText != null ){
                 inExpDate = Number(dateText[1]); 
                 if( inExpDate != null )
                        if( now > inExpDate ) stateindex = 2; 
                }   
             }
            else if ( stateindex < 12 ) stateindex  = 3 ;  
            else if( stateindex >= 12 ){   // 입고 예정일과 입고일 모두 입력된 상태.. 
                 var dateText = jsonEntry['입고일'].toString().match( /\((\d+)/ ); 
                    if( dateText != null ){
                        inDate = Number(dateText[1]);
                    } 
                  dateText = jsonEntry['입고예정일'].toString().match( /\((\d+)/ );  // ( /(Date\(\d+\))/ ); 
                    if( dateText != null ){
                        inExpDate = Number(dateText[1]); 
                    }     
                  stateindex =( inDate > inExpDate )? 4 : 3;   
            }    
    }     
    return stateindex;     
}
/*
var arrSellinStatus = [ ['0.미발주 ','1.발주 ','2.발주확인 ','3.입고'],
var arr진행단계  = [{경과:'발주일',  스코어:   1},
                             {경과:'발주확인일', 스코어:  2},
                             {경과:'입고예정일',  스코어:   4},
                             {경과:'입고일',     스코어:   8 } ];    
*/
this.co_updateStatus_progressStep = (stateindex)=>{
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
this.co_updateStatus_payMount = ( jsonEntry, stateindex)=>{
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
/* RICHARD-CHOI obscene.. 2019-10-21
function this.co_updateStatus_importStep( jsonEntry, stateindex){
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
*/
function returnTodayDate(){
    var initDate = new Date( 1899, 11,30 ) ;
    var nowDate = new Date(); 
    var diff = Math.abs(nowDate.getTime() - initDate.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}
this.co_updateStatus = ( JsonEntry )=>{
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
									 { 경과: '입고일', 스코어: 1 },
		   // EZWORK191021                           
									 {경과: '매입대금지급액',     스코어:      2  },
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
						if( JsonEntry['보류취소하자'] == '취소' && arrSellinOption[index]['경과'] != '진행단계' ){
							JsonEntry[arrSellinOption[index].경과] = arrSellinStatus[index][0];
							continue;
						}                
						if( arrSellinOption[index]['경과'] == '진행단계' ){ stateindex=this.co_updateStatus_progressStep(stateindex) ; // EZWS190425CODE , console.log(stateindex); 
								if( JsonEntry['보류취소하자'] == '보류' ) stateindex = 5;
								if( JsonEntry['보류취소하자'] == '하자' ) stateindex = 6;
								if( JsonEntry['보류취소하자'] == '취소' ) stateindex = 7;
						}        
						if( arrSellinOption[index]['경과'] == '대금결제' )stateindex=this.co_updateStatus_payMount(JsonEntry, stateindex) ; // EZWS190425CODE , console.log(stateindex); 
						if( arrSellinOption[index]['경과'] == '입고경과' ) stateindex=this.co_updateStatus_importStep( JsonEntry , stateindex) ; // EZWS190425CODE , console.log(stateindex); 
		}                
						JsonEntry[arrSellinOption[index].경과] = arrSellinStatus[index][stateindex];
						stateindex = 0; 
			}           
}
})
