angular.module('ezch_tbl_editorService',[])
.factory('ezch_tbl_editorFactory', ['$injector',function($injector){
	var ezch_tbl_editorFactory = {
// tblView( sheet0 ) runtime lock.. 
	        lock_style: null,
		unlock_style: null, 
		lastSelections: [],
		currentSelections: [],
//  app user configuration.. 		
		saved_config_list :  { tbl_view : null , tbl_columns : null , tbl_data : [{ configName: 'Test01', delete: false },{ configName:'e_approval_request01', delete: false }] } 
	}
	return ezch_tbl_editorFactory 
}])
.service('ezch_tbl_editorService', ['$injector',function($injector){
	var ezch_tbl_editorFactory = $injector.get('ezch_tbl_editorFactory') 
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

	}
	this.initTblList = ( spread )=>{
             let sheet1 = spread.getSheet(1);
	     sheet1.name('TblList')
	     let cell_savedConfig = sheet1.getRange('N2').backColor('#E3EFDA') 
	     sheet1.setColumnWidth( cell_savedConfig.col, 300 ) 
	     sheet1.setRowHeight( cell_savedConfig.row , 40 ) 	
	     let save_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     save_cellButton.text('Save') 
	     sheet1.setCellType( cell_savedConfig.row , cell_savedConfig.col+1 , save_cellButton ) 
	     let saved_config_list = ezch_tbl_editorFactory.saved_config_list 

	     saved_config_list.tbl_view = sheet1.tables.add( 'configList', cell_savedConfig.row + 2 , cell_savedConfig.col , 1 , 2 ) 	
	     let del_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     del_cellButton.text('Delete') 

	     let tableCol1 = new GC.Spread.Sheets.Tables.TableColumn(1, 'configName', 'Conifg List' ) 
	     let tableCol2 = new GC.Spread.Sheets.Tables.TableColumn(2, 'delete', 'Del' , null, del_cellButton ) 	
             
	     ezch_tbl_editorFactory.saved_config_list.tbl_columns = [ tableCol1, tableCol2 ]
 
	     saved_config_list.tbl_view.autoGenerateColumns( false ) 
	     saved_config_list.tbl_view.bind([ tableCol1 , tableCol2 ]  , 'tbl_data', saved_config_list )		

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
	this.sheet0_selectionChanged = ( spread, sender, args )={
		ezch_tbl_editorFactory.lastSelections = args.oldSelections 
	}		

}])
