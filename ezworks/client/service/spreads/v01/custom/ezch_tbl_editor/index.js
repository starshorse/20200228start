angular.module('ezch_tbl_editorService',[])
.factory('ezch_tbl_editorFactory', ['$injector',function($injector){
	var ezch_tbl_editorFactory = {
		// new pos struct.. 		
		pos:{ TblView : {
				curTable: 'C7:C7',
				addUser_config: 'I6:I6',
				check_mass: 'F6:F6',
				check_enableSql : 'F5:F5',
				btn_insert_data : 'F7:F7',
				btn_filter_selected: 'E6:E6',
				btn_unlock : 'D6:D6',
				btn_exec_sql :'H4:H4',
				btn_update :'C3:C3',
				btn_save_userConfig :'I6:I6',
			        input_sqlState: 'G4:G4',
			        input_cur_userConfig: 'I5:I5',
				pos_data_start: 'C16:C16',
			        pos_insert_data_block : 'C10:C10',
			        pos_insert_data_block_start : 'C10:C10',
			},
			TblList :{
				curTable : 'C5:C5' ,
			        btn_addColumn : 'P8:P8' ,
				btn_get_tblView : 'P4:P4',
				addColumn_info: 'E9:N9',
				tbl_schema_order_info:'E11:E111',
				tbl_schema_edit_info: 'M11:N111' ,
				pos_schema_add: { No: 'E9:E9' , Field: 'F9:F9' },
				pos_yesno_start: 'N11:N11' ,
				pos_order_start: 'E10:E10' ,
				pos_tblList_data_start: 'C10:C10'
			},
		      },	
		sheet_TblView_table:{ name: 'Table1', user_id: null , db_name: null , tbl_name: null , config_name: null, config_data: null,
			tbl_view: null, tbl_pos: null , tbl_columns: null,  tbl_data: null , data:[], max_rowCount: 21000 , max_columnCount: 100 },
		sheet_TblList_table_tblList :{ name: 'Table1', user_id: null,  db_name : null , tbl_view: null , tbl_columns: null , tbl_data:[]},
		sheet_TblList_table_tblSchema :{ name: 'Table2', db_name: null,  tbl_name: null , tbl_view: null , data:[]},
		binding_data: { cur_server : null , cur_DB: null, cur_user: null , cur_organization: null ,  cur_login: null , cur_table: null },
		schema_add: { No : 3 , Field :'Add Col', visible: true , curTable: null },
		saved_config_list :  { tbl_view : null , tbl_columns : null , tbl_data : [{ configName: 'Test01', delete: false },{ configName:'e_approval_request01', delete: false }] } ,
		cellBinding_config_list: { tbl_name : null  , mass_enable: false , sql_enable: false , sqlState_where: 'order by seq desc' , cur_config_name: '' }, 
		sql_state: { pos: null , state_1 :  'select ', state_2:'order by seq desc' },
		bl_set_flag: 0,
		async_updates:[],
// tblView( sheet0 ) runtime lock.. 
	        lock_style: null,
		unlock_style: null, 
		lastSelections: [],
		currentSelections: [],
		names_sheet0 : null ,
		names_sheet0_notNull : [],
		hide_null_check :{ hide_null_flag: 0 , null_list: [] },
// tblView( sheet0 ) Filter.. 
		tblView_filter: { button_obj: null, text: ['선택필터적용' ,'선택필테해제'], filter_state: 0 , filter_info: [] }, 
//functions.		
		update_editLists : null,
		update_cur_db: null,
		updateAlertInfo: null,
		updateConfigName : null, 
		endPageLoading: null,
	}
	return ezch_tbl_editorFactory 
}])
.service('ezch_tbl_editorService', ['$injector',function($injector){
	var ezch_tbl_editorFactory = $injector.get('ezch_tbl_editorFactory') 
	var $http = $injector.get('$http') 
	var $cookies = $injector.get('$cookies') 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  core. : Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.getEzch_tbl_editorFactory = ()=>ezch_tbl_editorFactory ; 		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  TblView : Filter Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.applyFilter = ( spread, filter_state )=>{
	      let sheet0 = spread.getSheet(0); 	
	      let table1 = ezch_tbl_editorFactory.sheet_TblView_table.tbl_view ;
	      let rowFilter = table1.rowFilter(); 	
	      let tbl_range = table1.range(); 
	      if( filter_state )
	      {	
		      let selections = ezch_tbl_editorFactory.lastSelections ;
		      for( selection of selections )
		      {	
				if(  selection.col >= tbl_range.col && selection.col < tbl_range.col + tbl_range.colCount && selection.row >= tbl_range.row && selection.row < tbl_range.row + tbl_range.rowCount )
				{
				   let text = sheet0.getValue( selection.row, selection.col );	
				   let condition = new GC.Spread.Sheets.ConditionalFormatting.Condition(
					GC.Spread.Sheets.ConditionalFormatting.ConditionType.textCondition, {
						compareType: GC.Spread.Sheets.ConditionalFormatting.TextCompareType.equalsTo, 
						expected: text
					}		
				   )
				   rowFilter.addFilterItem( selection.col , condition);
				   rowFilter.filter( selection.col ); 	
				}		
		      }	
	     }else{
//		    rowFilter.unfilter();  
		    rowFilter.reset();  		    
	     } 	     
	}	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  TblView : DB Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_TblView_insertData_DB = ( spread )=>{
		 if( ezch_tbl_editorFactory.hide_null_check.hide_null_flag ){
			 let hide_null_list = ezch_tbl_editorFactory.hide_null_check.null_list.join(',');
			 alert('해당 NOT NULL 항목이 Visible로 선택되어 있지 않았습니다.:'+ hide_null_list ) 
			 return ; 
		 }
		  let sheet_TblView_table = ezch_tbl_editorFactory.sheet_TblView_table 
	
		  let headers = {}
		  let user_DB = sheet_TblView_table.db_name ; 
		  if( user_DB )headers['user_DB'] = user_DB 
// checking mass insert 
		  let sheet0 = spread.getSheet(0);
		  let mass_check = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.check_mass ) 	
		  let isChecked = sheet0.getCell( mass_check.row , mass_check.col ).value() 
		  let emp 
		  let tbl_name = sheet_TblView_table.tbl_name 
		  if( isChecked == true ){
		     emp = get_insertDataTr( spread ) 
		     url_ = `/tbl_editor/${ tbl_name }/Tr`
		  }else{
			  emp = get_insertData( spread ) 
			  url_ = `/tbl_editor/${ tbl_name }`
			  delete emp.seq ;	
		  }	  
		  $http({ method:'POST', url: url_ ,  data: emp , headers: headers }).then((res_)=>{
			  console.log( res_ )
			  this.sheet_TblView_update_genTblView( spread ) 			  
		  }) 
	}
	const get_insertDataTr = ( spread )=>{
		 let sheet0 = spread.getSheet(0);
		 let insertData_cell = sheet0.getRange(ezch_tbl_editorFactory.pos.TblView.pos_insert_data_block_start)
		 let insertData_arr = [] 
		 for( k = 0 ; k < 5 ;k++){
			 let insertData = {} 
			 ezch_tbl_editorFactory.names_sheet0.forEach( ( v, i )=>{
				 let cell_value = sheet0.getValue( insertData_cell.row + k , insertData_cell.col + i ) 
				 if( cell_value !== '' )
					 insertData[v.Field] = cell_value 
			 })
			if( Object.keys( insertData ) != 0 )insertData_arr.push( insertData ) 
		 }
		 return insertData_arr 
	}
     const get_insertData = ( spread )=>{
		 let sheet0 = spread.getSheet(0) 
		 let insertData_cell = sheet0.getRange(ezch_tbl_editorFactory.pos.TblView.pos_insert_data_block_start) 
		 let insertData = {} 
		 ezch_tbl_editorFactory.names_sheet0.forEach( ( v, i )=>{
			 let cell_value = sheet0.getValue( insertData_cell.row , insertData_cell.col + i ) 
			 if( cell_value !== '' )
				 insertData[v.Field] = cell_value 
			  
		 })
		return insertData 
	}	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  TblView : Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.test_asyncUpdates = async ()=>{
		let headers = { user_db: ezch_tbl_editorFactory.cur_db } 
		let tbl_name = ezch_tbl_editorFactory.tbl_name.replace('TB_',''); 
		try{
			for( var i = 0 ; i< 10 ; i++ ){
				let updateRow = ezch_tbl_editorFactory.tblView_tbl.tbl_data_1[i] 
				updateRow['송장번호'] = Math.floor( Math.random()*1000000 )
				let seq = updateRow['seq']; 
				ezch_tbl_editorFactory.async_updates.push( seq )	
	//			setTimeout( ()=>{
					$http({ method:'POST', url:`/tbl_editor/${tbl_name}/${seq}`, data:updateRow , headers }).then((resp)=>{
						let seq =  resp.config.data.seq; 
						let seq_index = ezch_tbl_editorFactory.async_updates.indexOf(seq) 	
						ezch_tbl_editorFactory.async_updates.splice( seq_index , 1 ) 
						console.log( ezch_tbl_editorFactory.async_updates )
						if( ezch_tbl_editorFactory.async_updates.length === 0 )alert("Trasaction all done!")
					})
	//			},3000 )
			}
		}catch(err){
			console.log(err)
		}	
	}	
/*1	
	this.updateSql = async ( spread, user_db = null  )=>{
		if( ezch_tbl_editorFactory.async_updates != []){
			alert("Update trasaction working / Please wait!")
			return ; 
		}
		if( ezch_tbl_editorFactory.cellBinding_config_list.sql_enable == true ){
			let sheet0 = spread.getSheet(0); 
			let sqlState = ezch_tbl_editorFactory.sql_state.state_1 + ' ' + ezch_tbl_editorFactory.cellBinding_config_list.sqlState_where ;
			let tbl_columns =  await $http.get('/data/admin_1_schema.json')
			if( user_db == null )user_db = ezch_tbl_editorFactory.cur_db 
		        let tbl_name = ezch_tbl_editorFactory.tbl_name.replace('TB_',''); 
			let tbl_data  = await $http({ method:'POST', url:`/tbl_editor/${user_db}/${tbl_name}/sql`, data: { sql_state: sqlState } })
			tbl_data.data = tbl_data.data.DATA 

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
			sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( tbl_pos.row, tbl_pos.col, tbl_info.tbl_data_1.length + 1, tbl_columns.length ))  	
			table1.bind( tbl_columns , 'tbl_data_1', tbl_info ) 
		}else{
			this.updateData_1( spread, null, 2 ) // call_source from SQL. 
		}	
	}
*/	
	this.invalid_tblView = ( spread )=>{
		spread.getSheet(0).visible( false ); 
	}
        this.saveTblViewConfig = ( spread )=>{
	}
	this.sheet_TblView_clear_unlockCells = ( spread )=>{
		  let sheet0 = spread.getSheet(0); 
		  let cell_rtArea = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.pos_data_start ) 
		  sheet0.options.isProtected = false 
		  console.log("isProtected:")
		  console.timeLog("answer time");
		  for( selection of ezch_tbl_editorFactory.currentSelections ){
			  if( selection.row > cell_rtArea.row ){
				  sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).locked( true ) 
				  sheet0.clear( selection.row , selection.col, selection.rowCount , selection.colCount , GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style ) 
			  }
		  }
		  console.log("currentSelections:")
		  console.timeLog("answer time");
		  sheet0.options.isProtected = true  

	}
	this.sheet_TblView_massCheck_toggle = ( spread , IsMass )=>{
		let sheet0 = spread.getSheet(0);
		let mass_check = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.pos_insert_data_block_start )
		for( i = 1; i< 5 ;i ++ ){
			sheet0.setRowVisible( mass_check.row + i , IsMass )
		}
	}
        this.sheet_TblView_invalidate_sqlInput = ( spread , yes = 1 )=>{
	     let sheet0 = spread.getSheetFromName('TblView')
	     let cell_exeSql = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_exec_sql )
	     if( yes )
		 sheet0.setRowVisible( cell_exeSql.row , false )
	     else
		 sheet0.setRowVisible( cell_exeSql.row , true )
       }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	Input:
		module : spread

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////	
	this.sheet_TblView_update_dataColumns = ( spread, data4hdr )=>{
		var tableColumns = [],
				names = [], 
				labels = [];
		
		let userHdr  =  data4hdr 
		console.log( userHdr ) 
		ezch_tbl_editorFactory.names_sheet0_notNull = [] ;
		ezch_tbl_editorFactory.hide_null_check.hide_null_flag = 0 ;
		ezch_tbl_editorFactory.hide_null_check.null_list = [] ;
		let i = 0 
		ezch_tbl_editorFactory.names_sheet0 = names = labels = userHdr.reduce(( acc , cur )=>{
			  if( cur.visible == true ){
			    	acc.push( { Field: cur.Field , Formatter: cur.Formatter } )
				    if( cur.Null == false )ezch_tbl_editorFactory.names_sheet0_notNull.push(i)
				    i++ 
			  }else{
				  if( cur.Null == false ){
					  ezch_tbl_editorFactory.hide_null_check.hide_null_flag = 1 ;
					  ezch_tbl_editorFactory.hide_null_check.null_list.push( cur.Field ) 
				  }
			  }
			   return acc 
		}, [])
		names.forEach( (name, index )=>{
			let  tableColumn = new GC.Spread.Sheets.Tables.TableColumn();
			tableColumn.name( name.Field );
			tableColumn.dataField( name.Field ) ;
			tableColumn.formatter( name.Formatter ); 
			tableColumns.push( tableColumn ); 
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update insert block..
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
		let sheet0 = spread.getSheet(0); 
		spread.options.isProtected = false 
		let cell_block = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.pos_insert_data_block_start )
// clear  back first. 
		 sheet0.clear( cell_block.row, cell_block.col, 5, 100 , GC.Spread.Sheets.SheetArea.viewport , GC.Spread.Sheets.StorageType.style ) 

		sheet0.getRange( cell_block.row , cell_block.col , 5 , 1 ).borderLeft( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col+ names.length -1 , 5 , 1 ).borderRight( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col , 1 , names.length ).borderTop( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col , 1 , names.length ).borderBottom( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row + 4 , cell_block.col , 1 , names.length ).borderBottom( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col, 5 , names.length ).value('') 
		sheet0.getRange( cell_block.row , cell_block.col, 5 , names.length ).locked( false )
		
		ezch_tbl_editorFactory.names_sheet0_notNull.forEach(( ent )=>{
			sheet0.getRange( cell_block.row  , cell_block.col + parseInt( ent ) , 5, 1 ).backColor('#E3EFDA') 
		})
		sheet0.getRange( cell_block.row , cell_block.col, 5 , 1 ).locked( true ).backColor('#CCCCCC') 
		spread.options.isProtected = true  
		return  tableColumns
	}
	const sheet_TblView_update_basic = async(
		spread,
	)=>{
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     1. UI interface set up..
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// start Cell AA10
		let sheet0 = spread.getSheet(0)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     2. load Data..
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Data loading time show pages.
		let sheet_TblView_table = ezch_tbl_editorFactory.sheet_TblView_table 	
		let tbl_name = sheet_TblView_table.tbl_name 
		ezch_tbl_editorFactory.cellBinding_config_list.tbl_name = tbl_name 
			 
		let tbl_name4url = tbl_name.replace('TB_','');
		let headers = {}
 	        let user_DB = sheet_TblView_table.db_name ;  
		if( user_DB )headers['user_DB'] = user_DB

		let DataHdr = await $http.get(`/tbl_editor/${ user_DB }/${ tbl_name4url }`, { headers: headers } )
		let  Data_1  = sheet_TblView_table.tbl_data = DataHdr.data.DATA
// 연순 정렬 적용 .
		Data_1 = Data_1.reverse()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     3. Render Data..
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		let  cell = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.pos_data_start , GC.Spread.Sheets.SheetArea.viewport );

		// Add table named as "table1"
		let table1 = ezch_tbl_editorFactory.sheet_TblView_table.tbl_view ;

		table1.expandBoundRows(true);
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Table Column binding.
////////////////////////////////////////////////////////////////////////////////////////////////////

		table1.autoGenerateColumns( false );
		table1.showResizeHandle(true);
		let tableColumns  = this.sheet_TblView_update_dataColumns( spread,  ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data )
		sheet_TblView_table.tbl_columns = tableColumns
		sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( cell.row, cell.col, ( Data_1.length == 0 )? 4 : Data_1.length  , tableColumns.length ))
		table1.bind( tableColumns , 'tbl_data' , ezch_tbl_editorFactory.sheet_TblView_table )
