var addSheetsCtrl = function( $scope, addSheets_service ){
       $scope.initSheets = ( name, jsonData )=>{
		   addSheets_service.initSheets( name, jsonData ) 
	   }
	   $scope.removeAddedSheets = ()=>{
		   addSheets_service.removeAddedSheets() 
	   }
}
