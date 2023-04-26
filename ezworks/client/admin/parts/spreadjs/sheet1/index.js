 angular.module('myDbEditSheet1',[])
.controller('myDbEditSheet1Ctrl',['$scope','restApiServiceDbEdit','sheetFormat_service',
	function( $scope, restApiServiceDbEdit, sheetFormat_service  ){
/*		
	const sheet1 = $scope.spread.getSheet(1)
	const sheet0 = $scope.spread.getSheet(0)
	sheet1.setName('Format') 
*/	
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
	$scope.saveHead = ( tbl_name , headData )=>{
		tbl_name = tbl_name + '.hdr'
		restApiServiceDbEdit.postData( tbl_name, headData, cb_f_sheet1 ) 
	}
	$scope.sheet1SheetChange = ()=>{
/*	Temp.. 	
		 sheet1.isPaintSuspended(false )
         const addOPts = $scope.getAddOpts() 
		if( addOPts.app_name == $scope.app_cur.name ){
			 for( key in addOPts ){
				var ent1 = $scope.headInfos.find((ent)=>ent.name == key ) 
				if(ent1 == undefined ) continue ;
				ent1.json = JSON.stringify(  addOPts[key] )
			 }
		}	
		 sheet1.setDataSource( $scope.headInfos )
		 sheet1.repaint() 
*/		
	}
}])
.directive('mySheet1', function(){
    return {
		restrict: 'E',
		controller:'myDbEditSheet1Ctrl' 
	}
})