//1
		this.sheet_TblView_clear_unlockCells( spread ); 

                spread.setActiveSheetIndex(0)
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Key mapping change.
////////////////////////////////////////////////////////////////////////////////////////////////////
	      let cell_data_start = sheet0.getRange('AA18:AA18')
	      spread.commandManager().register('nv_down',
		      function nv_down(){
			     let s_index =  spread.getActiveSheetIndex()
			     if( s_index == 0){
			     		let end_p = ezch_tbl_editorFactory.sheet_TblView_table.tbl_data_1.length
				        end_p_top = end_p - end_p%20
			     		sheet0.showRow( end_p_top , 17 )
				        let activeColIndex = sheet0.getActiveColumnIndex()
				        sheet0.setActiveCell( end_p + 17 - 1  , activeColIndex )
			     }
		      }
	      );
	      spread.commandManager().register('nv_right',
		      function nv_right(){
			     let s_index =  spread.getActiveSheetIndex()
			     if( s_index == 0){
			     		let end_p = ezch_tbl_editorFactory.sheet_TblView_table.tbl_columns.length + cell_data_start.col - 1
				        let activeRowIndex = sheet0.getActiveRowIndex()
					    sheet0.showColumn( end_p , GC.Spread.Sheets.HorizontalPosition.right );
				        sheet0.setActiveCell( activeRowIndex , end_p )
			     }
		      }
	      );
	      spread.commandManager().register('bl_down',
		      function bl_down(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editorFactory.bl_set_flag
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections();
				     let rowDelta = ( ezch_tbl_editorFactory.sheet_TblView_table.tbl_data_1.length + 17 ) - (selections[0].row + selections[0].rowCount )

				     if( selections[0].row > 15 && rowDelta > 0 )
				     {
				        spread.commandManager().execute({ cmd: "nv_down", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount + rowDelta , selections[0].colCount );
				     }
				     ezch_tbl_editorFactory.bl_set_flag = 0 ;

			     }else{
				    spread.commandManager().execute({ cmd: "selectionDown", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });
			     }
		      }
	      );
	      spread.commandManager().register('bl_right',
		      function bl_right(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editorFactory.bl_set_flag
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections();
				     let colDelta = ( ezch_tbl_editorFactory.sheet_TblView_table.tbl_columns.length + cell_data_start.col ) - ( selections[0].col + selections[0].colCount )
				     if( selections[0].col > 0 && colDelta > 0){
				        spread.commandManager().execute({ cmd: "nv_right", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount + colDelta );
					 }
					 ezch_tbl_editorFactory.bl_set_flag = 0 ;

			     }else{
				    spread.commandManager().execute({ cmd: "selectionRight", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });
			     }
		      }
	      );
	      spread.commandManager().setShortcutKey('nv_down', GC.Spread.Commands.Key.down, true ,false , false ,false );
	      spread.commandManager().setShortcutKey('nv_right', GC.Spread.Commands.Key.right, true ,false , false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.right, false ,true, false ,false );
	      spread.commandManager().setShortcutKey('bl_right', GC.Spread.Commands.Key.right, false ,true, false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.down, false ,true, false ,false );
	      spread.commandManager().setShortcutKey('bl_down', GC.Spread.Commands.Key.down, false ,true, false ,false );

	}
	this.sheet_TblView_update_execSql = async ( spread )=>{
		if( ezch_tbl_editorFactory.async_updates.length !== 0 ){
		   alert(" 데이터저장 중입니다. 잠시 후 눌러주세요~")
		   return -1; 
		}
		let sheet0 = spread.getSheet(0); 
//1		
		sheet_TblView_update_sqlState( spread ) 
		let sqlState = ezch_tbl_editorFactory.sql_state.state_1 + ' ' + ezch_tbl_editorFactory.cellBinding_config_list.sqlState_where ;
		let tbl_columns = ezch_tbl_editorFactory.sheet_TblView_table.tbl_columns ;  
		let user_db = ezch_tbl_editorFactory.sheet_TblView_table.db_name ;  
		let tbl_name = ezch_tbl_editorFactory.sheet_TblView_table.tbl_name 
		let tbl_data  = await $http({ method:'POST', url:`/tbl_editor/${user_db}/${ tbl_name }/sql`, data: { sql_state: sqlState } })
		let alert_info_message = { class : ( tbl_data.data.RESULT == 'success' )? 'success': 'warning' , message : tbl_data.data.ERRORMESSAGE } 
		ezch_tbl_editorFactory.updateAlertInfo( alert_info_message ) 		
		if( tbl_data.data.STATUS == -1 ){
			alert( tbl_data.data.MESSAGE )
			return -1; 
		}
		tbl_data.data = tbl_data.data.DATA  
		ezch_tbl_editorFactory.sheet_TblView_table.tbl_data  = tbl_data.data 

		let tbl_info = ezch_tbl_editorFactory.sheet_TblView_table 
		let table1 = ezch_tbl_editorFactory.sheet_TblView_table.tbl_view 
		let tbl_pos = ezch_tbl_editorFactory.sheet_TblView_table.tbl_pos 
		
		table1.autoGenerateColumns( false ) 
		sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( tbl_pos.row, tbl_pos.col, tbl_info.tbl_data.length + 1, tbl_columns.length ))  	
		table1.bind( tbl_columns , 'tbl_data', tbl_info ) 	
                spread.setActiveSheetIndex(0)
	}
	this.sheet_TblView_update_configData = async ( spread )=>{
	       let updateConfig =	updateViewConfig( spread ) 
	        if( updateConfig.tblViewConfig?.sql_enable ){
			this.sheet_TblView_update_execSql( spread ); 
		}else{
			sheet_TblView_update_basic( spread ); 
		        this.sheet_TblView_invalidate_sqlInput( spread, !ezch_tbl_editorFactory.cellBinding_config_list.sql_enable );
		}
	}
	const sheet_TblView_update_sqlState = ( spread )=>{
		ezch_tbl_editorFactory.sheet_TblView_table.tbl_columns = tableColumns =  this.sheet_TblView_update_dataColumns( spread,  ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data )
		let sql_pos = ezch_tbl_editorFactory.sql_state.pos
		let tbl_name = ezch_tbl_editorFactory.sheet_TblView_table.tbl_name 
		let nameOnly =  ezch_tbl_editorFactory.names_sheet0.reduce(( acc, cur )=>{
			acc.push( cur.Field );
			return acc ;
		},[]);
		let field_list = nameOnly.join(',')
		let state = `select ${ field_list } from ${tbl_name}`
		ezch_tbl_editorFactory.sql_state.state_1 = state ;
	}
	this.sheet_TblView_update_genTblView = async ( spread )=>{
		// invalidate  configuration.. 
		ezch_tbl_editorFactory.sheet_TblView_table.config_name = null ;  
		ezch_tbl_editorFactory.sheet_TblView_table.config_data = null ;  
		if( ezch_tbl_editorFactory.cellBinding_config_list.cur_config_name == null ){
		 ezch_tbl_editorFactory.cellBinding_config_list.cur_config_name = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_name 
		}	

	        if( ezch_tbl_editorFactory.cellBinding_config_list.sql_enable ){
			if( ezch_tbl_editorFactory.sql_state.state_1 == null ){ alert("need columns data for SQL"); return -1  };
			await this.sheet_TblView_update_execSql( spread ); 
		}else{
			await sheet_TblView_update_basic( spread ); 
	        	this.sheet_TblView_invalidate_sqlInput( spread, !ezch_tbl_editorFactory.cellBinding_config_list.sql_enable );
		}
	}
