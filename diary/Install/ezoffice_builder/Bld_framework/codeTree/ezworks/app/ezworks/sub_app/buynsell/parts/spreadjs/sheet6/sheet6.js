angular.module('mySheet6',[])
.controller('mySheet6Ctrl', ['$scope','myhighLightRowService', function($scope, myhighLightRowService){
	var working_row = 0 
	$scope.getSheetHeaderData[6] = function(){
		return sp0_sh6_colInfos
	}
	$scope.getSheetData[6] = function(){
		return sp0_sh6_initData 
	}
	$scope.event_click.sheet6 = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != 6 )return 
			myhighLightRowService.unhighLightRow( $scope.spread, working_row, sp0_sh6_colInfos) 
			working_row = args.row 
			const sheet6 = $scope.spread.getSheet(6) 
			const No = sheet6.getValue( args.row, 0 ) 
			const ent1 = sp0_sh6_initData.find((ent)=> ent.No == No )
			const ent2 = $scope.sheet2.getEntry( ent1['거래처'] ) 
			$scope.conInfo_update( ent2 )
			myhighLightRowService.highLightRow( $scope.spread, working_row, sp0_sh6_colInfos) 
	}
}]) 
var sp0_sh6_colInfos = [
  {
    "name": "No",
    "displayname": "No",
    "size": 70,
    "formatter": "",
    "formatter": "\* ##-#-####",
    "locked": true
  },
  {
    "name": "당사 담당자",
    "displayname": "당사 담당자",
    "size": 100,
    "formatter": ""
	},
  {
    "name": "견적일",
    "displayname": "견적일",
    "size": 100,
    "formatter": "YY/MM/DD"
  },
  {
    "name": "거래처",
    "displayname": "거래처",
    "size": 100,
    "formatter": "",
    "select_type2": true 
  },
  {
    "name": "담당자",
    "displayname": "담당자",
    "size": 70,
    "formatter": "",
	"locked": false
  },
  {
    "name": "담당자2",
    "displayname": "담당자2",
    "size": 70,
    "formatter": ""
  },
  {
    "name": "거래처비고",
    "displayname": "거래처비고",
    "size": 200,
    "formatter": ""
  },
  {
    "name": "제품명",
    "displayname": "제품명",
    "size": 70,
    "formatter": "",
    "select_type2": true 
  },
  {
    "name": "제조사",
    "displayname": "제조사",
    "size": 70,
    "formatter": "",
	"locked": false 
  },
  {
    "name": "모델명",
    "displayname": "모델명",
    "size": 70,
    "formatter": "",
	"locked": false 
  },
  {
    "name": "규격",
    "displayname": "규격",
    "size": 70,
    "formatter": "",
	"locked": false 
  },
  {
    "name": "규격2",
    "displayname": "규격2",
    "size": 70,
    "formatter": ""
  },
  {
    "name": "규격3",
    "displayname": "규격3",
    "size": 70,
    "formatter": ""
  },
  {
    "name": "수량",
    "displayname": "수량",
    "size": 50,
    "formatter": ""
  },
  {
    "name": "제품비고",
    "displayname": "제품비고",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "부가세구분",
    "displayname": "부가세구분",
    "size": 100,
    "formatter": "",
    "select_type2": true
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
			"locked": true 
  },
  {
			"name": "비용(전체)",
			"displayName": "비용(전체)",
			"size": 100,
			"formatter": "\* #,###",
			"locked": true 
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
    "displayname": "총공급가액",
    "size": 120,
   "formatter": "\* #,###",
	"locked": true 
  },
  {
    "name": "총부가세",
    "displayname": "총부가세",
    "size": 100,
   "formatter": "\* #,###",
	"locked": true 
  },
  {
			"name": "실질총제품가격",
			"displayName": "총공급 총부가세",
			"size": 120,
			"formatter": "\* #,###",
			"locked": true 
  },
  {
    "name": "수기총공급가액",
    "displayname": "수기총공급가액",
    "size": 120,
    "formatter": "\* #,###"
  },
  {
    "name": "수기총부가세",
    "displayname": "수기총부가세",
    "size": 100,
    "formatter": "\* #,###"
  },
  {
    "name": "후예비1",
    "displayname": "후예비1",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "후예비2",
    "displayname": "후예비2",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "후예비3",
    "displayname": "후예비3",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "후예비4",
    "displayname": "후예비4",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "후예비5",
    "displayname": "후예비5",
    "size": 100,
    "formatter": ""
  }
];
var sp0_sh6_initData = [
  {
    "No": 1920001,
    "당사 담당자": "김일순",
    "견적일": "07/01",
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
    "부가세구분": "",
    "제품단가(공급가액)": 0,
    "최종단가(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "실질총제품가격":0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "후예비1": "-",
    "후예비2": "",
    "후예비3": "",
    "후예비4": "",
    "후예비5": ""
  },
  {
    "No": 1920002,
    "당사 담당자": "김이순",
    "견적일": "07/02",
    "거래처": "B무역",
    "담당자": "유관순",
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
    "부가세구분": "",
    "제품단가(공급가액)": 0,
    "최종단가(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "실질총제품가격":0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "후예비1": "-",
    "후예비2": "",
    "후예비3": "",
    "후예비4": "",
    "후예비5": ""
  },
  {
    "No": 1920003,
    "당사 담당자": "김삼순",
    "견적일": "07/02",
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
    "부가세구분": "",
    "제품단가(공급가액)": 0,
    "최종단가(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "실질총제품가격":0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "후예비1": "-",
    "후예비2": "",
    "후예비3": "",
    "후예비4": "",
    "후예비5": ""
  },
  {
    "No": 1920004,
    "당사 담당자": "김일순",
    "견적일": "07/04",
    "거래처": "F정밀",
    "담당자": "김육",
    "담당자2": "",
    "거래처비고": "",
    "제품명": "쟁반B",
    "제조사": "B홈메이드",
    "모델명": "ABC-004",
    "규격": "40X54",
    "규격2": "4T",
    "규격3": "",
    "수량": 2,
    "제품비고": "",
    "부가세구분": "",
    "제품단가(공급가액)": 0,
    "최종단가(공급가액)": 0,
    "총공급가액": 0,
    "총부가세": 0,
    "실질총제품가격":0,
    "수기총공급가액": "",
    "수기총부가세": "",
    "후예비1": "-",
    "후예비2": "",
    "후예비3": "",
    "후예비4": "",
    "후예비5": ""
  }
];
