 angular.module('myInstitute',['myInstituteSpread',
	'myInstituteSheet0',
	'myInstituteSheet1'
])
.controller('myInstituteCtrl', ['$scope', function($scope){
	$scope.spread 
	$scope.sheets =[{ sheet : null },
	  	{ sheet :null }] 
	$scope.sheetCount = 2 
	const socket = io()
	socket.on('getData',( data )=>{
	})
}])
angular.module('myInstituteSpread',[])
.controller('myInstituteSpreadCtrl', ['$scope', function($scope){
	$('#ss').wijspread({ sheetCount:$scope.sheetCount })
	$scope.spread = $('#ss').wijspread('spread')
	$scope.sheets[0].sheet = $scope.spread.getSheet(0) 
	$scope.sheets[1].sheet = $scope.spread.getSheet(1) 
}])
.directive('mySpreadjs', function(){
    return {
		restrict :'E' ,
		template :`<div id='ss' style='width:100%;height:400px;border:1px solid gray;'></div>`,
		controller :'myInstituteSpreadCtrl'
	}
})