/*	
	this.sheet_TblView_update = async(
	spread,
	sheetFormat_service,
	user_db = null,
	call_source = 1   // call_source:1  tblList, 2:sql_run ..

	)=>{
	        let sheet1 = spreadJs_factory.spread.getSheetFromName('TblList');
		let sheet0 = spreadJs_factory.sheet0 =  spread.getSheet(0)
		let cell = sheet1.getRange( ezch_tbl_editor_appFactory.pos.TblList.curTable , GC.Spread.Sheets.SheetArea.viewport );
		   if( ezch_tbl_editor_appFactory.async_updates.length !== 0 ){
			   alert(" 데이터저장 중입니다. 잠시 후 새로고침을 눌러주세요~")
			   return 0
		   }
		   let  checkSql = sheet0.getValue( cell_checkSql.row, cell_checkSql.col )

		   if( ezch_tbl_editor_appFactory.input_sqlState_changed && !checkSql && call_source !== 1 ){
				let ret_v = confirm("SQL 문을 실햏하시겠습니까?")
				if( ret_v == true )sheet0.setValue( cell_checkSql.row, cell_checkSql.col, true );
				ezch_tbl_editor_appFactory.input_sqlState_changed = false ;
		   }else{
				ezch_tbl_editor_appFactory.input_sqlState_changed = false ;
		   }
		   let sheet_TblView_table = ezch_tbl_editorFactory.sheet_TblView_table	
		   sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.input_cur_userConfig ).text( sheet_TblView_table.tbl_name  );
		    ezch_tbl_editor_appFactory.cellBinding_config_list.tbl_name = sheet_TblView_table.tbl_name ;
		       if( ezch_tbl_editor_appFactory.config_name ){   // call for gen view..
				    switch( call_source ){
						case 1:
						await this.updateViewConfig( spread , ezch_tbl_editor_appFactory.config_name );
							break;
						case 2:
						await this.updateDataSql( spread )
							break;
					}
			   }
			   else{
				   switch( call_source ){
					    case 1:
						    ezch_tbl_editor_appFactory.cellBinding_config_list.sql_enable = false  ; // reset SQL.
						await this.updateDataSql( spread )
						    break;
					   case 2:
						await this.updateDataSql( spread )
						   break;
				   }

			   }
				spread.setActiveSheetIndex(0);

		let sql_pos = ezch_tbl_editor_appFactory.sql_state.pos
		tbl_name = ezch_tbl_editor_appFactory.tbl_name
		let nameOnly =  ezch_tbl_editor_appFactory.names_sheet0.reduce(( acc, cur )=>{
			acc.push( cur.Field );
			return acc ;
		},[]);
		let field_list = nameOnly.join(',')
		let state = `select ${ field_list } from ${tbl_name}`
		ezch_tbl_editor_appFactory.sql_state.state_1 = state ;
		if( user_db != null )ezch_tbl_editor_appFactory.cur_db = user_db ;
	//1
		this.invalidate_sqlInput( spread, !ezch_tbl_editorFactory.cellBinding_config_list.sql_enable );
	}
*/	
		this.sheet_TblView_init = async( spread )=>{

		let sheet0  =  spread.getSheet(0)
		sheet0.setRowCount( ezch_tbl_editorFactory.sheet_TblView_table.max_rowCount )
		sheet0.setColumnCount( ezch_tbl_editorFactory.sheet_TblView_table.max_columnCount )
		sheet0.name('TblView');

		var defaultStyle = new GC.Spread.Sheets.Style()
		sheet0.suspendPaint()
		sheet0.setDefaultStyle( defaultStyle )
		sheet0.resumePaint()

			
		sheet0.isProtected = false
		let cell_massCheck = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.check_mass ).locked( false )
		let cell_mass = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_insert_data )
		let cell_filterCells = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_filter_selected )
	        ezch_tbl_editorFactory.tblView_filter.button_obj = cell_filterCells.cellType() ;
