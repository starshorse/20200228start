angular.module('ezof_log_monitorService',[])
.factory('ezof_log_monitorFactory', ['$injector',function($injector){
	var ezof_log_monitorFactory = {
		spread: null , 
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		cur_db: 'ezchemtech',
		tbl_name:'TB_Log_Collector',
		cur_id: 'richard.choi@ez-office.co.kr',
//functions.		
		update_editLists : null,  		
		update_cur_db: null ,
		updateAlertInfo: null,
// cell pos. 
		tbl_data_pos: 'B7',
		data_update_pos: 'E2',
		update_time_pos: 'E3' 

	}	
	return ezof_log_monitorFactory 
}])
.service('ezof_log_monitorService', ['$injector',function($injector){
	var ezof_log_monitorFactory = $injector.get('ezof_log_monitorFactory') 
	var $http = $injector.get('$http') 
	this.updateTblData = async ( spread , db_name )=>{
	      sheet0 = spread.getSheet(0); 	
	      let  tbl_name = ezof_log_monitorFactory.tbl_name ;
	      let  tbl_view = ezof_log_monitorFactory.tblView_tbl.tbl_view ;
	      let  hades_data = await $http.get(`/log_monitor/${ db_name }`)
	      ezof_log_monitorFactory.tblView_tbl.tbl_data_1 = hades_data.data.DATA.sort((a,b)=>b.seq-a.seq) 	
	      let  tbl_info = ezof_log_monitorFactory.tblView_tbl ; 	
	      if( sheet0.getValue( 1, 2 ))tbl_info.tbl_data_1 = tbl_info.tbl_data_1.filter(( ent )=>ent.hostname == 'Jupitor' ) 	
	      let last7days = (new Date()).setDate((new Date()).getDate() - 7 )	
	      let last7days_count = tbl_info.tbl_data_1.filter((ent)=>{ return ( (new Date(ent.RegDate)).getTime() > last7days )}).length ; 	
	       console.log( last7days_count )	
	      let cell_D3  = sheet0.getRange('D3')
	      sheet0.getCell( cell_D3.row, cell_D3.col ).value(last7days_count); 	

	      tbl_view.bind( null, 'tbl_data_1', tbl_info ) 	
	      ezof_log_monitorFactory.update_cur_db( db_name ); 
	      let update_time_cell = sheet0.getRange( ezof_log_monitorFactory.update_time_pos );
	      sheet0.getCell( update_time_cell.row , update_time_cell.col ).text(`Last update time: ${ (new Date()).toString() }` )
		
	}
	this.initTblView = async ( spread )=>{
	      ezof_log_monitorFactory.spread = spread ; 
	      let sheet0 = spread.getSheet(0); 
	      sheet0.name('TblView')
	      sheet0.setColumnCount(30)
	      sheet0.setRowCount( 40000 ) 	
	      let defaultStyle = new GC.Spread.Sheets.Style() 
	      sheet0.setDefaultStyle( defaultStyle ) 
	      sheet0.frozenRowCount(7) 
	      sheet0.setColumnWidth( 2, 800 )	
	      sheet0.setColumnWidth( 4, 500 )	
	      sheet0.setColumnWidth( 8, 300 )	

	      let cell_jupiterCheck = new GC.Spread.Sheets.CellTypes.CheckBox() 
	      cell_jupiterCheck.caption("Jupitor 만보기")	
	      sheet0.getCell(1,2).cellType( cell_jupiterCheck ) 	
	      sheet0.getCell(2,2).text("최근 1주일 Log 횟수:")		

	      let cell_update_pos = sheet0.getRange('E2')
	      let buttonCommandfunction = new GC.Spread.Sheets.Style() ;
	      buttonCommandfunction.cellButtons =
	      [
		      {
			  caption: "Update",
			  buttonBackColor: "#00C2D6",    
			  command:( sheet, row , col, option )=>
			  {
				this.updateTblData( spread, ezof_log_monitorFactory.cur_db ); 
			  } 	  

		       } 	      
	       ];
	       sheet0.setStyle( cell_update_pos.row, cell_update_pos.col , buttonCommandfunction ); 	 	

	      let cell_tblData = sheet0.getRange('B7') 	
	      sheet0.suspendPaint();
	      let table1 = ezof_log_monitorFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableView', cell_tblData.row , cell_tblData.col, 120, 20 );
	      ezof_log_monitorFactory.tblView_tbl.tbl_pos = cell_tblData 
	      table1.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	      await this.updateTblData( spread , ezof_log_monitorFactory.cur_db ) 	
	      setInterval( this.updateTblData , 60*60*1000, spread, ezof_log_monitorFactory.cur_db ) 	
	      ezof_log_monitorFactory.updateAlertInfo({ class:'success', message:'setInterval Started'});
	      sheet0.resumePaint() 

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
