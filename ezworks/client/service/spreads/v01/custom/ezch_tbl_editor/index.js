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
				addColumn_info: 'N9:N9',
				tbl_schema_order_info:'E11:E111',
				tbl_schema_edit_info: 'M11:N111' ,
				pos_schema_add: { No: 'E9:E9' , Field: 'F9:F9' },
				pos_yesno_start: 'N11:N11' ,
				pos_order_start: 'E10:E10' ,
				pos_tblList_data_start: 'C10:C10'
			},
		      },	
		sheet_TblView_table:{ name: 'Table1', user_id: null , db_name: null , tbl_name: null , config_name: null, tbl_view: null, tbl_pos: null , tbl_columns: null,  tbl_data_1: null , data:[]},
		sheet_TblList_table_tblList :{ name: 'Table1', user_id: null,  db_name : null , tbl_view: null , tbl_columns: null , tbl_data:[]},
		sheet_TblList_table_tblSchema :{ name: 'Table2', db_name: null,  tbl_name: null , tbl_view: null , data:[]},
		binding_data: { cur_server : null , cur_DB: null, cur_user: null , cur_organization: null ,  cur_login: null , cur_table: null },
		schema_add: { No : 3 , Field :'Add Col', visible: true , curTable: null },
//1		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		saved_config_list :  { tbl_view : null , tbl_columns : null , tbl_data : [{ configName: 'Test01', delete: false },{ configName:'e_approval_request01', delete: false }] } ,
		cellBinding_config_list: { tbl_name : 'TB_admin_1' , mass_enable: false , sql_enable: false , sqlState_where: 'order by seq desc' , cur_config_name: '' }, 
		spread: null ,
//1		tbl_name:'TB_통관기록',
//1		cur_db: 'ezchemtech',
//1		config_name:'TB_통관기록', 
//1		cur_id: 'richard.choi@ez-office.co.kr',
		sql_state: { pos: null , state_1 :  'select ', state_2:'order by seq desc' },
		bl_set_flag: 0,
		async_updates:[],
// tblView( sheet0 ) runtime lock.. 
	        lock_style: null,
		unlock_style: null, 
		lastSelections: [],
		currentSelections: [],
// tblView( sheet0 ) Filter.. 
		tblView_filter: { button_obj: null, text: ['선택필터적용' ,'선택필테해제'], filter_state: 0 , filter_info: [] }, 