// SQL input Enable.
		let cell_enableSql  = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.check_enableSql ).locked( false )
		let cell_inputSql   = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.input_sqlState ).locked( false )
                let cell_configName = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.input_cur_userConfig ).locked( false )
		
//1. binding together..
	        let source = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editorFactory.cellBinding_config_list )
		let cell_curTable = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.curTable )
	    	sheet0.setBindingPath( cell_massCheck.row, cell_massCheck.col, 'mass_enable' )
	        sheet0.setBindingPath( cell_enableSql.row, cell_enableSql.col, 'sql_enable' )
	    	sheet0.setBindingPath( cell_inputSql.row , cell_inputSql.col , 'sqlState_where' );
	    	sheet0.setBindingPath( cell_configName.row , cell_configName.col , 'cur_config_name' );
	    	sheet0.setBindingPath( cell_curTable.row , cell_curTable.col , 'tbl_name' );
         	sheet0.setDataSource( source )
/*1			
		cell_configName.locked( false )
		cell_inputSql.locked( false )
		cell_enableSql.locked( false )
		cell_massCheck.locked( false )
*/		
		sheet0.isProtected = true
// Style Init..
		ezch_tbl_editorFactory.lock_style = new GC.Spread.Sheets.Style()
		ezch_tbl_editorFactory.unlock_style = new GC.Spread.Sheets.Style()
		ezch_tbl_editorFactory.lock_style.name = 'LockStyle'
		ezch_tbl_editorFactory.unlock_style.name  = 'UNlockStyle'
	    	ezch_tbl_editorFactory.lock_style.backColor = '#EEEEEE'
		ezch_tbl_editorFactory.unlock_style.backColor = 'LemonChiffon'
		sheet0.addNamedStyle( ezch_tbl_editorFactory.lock_style )
		sheet0.addNamedStyle( ezch_tbl_editorFactory.unlock_style )

		let  cell = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.pos_data_start, GC.Spread.Sheets.SheetArea.viewport );
		let table1 = ezch_tbl_editorFactory.sheet_TblView_table.tbl_view = sheet0.tables.all()[0] ;
		ezch_tbl_editorFactory.sheet_TblView_table.tbl_pos = cell
		this.sheet_TblView_massCheck_toggle( spread , false )
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Key mapping change.
////////////////////////////////////////////////////////////////////////////////////////////////////
	// key mapping init..
	      spread.commandManager().register('nv_up',
		      function nv_up(){
			     let s_index =  spread.getActiveSheetIndex()
			     if( s_index == 0){
				let sheet0 = spread.getSheet( s_index )
				let activeColIndex = sheet0.getActiveColumnIndex()
			     	sheet0.showRow( 17, 18 )
				sheet0.setActiveCell( 17, activeColIndex )
			     }
		      }
	      );
	      spread.commandManager().register('nv_left',
		      function nv_left(){
			     let s_index =  spread.getActiveSheetIndex()
			     if( s_index == 0){
				let sheet0 = spread.getSheet( s_index )
				let activeRowIndex = sheet0.getActiveRowIndex()
			     	sheet0.showColumn( cell_data_start.col , 1 )
				    sheet0.setActiveCell( activeRowIndex , cell_data_start.col )
			     }
		      }
	      );
	      spread.commandManager().register('bl_set',
		      function bl_set(){
			     let s_index =  spread.getActiveSheetIndex()
			     if( s_index == 0){
				let sheet0 = spread.getSheet( s_index )
				 console.log('bl_set:on')
				 ezch_tbl_editorFactory.bl_set_flag = 1;
			     }
		      }
	      );
	      spread.commandManager().register('bl_up',
		      function bl_up(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editorFactory.bl_set_flag
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections();
				     if( selections[0].row > 16 )
				     {
				     	selections[0].rowCount += selections[0].row - 16
				     	selections[0].row = 16
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount );
				     }
				     ezch_tbl_editorFactory.bl_set_flag = 0 ;

			     }else{
				    spread.commandManager().execute({ cmd: "selectionUp", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });
			     }
		      }
	      );
	      spread.commandManager().register('bl_left',
		      function bl_left(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editorFactory.bl_set_flag
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections();
				     selections[0].colCount += selections[0].col - cell_data_start.col
				     selections[0].col = cell_data_start.col
				     sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount );
				     ezch_tbl_editorFactory.bl_set_flag = 0 ;

			     }else{
				    spread.commandManager().execute({ cmd: "selectionLeft", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });
			     }
		      }
	      );

	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.up , true , false , false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.down , true , false , false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.right , true , false , false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.left , true , false , false ,false );
	      spread.commandManager().setShortcutKey('goToSheetBottomRight', GC.Spread.Commands.Key.end , true , true , false ,false );
	      spread.commandManager().setShortcutKey('nv_up', GC.Spread.Commands.Key.up, true ,false , false ,false );
	      spread.commandManager().setShortcutKey('nv_left', GC.Spread.Commands.Key.left, true ,false , false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.end , false , true , false ,false );
	      spread.commandManager().setShortcutKey('bl_set', GC.Spread.Commands.Key.end, false ,true, false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.left, false ,true, false ,false );
	      spread.commandManager().setShortcutKey('bl_left', GC.Spread.Commands.Key.left, false ,true, false ,false );
	      spread.commandManager().setShortcutKey( undefined , GC.Spread.Commands.Key.up, false ,true, false ,false );
	      spread.commandManager().setShortcutKey('bl_up', GC.Spread.Commands.Key.up, false ,true, false ,false );

