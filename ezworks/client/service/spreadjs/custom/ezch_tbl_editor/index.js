angular.module('ezch_tbl_editorService',[])
.factory('ezch_tbl_editorFactory', ['$injector',function($injector){
	var ezch_tbl_editorFactory = {
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		saved_config_list :  { tbl_view : null , tbl_columns : null , tbl_data : [{ configName: 'Test01', delete: false },{ configName:'e_approval_request01', delete: false }] } ,
		cur_db: 'demo',
		tbl_name:'TB_admin_1',
		cur_id: 'richard.choi@ez-office.co.kr',
		sql_state: { pos: null , state_1 :  'select ', state_2: null },
//functions.		
		update_editLists : null 		
	}
	return ezch_tbl_editorFactory 
}])
.service('ezch_tbl_editorService', ['$injector',function($injector){
	var ezch_tbl_editorFactory = $injector.get('ezch_tbl_editorFactory') 
	var $http = $injector.get('$http') 
	this.setUpdate_editLists = ( update_editLists_f  )=>{
		ezch_tbl_editorFactory.update_editLists = update_editLists_f ; 
		ezch_tbl_editorFactory.update_editLists( ezch_tbl_editorFactory.saved_config_list.tbl_data ) 
	}
	this.getServerSide = async ()=>{
		let id = ezch_tbl_editorFactory.cur_id  
		let headers = { id } 
		let db = ezch_tbl_editorFactory.cur_db 
		let url = `/tbl_editor/${db}/user/` 
		let result = await $http({ method:'GET', url, headers }) 
		let configList = result.data.DATA.config_list 
		ezch_tbl_editorFactory.saved_config_list.tbl_data = ( configList == undefined )? [] : configList ; 
		ezch_tbl_editorFactory.update_editLists( ezch_tbl_editorFactory.saved_config_list.tbl_data ) 
	}
	this.updateServerSide = async ()=>{
		let id = ezch_tbl_editorFactory.cur_id  
		let headers = { id } 
		let data = { id , config_list : ezch_tbl_editorFactory.saved_config_list.tbl_data } 
		let db = ezch_tbl_editorFactory.cur_db 
		let url = `/tbl_editor/${db}/user/` 
		let result  =  await $http({ method: 'POST', url, data , headers } )
		console.log( result.data ) 
		ezch_tbl_editorFactory.update_editLists( ezch_tbl_editorFactory.saved_config_list.tbl_data ) 
	}
	this.updateConfig = ( spread , updateConfig )=>{
		if( updateConfig == null || updateConfig == '' ){
			alert("잘못된 정보입니다")
			return 
		}
		let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == updateConfig )
		if( recon_index == -1 ){ alert("항목오류입니다."); return }
		let cell_savedConfig = spread.getSheet(1).getRange("N2") 
                spread.getSheet(1).setValue( cell_savedConfig.row, cell_savedConfig.col, updateConfig ) 
		this.updateServerSide()

	}
	this.removeConfig = ( delConfig )=>{
		if( delConfig == null || delConfig == ''){
			alert("잘못된 정보입니다.")
			return 
		}
		let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == delConfig )
		if( recon_index == -1 ){ alert("항목오류입니다."); return }
		saved_config_list.tbl_data.splice( recon_index, 1 )
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		this.updateServerSide()

	}
	this.addConfig = ( newConfig )=>{
		if( newConfig == null || newConfig == '' ){
			alert("타이틀이 필요합니다.")
			return 
		}
		let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == newConfig )
		if( recon_index != -1 ){
			let yorn = confirm("재설정하시겠습니까?")
			if( yorn == false )return
			else saved_config_list.tbl_data.splice( recon_index, 1 ) 
		}
		saved_config_list.tbl_data.push({ configName: newConfig , delete: false }) 
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		this.updateServerSide()

	}
	this.updateData_1 = async( spread )=>{
		let sheet0 = spread.getSheet(0) 
		let tbl_columns =  await $http.get('/data/admin_1_schema.json')
		let tbl_data    =  await $http.get('/data/admin_1_data.json')
		tbl_columns = ezch_tbl_editorFactory.tblView_tbl.tbl_columns = tbl_columns.data 
		let nameOnly = []
		tbl_columns = tbl_columns.reduce(( acc, cur )=>{
			let tableColumn = new GC.Spread.Sheets.Tables.TableColumn() 
			nameOnly.push( cur.Field ) 
			tableColumn.dataField( cur.Field )
			tableColumn.name( cur.Field )
			tableColumn.formatter( cur.Formatter ) 
			acc.push(tableColumn) 
			return acc
		},[])


		ezch_tbl_editorFactory.tblView_tbl.tbl_data_1 =  tbl_data.data 
		let tbl_info = ezch_tbl_editorFactory.tblView_tbl 
		let table1 = ezch_tbl_editorFactory.tblView_tbl.tbl_view 
		let tbl_pos = ezch_tbl_editorFactory.tblView_tbl.tbl_pos 
		
		table1.autoGenerateColumns( false ) 
	        sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( tbl_pos.row, tbl_pos.col, tbl_info.tbl_data_1.length , tbl_columns.length ))  	
		table1.bind( tbl_columns , 'tbl_data_1', tbl_info ) 
		
		let sql_pos = ezch_tbl_editorFactory.sql_state.pos 
		let tbl_name = ezch_tbl_editorFactory.tbl_name
		let field_list = nameOnly.join(',') 
		let state = `select ${ field_list } from ${tbl_name}` 
		sheet0.getCell( sql_pos.row, sql_pos.col).value( state ).wordWrap(true)  

	}
	this.initTblView = async ( spread )=>{
	      let sheet0 = spread.getSheet(0); 
	      sheet0.name('TblView')
	      sheet0.setColumnCount(30)
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
	      ezch_tbl_editorFactory.sql_state.pos = sheet0.getRange('I4')	
		

	      let cell_tblData = sheet0.getRange('B17') 	
	      let table1 = ezch_tbl_editorFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableView', cell_tblData.row , cell_tblData.col, 120, 20 );
	      ezch_tbl_editorFactory.tblView_tbl.tbl_pos = cell_tblData 
	      table1.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	}
	this.initTblList = async ( spread )=>{
             let sheet1 = spread.getSheet(1);
	     sheet1.name('TblList')
	     let cell_savedConfig = sheet1.getRange('N2').backColor('#E3EFDA') 
	     sheet1.setColumnWidth( cell_savedConfig.col, 300 ) 
	     sheet1.setRowHeight( cell_savedConfig.row , 40 ) 	
	     let save_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     save_cellButton.text('Save') 
	     sheet1.setCellType( cell_savedConfig.row , cell_savedConfig.col+1 , save_cellButton )
	     await this.getServerSide() 	
	     let saved_config_list = ezch_tbl_editorFactory.saved_config_list 

	     saved_config_list.tbl_view = sheet1.tables.add( 'configList', cell_savedConfig.row + 2 , cell_savedConfig.col , 1 , 2 ) 	
	     let del_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     del_cellButton.text('Delete') 

	     let tableCol1 = new GC.Spread.Sheets.Tables.TableColumn(1, 'configName', 'Conifg List' ) 
	     let tableCol2 = new GC.Spread.Sheets.Tables.TableColumn(2, 'delete', 'Del' , null, del_cellButton ) 	
             
	     ezch_tbl_editorFactory.saved_config_list.tbl_columns = [ tableCol1, tableCol2 ]
 
	     saved_config_list.tbl_view.autoGenerateColumns( false ) 
	     saved_config_list.tbl_view.bind([ tableCol1 , tableCol2 ]  , 'tbl_data', saved_config_list )		
	 //    sheet1.options.isProtected = true 	
	     await this.updateData_1( spread ) 

	}
}])
.service('ezch_tbl_editor_eventsService', ['$injector', function($injector){
	var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService') 
	this.sheet1_cellDoubleClick = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('N4') 
		let updateConfig = sheet1.getValue( args.row , args.col ) 
		if( args.col == cell_savedConfig.col && args.row > cell_savedConfig.row  ){
			ezch_tbl_editorService.updateConfig( spread,  updateConfig )  
		}
	}
	this.sheet1_buttonClicked = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('O2') 
		if( args.col == cell_savedConfig.col ){
			switch( args.row ){
				case cell_savedConfig.row:
					let newConfig = sheet1.getValue( cell_savedConfig.row , cell_savedConfig.col -1 ) 
					ezch_tbl_editorService.addConfig( newConfig ) 
					break; 
				default:	
					let delConfig = sheet1.getValue( args.row , args.col -1 ) 
					ezch_tbl_editorService.removeConfig( delConfig ) 
			}
		}
	}

}])
