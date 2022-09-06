angular.module('mySheet3',[])
.controller('mySheet3Ctrl', ['$scope','myhighLightRowService', function($scope, myhighLightRowService ){
	var working_row = 0
	$scope.getSheetHeaderData[3] = function(){
		return customer_colInfos
	}
	$scope.getSheetData[3] = function(){
		return customer_data 
	}
	$scope.sheet3.getEntry = ( vendor, name )=>{
		const entry_customer = customer_data.find((ent)=>( ent['거래처'] == vendor && ent['성명'] == name))
		return entry_customer
	}
	$scope.event_click.sheet3 = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != 3 )return 
			myhighLightRowService.unhighLightRow( $scope.spread, working_row, customer_colInfos) 
			working_row = args.row 
			const sheet3 = $scope.spread.getSheet(3) 
			const No = sheet3.getValue( args.row, 0 ) 
			const ent1 = customer_data.find((ent)=> ent.No == No )
			myhighLightRowService.highLightRow( $scope.spread, working_row, customer_colInfos) 
	}
}]) 
var customer_colInfos =[
  {
    "name": "no",
    "displayname": "no",
    "size": 70,
    "formatter": "\* ###",
    "locked": true 
  },
  {
    "name": "예비",
    "displayname": "예비",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "거래처",
    "displayname": "거래처",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "성명",
    "displayname": "성명",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "직책",
    "displayname": "직책",
    "size": 100,
    "formatter": "",
    "select_type2": true 
  },
  {
    "name": "부서",
    "displayname": "부서",
    "size": 100,
    "formatter": "",
    "select_type2": true 
  },
  {
    "name": "휴대전화",
    "displayname": "휴대전화",
    "size": 300,
    "formatter": ""
  },
  {
    "name": "전화",
    "displayname": "전화",
    "size": 300,
    "formatter": ""
  },
  {
    "name": "FAX",
    "displayname": "FAX",
    "size": 300,
    "formatter": ""
  },
  {
    "name": "E-Mail",
    "displayname": "E-Mail",
    "size": 300,
    "formatter": ""
  },
  {
    "name": "E-Mail(세금계산서)",
    "displayname": "E-Mail(세금계산서)",
    "size": 300,
    "formatter": ""
  },
  {
    "name": "가족관계",
    "displayname": "가족관계",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "자택주소",
    "displayname": "자택주소",
    "size": 1000,
    "formatter": ""
  },
  {
    "name": "배송주소",
    "displayname": "배송주소",
    "size": 1000,
    "formatter": ""
  },
  {
    "name": "우편번호",
    "displayname": "우편번호",
    "size": 200,
    "formatter": ""
  },
  {
    "name": "예비3",
    "displayname": "예비3",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비4",
    "displayname": "예비4",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비5",
    "displayname": "예비5",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비6",
    "displayname": "예비6",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비7",
    "displayname": "예비7",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비8",
    "displayname": "예비8",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비9",
    "displayname": "예비9",
    "size": 100,
    "formatter": ""
  },
  {
    "name": "예비10",
    "displayname": "예비10",
    "size": 100,
    "formatter": ""
  }
];
var customer_data = [
  {
    "no": 1,
    "예비": "",
    "거래처": "A업체",
    "성명": "이순신",
    "직책": "",
    "부서": "",
    "휴대전화": "010-000-0099",
    "전화": "02-1234-1233",
    "FAX": "02-1234-1232",
    "E-Mail": "",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 2,
    "예비": "",
    "거래처": "B무역",
    "성명": "유관순",
    "직책": "",
    "부서": "",
    "휴대전화": "010-000-0000",
    "전화": "02-1234-1234",
    "FAX": "02-1234-1235",
    "E-Mail": "1234@gmail.com",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 3,
    "예비": "",
    "거래처": "B무역",
    "성명": "황희",
    "직책": "",
    "부서": "",
    "휴대전화": "010-000-0001",
    "전화": "02-001-00001",
    "FAX": "02-002-0002",
    "E-Mail": "bdf@fghf.fgd",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 4,
    "예비": "",
    "거래처": "B무역",
    "성명": "유성룡",
    "직책": "",
    "부서": "",
    "휴대전화": "010-000-0002",
    "전화": "02-001-00002",
    "FAX": "02-002-0003",
    "E-Mail": "",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 5,
    "예비": "",
    "거래처": "당사",
    "성명": "김일순",
    "직책": "",
    "부서": "",
    "휴대전화": "",
    "전화": "",
    "FAX": "",
    "E-Mail": "",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 6,
    "예비": "",
    "거래처": "당사",
    "성명": "김이순",
    "직책": "",
    "부서": "",
    "휴대전화": "",
    "전화": "",
    "FAX": "",
    "E-Mail": "",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 7,
    "예비": "",
    "거래처": "당사",
    "성명": "김삼순",
    "직책": "",
    "부서": "",
    "휴대전화": "",
    "전화": "",
    "FAX": "",
    "E-Mail": "",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  },
  {
    "no": 8,
    "예비": "",
    "거래처": "",
    "성명": "",
    "직책": "",
    "부서": "",
    "휴대전화": "",
    "전화": "",
    "FAX": "",
    "E-Mail": "",
    "E-Mail(세금계산서)": "",
    "가족관계": "",
    "자택주소": "",
    "배송주소": "",
    "우편번호": "",
    "예비3": "",
    "예비4": "",
    "예비5": "",
    "예비6": "",
    "예비7": "",
    "예비8": "",
    "예비9": "",
    "예비10": ""
  }
];