/////////////////////////////////////////////////////////////////////////////////////////////////////
//  check new window with configuration name..
////////////////////////////////////////////////////////////////////////////////////////////////////
		  ezch_tbl_editorFactory.endPageLoading();

	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Global menu : Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.setUpdate_editLists = ( update_editLists_f  )=>{
		ezch_tbl_editorFactory.update_editLists = update_editLists_f ; 
		ezch_tbl_editorFactory.update_editLists( ezch_tbl_editorFactory.saved_config_list.tbl_data ) 
	}
	this.sheets_reset = async ( spread, user_DB)=>{	
		let sheet1 = spread.getSheetFromName('TblList');
		let headers = {}
	   	let user_id =	ezch_tbl_editorFactory.cur_id = $cookies.get('user') 
	        ezch_tbl_editorFactory.sheet_TblView_table.db_name  = user_DB	
	        ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.db_name  = user_DB	

		if( user_DB )headers['user_DB'] = user_DB 
		if( user_id )headers['user_id'] = user_id 
		
		let appDataHdr = await $http.get(`/tbl_editor/${ user_DB }/tbl_list`) 
		let tbl_list_data  = appDataHdr.data.DATA 
		let tbl_list = ezch_tbl_editorFactory.sheet_TblList_table_tblList ;
     	        tbl_list.tbl_data  = tbl_list_data.map( (ent)=>{ return { tbl_name : ent.TABLE_NAME }} ) 
// Add Sorting. 		
		tbl_list.tbl_data.sort((a,b)=>{
		   if( a.tbl_name[0] < b.tbl_name[0] )return -1 ;
		   if( a.tbl_name[0] > b.tbl_name[0] )return 1 ;
		   return 0;  
		})

		tbl_list.tbl_view.autoGenerateColumns(false);
		tbl_list.tbl_view.bind( tbl_list.tbl_columns , 'tbl_data', tbl_list );
		let tbl_name  = ezch_tbl_editorFactory.sheet_TblView_table.tbl_name  = tbl_list.tbl_data[0].tbl_name ; 
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_name  = tbl_name  ; 
		await this.sheet_TblList_table_updateSchema( spread, tbl_name )
// confi table re init.. 		
		
// udapte user saved config. 
                await this.getServerSide() 
		spread.getSheet(0).visible(false); 
// udapte user saved config. 
		spread.setActiveSheetIndex(1) 

       }	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   TblList : Services 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       this.getServerSide = async ()=>{
	        let sheet_TblView_table = ezch_tbl_editorFactory.sheet_TblView_table
		let id  = sheet_TblView_table.user_id 
		let headers = { id } 
		let db = sheet_TblView_table.db_name  
		let url = `/tbl_editor/${db}/user_config/`
		let result = await $http({ method:'GET', url, headers })
		if( result.data.STATUS == -1 )return -1 ;

		let configList = result.data.DATA.config_list 
		ezch_tbl_editorFactory.saved_config_list.tbl_data = ( configList == undefined )? [] : configList ;
		ezch_tbl_editorFactory.update_editLists( ezch_tbl_editorFactory.saved_config_list.tbl_data );
	}
	this.updateServerSide = async ()=>{
	        let sheet_TblView_table = ezch_tbl_editorFactory.sheet_TblView_table
		let id  = sheet_TblView_table.user_id 
		let headers = { id }
		let data = { id , config_list : ezch_tbl_editorFactory.saved_config_list.tbl_data } 
		let db = sheet_TblView_table.db_name  
		let url = `/tbl_editor/${db}/user_config/`
                let result = await $http({ method: 'POST', url, data , headers } ) 
                console.log( result.data ) 
		ezch_tbl_editorFactory.update_editLists( ezch_tbl_editorFactory.saved_config_list.tbl_data );
	}
	const updateViewConfig = async ( spread )=>{
		let updateConfig_data = ezch_tbl_editorFactory.sheet_TblView_table.config_data 
		if( updateConfig_data == null ){ alert("잘못된 정보입니다."); return -1 }
		if( updateConfig_data.tblViewConfig != null ){
			for( const [key, value] of Object.entries( updateConfig_data.tblViewConfig )){
				ezch_tbl_editorFactory.cellBinding_config_list[key] = value ; 
			}		
			ezch_tbl_editorFactory.sheet_TblView_table.tbl_columns = updateConfig_data.tbl_view.tbl_columns 
			Object.assign( ezch_tbl_editorFactory.sql_state , updateConfig_data.sql_state ) 
		}	
		spread.getSheet(0).getRange( ezch_tbl_editorFactory.pos.TblView.input_cur_userConfig ).text( updateConfig_data.configName );
//1		ezch_tbl_editorFactory.tbl_name  = updateConfig_data.data.tbl_name ; 
//1	        await this.updateDataSql( spread )
		spread.getSheet(0).visible(true); 
		spread.setActiveSheetIndex(0); 
		return updateConfig_data 
	}		
/*1		
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
	this.updateViewConfig = ( spread, updateConfig )=>{
		let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == updateConfig )
		if( recon_index == -1 ){ alert("항목오류입니다."); return }
		let updateConfig_data = saved_config_list.tbl_data[ recon_index ]; 
		for( const [key, value] of Object.entries( updateConfig_data.tblViewConfig )){
			ezch_tbl_editorFactory.cellBinding_config_list[key] = value ; 
		}		
		spread.getSheet(0).getRange('M6:M6').text( updateConfig );
		this.updateSql( spread )
		spread.getSheet(0).visible(true); 

	} */
	this.updateConfig = ( spread , updateConfig )=>{
		if( updateConfig == null || updateConfig == '' ){
			alert("잘못된 정보입니다")
			return 
		}
		let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == updateConfig )
		if( recon_index == -1 ){ alert("항목오류입니다."); return }
