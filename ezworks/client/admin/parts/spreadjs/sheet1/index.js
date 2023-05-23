 angular.module('myDbEditSheet1',[])
.controller('myDbEditSheet1Ctrl',['$scope',
//1 'restApiServiceDbEdit',
'sheetFormat_service',
	function( $scope, 
//1	restApiServiceDbEdit, 
	sheetFormat_service  
){
	const defaultHInfo = { name: '', displayName: '', formatter: '', size: 120, resizable: false , visible: true }
// high module insert.. 
	angular.extend( this, new sheetFormatCtrl( $scope, sheetFormat_service )) 
	var sheet1 = sheetFormat_service.getSheet1()
	var sheet0 = sheetFormat_service.getSheet0() 

	$scope.retractHead = ( DbData_1 )=>{
         const headers = Object.keys( DbData_1 ) 
		 $scope.headInfos = [] 
		 for( idx in headers ){
			var newHeader = JSON.parse( JSON.stringify( defaultHInfo )) 
			newHeader.name = newHeader.displayName = headers[idx] 
			$scope.headInfos.push( newHeader ) 
		 }
		 sheet1.setDataSource( $scope.headInfos ) 
		 sheet0.bindColumns( $scope.headInfos ) 
		 return $scope.headInfos
	}
/*1		
	$scope.saveHead = ( tbl_name , headData )=>{
		tbl_name = tbl_name + '.hdr'
		restApiServiceDbEdit.postData( tbl_name, headData, cb_f_sheet1 ) 
	}
*/	
	$scope.sheet1SheetChange = ()=>{
	}
}])
.directive('mySheet1', function(){
    return {
		restrict: 'E',
		controller:'myDbEditSheet1Ctrl' 
	}
})
