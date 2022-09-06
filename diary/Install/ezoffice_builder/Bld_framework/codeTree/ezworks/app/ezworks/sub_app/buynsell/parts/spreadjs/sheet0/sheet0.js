angular.module('mySheet0',[])
.controller('mySheet0Ctrl', ['$scope','myhighLightRowService', function($scope, myhighLightRowService ){
	var working_row = 0 
	$scope.getSheetHeaderData[0] = function(){
		return Sellin_colInfos
	}
	$scope.getSheetData[0] = function(){
		return Sellin 
	}
	$scope.event_click.sheet0 = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != 0 )return 
			myhighLightRowService.unhighLightRow( $scope.spread, working_row, Sellin_colInfos) 
			working_row = args.row 
			const sheet0 = $scope.spread.getSheet(0) 
			const No = sheet0.getValue( args.row, 0 ) 
			const ent0 = Sellin.find((ent)=> ent.No == No )
			const ent1 = $scope.sheet2.getEntry( ent0['거래처'] ) 
			$scope.conInfo_update( ent1 )
			myhighLightRowService.highLightRow( $scope.spread, working_row, Sellin_colInfos) 
	}
}]) 
var Sellin_colInfos = [
		 {
			"name": "No",
			"displayName": "No",
			"size": 70,
			"formatter": "",
			"locked": true ,
			"formatter": "\* ##-#-####",
            "data-type":"int" 
		  },
		  {
			"name": "진행단계",
			"displayName": "진행단계",
			"size": 100,
			"formatter": "",
			"locked": true ,
            "visible":false,
		  },
           {
			"name": "입고경과",
			"displayName": "입고경과",
			"size": 100,
			"formatter": "",
			"locked": true 
		  },
           {
			"name": "매입계산서",
			"displayName": "매입계산서",
			"size": 100,
			"formatter": "",
			"locked": true 
		  },
           {
			"name": "대금결제",
			"displayName": "대금결제",
			"size": 100,
			"formatter": "",
			"locked": true 
		  },
		  {
			"name": "당사 담당자",
			"displayName": "당사 담당자",
			"size": 100,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "발주확정일",
			"displayName": "발주확정",
			"size": 100,
			"formatter": "YY/MM/dd"
		  },
		  {
			"name": "거래처",
			"displayName": "거래처",
			"size": 100,
			"formatter": "",
			"select_type2": true
		  },
		  {
			"name": "담당자",
			"displayName": "담당자",
			"size": 70,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "담당자2",
			"displayName": "담당자2",
			"size": 70,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "거래처비고",
			"displayName": "거래처비고",
			"size": 200,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "제품명",
			"displayName": "제품명",
			"size": 70,
			"formatter": "",
			"select_type2": true 
		  },
		  {
			"name": "제조사",
			"displayName": "제조사",
			"size": 70,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "모델명",
			"displayName": "모델명",
			"size": 70,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "규격",
			"displayName": "규격",
			"size": 70,
			"formatter": "",
			"locked": false
		  },
		  {
			"name": "규격2",
			"displayName": "규격2",
			"size": 100,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "규격3",
			"displayName": "규격3",
			"size": 100,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "수량",
			"displayName": "수량",
			"size": 50,
			"formatter": "",
			"locked": false,
			"data-type": "int"
		  },
		  {
			"name": "제품비고",
			"displayName": "제품비고",
			"size": 100,
			"formatter": "",
			"locked": false 
		  },
		  {
			"name": "발주일",
			"displayName": "발주일",
			"size": 70,
			"formatter": "YY/MM/dd",
            "data-type":"date" 
		  },
		  {
			"name": "발주확인일",
			"displayName": "발주확인",
			"size": 90,
			"formatter": "YY/MM/dd",
            "data-type":"date" 
		  },
		  {
			"name": "입고예정일",
			"displayName": "입고예정",
			"size": 100,
			"formatter": "YY/MM/dd",
			"data-type": "date"
		  },
		  {
			"name": "입고일",
			"displayName": "입고일",
			"size": 80,
			"formatter": "YY/MM/dd",
			"data-type": "date"
		  },
		  {
			"name": "매입계산서발행일",
			"displayName": "계산서발행",
			"size": 100,
			"formatter": "YY/MM/dd",
			"data-type": "date"
		  },
		  {
			"name": "계산서비고",
			"displayName": "계산서비고",
			"size": 100,
			"formatter": ""
		  },
		  {
			"name": "부가세구분",
			"displayName": "부가세구분",
			"size": 100,
			"formatter": "",
            "select_type2": true
		  },
           {
			"name": "총입력가격구분",
			"displayName": "총입력가격구분",
			"size": 40,
			"formatter": "",
            "visible":false,
            "select_type2": true
		  },
		  {
			"name": "총제품가격(공급가+부가세)",
			"displayName": "총제품가격",
			"size": 120,
			"formatter": "\* #,###",
			"locked": false 
		  },
          {
			"name": "추가비용(총제품가격)",
			"displayName": "추가비용P",
			"size": 100,
			"formatter": "\* #,###",
			"locked": false
		  },
          {
			"name": "총공급가격",
			"displayName": "총공급가격",
			"size": 120,
			"formatter": "\* #,###",
            "visible":false, 
			"locked": true 
		  },
            {
			"name": "추가비용(총공급가격)",
			"displayName": "추가비용S",
			"size": 100,
			"formatter": "\* #,###",
            "visible":false, 
			"locked": false
		  },
		  {
			"name": "제품단가\n(공급가액)",
			"displayName": "제품단가",
			"size": 100,
			"formatter": "\* #,###.##",
			"locked": true 
		  },
		  {
			"name": "총공급가액",
			"displayName": "총공급가액",
			"size": 120,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "총부가세",
			"displayName": "총부가세",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
		  },
          {
			"name": "실질총제품가격",
			"displayName": "총공급+총부가세",
			"size": 120,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "수기총공급가액",
			"displayName": "수기총공급가액",
			"size": 150,
			"formatter": "\* ###,###"
		  },
		  {
			"name": "수기총부가세",
			"displayName": "수기총부가세",
			"size": 100,
			"formatter": "\* ###,###"
		  },
		  {
			"name": "매입대금\n지급액",
			"displayName": "매입대금\n지급액",
			"size": 150,
			"formatter": "\* ###,###"
		  },
		  {
			"name": "지급일",
			"displayName": "지급일",
			"size": 80,
			"formatter": "YY/MM/dd",
			"data-type": "date"
		  },
		  {
			"name": "지급방법",
			"displayName": "지급방법",
			"size": 100,
			"formatter": ""
		  },
		  {
			"name": "비고",
			"displayName": "비고",
			"size": 100,
			"formatter": ""
		  },
		  {
			"name": "선지급액",
			"displayName": "선지급액",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "지급액",
			"displayName": "지급액",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "미지급액",
			"displayName": "미지급액",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "보류,취소,하자",
			"displayName": "보류,취소,하자",
			"size": 200,
			"formatter": "",
             "select_type2": true
		  },
		  {
			"name": "보류,취소,하자 발생일",
			"displayName": "보류,취소,하자 발생일",
			"size": 400,
			"formatter": "YY/MM/dd"
		  },
		  {
			"name": "보류,취소,하자 비고",
			"displayName": "보류,취소,하자 비고",
			"size": 400,
			"formatter": ""
		  },
		  {
			"name": "",
			"displayName": "",
			"size": "",
			"formatter": ""
		  },
		  {
			"name": "",
			"displayName": "",
			"size": "",
			"formatter": ""
		  },
		  {
			"name": "",
			"displayName": "",
			"size": "",
			"formatter": ""
		  },
		  {
			"name": "",
			"displayName": "",
			"size": "",
			"formatter": ""
		  },
		  {
			"name": "",
			"displayName": "",
			"size": "",
			"formatter": ""
		  }
		];
