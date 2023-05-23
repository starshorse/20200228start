angular.module('addSheets',[])
.service('addSheets_service',['$injector','sheetFormat_service',function( $injector, sheetFormat_service ){
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')) spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
	var defaultSheetIndex = 2 
	var addOPts = {}
    var addSheets = [] 	
    this.initSheets =( name, jsonData )=>{
	    let spread = sheetFormat_service.getSpread() 
//      let addSheet = wijmoSpreadjs_factory.addSheet( name ) 		
        spread.addSheet(  defaultSheetIndex , spreadjs_product.addSheet( name ) ) 
//        spread.addSheet(  defaultSheetIndex , new  $.wijmo.wijspread.Sheet( name ) ) 
	    var sheet_ = spread.getSheet( defaultSheetIndex ) 
//	    addOPts['app_name'] = app_name 
//	    addOPts[name] = jsonData 
		let reHead = sheetFormat_service.retractHead( jsonData[0] ) 
	    addSheets.push(  {'index':defaultSheetIndex , 'col_name': name , 'data': jsonData } ) 
	    sheet_.setDataSource( jsonData )
		sheet_.bindColumns( reHead ) 

	    defaultSheetIndex++ 
   }
   this.getAddOpts = ()=>{
	   return addOPts 
   }
   this.getSheets_info =()=>{
	   return addSheets
   }
   this.removeAddedSheets = ()=>{
// Mon Feb 28 11:32:40 KST 2022
	    let spread = sheetFormat_service.getSpread() 
	   	while( addSheets.length > 0 ){
	    	spread.removeSheet( addSheets.pop().index )    
		}
	   defaultSheetIndex = 2
   }
   this.updateSheetFormat = ()=>{
	   let headInfos = sheetFormat_service.getHeadInfos_sheet0() 
	   addSheets.forEach((ent)=>{
			let ent0 = headInfos.find((ent1)=>ent1.name == ent.col_name )
	        if( ent0 != -1 && ent0 != undefined ) ent0.json = JSON.stringify( ent.data ) 
	   })
       sheetFormat_service.loadHead() 
   }
}])