/*1		
		let cell_savedConfig = spread.getSheet(1).getRange("N2") 
                spread.getSheet(1).setValue( cell_savedConfig.row, cell_savedConfig.col, updateConfig ) 
		this.updateServerSide()
*/		
		let updateConfig_data = saved_config_list.tbl_data[ recon_index ]; 
/*1		
		ezch_tbl_editorFactory.sheet_TblView_table.config_data = updateConfig_data 
		ezch_tbl_editorFactory.sheet_TblView_table.config_name = updateConfig_data.configName 
		// set UI.. config Name.. 
		ezch_tbl_editorFactory.updateConfigName( updateConfig_data.configName ) 
*/
		this.sheet_TblList_table_updateSchema_conf( spread, updateConfig_data ) 
		this.invalid_tblView( spread );
		this.sheet_TblView_update_configData( spread ) 

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
	this.addConfig = async ( spread, newConfig )=>{
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
// Add TblView config options saving.
		let  TblView_config = ezch_tbl_editorFactory.cellBinding_config_list  
//1		TblView_config.tbl_name = ezch_tbl_editorFactory.cellBinding_config_list.tbl_name ; 
		TblView_config.tbl_name = ezch_tbl_editorFactory.sheet_TblView_table.tbl_name  ; 
		TblView_config.cur_config_name = newConfig 
		
		saved_config_list.tbl_data.push({ configName: newConfig , delete: false, tblViewConfig: JSON.parse( JSON.stringify( TblView_config )) }) 
//1		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		await this.updateServerSide()

	}
/*1	
	this.updateTblList = async ( spread, user_db , config_name = null )=>{
	     ezch_tbl_editorFactory.cur_db = user_db ;
	     let sheet1 = spread.getSheet(1); 
	     await this.getServerSide() 	
	     let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
	     let cell_savedConfig = sheet1.getRange('N2').backColor('#E3EFDA') 
	     let del_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     del_cellButton.text('Delete') 

	     let tableCol1 = new GC.Spread.Sheets.Tables.TableColumn(1, 'configName', 'Conifg List' ) 
	     let tableCol2 = new GC.Spread.Sheets.Tables.TableColumn(2, 'delete', 'Del' , null, del_cellButton ) 	
             
	     ezch_tbl_editorFactory.saved_config_list.tbl_columns = [ tableCol1, tableCol2 ]
 
	     saved_config_list.tbl_view.autoGenerateColumns( false ) 
	     saved_config_list.tbl_view.bind([ tableCol1 , tableCol2 ]  , 'tbl_data', saved_config_list )		
		
	     if( config_name != null )this.updateConfig( spread , config_name ); 	
		
	}
*/
	this.initTblList = async ( spread , configName = null )=>{
	     let initDesign = await $http.get('/app/ezch_tbl_editor_app/ezct_tbl_editor.ssjson')
	      spread.fromJSON( initDesign.data ) 
////////////////////////////////////////////////////////
/*   
		Spread config. 
*/
		spread.options.tabEditable = false ;
		spread.options.allowSheetReorder = false ;
		spread.options.newTabVisible = false ; 
//		spread.options.tabStripVisible = false ;
		spread.options.tabNavigationVisible = false ;
		spread.options.showHorizontalScrollbar = true;
		spread.options.showVerticalScrollbar = true;
		let sheet1  = spread.getSheetFromName('TblList') 
		let TableList  = sheet1.tables.findByName( ezch_tbl_editorFactory.sheet_TblList_table_tblList.name ); 
		ezch_tbl_editorFactory.sheet_TblList_table_tblList.tbl_view  = TableList;

		let headers = {}
	   	let user_id = $cookies.get('user')
	   	ezch_tbl_editorFactory.sheet_TblView_table.user_id  = user_id ; 
	   	ezch_tbl_editorFactory.sheet_TblList_table_tblList.user_id  = user_id ; 
		let user_DB
			 user_DB = ezch_tbl_editorFactory.cur_db =  $cookies.get('user_DB')
	   	ezch_tbl_editorFactory.sheet_TblView_table.db_name  = user_DB ; 
	   	ezch_tbl_editorFactory.sheet_TblList_table_tblList.db_name  = user_DB ; 
		if( user_DB )headers['user_DB'] = user_DB
		if( user_id )headers['user_id'] = user_id

		let appDataHdr = await $http.get(`/tbl_editor/${ user_DB }/tbl_list`)
		let tbl_list  = appDataHdr.data.DATA
		spread.setActiveSheetIndex(1)

		sheet1.options.isProtected = false
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.addColumn_info ).locked( false )
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.tbl_schema_order_info ).locked( false )
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.tbl_schema_edit_info ).locked( false )
		sheet1.options.isProtected = true
		sheet1.options.protectionOptions.allowResizeColumns = true ;

		let cellSource = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editorFactory.schema_add )
		let cell_bind = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_schema_add.No ).backColor('LemonChiffon');
		let cell_curTable = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.curTable )
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_schema_add.Field ).backColor('LemonChiffon');

		sheet1.setBindingPath( cell_bind.row, cell_bind.col , 'No' )
		sheet1.setBindingPath( cell_bind.row, cell_bind.col +1  , 'Field' )  
		sheet1.setBindingPath( cell_curTable.row, cell_curTable.col , 'curTable' )  
		sheet1.setDataSource( cellSource )
		var tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(1, "tbl_name", "Table Name");
		let tbl_nameList = ezch_tbl_editorFactory.sheet_TblList_table_tblList.tbl_data  = tbl_list.map( (ent)=>{ return { tbl_name : ent.TABLE_NAME }} )
// Add Sorting.
		tbl_nameList.sort((a,b)=>{
		   if( a.tbl_name[0] < b.tbl_name[0] )return -1 ;
		   if( a.tbl_name[0] > b.tbl_name[0] )return 1 ;
		   return 0;
		})
