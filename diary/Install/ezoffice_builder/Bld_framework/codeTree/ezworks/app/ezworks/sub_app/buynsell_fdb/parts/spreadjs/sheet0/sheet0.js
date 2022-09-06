angular.module('mySheet0',['mySheet0Service.price_calc',
'mySheet0Service.co_updateStatus',
])
.service('mySheet0Service',function($timeout, mySheet0ServicePriceCalc, mySheet0ServiceCoUpdateStatus ){
	const myId = 0  
	const socket = io()
	this.spread 
	this.spread_data 
	this.sheet0
	var defaultRowStyle = [] 

	socket.on('getSheet0Data',(res)=>{
           getSheetData_cbf( res ) 
	})
	this.getDefaultRowStyle = ()=>{
		for( var i = 0; i< this.sheet0.getColumnCount() ; i++ ){
			var ctyle = this.sheet0.getStyle( 1, i, GC.Spread.Sheets.SheetArea.viewport, true ) 
			defaultRowStyle.push( JSON.parse( JSON.stringify( ctyle )))
		}
	}
	this.setDefaultRowStyle = ( row )=>{
//		for( var i =0 ; i< defaultRowStyle.length ; i++ ){
//			this.sheet0.setStyle( row, i , defaultRowStyle[i], GC.Spread.Sheets.SheetArea.viewport ) 
//		}
		var row = this.sheet0.getRange(row,0,1,-1, GC.Spread.Sheets.SheetArea.viewport )
		row.backColor("Red") 

	}
	this.applySheetStyle = ()=>{
	    spreadjs_setdefaultstyle( this.sheet0, "#cccccc", GC.Spread.Sheets.LineStyle.thin ) 
        spreadjs_unlockCols( this.sheet0,this.spread_data.columns ) 
		spreadjs_filterall( this.sheet0,this.spread_data.columns.length ) 
        spreadjs_frozenColumnCount( this.sheet0,this.spread_data.WorkingLine.FreezeCol )
		this.getDefaultRowStyle() 

	}
	const getSheetData_cbf = ( coll_data )=>{
		 this.spread_data.data = coll_data.data.sort( ( a, b)=>{
			   return ( a.No - b.No )
		 })
//		this.sheet0.suspendPaint()
		for( item of this.spread_data.data ){
			mySheet0ServicePriceCalc.calcProuctPrice( item ) 
		    mySheet0ServiceCoUpdateStatus.co_updateStatus( item ) 
		}	
//		this.sheet0.resumePaint()
		 socket.emit('updateSumTbl', { sheetId : 0 } ) 
		 this.spread_data.columns = coll_data.columns 
		 spreadjs_resetData( this.sheet0, this.spread_data.columns, this.spread_data.data ) 
		 this.applySheetStyle()
		 $('#item1').click() 
	}
	this.initSheet0 = ( spread , spread_data )=>{
		this.spread = spread 
		this.spread_data = spread_data[myId]
		this.sheet0 = spread.getSheet(myId)
		this.sheet0.name( spread_data[myId].sheet_name ) 
		spreadjs_optionSheet_op1( this.sheet0) 
		socket.emit('getSheet0Data', {}) 
	}
	this.updateData = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != myId ) return 
/*		
		$timeout( ()=>{
			const No = this.sheet0.getValue( args.row, 0 ) 
			const ent0 = this.spread_data.data.find((ent)=> ent.No == No )
            socket.emit('updateSheet0Entry', ent0 )
		}, 1000 ) 
*/
		this.sheet0.suspendPaint()
		const No = this.sheet0.getValue( args.row, 0 ) 
		const ent0 = this.spread_data.data.find((ent)=> ent.No == No )
        mySheet0ServicePriceCalc.calcProuctPrice( ent0 ) 
	    mySheet0ServiceCoUpdateStatus.co_updateStatus( ent0  ) 
        socket.emit('updateSheet0Entry', ent0 )
	    socket.emit('updateSumTbl', { sheetId : 0 } ) 
		this.sheet0.resumePaint() 

	}
	this.addData = ( row_id, activeSheetIndex  )=>{
		if( activeSheetIndex != myId ) return 
		$timeout( ()=>{
			const ent0 = this.spread_data.data.find((ent)=> ent.No == row_id )
            socket.emit('addSheet0Entry', ent0 )
		}, 1000 ) 
	}
	this.delData = ( activeSheetIndex ) =>{
		if( activeSheetIndex != myId ) return 
		this.spread.isPaintSuspended( true )
		var delNo = this.sheet0.getValue( this.spread_data.working_row , 0 ) 
		socket.emit('delSheet0Entry', delNo ) 
		this.spread.isPaintSuspended( false ) 
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Non Server Socket Module Service. 
// Button Events 		
////////////////////////////////////////////////////////////////////////////////////////////////////		
	this.filterData = ( activeSheetIndex )=>{
		if( activeSheetIndex != myId ) return 
		var delNo = this.sheet0.getValue( this.spread_data.working_row , 0 ) 
		const ent0 = this.spread_data.data.find((ent)=> ent.No == delNo ) 
		const filterData = this.spread_data.data.filter(( ent)=> ent['거래처'] == ent0['거래처'] )
	    spreadjs_resetData( this.sheet0, this.spread_data.columns, filterData ) 
        this.applySheetStyle() 
	}
	this.rel_filter = ( activeSheetIndex )=>{
		 spreadjs_resetData( this.sheet0, this.spread_data.columns, this.spread_data.data ) 
		 this.applySheetStyle()
	}
	this.freeze_cols = ( activeSheetIndex )=>{
		if( activeSheetIndex != myId ) return 
		spreadjs_frozenColumnCount( this.sheet0, this.spread_data.working_col + 1  )
		this.spread_data.WorkingLine.FreezeCol = this.spread_data.working_col + 1 
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Non Server Socket Module Service. 
// Data Calculation. 		
////////////////////////////////////////////////////////////////////////////////////////////////////		
	this.edit_ended = ( activeSheetIndex )=>{
		if( activeSheetIndex != myId ) return 
	}
})
.controller('mySheet0Ctrl',['$scope',
'mySheet0Service',	
'myhighLightRowService', 
'mySheet0ServiceCoAuxTaxYN', 
function( $scope, mySheet0Service,  myhighLightRowService, mySheet0ServiceCoAuxTaxYN  ){
	var working_row = 0 
	const socket = io()
	$scope.event_click.sheet0 = ( args, activeSheetIndex )=>{
		if( activeSheetIndex != 0 )return 
			myhighLightRowService.unhighLightRow( $scope.spread, working_row, mySheet0Service.spread_data.columns) 
		  
			mySheet0ServiceCoAuxTaxYN.co_auxTaxYN_cellClick_parsing( mySheet0Service.sheet0 ,mySheet0Service.spread_data.columns , args ) 

//		    mySheet0Service.setDefaultRowStyle( working_row ) 
			working_row = args.row 
//			const sheet0 = $scope.spread.getSheet(0) 
			const No = mySheet0Service.sheet0.getValue( args.row, 0 ) 
			const ent0 = mySheet0Service.spread_data.data.find((ent)=> ent.No == No )
		    if( !ezJSON_Data_EmptyCheck( ent0['거래처']) ){ 
			   const ent1 = $scope.sheet2.getEntry( ent0['거래처'] ) 
			   if( !ezJSON_Data_EmptyCheck( ent1 )) $scope.conInfo_update( ent1 )
			}	
			myhighLightRowService.highLightRow( $scope.spread, working_row, mySheet0Service.spread_data.columns) 
		    mySheet0Service.spread_data.working_row = working_row 
		    mySheet0Service.spread_data.working_col = args.col 
	}
	socket.on('updateSheet0Entry', (res)=>{
		if( socket.id != res.socketId ){
			var ent0 = mySheet0Service.spread_data.data.find(( ent)=> ent.id == res.ent.id ) 
			$scope.spread.isPaintSuspended( true ) 
			mySheet0Service.sheet0.suspendPaint()
			Object.assign( ent0 , res.ent ) 
			$scope.spread.isPaintSuspended( false )
			mySheet0Service.sheet0.resumePaint() 
		}
	})
}])
.directive('mySheet0', function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell_fdb/parts/spreadjs/sheet0/sheet0.html',
		controller:'mySheet0Ctrl'
	}
})
