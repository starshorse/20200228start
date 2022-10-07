angular.module('ezch_task_app',[
	'spreadjs',
	'ezch_tbl_editor_app'
])
.controller('ezch_task_appCtrl',['$scope',function( $scope ){
}])

angular.module('spreadjs',[])
.controller('spreadjsCtrl',[
'$scope', 
'spreadjs_service',	
async function(
		$scope,
		spreadjs_service
	){
		var spread = new GC.Spread.Sheets.Workbook( document.getElementById('ss'), { sheetCount: 3 }) 
	    await spreadjs_service.initSpread( spread ) 
		let sheet0 = spread.getSheet(0) 	
		spread.bind( GC.Spread.Sheets.Events.ButtonClicked, ( sender, args )=>{
			spreadjs_service.spread_buttonClicked( sender , args ) 
		})
	    sheet0.bind( GC.Spread.Sheets.Events.SelectionChanged, ( sender, args )=>{
			spreadjs_service.sheet0_SelectionChanged( sender , args ) 
		}) 
	    
}])
.factory('spreadjs_factory', [function(){
	var spreadjs_factory ={
		spread: null,
		getSpread : ()=>spreadjs_factory.spread ,
		DbData : null ,
		HeadInfo : null,
		lastSelection: null,
		currentSelection: [],
		lock_style : [], 
		unlock_style : null 
	}
	return spreadjs_factory
}])
.service('spreadjs_service',[
'spreadjs_factory',
'$http',	
'ezch_tbl_editor_appService',	
	function( 
		spreadjs_factory ,
		$http,
		ezch_tbl_editor_appService
	){ 
		this.sheet0_SelectionChanged = ( sender , args )=>{
			let spread = spreadjs_factory.spread 
			let sheet0 = spread.getSheet(0)
			spreadjs_factory.lastSelection =  args.oldSelections 
    	}
		this.spread_buttonClicked = ( sender, args)=>{
			let spread = spreadjs_factory.spread 
			let sheet0 = spread.getSheet(0)
			let cell_lock = sheet0.getRange('D2:D2')
			let sheet_name = args.sheet.name() 
			switch( sheet_name ){
				case 'Sheet1':
					 if( args.row == cell_lock.row ){
						 console.log( spreadjs_factory.lastSelection ) 
//						 sheet0.removeNamedStyle('LockStyle') 
//			             sheet0.addNamedStyle( spreadjs_factory.lock_style )
						 spread.options.isProtected = false 
						 for( selection of spreadjs_factory.currentSelection ){
							 sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).locked( true ) 
//							 let range = sheet0.getRange( selection.row , selection.col, selection.rowCount, selection.colCount )
							 sheet0.clear( selection.row, selection.col, selection.rowCount, selection.colCount , GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style )
						 }
						 for( selection of spreadjs_factory.lastSelection ){
							 sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).styleName('UNLockStyle').locked( false ) 
						 }
						 spreadjs_factory.currentSelection = spreadjs_factory.lastSelection 
						 spread.options.isProtected = true 
					 }
					break;
				case 'Sheet2':
//					if( args.row == cell_add.row )ezch_tbl_editor_appFactory.update_schema_table( spread ) // only add update. 
					break;
			   default:	
			}
		}
		this.initSpread = async ( spread )=>{
			spreadjs_factory.spread = spread 
			let sheet0 = spread.getSheet(0) 
			let sheet1 = spread.getSheet(1) 
/*			
			let response = await $http.get('/Hermes/ezchemtech/TableEditor/Data/정기업무기본정보') 
            spreadjs_factory.DbData = response.data.tbl_data 
			sheet0.setDataSource( spreadjs_factory.DbData ) 
*/
			sheet0.tables.add('TableData', 8,1,150,4) 
			sheet1.tables.add('TableSchema', 4,2,150,10) 
			let tbl_name ='정기업무기본정보'
			sheet0.addColumns( 2, 10) 

            sheet0.frozenRowCount(9)  
			let cell_buttons = sheet0.getRange('B2:B2') 
			sheet0.addSpan( cell_buttons.row, cell_buttons.col , 1, 2) 
			let cellType_button1 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button1.text('대량삽입') 
		    sheet0.getCell( cell_buttons.row, cell_buttons.col ).backColor('#EEEEEE').cellType( cellType_button1 ) 

			sheet0.addSpan( cell_buttons.row, cell_buttons.col+2 , 1, 2) 
			let cellType_button2 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button2.text('잠금해제') 
		    sheet0.getCell( cell_buttons.row, cell_buttons.col +2 ).backColor('#EEEEEE').cellType( cellType_button2 ) 

			sheet0.addSpan( cell_buttons.row, cell_buttons.col+4 , 1, 2) 
			let cellType_button3 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button3.text('업데이트') 
		    sheet0.getCell( cell_buttons.row, cell_buttons.col +4 ).backColor('#EEEEEE').cellType( cellType_button3 ) 

			sheet0.setRowHeight( cell_buttons.row, 30 )


			let cell_mass = sheet0.getRange('B3:B3')
			sheet0.getRange( cell_mass.row , cell_mass.col , 1 , 100 ).borderTop( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium ))
			sheet0.getRange( cell_mass.row , cell_mass.col , 5 , 1 ).borderLeft( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium ))
			sheet0.getRange( cell_mass.row + 4 , cell_mass.col , 1 , 100 ).borderBottom( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium ))

			spreadjs_factory.lock_style = new GC.Spread.Sheets.Style() 
			spreadjs_factory.unlock_style = new GC.Spread.Sheets.Style() 
			spreadjs_factory.lock_style.name = 'LockStyle' 
			spreadjs_factory.unlock_style.name = 'UNLockStyle' 
			spreadjs_factory.lock_style.backColor = '#EEEEEE'
			spreadjs_factory.unlock_style.backColor = 'LemonChiffon'
			sheet0.addNamedStyle( spreadjs_factory.lock_style )
			sheet0.addNamedStyle( spreadjs_factory.unlock_style )


			await ezch_tbl_editor_appService.update_schema_table( spread , tbl_name ) 
			await ezch_tbl_editor_appService.update_data_table( spread , tbl_name ) 
			
			sheet0.options.isProtected = false 
			sheet0.getRange('B3:AD9').locked( false )
			sheet0.options.isProtected = true 
			sheet0.options.protectionOptions.allowFilter = true  

		}
	}
])
.directive('mySpreadjs', function(){
   return {
	   restrict: 'E',
	   template:`<div id='ss' style='width:100%; height:700px; border:1px solid gray;'></div>` ,
	   controller:'spreadjsCtrl'
   }
})