var Sellin = [
  {
    "No": 1910001,
 //   "진행단계":"",
 //   "입고경과":"",
 //   "매입계산서":"",    
 //   "대금결제": "선지급",
    "당사 담당자": "김일순",
    "발주확정일": "18/07/01",
    "거래처": "B무역",
    "담당자": "",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "종이컵A",
    "제조사": "A기공",
    "모델명": "ABC-001",
    "규격": "40X51",
    "규격2": "1T",
    "규격3": "",
    "수량": 3,
    "제품비고": "",
    "발주일": "18/07/02",
    "발주확인일": "",
    "입고예정일": "",
    "입고일": "",
    "매입계산서발행일": "18/07/10",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분": "제품가",
    "추가비용(총제품가격)": 0,
    "추가비용(총공급가격)": 0,
    "총제품가격(공급가+부가세)": 213000,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매입대금\n지급액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
//    "선지급액": 177000,
//    "지급액": 0,
//    "미지급액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  }
/*  ,
  {
    "No": 1910002,
    "진행단계":"",
    "입고경과":"",
    "매입계산서":"",   
    "대금결제": "미지급",
    "당사 담당자": "김이순",
    "발주확정일": "18/07/02",
    "거래처": "B무역",
    "담당자": "",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "종이컵B",
    "제조사": "B기공",
    "모델명": "ABC-002",
    "규격": "40X52",
    "규격2": "2T",
    "규격3": "",
    "수량": 3,
    "제품비고": "",
    "발주일": "18/07/03",
    "발주확인일": "18/07/04",
    "입고예정일": "",
    "입고일": null,
    "매입계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 120000,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매입대금\n지급액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선지급액": 0,
    "지급액": 0,
    "미지급액": 120000,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910003,
    "진행단계":"",
    "입고경과":"",
    "매입계산서":"",   
    "대금결제": "선지급",
    "당사 담당자": "김삼순",
    "발주확정일": "18/07/02",
    "거래처": "C유통",
    "담당자": "이성계",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "쟁반A",
    "제조사": "A홈메이드",
    "모델명": "ABC-003",
    "규격": "40X53",
    "규격2": "3T",
    "규격3": "",
    "수량": 10,
    "제품비고": "",
    "발주일": "18/07/04",
    "발주확인일": "18/07/06",
    "입고예정일": null,
    "입고일": "",
    "매입계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 120000,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매입대금\n지급액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선지급액": 120000,
    "지급액": 0,
    "미지급액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910004,
    "진행단계":"",
    "입고경과":"",
    "매입계산서":"",   
    "대금결제": "지급완료",
    "당사 담당자": "김일순",
    "발주확정일": "18/08/17",
    "거래처": "B무역",
    "담당자": "유관삼",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "쟁반B",
    "제조사": "B홈메이드",
    "모델명": "ABC-004",
    "규격": "40X54",
    "규격2": "4T",
    "규격3": "",
    "수량": 5,
    "제품비고": "",
    "발주일": "18/08/18",
    "발주확인일": "",
    "입고예정일": "",
    "입고일": "",
    "매입계산서발행일": "18/08/20",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 300000,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매입대금\n지급액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선지급액": 0,
    "지급액": 300000,
    "미지급액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910005,
    "진행단계":"",
    "입고경과":"",
    "매입계산서":"",   
    "대금결제": "-",
    "당사 담당자": "김이순",
    "발주확정일": "18/07/01",
    "거래처": "B무역",
    "담당자": "",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "종이컵A",
    "제조사": "A기공",
    "모델명": "ABC-001",
    "규격": "40X51",
    "규격2": "1T",
    "규격3": "",
    "수량": 3,
    "제품비고": "",
    "발주일": "",
    "발주확인일": "",
    "입고예정일": "",
    "입고일": "",
    "매입계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 120000,
    "제품단가\n(공급가액)":0,
    "총공급가액":0 ,
    "총부가세": 0 ,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매입대금\n지급액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선지급액": 0,
    "지급액": 0,
    "미지급액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910006,
    "진행단계":"",
    "입고경과":"",
    "매입계산서":"",   
    "대금결제": "-",
    "당사 담당자": "김삼순",
    "발주확정일": "18/07/02",
    "거래처": "C유통",
    "담당자": "이성계",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "쟁반A",
    "제조사": "A홈메이드",
    "모델명": "ABC-003",
    "규격": "40X53",
    "규격2": "3T",
    "규격3": "",
    "수량": 1,
    "제품비고": "",
    "발주일": "",
    "발주확인일": "",
    "입고예정일": "",
    "입고일": "",
    "매입계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 18000,
    "제품단가\n(공급가액)":0 ,
    "총공급가액": 0,
    "총부가세": 0 ,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매입대금\n지급액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선지급액": 0,
    "지급액": 0,
    "미지급액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  } */
]; 
