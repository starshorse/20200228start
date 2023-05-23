/*
	spreadjsFilter_service need :
		spreadjsEvent_service. 
*/
angular.module('spreadjs_filters', [])
.factory('spreadjsFilter_factory',function(){
	var spreadjsFilter_factory = {
		filter_data : null  
	}
	return spreadjsFilter_factory
})
.service('spreadjsFilter_service',['$injector',
'spreadJs_service',
'sheetFormat_service',
	function( $injector, 
	spreadJs_service, 
	sheetFormat_service 
){
	var spreadjsFilter_factory = $injector.get('spreadjsFilter_factory')  
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')) spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
	else if( $injector.has('gcSpreadjs_factory')) spreadjs_product = $injector.get('gcSpreadjs_factory') 
	this.doColFilter = ( setAutoFilter , AppEdit = 0 )=>{
	    let filter_rows =	spreadjsFilter_factory.filter_data
	    let headInfos = spreadJs_service.getHeadInfos() 
	    let sheet0 = spreadJs_service.getSheet0() 
	    let DbData = spreadJs_service.getDbData() 
	    if( !headInfos ) return  
	    var colInfo = null 
// Thu Mar 17 11:13:22 KST 2022
// no need col Filter if no mainButtons 		
	    colInfo = headInfos.filter((ent)=>ent.subType == 1 ) 
	    if( colInfo.length == 0 )colInfo = null 
	    if( colInfo == null ) sheetFormat_service.updateHead( headInfos , filter_rows ) 
	    else sheetFormat_service.updateHead( colInfo , filter_rows  )
// Thu Feb 24 13:33:26 KST 2022
	}
}])
