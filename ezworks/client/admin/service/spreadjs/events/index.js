angular.module('spreadjs_events', [])
.factory('spreadjsEvents_factory',function(){
	var spreadjsEvents_factory ={
		  err_message: {} ,
		  message_ft: null, 
		  bind_errMessage_ft : ( message_ft_ )=>{
			   spreadjsEvents_factory.message_ft = message_ft_
		  },
                  sell_cell : { 'col_sel': null , 'row_sel': null } 
	}
	return spreadjsEvents_factory
})
.service('spreadjsEvents_service',['$injector','spreadJs_service',
'spreadjsFilter_service',
'sheetFormat_service',
'addSheets_service',
'spreadJs_factory',
	function( $injector, spreadJs_service,
spreadjsFilter_service, 
sheetFormat_service , 
addSheets_service,
spreadJs_factory,
){
	var $filter = $injector.get('$filter')   
	var spreadjsEvents_factory = $injector.get('spreadjsEvents_factory') 
	var spreadjs_product = null
	if( $injector.has('wijmoSpreadjs_factory')) spreadjs_product = $injector.get('wijmoSpreadjs_factory') 
	else if( $injector.has('gcSpreadjs_factory')) spreadjs_product = $injector.get('gcSpreadjs_factory') 
	
	var post_cellClick_f_list = [] 
	this.addPost_cellClick_f_list = ( ft_name )=>{ 
		post_cellClick_f_list.push( ft_name ) 
	 }
	this.getSel_cell = ()=> spreadjsEvents_factory.sell_cell 
	this.register_sheet0_bind_cellClick = () => {
	let sheet0 = spreadJs_service.getSheet0() 
	sheet0.unbind( spreadjs_product.Events.CellClick )
	sheet0.bind( spreadjs_product.Events.CellClick, ( sender, args )=>{
		                spreadjsEvents_factory.sell_cell.col_sel = args.col
		                spreadjsEvents_factory.sell_cell.row_sel = args.row
				post_cellClick_f_list.forEach((ent)=>ent( )) 
		})
	}
	this.register_sheet1_bind_cellClick = () => {
		let sheet1 = spreadJs_service.getSheet1() 
	        sheet1.unbind( spreadjs_product.Events.CellClick )
	        sheet1.bind( spreadjs_product.Events.CellClick, ( sender, args )=>{
		                spreadjsEvents_factory.sell_cell.col_sel = args.col
		                spreadjsEvents_factory.sell_cell.row_sel = args.row
				post_cellClick_f_list.forEach((ent)=>ent( )) 
// Mon Jun 20 10:12:52 KST 2022 
		})
	}
	this.register_sheet0_bind_cellDoubleclick = ( postEvent_ft  ) => {
		  	let sheet0 = spreadJs_service.getSheet0() 
			let spread_data = spreadJs_service.getDbData() 
		    sheet0.unbind( spreadjs_product.Events.CellDoubleClick )
		    sheet0.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
				postEvent_ft( dataMode ) 
    	})
	}	
	this.register_sheet1_bind_cellDoubleclick = ( postEvent_ft_ )=>{
   	let sheet1 = spreadJs_service.getSheet1() 
	    var postEvent_ft = postEvent_ft_
	    sheet1.unbind( spreadjs_product.Events.CellDoubleClick )
	    sheet1.bind( spreadjs_product.Events.CellDoubleClick, ( sender, args )=>{
    		postEvent_ft_( dataMode ) 
         	})

	}
	this.register_sheet0_bind_topRowChanged = ()=>{
   	let sheet0 = spreadJs_service.getSheet0() 
         sheet0.unbind( spreadjs_product.Events.TopRowChanged)
         sheet0.bind( spreadjs_product.Events.TopRowChanged, ( sender, args )=>{
				console.log( args.newTopRow )  
	})
	}
	this.register_spread_bind_activeSheetChanging = ()=>{
	let spread = spreadJs_service.getSpread() 
	spread.unbind(spreadjs_product.Events.ActiveSheetChanging )
	spread.bind(spreadjs_product.Events.ActiveSheetChanging, ( sender, args )=>{
		spreadJs_service.setHeadInfos()  // null. 
		console.log( args.newSheet._name ) 
		if( args.newSheet._name == 'FormatSheet' )addSheets_service.updateSheetFormat() 
	})
	}
}])







