angular.module('mySheet5',[])
.controller('mySheet5Ctrl', ['$scope','myhighLightRowService', function($scope, myhighLightRowService){
	var working_row = 0 
	$scope.getSheetHeaderData[5] = function(){
		return sp0_sh5_colInfos
	}
	$scope.getSheetData[5] = function(){
		return sp0_sh5_initData 
	}
	$scope.event_click.sheet5 = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != 5 )return 
			myhighLightRowService.unhighLightRow( $scope.spread, working_row, sp0_sh5_colInfos) 
			working_row = args.row 
			const sheet5 = $scope.spread.getSheet(5) 
			const No = sheet5.getValue( args.row, 0 ) 
			const ent1 = sp0_sh5_initData.find((ent)=> ent.No == No )
			const ent2 = $scope.sheet2.getEntry( ent1['거래처'] ) 
			$scope.conInfo_update( ent2 )
			myhighLightRowService.highLightRow( $scope.spread, working_row, sp0_sh5_colInfos) 
	}
}]) 
var sp0_sh5_colInfos = [
		 {
			"name": "No",
			"displayName": "No",
			"size": 70,
			"formatter": "",
			"locked": true ,
            "formatter": "\* ##-#-####"
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
			"name": "납품경과",
			"displayName": "납품경과",
			"size": 100,
			"formatter": "",
			"locked": true 
		  },
           {
			"name": "매출계산서",
			"displayName": "매출계산서",
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
			"name": "수주확정일",
			"displayName": "수주확정",
			"size": 100,
			"formatter": "YY/MM/dd"
		  },
		  {
			"name": "거래처",
			"displayName": "거래처",
			"size": 100,
			"formatter": "",
			"locked": true ,
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
			"locked": true ,
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
			"locked": false
		  },
		  {
			"name": "제품비고",
			"displayName": "제품비고",
			"size": 100,
			"formatter": "",
			"locked": false
		  },
		  {
			"name": "납품기한",
			"displayName": "납품기한",
			"size": 100,
			"formatter": "YY/MM/dd"
		  },
		  {
			"name": "납품일",
			"displayName": "납품일",
			"size": 80,
			"formatter": "YY/MM/dd"
		  },
		  {
			"name": "매출계산서발행일",
			"displayName": "계산서발행",
			"size": 100,
			"formatter": "YY/MM/dd"
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
            "visible":false
		  },
		  {
    "name": "제품단가(공급가액)",
    "displayname": "제품단가(공급가액)",
    "size": 120,
    "formatter": "\* #,###"
  },
  {
			"name": "비용(개당)",
			"displayName": "비용(개당)",
			"size": 100,
			"formatter": "\* #,###",
			"locked": false 
  },
  {
			"name": "비용(전체)",
			"displayName": "비용(전체)",
			"size": 100,
			"formatter": "\* #,###",
			"locked": false 
  },
  {
    "name": "최종단가(공급가액)",
    "displayname": "최종단가(공급가액)",
    "size": 100,
    "formatter": "\* #,###",
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
			"name": "매출대금+수금액",
			"displayName": "매출대금 수금액",
			"size": 150,
			"formatter": "\* ###,###"
		  },
		  {
			"name": "지급일",
			"displayName": "수금일",
			"size": 80,
			"formatter": "YY/MM/dd"
		  },
		  {
			"name": "지급방법",
			"displayName": "수금방법",
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
			"name": "선수금액",
			"displayName": "선수금액",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "수금액",
			"displayName": "수금액",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
		  },
		  {
			"name": "미수금액",
			"displayName": "미수금액",
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
var sp0_sh5_initData = [
  {
    "No": 1910001,
    "진행단계":"",
    "납품경과":"",
    "매출계산서":"",    
    "대금결제": "선지급",
    "당사 담당자": "김일순",
    "수주확정일": "18/07/01",
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
    "납품기한": "",
    "납품일": "",
    "매출계산서발행일": "18/07/10",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 0,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매출대금+수금액": 0,
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선수금액": 177000,
    "수금액": 0,
    "미수금액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910002,
    "진행단계":"",
    "납품경과":"",
    "매출계산서":"",   
    "대금결제": "미지급",
    "당사 담당자": "김이순",
    "수주확정일": "18/07/02",
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
    "납품기한": "",
    "납품일": null,
    "매출계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 0,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매출대금+수금액": 0,
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선수금액": 0,
    "수금액": 0,
    "미수금액": 120000,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910003,
    "진행단계":"",
    "납품경과":"",
    "매출계산서":"",   
    "대금결제": "선지급",
    "당사 담당자": "김삼순",
    "수주확정일": "18/07/02",
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
    "납품기한": null,
    "납품일": "",
    "매출계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 0,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매출대금+수금액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선수금액": 120000,
    "수금액": 0,
    "미수금액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910004,
    "진행단계":"",
    "납품경과":"",
    "매출계산서":"",   
    "대금결제": "지급완료",
    "당사 담당자": "김일순",
    "수주확정일": "18/08/17",
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
    "납품기한": "",
    "납품일": "",
    "매출계산서발행일": "18/08/20",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 0,
    "제품단가\n(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매출대금+수금액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선수금액": 0,
    "수금액": 300000,
    "미수금액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910005,
    "진행단계":"",
    "납품경과":"",
    "매출계산서":"",   
    "대금결제": "-",
    "당사 담당자": "김이순",
    "수주확정일": "18/07/01",
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
    "납품기한": "",
    "납품일": "",
    "매출계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)":0,
    "제품단가\n(공급가액)":0,
    "총공급가액":0 ,
    "총부가세": 0 ,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매출대금+수금액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선수금액": 0,
    "수금액": 0,
    "미수금액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  },
  {
    "No": 1910006,
    "진행단계":"",
    "납품경과":"",
    "매출계산서":"",   
    "대금결제": "-",
    "당사 담당자": "김삼순",
    "수주확정일": "18/07/02",
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
    "납품기한": "",
    "납품일": "",
    "매출계산서발행일": "",
    "계산서비고": "",
    "부가세구분": "",
    "총입력가격구분":"제품가", 
    "총제품가격(공급가+부가세)": 0,
    "제품단가\n(공급가액)":0 ,
    "총공급가액": 0,
    "총부가세": 0 ,
    "수기총공급가액": "",
    "수기총부가세": "",
    "매출대금+수금액": "",
    "지급일": "",
    "지급방법": "",
    "비고": "",
    "선수금액": 0,
    "수금액": 0,
    "미수금액": 0,
    "보류,취소,하자": "",
    "보류,취소,하자 발생일": "",
    "보류,취소,하자 비고": ""
  }
]; 
