angular.module('mySheet0Service.price_calc',['mySheet0Service.co_auxTaxYN'])
.service('mySheet0ServicePriceCalc', function( mySheet0ServiceCoAuxTaxYN ){
/**
    sp0_sh0_ft_calc.js
*/
    this.calcProuctPrice = ( ezEntry, parameter = null )=>{
		if( EZWS190422CODE ) if( ezJSON_Data_EmptyCheck(ezEntry['거래처']) || ezJSON_Data_EmptyCheck(ezEntry['제품명'])) return;

			var handSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['수기총공급가액']);
			var handAuxMnt  = ezJSON_Data_EmptyCheck(ezEntry['수기총부가세']);
			var totalProductMnt =  ezJSON_Data_EmptyCheck(ezEntry['총제품가격(공급가+부가세)']);
			var totalSupplyMnt = ezJSON_Data_EmptyCheck(ezEntry['총공급가격']);
			var numSupply = ezJSON_Data_EmptyCheck(ezEntry['수량']);

			ezEntry['총공급가액'] = 0;
			ezEntry['총부가세'] = 0;

			if( mySheet0ServiceCoAuxTaxYN.co_auxTaxYN_isExempt( ezEntry )){
				mySheet0ServiceCoAuxTaxYN.co_auxTaxYN_exemptCalMnt( ezEntry );
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
			if ( ezJSON_Data_EmptyCheck(!ezEntry['추가비용(총공급가격)']))ezEntry['총공급가액'] += ezEntr
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
})
