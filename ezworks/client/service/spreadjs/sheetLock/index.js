angular.module('sheetLock', [])
.factory('sheetLock_factory',['$injector', function($injector){
	var spreadJs_factory = $injector.get('spreadJs_factory') 
	var sheetLock_factory = {
		selection_cells: null,
		get_colIndex_lockException : ()=>spreadJs_factory.colIndex_lockException_bk  
	}
	return sheetLock_factory 
}])
.service('sheetLock_service', ['$injector','spreadJs_service','sheetLock_factory', function( $injector, spreadJs_service, sheetLock_factory  ){
		var spreadjs_product = null
		if( $injector.has('wijmoSpreadjs_factory')){
			spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
			spreadjs_product['cur_product'] = 'wijmo'
		}else if($injector.has('gcSpreadjs_factory')){
			spreadjs_product = $injector.get('gcSpreadjs_factory') 
			spreadjs_product['cur_product'] =  'gc' 
		}
        var selections = null 
	    var cells_s = null 
		this.lockColumns = ( sheet , headInfos_ )=>{
		    console.log('*[sheetLock_service] lockColumns _start_') 
			let collection_configuration = spreadJs_service.getCollection_configuration() 
			try{
				if( collection_configuration.component.spreadJs.disable_lockColumns)return 
			}catch(err){
				console.log(err) 
			}
			//Thu Mar 17 10:00:08 KST 2022
			 let i 
			if( spreadjs_product['cur_product'] == 'gc' ){
				sheet.options.isProtected = false   
				 for( i = 0 ; i< headInfos_.length ; i++ ){
						if( !headInfos_[i].locked ){
		//					sheet.getColumn(i).locked(false) 
	    //					sheet.getColumn(i).backColor("#FFFFCC") 
							spreadjs_product.getColumn0(i).backColor('#FFFFCC') 
						}else{
	    //					sheet.getColumn(i).backColor('#f0eeeb') 
							spreadjs_product.getColumn0(i).backColor('#f0eeeb') 
						}
	    //			sheet.getColumn(i).borderBottom("blue")
					spreadjs_product.boardBottom( spreadjs_product.getColumn0(i) , 'blue' ) 
				}
				sheet.options.isProtected = true 
			}else{
				sheet.isProtected = false   
				 for( i = 0 ; i< headInfos_.length ; i++ ){
						if( !headInfos_[i].locked ){
		//					sheet.getColumn(i).locked(false) 
							sheet.getColumn(i).backColor("#FFFFCC") 
						}else{
							sheet.getColumn(i).backColor('#f0eeeb') 
						}
					sheet.getColumn(i).borderBottom("blue")
				}
				sheet.isProtected = true 
			}	
		}
	    this.unlockSelection = ( sheet , headInfos_ )=>{

			   if( spreadjs_product['cur_product'] == 'gc' )sheet.options.isProtected = false 
			   else sheet.isProtected = false   

			   selections= sheet.getSelections() 
			   cells_s = []
			   console.log('start: time') 
			   let startTime = performance.now() 
			   let  col_start = selections[0].col , col_end = selections[0].col + selections[0].colCount - 1 
			   let  row_start = selections[0].row , row_end = selections[0].row + selections[0].rowCount - 1 
			   let  col_count = selections[0].colCount , row_count = selections[0].rowCount 
			 
			 
			  if( spreadjs_product['cur_product'] == 'gc' ) sheetLock_factory.selection_cells  = sheet.getRange( row_start , col_start  , row_count , col_count )
			  else sheetLock_factory.selection_cells  = sheet.getCells( row_start , col_start  , row_end , col_end )

		      sheetLock_factory.selection_cells.locked( false ) 
		      sheetLock_factory.selection_cells.backColor("#FFFFFF") 
			  let i 
			  for( i = col_start  ; i< col_end ; i++ ){
					if( headInfos_[i].locked ){
						let locked_cells 
						if( spreadjs_product['cur_product'] == 'gc') locked_cells = sheet.getRange( row_start ,  i , (  row_end - row_start ) , -1  ) 
						else locked_cells = sheet.getCells( row_start ,  i , row_end , i  ) 

						locked_cells.locked( true ) 
						locked_cells.backColor('#f0eeeb') 
					}
				if( spreadjs_product['cur_product'] == 'gc') spreadjs_product.borderBottom( spreadjs_product.getColumn0(i) , 'blue' ) 
				else sheet.getColumn(i).borderBottom("blue")
			}
		      
//	}
			   let endTime = performance.now()
			   if( spreadjs_product['cur_product'] == 'gc' )sheet.options.isProtected = true 
			   else sheet.isProtected = true   

			   console.log(` unlock time performance ${ endTime - startTime } milliseconds` ) 
		}
	    this.lockSelection = ( sheet , headInfos_ )=>{
//  if( cells_s.length == 0 ) return 
			  if( sheetLock_factory.selection_cells == null ){ console.log( '*[sheetLock_service] lockSelection  sheetLock_factory.selection_cells null '); return }  

			  if( spreadjs_product['cur_product'] == 'gc' )sheet.options.isProtected = false 
			  else sheet.isProtected = false   

		      sheetLock_factory.selection_cells.locked( true ) 
		      sheetLock_factory.selection_cells.backColor("#FFFFCC") 
			  let col_start = sheetLock_factory.selection_cells.col , col_end = sheetLock_factory.selection_cells.col2 
			  let row_start = sheetLock_factory.selection_cells.row , row_end = sheetLock_factory.selection_cells.row2
			  let colIndex_lockException = sheetLock_factory.get_colIndex_lockException() 
			  let i 
			  for( i = col_start ; i< col_end ; i++ ){
					if( headInfos_[i].locked ){
						let locked_cells 
						if( spreadjs_product['cur_product'] == 'gc') locked_cells = sheet.getRange( row_start ,  i ,  ( row_end - row_start ) , -1  ) 
						else locked_cells = sheet.getCells( row_start ,  i , row_end , i  ) 
						locked_cells.backColor('#f0eeeb') 
					}
				    if( colIndex_lockException.includes( i + 1 )){
						let Exception_cells 
					    if( spreadjs_product['cur_product'] == 'gc') sheet.getRange( row_start , i+1 ,  ( row_end - row_start ) , -1 ) 
						else sheet.getCells( row_start , i+1 , row_end , i+1 ) 

						Exception_cells.locked( false ) 
						Exception_cells.backColor("#FFFFFF") 
					}
				if( spreadjs_product['cur_product'] == 'gc') spreadjs_product.borderBottom( spreadjs_product.getColumn0(i) , 'blue' ) 
				else sheet.getColumn(i).borderBottom("blue")
     	   	}
			   if( spreadjs_product['cur_product'] == 'gc' )sheet.options.isProtected = true 
			   else sheet.isProtected = true   
			   cells_s = [] 
		}
}]) 
