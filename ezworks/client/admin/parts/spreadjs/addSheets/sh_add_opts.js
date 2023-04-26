angular.module('myDbEditAddOpts',[])
.controller('myDbEditAddOptsCtrl',['$scope','addSheets_service', 
	function($scope, addSheets_service ){
    
    angular.extend( this, new addSheetsCtrl( $scope, addSheets_service )) 
/*	following code move to parts/spreads/addSheets/index.js 
	var defaultSheetIndex = 2 
	var addOPts = {}
   $scope.addSheets = [] 	
   $scope.initSheets =( name, jsonData )=>{
        $scope.spread.addSheet(  defaultSheetIndex , new  $.wijmo.wijspread.Sheet( name ) ) 
	    var sheet_ = $scope.spread.getSheet( defaultSheetIndex ) 
	    addOPts['app_name'] = $scope.app_cur.name 
	    addOPts[name] = jsonData 
	    sheet_.setDataSource( jsonData )
	    $scope.addSheets.push( defaultSheetIndex ) 
	    defaultSheetIndex++ 
   }
   $scope.getAddOpts = ()=>{
	   return addOPts 
   }
   $scope.removeAddedSheets = ()=>{
	   	while($scope.addSheets.length > 0 ){
	    	$scope.spread.removeSheet( $scope.addSheets.pop())    
		}
	   defaultSheetIndex = 2
   }
*/   
}])
.directive('myAddopts',function(){
	return {
		restrict:'E',
		controller:'myDbEditAddOptsCtrl'
	}
})
