angular.module('ezch_task_app',[
	'spreadjs'
])
.controller('ezch_task_appCtrl',['$scope',function( $scope ){
}])

angular.module('spreadjs',[])
.controller('spreadjsCtrl',[
'$scope', 
'spreadjs_service',	
	function(
		$scope,
		spreadjs_service
	){
		var spread = new GC.Spread.Sheets.Workbook( document.getElementById('ss'), { sheetCount: 3 }) 
		spreadjs_service.initSpread( spread ) 
}])
.factory('spreadjs_factory', [function(){
	var spreadjs_factory ={
		spread: null,
		getSpread : ()=>spreadjs_factory.spread ,
		DbData : null ,
		HeadInfo : null 
	}
	return spreadjs_factory
}])
.service('spreadjs_service',[
'spreadjs_factory',
'$http',	
	function( 
		spreadjs_factory ,
		$http
	){
		this.initSpread = async ( spread )=>{
			let sheet0 = spread.getSheet(0) 
			let response = await $http.get('/Hermes/ezchemtech/TableEditor/Data/정기업무기본정보') 
            spreadjs_factory.DbData = response.data.tbl_data 
			sheet0.setDataSource( spreadjs_factory.DbData ) 
		}
	}
])
.directive('mySpreadjs', function(){
   return {
	   restrict: 'E',
	   template:`<div id='ss' style='width:100%; height:700px; border:1px solid gray;'></div>` ,
	   controller:'spreadjsCtrl'
   }
})