//functions.		
		update_editLists : null,
		update_cur_db: null,
		updateAlertInfo: null,
		updateConfigName : null 
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
	      let table1 = ezch_tbl_editorFactory.tblView_tbl.tbl_view ;
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
		    reoFilter.reset();  		    
	     } 	     
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
//			let tbl_data  = await $http({ method:'POST', url:`/tbl_editor/${user_db}/admin_1/sql`, data: { sql_state: sqlState } })
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
	this.invalid_tblView = ( spread )=>{
		spread.getSheet(0).visible( false ); 
	}
        this.saveTblViewConfig = ( spread )=>{
	}
	this.massCheck_toggle = ( spread, IsMass )=>{
		let sheet0 = spread.getSheet(0);
		let mass_check = sheet0.getRange('B11:B11')
		for( i = 1; i < 5; i++ )sheet0.setRowVisible( mass_check.row +i , IsMass ) 
	}
	this.updateData_1 = async( spread, user_db = null , call_source = 1 )=>{   // call_source:1  tblList, 2: sql_run
/*
 * 	windows pop up.. 
*/		
                let newWin = window.open("about:blank","updateData_1","width=400,height=200, left=800, top=400");
/*		
		newWin.document.write(
			`<script>window.opener.document.body.innerHTML ='${ezch_tbl_editorFactory.tbl_name} Data loading..'</script>`	
		);	

*/
		newWin.focus();
//		alert(newWin.location.href); // (*) about:blank, loading hasn't started yet
		let load_message =''		
		newWin.onload = function() {
		  let html = `<div style="font-size:30px">${ezch_tbl_editorFactory.tbl_name} Data loading..\n${ load_message }</div>`;
		  newWin.document.body.insertAdjacentHTML('afterbegin', html);
		};

		let sheet0 = spread.getSheet(0) 
		var tbl_columns =  await $http.get('/data/admin_1_schema.json')
//		let tbl_data    =  await $http.get('/data/admin_1_data.json')
		if( user_db == null )user_db = ezch_tbl_editorFactory.cur_db 
		let tbl_name = ezch_tbl_editorFactory.tbl_name.replace('TB_',''); 
		newWin.document.write("Start access DB data\n");
//		let tbl_data  = await $http.get(`/tbl_editor/${ user_db}/admin_1`)
		let tbl_data  = await $http.get(`/tbl_editor/${ user_db}/${tbl_name}`)
		tbl_data.data = tbl_data.data.DATA 
		load_message += " DB Loading done";

//		tbl_columns = ezch_tbl_editorFactory.tblView_tbl.tbl_columns = tbl_columns.data 
		tbl_columns = []
		let headInfos = Object.keys( tbl_data.data[0] )
		headInfos.forEach(( ent, index )=>{
			tbl_columns.push( { No: index , Field: ent , Formatter:'@'}) 	
		})
		ezch_tbl_editorFactory.tblView_tbl.tbl_columns = tbl_columns 
				
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
		
		// let rowFilter = sheet0.rowFilter();

		let sql_pos = ezch_tbl_editorFactory.sql_state.pos 
		tbl_name = ezch_tbl_editorFactory.tbl_name
		let field_list = nameOnly.join(',') 
		let state = `select ${ field_list } from ${tbl_name}` 
		ezch_tbl_editorFactory.sql_state.state_1 = state ;
//		state = ezch_tbl_editorFactory.sql_state.state_2 ; 
//		sheet0.getCell( sql_pos.row, sql_pos.col).value( state ).wordWrap(true)  
		
		ezch_tbl_editorFactory.cur_db = user_db ;
		newWin.document.write(load_message);
		await setTimeout( 1000 ); 
		newWin.close();
// override configuration. 
		switch( call_source){
			case 1:
				await this.updateViewConfig( spread , ezch_tbl_editorFactory.config_name ); 
				spread.getSheet(0).visible( true );
				spread.setActiveSheetIndex(0);
				break;
		        case 2:
				break;
		}		
// 

	      spread.commandManager().register('nv_down', 
		      function nv_down(){
			     let s_index =  spread.getActiveSheetIndex()  
			     if( s_index == 0){
			     		let end_p = ezch_tbl_editorFactory.tblView_tbl.tbl_data_1.length  
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
			     		let end_p = ezch_tbl_editorFactory.tblView_tbl.tbl_columns.length  
				        let activeRowIndex = sheet0.getActiveRowIndex() 
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
				     let rowDelta = ( ezch_tbl_editorFactory.tblView_tbl.tbl_data_1.length + 17 ) - (selections[0].row + selections[0].rowCount )	

				     if( selections[0].row > 17 && rowDelta > 0 )
				     {	     
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
				     let colDelta = ( ezch_tbl_editorFactory.tblView_tbl.tbl_columns.length +1 ) - ( selections[0].col + selections[0].colCount ) 	
				     if( selections[0].col > 0 && colDelta > 0) 	 
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount + colDelta ); 
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
	this.initTblView = async ( spread )=>{
	      ezch_tbl_editorFactory.spread = spread ;

	      let source = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editorFactory.cellBinding_config_list )	

	      let sheet0 = spread.getSheet(0); 
	      sheet0.name('TblView')
	      sheet0.setColumnCount(30)
	      sheet0.setRowCount(50000) 	
	      let defaultStyle = new GC.Spread.Sheets.Style() 
	      sheet0.suspendPaint();
	      sheet0.setDefaultStyle( defaultStyle ) 
	      sheet0.resumePaint() 
	      sheet0.frozenRowCount(17) 
	      let cell_massCheck = sheet0.getRange('C7') 
	      sheet0.setRowHeight( cell_massCheck.row-1, 40 ) 	
	      sheet0.setRowHeight( cell_massCheck.row, 40 ) 	
//	      sheet0.setValue( cell_massCheck.row-1 , cell_massCheck.col -1 , 'sql조건' ) 
	      sheet0.setValue( cell_massCheck.row , cell_massCheck.col -1 , '대량데이터' ) 
	      let cell_c1 = new GC.Spread.Sheets.CellTypes.CheckBox() 
	      sheet0.clear( cell_massCheck, cell_massCheck.col, 1,1, GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style ) 
	      sheet0.setCellType( cell_massCheck.row, cell_massCheck.col, cell_c1 ) 	

	      sheet0.setBindingPath( cell_massCheck.row, cell_massCheck.col, 'mass_enable' )		
//	      sheet0.setCellType( cell_massCheck.row-1, cell_massCheck.col, cell_c1 ) 	
		
	      sheet0.setValue( cell_massCheck.row-1 , cell_massCheck.col +3 , '현재테이블' ) 
	      let r = sheet0.getRange('G6:G6').backColor('#fefce3').text('TB_Admin_1') 	
              r.setBorder( new GC.Spread.Sheets.LineBorder('#7FFFD4', GC.Spread.Sheets.LineStyle.medium ), { all:true }, 3 );  			

	      let cell_bt1 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt1.text('대량데이터실행')
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +1 , cell_bt1 ) 
//	      sheet0.setCellType( cell_massCheck.row-1 , cell_massCheck.col +1 , cell_bt1 ) 
// Select Filter button.. 
	      let cell_bt5 = new GC.Spread.Sheets.CellTypes.Button() 
	      ezch_tbl_editorFactory.tblView_filter.button_obj = cell_bt5 ;	
	      cell_bt5.text( ezch_tbl_editorFactory.tblView_filter.text[0] )
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +3 , cell_bt5 ) 


	      let cell_bt2 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt2.text('잠금해제')
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +4 , cell_bt2 ) 
	      let cell_bt3 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt3.text('새로고침/SQL 실행')
	      sheet0.setCellType( cell_massCheck.row , cell_massCheck.col +5 , cell_bt3 ) 

	      let cell_bt4 = new GC.Spread.Sheets.CellTypes.Button() 
	      cell_bt4.text('즐겨찾기 저장')
	      sheet0.getRange('M7:M7').cellType( cell_bt4 ) 
	      r = sheet0.getRange('M6:M6').backColor('#fefce3').text('TB_Admin_1')
              r.setBorder( new GC.Spread.Sheets.LineBorder('#7FFFD4', GC.Spread.Sheets.LineStyle.medium ), { all:true }, 3 );  			

	      sheet0.addSpan( cell_massCheck.row - 3 , cell_massCheck.col +6 , 4, 4 )			
	      sheet0.getCell( cell_massCheck.row - 3 , cell_massCheck.col +6 ).backColor('#fefce3')
	      r = sheet0.getRange( cell_massCheck.row -3 , cell_massCheck.col + 6,4,4 );
              r.setBorder( new GC.Spread.Sheets.LineBorder('#7FFFD4', GC.Spread.Sheets.LineStyle.medium ), { all:true }, 3 );  			
	      sheet0.setBindingPath( cell_massCheck.row -3 , cell_massCheck.col + 6 , 'sqlState_where' );	

//	      sheet0.addSpan( cell_massCheck.row - 3 , cell_massCheck.col +10 , 4, 4 )			
		
	      let sql_enable = new GC.Spread.Sheets.CellTypes.CheckBox()
	      sql_enable.caption('SQL input Enable')
	      let cellH6 = sheet0.getRange('H6:H6').cellType( sql_enable ); 
	      sheet0.setBindingPath( cellH6.row, cellH6.col, 'sql_enable' )		


// mass data input..
	      r = sheet0.getRange('B11:O15').backColor('#fefce3');
              r.setBorder( new GC.Spread.Sheets.LineBorder('#7FFFD4', GC.Spread.Sheets.LineStyle.medium ), { all:true }, 3 );  			
	      sheet0.getRange('B11:B15').backColor('#cccccc');
		

	      ezch_tbl_editorFactory.sql_state.pos = sheet0.getRange('I4')	
		
// init column with ..
	      sheet0.setColumnWidth( 3, 200 );
	      sheet0.setColumnWidth( 5, 200 );
	      sheet0.setColumnWidth( 6, 200 );
	      sheet0.setColumnWidth( 7, 200 );
	      sheet0.setColumnWidth( 8, 400 );
	      sheet0.setColumnWidth( 12, 200 );

	      this.massCheck_toggle( spread, false ); 	
//

	      let cell_tblData = sheet0.getRange('B17') 	
	      let table1 = ezch_tbl_editorFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableView', cell_tblData.row , cell_tblData.col, 120, 20 );
	      ezch_tbl_editorFactory.tblView_tbl.tbl_pos = cell_tblData 
	      table1.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 

	      sheet0.setDataSource( source )
// Keyboard Actions init.. 	 
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
			     	sheet0.showColumn( 1 , 1 )	      
				sheet0.setActiveCell( activeRowIndex , 1 )      
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
		      function bl_left(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editorFactory.bl_set_flag 
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections(); 
				     if( selections[0].row > 17 )
				     {	     
				     	selections[0].rowCount += selections[0].row - 17 	
				     	selections[0].row = 17 
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
				     selections[0].colCount += selections[0].col - 1 	
				     selections[0].col = 1 
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
// set unlock Style. 
              ezch_tbl_editorFactory.unlock_style = new GC.Spread.Sheets.Style(); 
	      ezch_tbl_editorFactory.unlock_style.name = 'UNlockStyle'; 
	      ezch_tbl_editorFactory.unlock_style.backColor = 'LemonChiffon'; 
	      sheet0.addNamedStyle( ezch_tbl_editorFactory.unlock_style ); 	
		

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   TblList : Services 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

		let updateConfig_data = saved_config_list.tbl_data[ recon_index ]; 
		ezch_tbl_editorFactory.config_name = updateConfig_data.configName 
		ezch_tbl_editorFactory.updateConfigName( updateConfig_data.configName ) 
		this.invalid_tblView( spread );

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
// Add TblView config options saving.
		let  TblView_config = ezch_tbl_editorFactory.cellBinding_config_list  
		TblView_config.tbl_name = ezch_tbl_editorFactory.cellBinding_config_list.tbl_name ; 
		TblView_config.cur_config_name = newConfig 
		
		saved_config_list.tbl_data.push({ configName: newConfig , delete: false, tblViewConfig: JSON.parse( JSON.stringify( TblView_config )) }) 
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		this.updateServerSide()

	}
	this.updateTblList = async ( spread, user_db , config_name = null )=>{
	     ezch_tbl_editorFactory.cur_db = user_db ;
	     let sheet1 = spread.getSheet(1); 
	     await this.getServerSide() 	
	     let saved_config_list = ezch_tbl_editorFactory.saved_config_list 
	     let cell_savedConfig = sheet1.getRange('N2').backColor('#E3EFDA') 
//	     saved_config_list.tbl_view = sheet1.tables.add( 'configList', cell_savedConfig.row + 2 , cell_savedConfig.col , 1 , 2 ) 	
	     let del_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     del_cellButton.text('Delete') 

	     let tableCol1 = new GC.Spread.Sheets.Tables.TableColumn(1, 'configName', 'Conifg List' ) 
	     let tableCol2 = new GC.Spread.Sheets.Tables.TableColumn(2, 'delete', 'Del' , null, del_cellButton ) 	
             
	     ezch_tbl_editorFactory.saved_config_list.tbl_columns = [ tableCol1, tableCol2 ]
 
	     saved_config_list.tbl_view.autoGenerateColumns( false ) 
	     saved_config_list.tbl_view.bind([ tableCol1 , tableCol2 ]  , 'tbl_data', saved_config_list )		
		
	     if( config_name != null )this.updateConfig( spread , config_name ); 	
		
	}

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
//		let TableList  = sheet1.tables.all()[0] 
		let TableList  = sheet1.tables.findByName( ezch_tbl_editorFactory.sheet_TblList_table_tblList.name ); 
		ezch_tbl_editorFactory.sheet_TblList_table_tblList.tbl_view  = TableList;

		let headers = {}
	   	let user_id = $cookies.get('user')
	   	ezch_tbl_editorFactory.sheet_TblView_table.user_id  = user_id ; 
	   	ezch_tbl_editorFactory.sheet_TblList_table_tblList.user_id  = user_id ; 
		let user_DB
//1		if( user_DB_ == undefined ){
			 user_DB = ezch_tbl_editorFactory.cur_db =  $cookies.get('user_DB')
	   	ezch_tbl_editorFactory.sheet_TblView_table.db_name  = user_DB ; 
	   	ezch_tbl_editorFactory.sheet_TblList_table_tblList.db_name  = user_DB ; 
/*1		}else{
		     user_DB = ezch_tbl_editorFactory.cur_db = user_DB_
		}
*/
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

//1		let  table = ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_view = sheet1.tables.all()[1] ;
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
//1		spreadJs_factory.schema_1_columns = tableColumns
		ezch_tbl_editorFactory.sheet_TblList_table_tblSchema.tbl_columns = tableColumns
		this.sheet_TblList_table_updateSchema( spread, tbl_name )
//1 		await this.getServerSide() 

	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   TblList :  table schema 
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheets_reset = async( spread )=>{
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
		//1			schema_tbl_update_flag = 0 
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
		//1			  ezch_tbl_editorService.updateData_2( null , spreadJs_factory, sheetFormat_service ) 
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
	this.sheet0_buttonClicked = ( spread, sender, args )=>{
		let sheet0 = spread.getSheet(0) 
		let cell_updateSql = sheet0.getRange('H7') 
		let cell_savedConfig = sheet0.getRange('M7') 
		let cell_filterCells = sheet0.getRange('F7')
		let cell_lockCells = sheet0.getRange('G7')
		if( args.col == cell_updateSql.col ){
			switch( args.row ){
				case cell_updateSql.row:
					sheet0.suspendPaint();
					sheet0.options.isProtected = false 
					for( selection of ezch_tbl_editorFactory.currentSelections )
					{
						sheet0.getRange( selection.row, selection.col, selection.rowCount, selection.colCount ).locked( true );
						sheet0.clear( selection.row, selection.col, selection.rowCount, selection.colCount, GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style );
					}
					sheet0.options.isProtected = true 	
					ezch_tbl_editorFactory.currentSelections = [] ;
					sheet0.resumePaint();
					ezch_tbl_editorService.test_asyncUpdates()
					ezch_tbl_editorService.updateSql( spread )
					break; 
				default:	
			}
		}else if( args.col == cell_savedConfig.col ){
			switch( args.row ){
				case cell_savedConfig.row:
//					ezch_tbl_editorService.saveTblViewConfig( spread )
					let newConfig = sheet0.getRange('M6:M6').text() 
					ezch_tbl_editorService.addConfig( newConfig );
					break;
				default:	
			}	
		}else if( args.col == cell_lockCells.col ){
			switch( args.row ){
				case cell_lockCells.row:
				        console.log( ezch_tbl_editorFactory.lastSelections );		
					sheet0.suspendPaint();
					sheet0.options.isProtected = false 
					ezch_tbl_editorFactory.currentSelections =  ezch_tbl_editorFactory.currentSelections.concat( ezch_tbl_editorFactory.lastSelections );
					for( selection of ezch_tbl_editorFactory.currentSelections )
					{
						sheet0.getRange( selection.row, selection.col, selection.rowCount, selection.colCount ).styleName('UNLockStyle').locked( false );
					}
					sheet0.options.isProtected = true 	
					sheet0.resumePaint();
					let activeCell = ezch_tbl_editorFactory.lastSelections[0] ; 
					sheet0.setActiveCell( activeCell.row , activeCell.col ); 

					break;
			}		
		}else if( args.col == cell_filterCells.col ){
			switch( args.row ){
				case cell_filterCells.row:
					let cell_bt5 = ezch_tbl_editorFactory.tblView_filter.button_obj ;
					let state_f = 1 - ezch_tbl_editorFactory.tblView_filter.filter_state ;
	                                cell_bt5.text( ezch_tbl_editorFactory.tblView_filter.text[state_f] )
					ezch_tbl_editorFactory.tblView_filter.filter_state = state_f ;  
					ezch_tbl_editorService.applyFilter( spread, state_f ); 
					break;
				default:	
			}		
		}		
	}
	this.sheet0_selectionChanged = ( spread, sender, args )=>{
		ezch_tbl_editorFactory.lastSelections = args.oldSelections 
	}		

}]);
