var sheetFormatCtrl = function( $scope, sheetFormat_service ){
	    $scope.loadHead = ()=>{
			sheetFormat_service.loadHead() 
			$scope.removeAddedSheets() 
			let headInfos = sheetFormat_service.getHeadInfos_sheet0() 
			for( col_item of headInfos ){
				    if( col_item.json != undefined ){
						let jsonData = JSON.parse( col_item.json )
						if( Array.isArray(jsonData )) $scope.initSheets( col_item.name , jsonData ) 
					}

			}
		}		
}
