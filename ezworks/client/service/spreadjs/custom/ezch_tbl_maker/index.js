angular.module('ezch_tbl_makerService',[])
.factory('ezch_tbl_makerFactory', ['$injector',function($injector){
	var ezch_tbl_makerFactory = {
		spread: null , 
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : [] } ,
		cur_db: 'ezchemtech',
		tbl_name:'TB_Log_Collector',
		cur_id: 'richard.choi@ez-office.co.kr',
//functions.		
		update_editLists : null,  		
		update_cur_db: null ,
		updateAlertInfo: null,
// cell pos. 
		tbl_data_pos: 'B9',
		data_update_pos: 'E2',
		update_time_pos: 'E3' 

	}	
	return ezch_tbl_makerFactory 
}])
.service('ezch_tbl_makerService', ['$injector',function($injector){
	var ezch_tbl_makerFactory = $injector.get('ezch_tbl_makerFactory') 
	var $http = $injector.get('$http') 
	this.updateTblName = async( spread, db_name )=>{
	      sheet0 = spread.getSheet(0)
	      sheet0.setValue( sheet0.getRange('AO9:AO9').row , sheet0.getRange('AO9:AO9').col, db_name ) 
	}
	this.updateTblData = async ( spread , db_name )=>{
	      sheet0 = spread.getSheet(0); 	
	      let  tbl_name = ezch_tbl_makerFactory.tbl_name ;
	      let  tbl_view = ezch_tbl_makerFactory.tblView_tbl.tbl_view ;
	      let  hades_data = await $http.get(`/log_monitor/${ db_name }`)
	      ezch_tbl_makerFactory.tblView_tbl.tbl_data_1 = hades_data.data.DATA.sort((a,b)=>b.seq-a.seq) 	
	      let  tbl_info = ezch_tbl_makerFactory.tblView_tbl ; 	
	      if( sheet0.getValue( 1, 2 ))tbl_info.tbl_data_1 = tbl_info.tbl_data_1.filter(( ent )=>ent.hostname == 'Jupitor' ) 	
	      let last7days = (new Date()).setDate((new Date()).getDate() - 7 )	
	      let last7days_count = tbl_info.tbl_data_1.filter((ent)=>{ return ( (new Date(ent.RegDate)).getTime() > last7days )}).length ; 	
	       console.log( last7days_count )	
	      let cell_D3  = sheet0.getRange('D3')
	      sheet0.getCell( cell_D3.row, cell_D3.col ).value(last7days_count); 	

	      tbl_view.bind( null, 'tbl_data_1', tbl_info ) 	
	      ezch_tbl_makerFactory.update_cur_db( db_name ); 
	      let update_time_cell = sheet0.getRange( ezch_tbl_makerFactory.update_time_pos );
	      sheet0.getCell( update_time_cell.row , update_time_cell.col ).text(`Last update time: ${ (new Date()).toString() }` )
		
	}
	this.initTblView = async ( spread )=>{
	      ezch_tbl_makerFactory.spread = spread ; 
	      let sheet0 = spread.getSheet(0); 
	      sheet0.name('TblView')
	      sheet0.setColumnCount(100)
	      sheet0.setRowCount( 40000 ) 	
	      let defaultStyle = new GC.Spread.Sheets.Style() 
	      sheet0.setDefaultStyle( defaultStyle ) 
	      sheet0.frozenRowCount(9) 
	      let  data_columns_title = ['no','컬럼명','데이타종류','자릿수1','자릿수2','Null허용', 'Not Null기본값', 'Unique(각각)', 'Unique(중첩)','확인1','확인2', '예비'] 
	      for( var j = 1 ; j< data_columns_title.length +1 ; j++ )		
	      		sheet0.setColumnWidth( j, 100 )	
	
	      sheet0.setRowHeight( 4, 100 )

	      let cell_jupiterCheck = new GC.Spread.Sheets.CellTypes.CheckBox() 
	      cell_jupiterCheck.caption("Jupitor 만보기")	
	      sheet0.getCell(1,2).cellType( cell_jupiterCheck ) 	
	      sheet0.getCell(2,2).text("최근 1주일 Log 횟수:")		

	      let cell_update_pos = sheet0.getRange('E2')
	      let buttonCommandfunction = new GC.Spread.Sheets.Style() ;
	      buttonCommandfunction.cellButtons =
	      [
		      {
			  caption: "Table생성",
			  buttonBackColor: "#00C2D6",    
			  command:( sheet, row , col, option )=>
			  {
				this.updateTblData( spread, ezch_tbl_makerFactory.cur_db ); 
			  } 	  

		       } 	      
	       ];
	       sheet0.setStyle( cell_update_pos.row, cell_update_pos.col , buttonCommandfunction ); 	 	

// SQL View windows. 
	      let sql_viewCell = sheet0.getRange('B5') 		 
	      sheet0.addSpan( sql_viewCell.row , sql_viewCell.col, 1, data_columns_title.length );
	      sheet0.setValue( sheet0.getRange('B7').row , sheet0.getRange('B7').col , '테이블명'); 

	      let cell_tblData = sheet0.getRange( ezch_tbl_makerFactory.tbl_data_pos ) 	
	      sheet0.suspendPaint();
	      let table1 = ezch_tbl_makerFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableView', cell_tblData.row , cell_tblData.col, 60, data_columns_title.length );
	      ezch_tbl_makerFactory.tblView_tbl.tbl_pos = cell_tblData 
	      table1.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	      
	      let tbl_columns = ezch_tbl_makerFactory.tblView_tbl.tbl_columns = data_columns_title.reduce(( acc, cur , index )=>{
		      acc.push( new GC.Spread.Sheets.Tables.TableColumn( index, cur, cur ));
		      return acc
	      },[] )

	      for( var k= 1; k< 61; k++ ){
		      ezch_tbl_makerFactory.tblView_tbl.tbl_data_1.push({ no: k})
	      }
	      table1.autoGenerateColumns( false ) 

	      spread.options.highlightInvalidData = true ;
	      let dv = GC.Spread.Sheets.DataValidation.createListValidator('NVCHAR,NCHAR,DECIMAL,MONEY,INT') 	
	      sheet0.setDataValidator( 9, 3, 60, 1, dv, GC.Spread.Sheets.SheetArea.viewport ); 	
		

	      table1.bind( tbl_columns , 'tbl_data_1' , ezch_tbl_makerFactory.tblView_tbl ); 		

// default Data and formula 
	        let cell_formula
		cell = sheet0.getRange('AO10:AO10', GC.Spread.Sheets.SheetArea.viewport );
		sheet0.setColumnWidth( cell.col, 1200 );
		cell_formula = sheet0.getFormula( cell.row, cell.col )
	//      cell_formula = '="CREATE TABLE "&AO10&".dbo.TB_"&$C$8&" ( seq INT NOT NULL IDENTITY , created_time DATETIME NOT NULL DEFAULT GETDATE(), updated_time TIMESTAMP NOT NULL"&", "'
	//      cell_formula = '="CREATE TABLE "&AO10&".dbo.TB_"&$C$8&" ( seq INT NOT NULL IDENTITY  "&", "'
	/*  
		example : e_approval_request 
		seqItem  int NOT NULL
		drafterName nvarchar(10) NOT NULL 
		requestType nvarchar(20) NOT NULL 
		requestTitle nvarchar(64) NOT NULL 
		requestDesc nvarchar(512) NOT NULL 
		signatoryNameList nvarchar(20) NULL 
		processDesc nvarchar(10)   NULL
		result nvarchar(20)    NULL 
		priority nvarchar(10)   NOT NULL
	*/  
	        sheet0.suspendCalcService( true );

		cell_formula = '="CREATE TABLE "&AO9&".dbo.TB_"&SUBSTITUTE($C$7,"TB_","")&" ( seq INT NOT NULL IDENTITY , RegDate DATETIME NOT NULL DEFAULT dbo.getdate(), UpdateDate DATETIME NOT NULL DEFAULT dbo.getdate() "&", "'
		sheet0.setFormula( cell.row, cell.col , cell_formula )


 		cell = sheet0.getRange('AB10:AB60', GC.Spread.Sheets.SheetArea.viewport );
		sheet0.setColumnWidth( cell.col, 1200 );
		
		for( var k = 0 ; k < cell.rowCount ; k++ ){
		    cell_formula =`=IF($C${10+k}="","",""""&$C${10+k}&""" "&$D${10+k}&IF(OR($D${10+k}="INT",$D${10+k}="DATE", $D${10+k}="MONEY"),"",IF($D${10+k}="DECIMAL","("&$E${10+k}&","&$F${10+k}&")","("&$E${10+k}&")"))&" "&IF($G${10+k}=""," NULL",$G${10+k})&IF(AND($G${10+k}=" NOT NULL",$H${10+k}<>"")," DEFAULT "&$H${10+k},"")&", ")`;
		    console.log( cell_formula );	
		    sheet0.setFormula( cell.row + k, cell.col, cell_formula )
		    console.log( cell.row , k , cell.col ) ;  
		}
		
		cell = sheet0.getRange('AO12:AO12', GC.Spread.Sheets.SheetArea.viewport );
		cell_formula = sheet0.getFormula( cell.row, cell.col )
		cell_formula = '="PRIMARY KEY (seq) "&AE60&AJ$10&'
		sheet0.setFormula( cell.row, cell.col, cell_formula );
		
		cell = sheet0.getRange('AO13:AO13', GC.Spread.Sheets.SheetArea.viewport );
		cell_formula = '=")"'
		sheet0.setFormula( cell.row, cell.col, cell_formula ) 

		sheet0.resumeCalcService( false ); 



//	      await this.updateTblData( spread , ezch_tbl_makerFactory.cur_db ) 	
//	      setInterval( this.updateTblData , 60*60*1000, spread, ezch_tbl_makerFactory.cur_db ) 	
	      ezch_tbl_makerFactory.updateAlertInfo({ class:'success', message:'setInterval Started'});
	      sheet0.resumePaint() 
/* Test	
	      dv = sheet0.getDataValidator( 9,3 , GC.Spread.Sheets.SheetArea.viewport );  	
	      dv.reset() 	*/

	}
}])
.service('ezch_tbl_maker_eventsService', ['$injector', function($injector){
	var ezch_tbl_makerService = $injector.get('ezch_tbl_makerService') 
	this.sheet1_cellDoubleClick = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('N4') 
		let updateConfig = sheet1.getValue( args.row , args.col ) 
		if( args.col == cell_savedConfig.col && args.row > cell_savedConfig.row  ){
			ezch_tbl_makerService.updateConfig( spread,  updateConfig )  
		}
	}
	this.sheet1_buttonClicked = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('O2') 
		if( args.col == cell_savedConfig.col ){
			switch( args.row ){
				case cell_savedConfig.row:
					let newConfig = sheet1.getValue( cell_savedConfig.row , cell_savedConfig.col -1 ) 
					ezch_tbl_makerService.addConfig( newConfig ) 
					break; 
				default:	
					let delConfig = sheet1.getValue( args.row , args.col -1 ) 
					ezch_tbl_makerService.removeConfig( delConfig ) 
			}
		}
	}

}])
