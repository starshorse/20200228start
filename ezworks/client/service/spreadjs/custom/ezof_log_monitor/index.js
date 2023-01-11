angular.module('ezof_log_monitorService',[])
.factory('ezof_log_monitorFactory', ['$injector',function($injector){
	var ezof_log_monitorFactory = {
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		cur_db: 'ezchemtech',
		tbl_name:'TB_Log_Collector',
		cur_id: 'richard.choi@ez-office.co.kr',
//functions.		
		update_editLists : null 		
	}	
	return ezof_log_monitorFactory 
}])
.service('ezof_log_monitorService', ['$injector',function($injector){
	var ezof_log_monitorFactory = $injector.get('ezof_log_monitorFactory') 
	var $http = $injector.get('$http') 
	this.updateTblData = async ( spread , db_name )=>{
	      let  tbl_name = ezof_log_monitorFactory.tbl_name ;
	      let  tbl_view = ezof_log_monitorFactory.tblView_tbl.tbl_view ;
	      let  hades_data = await $http.get(`/log_monitor/${ db_name }`)
	      ezof_log_monitorFactory.tblView_tbl.tbl_data_1 = hades_data.data.DATA 	
	      let  tbl_info = ezof_log_monitorFactory.tblView_tbl ; 	
	      tbl_view.bind( null, 'tbl_data_1', tbl_info ) 	
		
	}
	this.initTblView = async ( spread )=>{
	      let sheet0 = spread.getSheet(0); 
	      sheet0.name('TblView')
	      sheet0.setColumnCount(30)
	      sheet0.setRowCount( 40000 ) 	
	      let defaultStyle = new GC.Spread.Sheets.Style() 
	      sheet0.suspendPaint();
	      sheet0.setDefaultStyle( defaultStyle ) 
	      sheet0.resumePaint() 
	      sheet0.frozenRowCount(17) 
	      let cell_massCheck = sheet0.getRange('C7') 
	      sheet0.setRowHeight( cell_massCheck.row-1, 40 ) 	
	      sheet0.setRowHeight( cell_massCheck.row, 40 ) 	
	      sheet0.setValue( cell_massCheck.row-1 , cell_massCheck.col -1 , 'sql조건' ) 
	      sheet0.setValue( cell_massCheck.row , cell_massCheck.col -1 , '대량삽입' ) 
	      let cell_c1 = new GC.Spread.Sheets.CellTypes.CheckBox() 
	      sheet0.clear( cell_massCheck, cell_massCheck.col, 1,1, GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style ) 
	      sheet0.setCellType( cell_massCheck.row, cell_massCheck.col, cell_c1 ) 	
	      sheet0.setCellType( cell_massCheck.row-1, cell_massCheck.col, cell_c1 ) 	
		
	      sheet0.setValue( cell_massCheck.row-1 , cell_massCheck.col +3 , '현재테이블' ) 
	      let cell_bt1 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt1.text('실행')
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +1 , cell_bt1 ) 
	      sheet0.setCellType( cell_massCheck.row-1 , cell_massCheck.col +1 , cell_bt1 ) 
	      let cell_bt2 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt2.text('잠금해제')
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +4 , cell_bt2 ) 
	      let cell_bt3 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt3.text('업데이트')
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +5 , cell_bt3 ) 

	      sheet0.addSpan( cell_massCheck.row - 3 , cell_massCheck.col +6 , 4, 4 )			
	      sheet0.addSpan( cell_massCheck.row - 3 , cell_massCheck.col +10 , 4, 4 )			
	 //     ezof_log_monitorFactory.sql_state.pos = sheet0.getRange('I4')	
		

	      let cell_tblData = sheet0.getRange('B17') 	
	      let table1 = ezof_log_monitorFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableView', cell_tblData.row , cell_tblData.col, 120, 20 );
	      ezof_log_monitorFactory.tblView_tbl.tbl_pos = cell_tblData 
	      table1.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	      await this.updateTblData( spread , ezof_log_monitorFactory.cur_db ) 	
	}
}])
.service('ezof_log_monitor_eventsService', ['$injector', function($injector){
	var ezof_log_monitorService = $injector.get('ezof_log_monitorService') 
	this.sheet1_cellDoubleClick = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('N4') 
		let updateConfig = sheet1.getValue( args.row , args.col ) 
		if( args.col == cell_savedConfig.col && args.row > cell_savedConfig.row  ){
			ezof_log_monitorService.updateConfig( spread,  updateConfig )  
		}
	}
	this.sheet1_buttonClicked = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('O2') 
		if( args.col == cell_savedConfig.col ){
			switch( args.row ){
				case cell_savedConfig.row:
					let newConfig = sheet1.getValue( cell_savedConfig.row , cell_savedConfig.col -1 ) 
					ezof_log_monitorService.addConfig( newConfig ) 
					break; 
				default:	
					let delConfig = sheet1.getValue( args.row , args.col -1 ) 
					ezof_log_monitorService.removeConfig( delConfig ) 
			}
		}
	}

}])
