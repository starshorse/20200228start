angular.module('jsoneditor')
.service('jsonEditor_service', ['sheetFormat_service','spreadjsFilter_service', function( sheetFormat_service, spreadjsFilter_service ){
		var options = {}
	    // mode 1: row , 2: cell 3: app btn 
	    var cell_info = {'mode': null ,  'sheet': null, 'row': null , 'col': null, 'data': null, 'working_row': null,'appName': null, 'saveFt' : null } 
	    var editor 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ckEditor Module. 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	    var ckEditor 
		this.initCkEditor = ( ckEditor_ ) =>{ ckEditor = ckEditor_ } 
	    const changeEditor_cell = ( row_i, col_i, sheet_ , working_row_ )=>{
			cell_info.row = row_i , cell_info.col = col_i 
			cell_info.sheet = sheet_  
			cell_info.working_row = working_row_ 
			cell_info.mode = 1 
		}
	    const setData = ()=>{
			if( cell_info.working_row == null ) return
			if( cell_info.working_row['seq'] )spreadjsFilter_service.setFilter_key( cell_info.working_row['seq'] , 'seq' )   
			else if( cell_info.working_row['id_jpt'] ) spreadjsFilter_service.setFilter_key( cell_info.working_row['id_jpt'] , 'id_jpt' )   
			else if( cell_info.working_row['id']) spreadjsFilter_service.setFilter_key( cell_info.working_row['id'], 'id') 
			else spreadjsFilter_service.setFilter_key( null, null ) 
		}
	    this.changeCkEditor_cell = ( htmlData_ , row_i, col_i , sheet_ = null, working_row_ = null )=>{
			ckEditor.setData( htmlData_ ) 
			cell_info.data = htmlData_ 
			changeEditor_cell( row_i, col_i, sheet_  , working_row_ ) 
		}
	    this.setHtmlData = ()=>{
			setData() 
			cell_info.sheet.setValue( cell_info.row , cell_info.col ,  ckEditor.getData()  ) 
			sheetFormat_service.saveTbl() 
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  jsonEditor Module. 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
        this.initEditor = ( container_ )=>{
			editor = new JSONEditor( container_ , options ) 
		}
//1	
	    this.updateData = ( data_ )=>{
			editor.set( data_ )
		}
	    this.outData = ()=>{
			return JSON.stringify( editor.get() ); 
		}
// Mon Jun 20 16:04:31 KST 2022
	    this.changeJSONEditor_btn = ( jsonData_ , appName_ , saveFt_ )=>{
			this.saveFt = saveFt_ 
			this.appName = appName_ 
			editor.set( jsonData_ ) 
			cell_info.mode = 3 
			cell_info.appName  = appName_ 
			cell_info.saveFt = saveFt_ 
		}
		this.changeJSONEditor_cell  = ( jsonData_ , row_i, col_i, sheet_ = null, working_row_ = null  )=>{
			editor.set( jsonData_ ) 
			cell_info.data = jsonData_ 
			changeEditor_cell( row_i, col_i, sheet_  , working_row_ ) 
		}
	    this.changeJSONEditor_row  = ( jsonData_,  row_i , sheet_ = null )=>{
			editor.set( jsonData_ ) 
			cell_info.row = row_i  
			cell_info.sheet = sheet_  
			cell_info.data = jsonData_ 
			cell_info.working_row = jsonData_ 
			cell_info.mode = 2   
		}
	    this.setJSONData = ()=>{
            setData() 
			switch( cell_info.mode ){
				case 1:
				case '1':
//					let sheet1 = sheetFormat_service.getSheet1() 
					cell_info.sheet.setValue( cell_info.row , cell_info.col , JSON.stringify( editor.get() ) ) 
					sheetFormat_service.saveTbl() 
// spreadJs_service.saveTbl() 					
					break;
				case 2:
				case '2':
//					cell_info.data = JSON.parse( JSON.stringify( editor.get())) 
					let spread = sheetFormat_service.getSpread() 
// Fri Mar  4 11:42:25 KST 2022
					spread.isPaintSuspended( true ) 
					Object.assign( cell_info.data, editor.get())  
					spread.isPaintSuspended( false ) 
					break;
				case 3:
				case '3':
					cell_info.saveFt( JSON.stringify( editor.get() )) 
//					this.changeJSONEditor_btn.saveFt( JSON.stringify( editor.get() )) 
					break; 
				default:
			}
		}
}])
