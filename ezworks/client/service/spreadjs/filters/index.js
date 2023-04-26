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
.service('spreadjsFilter_service',['$injector','mainButtons_service','spreadJs_service','sheetFormat_service',
	function( $injector, mainButtons_service, spreadJs_service, sheetFormat_service ){
	var spreadjsFilter_factory = $injector.get('spreadjsFilter_factory')  
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')) spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
	else if( $injector.has('gcSpreadjs_factory')) spreadjs_product = $injector.get('gcSpreadjs_factory') 
	var filter_key 
	var filter_colName 
	var filter_mode = 0 
	this.setFilter_key = ( key, colName )=>{
		filter_key = key, 
		filter_colName = colName 
	}
	this.doFilter = ( AppEdit = 0 )=>{
//1 only for sheet0 . 
		let noFilter = 0 
// filter service neeed mainButtons..  
		let appConfiguration = spreadJs_service.getAppConfiguration() 
		try{
			if( appConfiguration.component.mainButtons.enable != 1 )return noFilter 
		}catch(err){
			console.log(err) 
			return noFilter 
		}
//		if( filter_colName == null )return noFilter

	    	let spread_data = spreadJs_service.getDbData() 
		let headInfos = spreadJs_service.getHeadInfos()
	    	let sheet0 = spreadJs_service.getSheet0() 
// Get sheet selection for selection check. 		
// adding noFIlter for toggle error. 		
		let selections = sheet0.getSelections() 
		if( selections.length == 0 )return noFilter 

		let groupBy = selections.reduce( ( rv, x ) =>{
			( rv[x['col']] = rv[x['col']] || [] ).push(x) ;
			return rv
		}, {})
		console.log( groupBy ) 

		let filter_data = null
//		let filter_data = spreadjsFilter_factory.filter_data 
		let col_key = Object.keys( groupBy ) 
		let concat_filter = col_key.map(( sel_item )=>{
			let sub_filter_data = [] 
			groupBy[ sel_item ].forEach( ( sub_item ) =>{
				let filter_rows 
				if( sub_item.col == -1 ){
					let id_index_obj = spreadJs_service.getId_index_obj()
					filter_rows = spread_data.filter((ent)=>ent[id_index_obj.key] == sheet0.getValue( sub_item.row , id_index_obj.index ) )
				}else{	
					let col_title = sheet0.getValue( 0, sub_item.col , spreadjs_product.SheetArea.colHeader ) 
			        let col_name = headInfos.find((ent)=>ent.displayName == col_title ).name  
			        let key  = sheet0.getValue( sub_item.row , sub_item.col )
					filter_rows = spread_data.filter((ent)=>ent[col_name] == key ) 
				}	
				    sub_filter_data = sub_filter_data.concat( filter_rows )
			})	
			return sub_filter_data
		})
		console.log( concat_filter ) 
		let i 
		if( concat_filter.length > 0 ){
			filter_data = concat_filter[0]
			for( i = 1 ; i < concat_filter.length  ; i++ ){
				filter_data = filter_data.filter( obj => concat_filter[i].includes( obj )) 
			}
		}else if( concat_filter.length == 0 )return noFilter = 0 
		
/*		
		if( filter_colName == null )return noFilter
	    let headInfos = spreadJs_service.getHeadInfos() 
		mainButtons_service.set_autofilter_mode(1) 
		var filter_data = spread_data.filter((ent)=>ent[filter_colName] == filter_key)
*/
//		spreadJs_service.filterSpreadjs( filter_data )
		spreadjsFilter_factory.filter_data = filter_data 
		sheet0.reset()
		sheet0.setDataSource( filter_data ) 
		sheet0.bindColumns( headInfos ) 
		this.doColFilter( AppEdit )
//Fri May 27 04:39:42 UTC 2022
		return noFilter = 1 
	}
	this.clearFilter = ( AppEdit = 0)=>{
	    let spread_data = spreadJs_service.getDbData() 
	    let headInfos = spreadJs_service.getHeadInfos() 
	    let sheet0 = spreadJs_service.getSheet0() 
		mainButtons_service.set_autofilter_mode(0) 
		filter_colName = null 
//		spreadJs_service.unfilterSpreadjs() 
		spreadjsFilter_factory.filter_data = null  
		sheet0.reset()
//        sheet0.setRowCount(2,$.wijmo.wijspread.SheetArea.colHeader);
		sheet0.setDataSource( spread_data ) 
		sheet0.bindColumns( headInfos ) 
		spreadJs_service.rowFilter() 
		this.doColFilter( AppEdit )
	}
	this.doColFilter = ( setAutoFilter , AppEdit = 0 )=>{
	    let filter_rows =	spreadjsFilter_factory.filter_data
		let appConfiguration = spreadJs_service.getAppConfiguration()
	    let headInfos = spreadJs_service.getHeadInfos() 
	    let sheet0 = spreadJs_service.getSheet0() 
		let DbData = spreadJs_service.getDbData() 
		if( !headInfos ) return  
		var colInfo = null 
// Thu Mar 17 11:13:22 KST 2022
// no need col Filter if no mainButtons 		
		try{
			if( appConfiguration.component.mainButtons.enable ){ 		
				if( mainButtons_service.get_fullCol_mode()  ){
					colInfo = headInfos.filter((ent)=>ent.view_mode_1 == 1 ) 
					if( colInfo.length == 0 )colInfo = null 
				}
			}
			if( AppEdit ){
				colInfo = headInfos.filter((ent)=>ent.subType == 1 ) 
				if( colInfo.length == 0 )colInfo = null 
			}

		}catch(err){
			console.log(err) 
		}
// Fri Feb 25 10:30:55 KST 2022 check built-in filter. 
		let rowFilter = sheet0.rowFilter() 
		if( rowFilter == null || rowFilter == undefined ){
			spreadJs_service.rowFilter() 
			rowFilter = sheet0.rowFilter() 
		}
//		let filter_rows = null 
		if( rowFilter.isFiltered() ){ 
			 filter_rows = DbData.filter((ent, index )=>{
				return rowFilter.filterInRows.includes( index ) 
			})
			rowFilter.reset() 
//			sheet0.reset() 
			spreadjsFilter_factory.filter_data = filter_rows 
			sheet0.setDataSource( filter_rows ) 
			setAutoFilter() 
//			mainButtons_service.set_autofilter_mode.execPost(1) 
		}
		if( colInfo == null ) sheetFormat_service.updateHead( headInfos , filter_rows ) 
		else sheetFormat_service.updateHead( colInfo , filter_rows  )
// Thu Feb 24 13:33:26 KST 2022
	}
}])
