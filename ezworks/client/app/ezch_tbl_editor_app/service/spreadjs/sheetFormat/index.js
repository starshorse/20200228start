angular.module('sheetFormat', [])
.factory('sheetFormat_factory',[function(){
	var sheetFormat_factory = {
	}
	return sheetFormat_factory 
}])
.service('sheetFormat_service',['$injector', 
'spreadJs_factory',
'sheetFormat_factory',	
	function( $injector, 
spreadJs_factory,
sheetFormat_factory		
){
	var defaultHInfo = { name: '', displayName: '', formatter: '####', size: 120, resizable: true , visible: true , formula:'', locked: true, TYPE:'NVARCHAR(120)' }
	var headInfos_head
///////////////////////////////////////////////////////////////////////////////////////////
// Init service 
///////////////////////////////////////////////////////////////////////////////////////////	
	this.retractHead = ( DbData_1 )=>{
         const headers = Object.keys( DbData_1 ) 
		 headInfos = [] 
		 for( idx in headers ){
			var newHeader = JSON.parse( JSON.stringify( defaultHInfo )) 
			newHeader.name = newHeader.displayName = headers[idx] 
			headInfos.push( newHeader ) 
		 }
		 return headInfos
	}
}])
