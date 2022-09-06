angular.module('myConinfo',[])
.controller('myConinfoCtrl',['$scope', function($scope){
	$scope.conInfo = { vendor:'-', name:'-', contact:'-', fax:'-' , email:'@' } 
	$scope.conInfo_update = ( conInfo )=>{
		$scope.conInfo.vendor = conInfo['국내업체명'] 
		$scope.conInfo.name = conInfo['성명']
		$scope.conInfo.contact = conInfo['휴대전화'] 
		$scope.conInfo.fax = conInfo['FAX'] 
		$scope.conInfo.email = conInfo['대표 E-Mail'] 
		$scope.$apply() 
	}
}])
.directive('myConinfo',function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/coninfo.html',
		controller:'myConinfoCtrl'
	}
})
