/*
This module service for Table base... 
*/
angular.module('spread_js',[])
.factory('spreadJs_factory',[function( ){
 var spreadJs_var =  {
//////////////////////////////////////////////////////////////////////////////////////////
// This app..   
//////////////////////////////////////////////////////////////////////////////////////////
	Spread : null ,
	sheet0 : null ,
	sheet1 : null , 
	sheet2 : null , 
	sheet3 : null , 
	sheet4 : null , 
	tbl_name: null , 
	DbData: null ,
	schema_1_data: null ,  // ezch_tbl_maker_app 
	schema_1_table : null , 
	schema_1_columns: null , 
	user_col4_sql: null , 
	view_1_table: null, 
	 
//////////////////////////////////////////////////////////////////////////////////////////
// spreadJs  service external functions  
//////////////////////////////////////////////////////////////////////////////////////////
	 getSpread : null ,
	 getHeadInfos : null,
	 getSheet0 : null ,
	 getSheet1 : null , 
	 getUpdateHead : null ,
	 setIndex : null ,
 }
 return spreadJs_var
}])
.service('spreadJs_service',['$injector',
'spreadJs_factory',
function( $injector , 
spreadJs_factory, 
){
///////////////////////////////////////////////////////////////////////////////////////////
//   optional injection. introduced.. 
//////////////////////////////////////////////////////////////////////////////////////////	
	var $http = $injector.get('$http') 
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')){
		spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
		spreadjs_product['cur_product'] = 'wijmo'
	}else if($injector.has('gcSpreadjs_factory')){
		spreadjs_product = $injector.get('gcSpreadjs_factory') 
		spreadjs_product['cur_product'] =  'gc' 
	}
	var ezch_tbl_editor_appService = null  
	if( $injector.has('ezch_tbl_editor_appService')) ezch_tbl_editor_appService	= $injector.get('ezch_tbl_editor_appService') 
///////////////////////////////////////////////////////////////////////////////////////////
// Service configuration parameter.. read from file..  
//////////////////////////////////////////////////////////////////////////////////////////	
	var id_index 
	//1. ezch_tbl_editor_app .. index to 2 
	var id_index_obj = { index: 2 , key :'seq' } 
	this.getSpread = ()=>{ return spreadJs_factory.Spread }
	this.getSheet0 = ()=>{ return spreadJs_factory.sheet0 }
	this.getSheet1 = ()=>{ return spreadJs_factory.sheet1 }
	this.getSheet2 = ()=>{ return spreadJs_factory.sheet2 }
	this.getDbData = ()=>{ return spreadJs_factory.DbData }
	this.getId_index = ()=>{ return id_index } 
	this.getId_index_obj = ()=>{ return id_index_obj } 
	this.getTbl_name = ()=>spreadJs_factory.tbl_name 	
// sheetFormat  external functions. 
	spreadJs_factory.getSperad = this.getSpread 
    	spreadJs_factory.updateHead = this.updateHead
    	spreadJs_factory.getSheet0 = this.getSheet0
    	spreadJs_factory.getSheet1 = this.getSheet1
	this.initSpreadjs = async ( sheetCount_ = 4 )=>{
		if( !spreadJs_factory.spreadCreate_flag ){ 
			spreadjs_product.create_spread( sheetCount_ ) 
			spreadJs_factory.spreadCreate_flag = 1 
		}
		let Spread = spreadJs_factory.Spread =  spreadjs_product.getSpread()  
		Spread.setActiveSheetIndex(2) 
		Spread.isPaintSuspended( true )
	//  suspendPainting. 
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  Spread sheet init.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
		spreadJs_factory.sheet0 =  Spread.getSheet(0);
		spreadJs_factory.sheet1 =  Spread.getSheet(1);
		spreadJs_factory.sheet2 =  Spread.getSheet(2);
	 }
}])