// limit to table list max 200
         	ezch_tbl_editorFactory.sheet_TblList_table_tblList.tbl_columns = [tableColumn1]

		TableList.autoGenerateColumns(false);
		TableList.bind([tableColumn1], 'tbl_data', ezch_tbl_editorFactory.sheet_TblList_table_tblList );

		let tbl_name = tbl_nameList[0].tbl_name
	   	ezch_tbl_editorFactory.sheet_TblView_table.tbl_name  = tbl_name ; 
	   	ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_name  = tbl_name ; 

		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_view = sheet1.tables.findByName( ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.name );
		let tableColumns = [],
		names = ['No', 'Field', 'Comment', 'Type', 'Null', 'primaryKey', 'Default', 'Extra' , 'Formatter', 'visible' ],
		labels = ['No', 'Field', 'Comment', 'Type', 'Null', 'primaryKey', 'Default', 'Extra', 'Formatter', 'visible' ];
		names.forEach( (name, index )=>{
			let  tableColumn = new GC.Spread.Sheets.Tables.TableColumn();
			tableColumn.name( labels[index] );
			tableColumn.dataField( name ) ;
			tableColumns.push( tableColumn );
		});
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_columns = tableColumns
		await this.sheet_TblList_table_updateSchema( spread, tbl_name )
		await this.sheet_TblView_init( spread ); 
 		await this.getServerSide() 

	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   TblList :  table schema 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_TblList_table_updateSchema_conf = async ( spread, config_data )=>{
	   	ezch_tbl_editorFactory.sheet_TblView_table.tbl_name  = config_data.data.tbl_name ; 
                ezch_tbl_editorFactory.sheet_TblView_table.config_name = config_data.configName  
                ezch_tbl_editorFactory.sheet_TblView_table.config_data = config_data

	   	ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_name  = config_data.data.tbl_name ; 
		ezch_tbl_editorFactory.schema_add.curTable = config_data.data.tbl_name ;
		ezch_tbl_editorFactory.updateConfigName( config_data.configName )

	        let sheet1 = spread.getSheetFromName('TblList'); 
// invalidate current configure ... 2023-03-09  sqlState_where also. 		
		this.invalid_tblView( spread );
		ezch_tbl_editorFactory.cellBinding_config_list.sqlState_where = 'order by seq desc'  
		ezch_tbl_editorFactory.cellBinding_config_list.sql_enable = false 

		let schema_tbl = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema 
		schema_tbl.tbl_data = config_data.data.tbl_info.tbl_schema 

		schema_tbl.tbl_view.autoGenerateColumns( false );
		schema_tbl.tbl_view.bind(  schema_tbl.tbl_columns , 'tbl_schema', config_data.data.tbl_info );
		let  cell = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport );
		let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
		cellType2.items([true,false]) 
		config_data.data.tbl_info.tbl_schema.forEach(( ent, indx )=>{
			   if( indx == 0 ) 
			  	 sheet1.getCell( cell.row + indx , cell.col ).cellType().items([true])  // seq can't invisible.. 
			   else
			  	 sheet1.getCell( cell.row + indx , cell.col ).cellType( cellType2 )  //  rest.  

		}) 
		sheet1.options.isProtected = false 
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.addColumn_info ).locked( false )
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.tbl_schema_order_info ).locked( false ).backColor('LemonChiffon')
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.tbl_schema_edit_info ).locked( false ).backColor('LemonChiffon')
		sheet1.options.isProtected = true 
	}
	this.sheet_TblList_table_updateSchema = async ( spread, tbl_name )=>{
	   	ezch_tbl_editorFactory.sheet_TblView_table.tbl_name  = tbl_name ; 
	   	ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_name  = tbl_name ; 
	        let sheet1 = spread.getSheetFromName('TblList'); 
// invalidate current configure ... 2023-03-09  sqlState_where also. 		
		this.invalid_tblView( spread );
		ezch_tbl_editorFactory.cellBinding_config_list.sqlState_where = 'order by seq desc'  
		ezch_tbl_editorFactory.cellBinding_config_list.sql_enable = false 
		
		let headers = {}
		let user_DB = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.db_name 
		if( user_DB )headers['user_DB'] = user_DB 

		tbl_name_1 = tbl_name.replace('TB_','') 

		let schemaDataHdr = await $http.get(`/tbl_editor/${ tbl_name_1 }`, { headers: headers } ) 
		let schema_data = schemaDataHdr.data.DATA  
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_name  = tbl_name
		ezch_tbl_editorFactory.sheet_TblView_table.tbl_name  = tbl_name
		ezch_tbl_editorFactory.schema_add.curTable = tbl_name ; 
		
		let schema_tbl = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema 
		schema_tbl.tbl_data = [] 
		i = 1 
		for( const [ key, value]  of Object.entries( schema_data )){
			  let formatter = '@'
			  console.log( key, value ) 
			  if( value.type == 'DATETIME' || value.type == 'DATE' )formatter = 'YY/MM/DD';
			  if( value.type == 'MONEY' )formatter = '/* ###,###,###';
			  let entry = { 'No': i , 'Field': key , 'Comment': value.comment , 'Type': value.type , 'Null': value.allowNull, 'primaryKey': value.primaryKey , 'Default': value.defaultValue ,'Formatter': formatter , 'visible': true }  
			  schema_tbl.tbl_data.push( entry ) 
			  i++ 
		}
		schema_tbl.tbl_view.autoGenerateColumns( false );
		schema_tbl.tbl_view.bind(  schema_tbl.tbl_columns , 'tbl_data', schema_tbl );
		let  cell = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport );
		let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
		cellType2.items([true,false]) 
		schema_tbl.tbl_data.forEach(( ent, indx )=>{
			   if( indx == 0 ) 
			  	 sheet1.getCell( cell.row + indx , cell.col ).cellType().items([true])  // seq can't invisible.. 
			   else
			  	 sheet1.getCell( cell.row + indx , cell.col ).cellType( cellType2 )  //  rest.  

		}) 
		sheet1.options.isProtected = false 
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.addColumn_info ).locked( false )
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.tbl_schema_order_info ).locked( false ).backColor('LemonChiffon')
		sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.tbl_schema_edit_info ).locked( false ).backColor('LemonChiffon')
		sheet1.options.isProtected = true 
