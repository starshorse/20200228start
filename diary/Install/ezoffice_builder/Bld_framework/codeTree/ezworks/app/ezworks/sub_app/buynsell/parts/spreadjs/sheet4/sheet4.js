angular.module('mySheet4',[])
.controller('mySheet4Ctrl', ['$scope','myhighLightRowService', function($scope, myhighLightRowService ){
	var working_row = 0
	$scope.getSheetHeaderData[4] = function(){
		return product_colInfos
	}
	$scope.getSheetData[4] = function(){
		return product_data 
	}
	$scope.event_click.sheet4 = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != 4 )return 
			myhighLightRowService.unhighLightRow( $scope.spread, working_row, product_colInfos) 
			working_row = args.row 
			const sheet4 = $scope.spread.getSheet(4) 
			const No = sheet4.getValue( args.row, 0 ) 
			const ent1 = product_data.find((ent)=> ent.No == No )
			myhighLightRowService.highLightRow( $scope.spread, working_row, product_colInfos) 
	}
}]) 
var product_colInfos =[
  {
    "name": "no",
    "displayname": "no",
    "size": 70,
     "formatter": "\* ###",
     "locked": true 
  },
  {
    "name": "제품명",
    "displayname": "제품명",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "정식제품명",
    "displayname": "정식제품명",
    "size": 200,
    "formatter": ""
  },
  {
    "name": "제조사",
    "displayname": "제조사",
    "size": 200,
    "formatter": ""
  },
  {
    "name": "모델명",
    "displayname": "모델명",
    "size": 200,
    "formatter": ""
  },
  {
    "name": "규격",
    "displayname": "규격",
    "size": 200,
    "formatter": ""
  },
  {
    "name": "규격2",
    "displayname": "규격2",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "규격3",
    "displayname": "규격3",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "비고1",
    "displayname": "비고1",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "비고2",
    "displayname": "비고2",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "비고3",
    "displayname": "비고3",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "재고수량",
    "displayname": "재고수량",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자1",
    "displayname": "일자1",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량1",
    "displayname": "조정수량1",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자2",
    "displayname": "일자2",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량2",
    "displayname": "조정수량2",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자3",
    "displayname": "일자3",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량3",
    "displayname": "조정수량3",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자4",
    "displayname": "일자4",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량4",
    "displayname": "조정수량4",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자5",
    "displayname": "일자5",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량5",
    "displayname": "조정수량5",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자6",
    "displayname": "일자6",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량6",
    "displayname": "조정수량6",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자7",
    "displayname": "일자7",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량7",
    "displayname": "조정수량7",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자8",
    "displayname": "일자8",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량8",
    "displayname": "조정수량8",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자9",
    "displayname": "일자9",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량9",
    "displayname": "조정수량9",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자10",
    "displayname": "일자10",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량10",
    "displayname": "조정수량10",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자11",
    "displayname": "일자11",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량11",
    "displayname": "조정수량11",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "일자12",
    "displayname": "일자12",
    "size": 100,
    "formatter": "DD/MM"
  },
  {
    "name": "조정수량12",
    "displayname": "조정수량12",
    "size": 100,
    "formatter": ""
  }
];
var product_data = [
  {
    "no": 1,
    "제품명": "테이블보1",
    "정식제품명": "테이블보1",
    "제조사": "C홈메이드",
    "모델명": "ABC-005",
    "규격": "40X55",
    "규격2": "5T",
    "규격3": "100수제품",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 2,
    "제품명": "테이블보2",
    "정식제품명": "테이블보2",
    "제조사": "C홈메이드",
    "모델명": "ABC-006",
    "규격": "40X56",
    "규격2": "6T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 3,
    "제품명": "테이블보3",
    "정식제품명": "테이블보3",
    "제조사": "C홈메이드",
    "모델명": "ABC-007",
    "규격": "40X57",
    "규격2": "7T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 4,
    "제품명": "쟁반A",
    "정식제품명": "일반쟁반A형",
    "제조사": "A홈메이드",
    "모델명": "ABC-003",
    "규격": "40X53",
    "규격2": "",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 5,
    "제품명": "쟁반B",
    "정식제품명": "특수쟁반B형",
    "제조사": "B홈메이드",
    "모델명": "ABC-004",
    "규격": "40X54",
    "규격2": "4T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 6,
    "제품명": "테이블보4",
    "정식제품명": "테이블보4",
    "제조사": "C홈메이드",
    "모델명": "ABC-008",
    "규격": "40X58",
    "규격2": "8T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 7,
    "제품명": "테이블보5",
    "정식제품명": "테이블보5",
    "제조사": "C홈메이드",
    "모델명": "ABC-009",
    "규격": "40X59",
    "규격2": "9T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 8,
    "제품명": "테이블보6",
    "정식제품명": "테이블보6",
    "제조사": "C홈메이드",
    "모델명": "ABC-010",
    "규격": "40X60",
    "규격2": "10T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 9,
    "제품명": "종이컵A",
    "정식제품명": "일반종이컵A형",
    "제조사": "A기공",
    "모델명": "ABC-001",
    "규격": "40X51",
    "규격2": "1T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  },
  {
    "no": 10,
    "제품명": "종이컵B",
    "정식제품명": "일반종이컵B형",
    "제조사": "B기공",
    "모델명": "ABC-002",
    "규격": "40X52",
    "규격2": "2T",
    "규격3": "",
    "비고1": "",
    "비고2": "",
    "비고3": "",
    "재고수량": "",
    "일자1": "",
    "조정수량1": "",
    "일자2": "",
    "조정수량2": "",
    "일자3": "",
    "조정수량3": "",
    "일자4": "",
    "조정수량4": "",
    "일자5": "",
    "조정수량5": "",
    "일자6": "",
    "조정수량6": "",
    "일자7": "",
    "조정수량7": "",
    "일자8": "",
    "조정수량8": "",
    "일자9": "",
    "조정수량9": "",
    "일자10": "",
    "조정수량10": "",
    "일자11": "",
    "조정수량11": "",
    "일자12": "",
    "조정수량12": "",
    "": ""
  }
];