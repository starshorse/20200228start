angular.module('ezch_tbl_editorService',[])
.factory('ezch_tbl_editorFactory', ['$injector',function($injector){
	var ezch_tbl_editorFactory = {
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		saved_config_list :  { tbl_view : null , tbl_columns : null , tbl_data : [{ configName: 'Test01', delete: false },{ configName:'e_approval_request01', delete: false }] } ,
		cellBinding_config_list: { tbl_name : 'TB_admin_1' , mass_enable: false , sql_enable: false , sqlState_where: 'order by seq desc' , cur_config_name: '' }, 
		spread: null ,
		tbl_name:'TB_통관기록',
		cur_db: 'ezchemtech',
		config_name:'TB_통관기록', 
		cur_id: 'richard.choi@ez-office.co.kr',
		sql_state: { pos: null , state_1 :  'select ', state_2:'order by seq desc' },
		bl_set_flag: 0,
		async_updates:[],
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
             let sheet1 = spread.getSheet(1);
	     sheet1.name('TblList')
	
	     let btnK1 = new GC.Spread.Sheets.CellTypes.Button(); 
	     btnK1.text('TblView 생성'); 
	     let cellK1 = sheet1.getRange('K1:K1').cellType( btnK1 )
	     sheet1.setColumnWidth( cellK1.col, 300 )
	     sheet1.setRowHeight( cellK1.row, 40 )

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
	     saved_config_list.tbl_view.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	 //    sheet1.options.isProtected = true 	
	     if( configName == null ){
		   this.invalid_tblView( spread )
	     }else{
		this.updateConfig( spread, configName )   
		this.updateViewConfig( spread, configName )
	     	await this.updateData_1( spread ) 
	     }
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
	this.sheet0_buttonClicked = ( spread, sender, args )=>{
		let sheet0 = spread.getSheet(0) 
		let cell_updateSql = sheet0.getRange('H7') 
		let cell_savedConfig = sheet0.getRange('M7') 
		if( args.col == cell_updateSql.col ){
			switch( args.row ){
				case cell_updateSql.row:
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
		}
	}
	this.sheet1_buttonClicked = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_getTblView = sheet1.getRange('K1') 
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
		}else if( args.col == cell_getTblView.col ){
			switch( args.row ){
				case cell_getTblView.row:
					ezch_tbl_editorService.updateData_1( spread );  
					break;
				default:	
			}	
		}	
	}

}]);