//		this.updateTable_name( spreadjs_product , spreadJs_factory , tbl_name )
// clear configName. 
                ezch_tbl_editorFactory.sheet_TblView_table.config_name = null 
                ezch_tbl_editorFactory.sheet_TblView_table.config_data = null 
		ezch_tbl_editorFactory.cellBinding_config_list.cur_config_name = null  
		ezch_tbl_editorFactory.updateConfigName( 'no configuration mode')
	}
	 this.sheet_TblList_tableSchema_change_visible_status = ( spread ,current_index , value )=>{
		spread.isPaintSuspended( true ) 
		 if( value != 99 ){
				ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data[current_index -1].No = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.length + 2 
		 }else{
				ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data[current_index -1].No = 99 
		 }
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.sort((a,b)=>{ return ( a.No - b.No )})
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.forEach(( ent, indx )=>{
			if( ent.No != 99 )ent.No = indx + 1   
		}) 
		spread.isPaintSuspended( false ) 
	 }
	 this.sheet_TblList_tableSchema_change_schema_order = ( spread ,insert_index , current_index )=>{		
		 // if No. seq don't change order.. 
		if( insert_index == 1 )insert_index = current_index 
      		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data[current_index -1].No = 900 + insert_index  
		spread.isPaintSuspended( true ) 

		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.forEach(( ent, indx )=>{
			if( ent.No >= insert_index && ent.No < current_index )ent.No++
			if( ent.No <= insert_index && ent.No >= current_index )ent.No--
		})
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data[current_index -1].No =  insert_index  
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.sort((a,b)=>{ return ( a.No - b.No )})
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.forEach(( ent, indx )=>{
			if( ent.No != 99 )ent.No = indx + 1   
		}) 
		spread.isPaintSuspended( false ) 
	}
	
}])
.service('ezch_tbl_editor_eventsService', ['$injector', function($injector){
	var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService') 
	var ezch_tbl_editorFactory = ezch_tbl_editorService.getEzch_tbl_editorFactory();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   spread.  events 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   TblList :  events 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 this.sheet1_cellChanged  = ( spread , sender , args )=>{
		 let  sheet1 = spread.getSheetFromName('TblList')
		//	 schema_tbl_update_flag = 0 ;

		 let cell = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_order_start , GC.Spread.Sheets.SheetArea.viewport ); 
		 let cell_visible  = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport ); 
		 let schema_tbl = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema 
		 let data_range = schema_tbl.tbl_view.dataRange(); 
		if( args.row == 0 && args.col == 4 ){
					const  key  = sheet1.getValue( args.row , args.col ) 
					console.log( key ) 
		}else if( args.col == cell.col  && args.row >= cell.row && args.row <= data_range.row + data_range.rowCount  ){
					if( !isNaN(args.newValue ))
						ezch_tbl_editorService.sheet_TblList_tableSchema_change_schema_order( spread , args.newValue , args.oldValue ) 

		}else if( args.col == cell_visible.col && args.row >= cell_visible.row && args.row <= data_range.row + data_range.rowCount ){
					switch( args.newValue ){
						case true:
						case "TRUE":	
							ezch_tbl_editorService.sheet_TblList_tableSchema_change_visible_status( spread , args.row - cell_visible.row +1  , 1  );
							break;
						case false:
						case "FALSE":	
							ezch_tbl_editorService.sheet_TblList_tableSchema_change_visible_status( spread , args.row - cell_visible.row +1 ,  99 );
							break; 
						default:
				}
		}
	}
	this.sheet1_cellDoubleClick = ( spread, sender, args )=>{
		let sheet1 = spread.getSheetFromName('TblList')
		let tbl_list = ezch_tbl_editorFactory.sheet_TblList_table_tblList 
		let data_range = tbl_list.tbl_view.dataRange(); 
		let cell = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_tblList_data_start , GC.Spread.Sheets.SheetArea.viewport ); 
		 
		let cell_update  
		if( args.col == cell.col ){
			const  key  = sheet1.getValue( args.row , args.col ) 
		        console.log( key ) 
			if( args.row >  data_range.row && args.row <= data_range.row + data_range.rowCount ){
		//1		schema_tbl_update_flag = 1
				ezch_tbl_editorService.sheet_TblList_table_updateSchema( spread , key )
			}	
		//1        setTimeout( ()=>{ schema_tbl_update_flag = 0 }, 3000 ) 
		}else{
		}		
	}
	this.sheet1_buttonClicked = ( spread, sender, args )=>{
		  let sheet1 = spread.getSheetFromName('TblList'); 
		  let cell_genTblView = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.btn_get_tblView )
		  let cell_addCol  = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.btn_addColumn ) 
		  console.log( ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data ); 
		  if( args.row == cell_addCol.row ){
			  switch( args.col ){
			          case cell_addCol.col:	        
					let new_column = JSON.parse( JSON.stringify( ezch_tbl_editorFactory.schema_add )) 
					ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.push( new_column )	
					ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.sort((a,b)=>{ return ( a.No - b.No )})
					ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.forEach(( ent, indx )=>{
						if( ent.No != 99 )ent.No = indx + 1   
					}) 
					let table = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_view  
					table.autoGenerateColumns( false ) 
					table.bind( ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_columns, 'tbl_data', ezch_tbl_editorFactory.sheet_TblList_table_tblSchema );
					let  cell = sheet1.getRange( ezch_tbl_editorFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport );
					let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
					cellType2.items([true,false]) 
					ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_data.forEach(( ent, indx )=>{
						   if( indx == 0 )return ; 
						   sheet1.getCell( cell.row + indx , cell.col ).cellType( cellType2 ) 
					}) 
					break;
				default:
			  }
		  }else if( args.row == cell_genTblView.row ){  // row 0 
			  switch( args.col){
				  case cell_genTblView.col:
					  spread.getSheet(0).visible(true); 
					  ezch_tbl_editorService.sheet_TblView_update_genTblView( spread ); 
					  break;
				  default:
			  }
		  }
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   TblView :  events 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet0_cellChanged  = ( spread , sender , args )=>{
		 let sheet0 = spread.getSheet(0)
		 let activeSheet = spread.getActiveSheet() 
		 let cell_sql = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.input_sqlState , GC.Spread.Sheets.SheetArea.viewport ); 
		 let cell_saveTitle  = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.input_cur_userConfig, GC.Spread.Sheets.SheetArea.viewport ); 
		 if( args.col == cell_sql.col && args.row == cell_sql.row ){
			 ezch_tbl_editorFactory.input_sqlState_changed = true 
		 }
	 }	
	 this.sheet0_buttonClicked = ( spread , sender, args )=>{
		  let sheet0 = spread.getSheet(0) 
		  let cell_lock = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_unlock ) 
		  let cell_rtArea = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.pos_data_start ) 
		  let cell_massCheck = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.check_mass ) 
		  let cell_sqlCheck = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.check_enableSql ) 
		  let cell_exec = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_insert_data ) 
		  let cell_update = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_update ) 
		  let cell_updateSql = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_exec_sql ) 
		  let cell_savedConfig = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.btn_save_userConfig ) 
		  let cell_filterCells = sheet0.getRange(  ezch_tbl_editorFactory.pos.TblView.btn_filter_selected )

		  if( args.row == cell_lock.row ){
			  console.log( ezch_tbl_editorFactory.lastSelections ) 
			  switch( args.col ){
				  case cell_filterCells.col:
						let cell_bt5 = ezch_tbl_editorFactory.tblView_filter.button_obj ;
						let state_f = 1 - ezch_tbl_editorFactory.tblView_filter.filter_state ;
						cell_bt5.text( ezch_tbl_editorFactory.tblView_filter.text[state_f] )
						ezch_tbl_editorFactory.tblView_filter.filter_state = state_f ;  
						ezch_tbl_editorService.applyFilter( spread, state_f ); 
					  break; 
				  case cell_lock.col:
	//				  spread.options.isProtected = false 
					  console.time("answer time");
					  console.timeLog("answer time");
					  sheet0.options.isProtected = false 
					  sheet0.suspendPaint();
// add selection before Exc update.
					  ezch_tbl_editorFactory.currentSelections = ezch_tbl_editorFactory.currentSelections.concat( ezch_tbl_editorFactory.lastSelections )
					  for( selection of ezch_tbl_editorFactory.currentSelections ){
						  if( selection.row > cell_rtArea.row )
							  sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).styleName('UNLockStyle').locked( false ) 
					  }
					  sheet0.resumePaint();	
					  console.log("lastSelections:")
					  console.timeLog("answer time");
					  sheet0.options.isProtected = true 
					  console.timeEnd("answer time");
					  let activeCell = ezch_tbl_editorFactory.lastSelections[0] ;
					  sheet0.setActiveCell( activeCell.row, activeCell.col ); 

					  break;
				  case cell_massCheck.col:
					  console.log( sheet0.getCell( cell_massCheck.row , cell_massCheck.col ).value() ) 
					   let  toggle_value  = sheet0.getCell( cell_massCheck.row , cell_massCheck.col ).value() 
					   ezch_tbl_editorService.sheet_TblView_massCheck_toggle( spread, toggle_value ) 
					  break;
/* move to sheet_TblView_clear_unlockedCells function.					  
				  case cell_update.col:
//  clear unlock cells.. 					  
					  sheet0.options.isProtected = false 
					  console.log("isProtected:")
					  console.timeLog("answer time");
					  for( selection of ezch_tbl_editorFactory.currentSelections ){
						  if( selection.row > cell_rtArea.row ){
							  sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).locked( true ) 
							  sheet0.clear( selection.row , selection.col, selection.rowCount , selection.colCount , GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style ) 
						  }
					  }
					  console.log("currentSelections:")
					  console.timeLog("answer time");
					  sheet0.options.isProtected = true  
					  ezch_tbl_editorService.updateData_2( ezch_tbl_editorFactory.spreadjs_product , spread , ezch_tbl_editorFactory.sheetFormat_service, null , 2 )  // call_source 2: TblView update. 
					  break;
*/					  
				   case cell_savedConfig.col:
					  let newConfig = sheet0.getRange( ezch_tbl_editorFactory.pos.TblView.input_cur_userConfig ).text();
					  ezch_tbl_editorService.addConfig( spread , newConfig );  // call soruce 2 : tblView. 
					  break;
				  default:	  
			  }
		  }else if( args.row == cell_updateSql.row && args.col == cell_updateSql.col ){
		                  ezch_tbl_editorFactory.cellBinding_config_list.sql_enable = true 
				  ezch_tbl_editorService.sheet_TblView_update_execSql( spread )  // call_source 2: TblView update. 
		  }else if( args.row == cell_sqlCheck.row && args.col == cell_sqlCheck.col ){
		                  ezch_tbl_editorService.sheet_TblView_invalidate_sqlInput( spread, !ezch_tbl_editorFactory.cellBinding_config_list.sql_enable ); 
		  }else if( args.row == cell_exec.row && args.col == cell_exec.col ){
				  ezch_tbl_editorService.sheet_TblView_insertData_DB( spread ) 
		  }else if( args.row == cell_update.row && args.col == cell_update.col ){
				  ezch_tbl_editorService.sheet_TblView_update_genTblView( spread ); 
		  }
	  }
	this.sheet0_selectionChanged = ( spread, sender, args )=>{
		ezch_tbl_editorFactory.lastSelections = args.oldSelections 
	}		

}]);
