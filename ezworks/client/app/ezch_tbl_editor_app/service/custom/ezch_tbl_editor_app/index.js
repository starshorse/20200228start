angular.module('ezch_tbl_editor_app_service', [])
.factory('ezch_tbl_editor_appFactory',['$injector', function( $injector){
	var asyncJob_factory = $injector.get('asyncJob_factory')
	var ezch_tbl_editor_appFactory ={
// new pos struct.. 		
		pos:{ TblView : {
				curTable:'AE7:AE7',
				addUser_config:'AP6:AP6',
				check_mass:'AB7:AB7',
				check_enableSql :'AH6:AH6',
				btn_insert_data :'AC7:AC7',
				btn_filter_selected:'AD7:AD7',
				btn_unlock :'AG7:AG7',
				btn_exec_sql :'AH7:AH7',
				btn_save_userConfig :'AP7:AP7',
			        input_sqlState: 'AJ5:AO7',
			        input_cur_userConfig: 'w:AP6',
				pos_data_start: 'AA17:AA17',
			        pos_insert_data_block : 'AA10:AZ11',
			        pos_insert_data_block_start : 'AA11:AA11'
			},
			TblList :{
				curTable : ( old_tbl_editor_flag )? 'E1:E1':'C5:C5' ,
			        btn_addColumn : 'K2:K2',
				btn_get_tblView : 'K1:K1',
				addColumn_info:'C3:J3',
				tbl_schema_order_info:'C5:C150',
				tbl_schema_edit_info:'K5:L150',
				pos_schema_add: { No: ( old_tbl_editor_flag)? 'C3:C3':'E9:E9' , Field: ( old_tbl_editor_flag )? 'D3:D3':'F9:F9' },
				pos_yesno_start: ( old_tbl_editor_flag)? 'L5:L5':'N11:N11' ,
			},
/*			
			DbLog :{
				curDB:'C6:C6',
				curLogin: 'E6:E6',
			}
*/			
		      },	
		sheet_TblView_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_TblList_table_tblList :{ name: 'Table2', tbl_view: null , tbl_columns: null , data:[]},
		sheet_TblList_table_tblSchema :{ name: 'Table3', tbl_view: null , data:[]},
		binding_data: { cur_server : null , cur_DB: null, cur_user: null , cur_organization: null ,  cur_login: null  },
// old part..		
		schema_add: {
			No : 3 , Field :'Add Col', visible: true 
		},
// tblView( sheet0 ) runtime lock.. 		
		lock_style : null ,
		unlock_style : null , 
		lastSelections : [] ,
		currentSelections : [] ,
		names_sheet0 : null ,
		names_sheet0_notNull : [],
		hide_null_check :{ hide_null_flag: 0 , null_list: [] },
		max_rowCount: 50000 ,
		max_columnCount: 200 , 
		spreadjs_product: null , 
		headInfos : null , 
		sheetFormat_service : null,
//		tblView_table : null, 
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		saved_config_list : { tbl_view: null , tbl_columns: null , tbl_data: [] } ,
		cellBinding_config_list: { tbl_name : 'TB_admin_1' , mass_enable: false , sql_enable: false , sqlState_where: 'order by seq desc' , cur_config_name: '' }, 
		table_list : { tbl_view: null , tbl_columns: null, tbl_data:[] }, 
//1.		dbTrLog_cellBinding : { tbl_name: 'TB_admin_1', config_name: '', start_point:'TblList', sql_state:'', db_error: null , log_output: '' },
		tbl_name : null ,
		cur_db: 'demo',
		config_name : null ,    // if not config mod should keep null. 
		cur_id: 'richard.choi@ez-office.co.kr',
// Sheet0( TblView ) 		
		sql_state: { pos: null , state_1 :  'select ', state_2:'order by seq desc' },
		bl_set_flag: 0 ,
		input_sqlState_changed: false, 
		async_updates: asyncJob_factory.async_updates ,
// tblView( sheet0 ) Filter.. 
		tblView_filter: { button_obj: null, text: ['선택필터적용' ,'선택필테해제'], filter_state: 0 , filter_info: [] }, 
//functions.		
		update_editLists : null,
		update_cur_db: null,
		updateAlertInfo: null,
		updateConfigName : null ,
		endPageLoading: null
	}
	return ezch_tbl_editor_appFactory
}])
.service('ezch_tbl_editor_appService', [
'$http',
'$cookies',	
'ezch_tbl_editor_appFactory'	
	,function(
		$http,
		$cookies,
		ezch_tbl_editor_appFactory
	){
	var Data_1 = null 
/* remove no need DbTrLog.. 		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Sheet5 DbTrLog init.  			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.sheet_dbTrLog_update = async ( spread , field_name, value, visible = 0  )=>{
		let  sheet5 = spread.getSheet(5); 
		let  dbTrLog_update_pos =  { tbl_name: 'D4:D4', config_name: 'D5:D5', start_point:'D6:D6', sql_state:'D7:D7', db_error:'D8:D8'  , log_output: 'D9:D9' }
        ezch_tbl_editor_appFactory.dbTrLog_cellBinding[field_name] = value ; 
		sheet5.getRange( dbTrLog_update_pos[field_name]).text( new Date()) 
		if( visible )sheet5.visible(true ); 
		else sheet5.visible( false ); 
	}
	this.sheet_dbTrLog_init = async ( spread )=>{
		let sheet5 = spread.getSheet(5) 
		sheet5.setColumnCount( 50 )
		sheet5.visible( false );
// UI init.. 		
		let cellC1  = sheet5.getRange('C1:C1').text('데이터 베이스 Summary 페이지' ).font('25px Calibri').hAlign(1).vAlign(1); 
			//.hAlign( GC.Spread.Sheets.VerticalAlign.center )  
		sheet5.setRowHeight( cellC1.row, 50 ); 
		sheet5.setColumnWidth( cellC1.col , 500  ); 
		let cellB3 = sheet5.getRange('B3:D9').backColor('#bbb3d1')  

		cellB3.borderLeft( new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.medium) );
		cellB3.borderTop ( new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.medium) );
		cellB3.borderRight ( new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.medium) );
		cellB3.borderBottom ( new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.medium) );

		sheet5.setColumnWidth( cellB3.col, 200 ); 
		sheet5.setColumnWidth( cellB3.col + cellB3.colCount -1 , 200 ); 
		sheet5.setRowHeight( cellB3.row + 4 , 80 );
		sheet5.setRowHeight( cellB3.row + 5 , 80 );
		sheet5.setRowHeight( cellB3.row + 6 , 280 );
		sheet5.getRange('C4:D9').backColor('lightyellow') 

		sheet5.getRange('B4:B4').backColor('#bbb3d1').text('테이블명').hAlign(1); 
		sheet5.getRange('B5:B5').backColor('#bbb3d1').text('구성사항명').hAlign(1); 
		sheet5.getRange('B6:B6').backColor('#bbb3d1').text('선택출발지').hAlign(1); 
		sheet5.getRange('B7:B7').backColor('#bbb3d1').text('SQL문장').hAlign(1).vAlign(1); 
		sheet5.getRange('B8:B8').backColor('#bbb3d1').text('DB Error').hAlign(1).vAlign(1); 
		sheet5.getRange('B9:B9').backColor('#bbb3d1').text('Log  츨력').hAlign(1).vAlign(1);  
		sheet5.getRange('C3:C3').backColor('#bbb3d1').text('내용').hAlign(1); 
		sheet5.getRange('C7:C7').wordWrap(true);  
		sheet5.getRange('C8:C8').foreColor('red').wordWrap(true);  
		sheet5.getRange('C9:C9').wordWrap(true);  
		sheet5.getRange('D3:D3').backColor('#bbb3d1').text('업데이트 시간').hAlign(1); 
		sheet5.getRange('D11:D11').backColor('#bbb3d1').text('출발지 돌아가기').hAlign(1); 
		
// bining Init. 
		let source = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editor_appFactory.dbTrLog_cellBinding ) 
		sheet5.setBindingPath( cellB3.row + 1, cellB3.col +1 , 'tbl_name' ); 
		sheet5.setBindingPath( cellB3.row + 2, cellB3.col +1 , 'config_name' ); 
		sheet5.setBindingPath( cellB3.row + 3, cellB3.col +1 , 'start_point' ); 
		sheet5.setBindingPath( cellB3.row + 4, cellB3.col +1 , 'sql_state' ); 
		sheet5.setBindingPath( cellB3.row + 5, cellB3.col +1 , 'db_error' ); 
		sheet5.setBindingPath( cellB3.row + 6, cellB3.col +1 , 'log_output' ); 

		sheet5.setDataSource( source ); 

	}
*/	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Sheet2 save config Table  functions  			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
	this.getServerSide = async ()=>{
		let id  = ezch_tbl_editor_appFactory.cur_id 
		let headers = { id } 
		let db = ezch_tbl_editor_appFactory.cur_db 
//	let url = `/ezchemtech/TableEditor/${db}/user/`
		let url = `/tbl_editor/${db}/user_config/`
		let result = await $http({ method:'GET', url, headers })
		let configList = result.data.DATA.config_list 
		ezch_tbl_editor_appFactory.saved_config_list.tbl_data = ( configList == undefined )? [] : configList ;
		ezch_tbl_editor_appFactory.update_editLists( ezch_tbl_editor_appFactory.saved_config_list.tbl_data );
	}
	this.updateServerSide = async ()=>{
        let id = ezch_tbl_editor_appFactory.cur_id 
		let headers = { id }
		let data = { id , config_list : ezch_tbl_editor_appFactory.saved_config_list.tbl_data } 
		let db = ezch_tbl_editor_appFactory.cur_db 
		let url = `/ezchemtech/TableEditor/${db}/user/`
        let result = await $http({ method: 'POST', url, data , headers } ) 
        console.log( result.data ) 
		ezch_tbl_editor_appFactory.update_editLists( ezch_tbl_editor_appFactory.saved_config_list.tbl_data );
	}
	this.updateViewConfig = async ( spread , updateConfig )=>{
		if( updateConfig == null || updateConfig == ''){ alert("잘못된 정보입니다."); return }
		let saved_config_list = ezch_tbl_editor_appFactory.saved_config_list 
		let recon_index = saved_config_list.tbl_data.findIndex(( ent )=>ent.configName == updateConfig ) 
		if( recon_index == -1 ){ alert("항목오류입니다.");  return } 
		let updateConfig_data = saved_config_list.tbl_data[ recon_index ] 
		if( updateConfig_data.tblViewConfig != null ){
			for( const [key, value] of Object.entries( updateConfig_data.tblViewConfig )){
				ezch_tbl_editor_appFactory.cellBinding_config_list[key] = value ; 
			}		
			ezch_tbl_editor_appFactory.tblView_tbl.tbl_columns = updateConfig_data.tbl_view.tbl_columns 
			Object.assign( ezch_tbl_editor_appFactory.sql_state , updateConfig_data.sql_state ) 
		}	
		spread.getSheet(0).getRange('AP6:AP6').text( updateConfig );
		ezch_tbl_editor_appFactory.tbl_name  = updateConfig_data.data.tbl_name ; 
	    await this.updateDataSql( spread )
		spread.getSheet(0).visible(true); 
	}
	this.updateConfig = async  ( spreadJs_factory , updateConfig )=>{
	    let spread = spreadJs_factory.spread 
		if( updateConfig == null || updateConfig == ''){ alert("잘못된 정보입니다."); return }
		let saved_config_list = ezch_tbl_editor_appFactory.saved_config_list 
		let recon_index = saved_config_list.tbl_data.findIndex(( ent )=>ent.configName == updateConfig ) 
		if( recon_index == -1 ){ alert("항목오류입니다.");  return } 
		let cell_savedConfig = spread.getSheet(2).getRange("N2") 
		spread.getSheet(2).setValue( cell_savedConfig.row, cell_savedConfig.col, updateConfig )
		
		await this.updateServerSide() 

		let updateConfig_data = saved_config_list.tbl_data[ recon_index ] 
        ezch_tbl_editor_appFactory.config_name = updateConfig_data.configName 
		ezch_tbl_editor_appFactory.updateConfigName( updateConfig_data.configName )
		ezch_tbl_editor_appFactory.tbl_name = updateConfig_data.data.tbl_name 
		await  this.updateSchema_2_data( spreadJs_factory, updateConfig_data.data ) 
		this.invalid_tblView( spread ); 
	}
	this.removeConfig = ( delConfig )=>{
		if( delConfig == null || delConfig == '' ){ alert('잘못된 정보입니다') ; return }
		let saved_config_list = ezch_tbl_editor_appFactory.saved_config_list 
		let recon_index = saved_config_list.tbl_data.findIndex(( ent)=> ent.configName == delConfig ) 
		if( recon_index == -1 ){ alert('항목오류입니다.');  return } 
		saved_config_list.tbl_data.splice( recon_index , 1 ) 
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns, 'tbl_data', saved_config_list ) 
		this.updateServerSide() 
	}
	this.addConfig = ( spreadJs_factory , newConfig , call_source = 1 )=>{ // call_source 1: TblList , 2 :TblView 
		if( newConfig == null || newConfig == '' ){ alert("타이틀이 필요합니다."); return  }
		let saved_config_list = ezch_tbl_editor_appFactory.saved_config_list 
		let recon_index = saved_config_list.tbl_data.findIndex((ent)=>ent.configName == newConfig )
		if( recon_index != -1 ){
			let yorn = confirm("재설정하시겠습니까?") 
			if( yorn == false ) return 
			else saved_config_list.tbl_data.splice( recon_index, 1 ) 
		}
// Add TblView config options saving.
		let tblViewConfig = null , tbl_view = null , sql_state = null ; 
		if( call_source == 2 ){  // call from TblView .. 
			let  TblView_config = ezch_tbl_editor_appFactory.cellBinding_config_list  
			TblView_config.tbl_name = ezch_tbl_editor_appFactory.cellBinding_config_list.tbl_name ; 
			TblView_config.cur_config_name = newConfig
			tblViewConfig = JSON.parse( JSON.stringify( TblView_config )) ;
			tbl_view = JSON.parse( JSON.stringify( ezch_tbl_editor_appFactory.tblView_tbl ));
			tbl_view.tbl_data_1 = null  
			sql_state = JSON.parse( JSON.stringify( ezch_tbl_editor_appFactory.sql_state ));
		}
	
		saved_config_list.tbl_data.push({ configName: newConfig , delete :false, 
			data : JSON.parse( JSON.stringify( { tbl_name : ezch_tbl_editor_appFactory.tbl_name , 
				tbl_info : spreadJs_factory.schema_1_data })),
			tblViewConfig, tbl_view, sql_state  
		})  
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns, 'tbl_data', saved_config_list )
		this.updateServerSide() 
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  TblView : Filter Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.applyFilter = ( spread, filter_state )=>{
	      let sheet0 = spread.getSheet(0); 	
	      let table1 = ezch_tbl_editor_appFactory.tblView_tbl.tbl_view ;
	      let rowFilter = table1.rowFilter(); 	
	      let tbl_range = table1.range(); 
	      if( filter_state )
	      {	
		      let selections = ezch_tbl_editor_appFactory.lastSelections ;
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Sheet0  DB functions  		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.updateDataSql = async ( spread, user_db = null  )=>{
		if( ezch_tbl_editor_appFactory.cellBinding_config_list.sql_enable == true ){
			let sheet0 = spread.getSheet(0); 
			let sqlState = ezch_tbl_editor_appFactory.sql_state.state_1 + ' ' + ezch_tbl_editor_appFactory.cellBinding_config_list.sqlState_where ;
			let tbl_columns = this.updateData_columns( spread , ezch_tbl_editor_appFactory.spreadJs_factory.schema_1_data.tbl_schema )  
            this.sheet_dbTrLog_update( spread, 'start_point', 'TblView' ); 
			this.sheet_dbTrLog_update( spread,'sql_state', sqlState )
    		this.sheet_dbTrLog_update( spread, 'db_error', '' ) ;		
			spread.setActiveSheet('DbTrLog') ;

			if( user_db == null )user_db = ezch_tbl_editor_appFactory.cur_db 
			let tbl_data  = await $http({ method:'POST', url:`/ezchemtech/TableEditor/${user_db}/sql`, data: { sql_state: sqlState } })
			let alert_info_message = { class : ( tbl_data.data.RESULT == 'success' )? 'success': 'warning' , message : tbl_data.data.ERRORMESSAGE } 
		    ezch_tbl_editor_appFactory.updateAlertInfo( alert_info_message ) 		
	   
			if( tbl_data.data.RESULT != 'success' ){
    			this.sheet_dbTrLog_update( spread, 'db_error', tbl_data.data.ERRORMESSAGE , 1 ) ;
				alert("SQL Error: "+ tbl_data.data.ERRORMESSAGE ); 
			}
			tbl_data.data = tbl_data.data.tbl_data  

			ezch_tbl_editor_appFactory.spreadJs_factory.DbData  = ezch_tbl_editor_appFactory.tblView_tbl.tbl_data_1 =  tbl_data.data 
// 연순 정렬 적용 . i 2023-03-09 
			Data_1 = tbl_data.data.reverse() 
            let sheetFormat_service = ezch_tbl_editor_appFactory.sheetFormat_service     
		    ezch_tbl_editor_appFactory.spreadJs_factory.tbl_name  = ezch_tbl_editor_appFactory.tbl_name  // tbl_name update for real time update. 

			let tbl_info = ezch_tbl_editor_appFactory.tblView_tbl 
			let table1 = ezch_tbl_editor_appFactory.tblView_tbl.tbl_view 
			let tbl_pos = ezch_tbl_editor_appFactory.tblView_tbl.tbl_pos 
			
			table1.autoGenerateColumns( false ) 
			sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( tbl_pos.row, tbl_pos.col, tbl_info.tbl_data_1.length + 1, tbl_columns.length ))  	
			table1.bind( tbl_columns , 'tbl_data_1', tbl_info ) 
		}else{
			 await  this.updateData_1( ezch_tbl_editor_appFactory.spreadjs_product , ezch_tbl_editor_appFactory.spreadJs_factory , ezch_tbl_editor_appFactory.tbl_name , ezch_tbl_editor_appFactory.sheetFormat_service  ) // call_source from SQL. 
		}	
	}
	this.getHeadInfos = ()=>ezch_tbl_editor_appFactory.headInfos ;
	this.insertData_DB = ( spreadJs_factory )=>{
		 if( ezch_tbl_editor_appFactory.hide_null_check.hide_null_flag ){
			 let hide_null_list = ezch_tbl_editor_appFactory.hide_null_check.null_list.join(',');
			 alert('해당 NOT NULL 항목이 Visible로 선택되어 있지 않았습니다.:'+ hide_null_list ) 
			 return ; 
		 }
	
		  let headers = {}
//		  let user_DB = $cookies.get('user_DB') 
		  let user_DB = ezch_tbl_editor_appFactory.cur_db 
		  if( user_DB )headers['user_DB'] = user_DB 
// checking mass insert 
		  let sheet0 = spreadJs_factory.sheet0 
		  let mass_check = sheet0.getRange('AB7') 	
		  let isChecked = sheet0.getCell( mass_check.row , mass_check.col ).value() 
		  let emp 
		  let tbl_name = ezch_tbl_editor_appFactory.tbl_name 
		  if( isChecked == true ){
		     emp = this.get_insertDataTr( spreadJs_factory ) 
		     url_ = `/ezchemtech/TableEditor/${ tbl_name }/Tr`
		     sheet0.getCell( mass_check.row , mass_check.col ).value(false) 
		  }else{
			  emp = this.get_insertData( spreadJs_factory ) 
			  url_ = `/ezchemtech/TableEditor/${ tbl_name }`
			  delete emp.seq ;	
		  }	  
		  $http({ method:'POST', url: url_ ,  data: emp , headers: headers }).then((res_)=>{
			  console.log( res_ )
			  this.updateData_2( ezch_tbl_editor_appFactory.spreadjs_product , spreadJs_factory , ezch_tbl_editor_appFactory.sheetFormat_service ) 
		  }) 
	}
	this.get_insertDataTr = ( spreadJs_factory )=>{
		 let sheet0 = spreadJs_factory.sheet0 
		 let insertData_cell = sheet0.getRange('AA11')
		 let insertData_arr = [] 
		 for( k = 0 ; k < 5 ;k++){
			 let insertData = {} 
			 ezch_tbl_editor_appFactory.names_sheet0.forEach( ( v, i )=>{
				 let cell_value = sheet0.getValue( insertData_cell.row + k , insertData_cell.col + i ) 
				 if( cell_value !== '' )
					 insertData[v.Field] = cell_value 
			 })
			if( Object.keys( insertData ) != 0 )insertData_arr.push( insertData ) 
		 }
		 return insertData_arr 
	}
	this.get_insertData = ( spreadJs_factory )=>{
		 let sheet0 = spreadJs_factory.sheet0 
		 let insertData_cell = sheet0.getRange('AA11') 
		 let insertData = {} 
		 ezch_tbl_editor_appFactory.names_sheet0.forEach( ( v, i )=>{
			 let cell_value = sheet0.getValue( insertData_cell.row , insertData_cell.col + i ) 
			 if( cell_value !== '' )
				 insertData[v.Field] = cell_value 
			  
		 })
		return insertData 
	}
    this.massCheck_toggle = ( spreadJs_factory , IsMass )=>{
		let sheet0 = spreadJs_factory.sheet0 
		let mass_check = sheet0.getRange('AB11') 
        for( i = 1; i< 5 ;i ++ ){
			sheet0.setRowVisible( mass_check.row + i , IsMass ) 
		}
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   ezch_tbl_editor_app  code. service/spreadjs/index.js  
//   1. updateSchema_1_data ( aysnc )	
//     argement  : 
//           modules: spreadjs_product,spreadJs_factory 
//           std    : tbl_name 
//  	return 
//   2. change_visible_status ( aysnc )	
//     argement  : 
//           modules: spreadjs_product ,spreadJs_factory 
//           std    : current_index, value 
//  	return 
//   3. change_schema_order ( aysnc )	
//     argement  : 
//           modules: spreadjs_product ,spreadJs_factory 
//           std    : insert_index , current_index 
//  	return 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	this.invalid_tblView = ( spread )=>{
		spread.getSheet(0).visible( false ); 
	}
	this.updateTable_name = ( spreadjs_product, spreadJs_factory, tbl_name )=>{
		let spread = spreadJs_factory.spread   
//1		let sheet4 = spreadJs_factory.sheet4 =  spread.getSheet(4)
//1		let sheet2 = spreadJs_factory.sheet2 =  spread.getSheet(2)
		let sheet2
		if( old_tbl_editor_flag )
			sheet2 = spreadJs_factory.spread.getSheet(2) 
		else
			sheet2 = spreadJs_factory.spread.getSheetFromName('TblList'); 
//1		let  cell = sheet2.getRange('E1:E1', GC.Spread.Sheets.SheetArea.viewport );
		let  cell = sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.curTable , GC.Spread.Sheets.SheetArea.viewport );
		sheet2.setValue( cell.row , cell.col , tbl_name ) 
		sheet2.autoFitColumn( cell.col ); 
//1		cell = sheet4.getRange('B2:B2', GC.Spread.Sheets.SheetArea.viewport );
//1		sheet4.setValue( cell.row , cell.col , tbl_name ) 
//1		sheet4.setValue( cell.row + 1 , cell.col , tbl_name + '_log' ) 
	}
	this.updateData_2 = async( 
		spreadjs_product, 
		spreadJs_factory,
		sheetFormat_service,
		user_db = null,
		call_source = 1   // call_source:1  tblList, 2:sql_run ..

	)=>{
		let spread = spreadJs_factory.spread   
//1		let sheet2 = spreadJs_factory.sheet2 =  spread.getSheet(2)
		let sheet2
		if( old_tbl_editor_flag )
			sheet2 = spreadJs_factory.spread.getSheet(2) 
		else
			sheet2 = spreadJs_factory.spread.getSheetFromName('TblList'); 
		let sheet0 = spreadJs_factory.sheet0 =  spread.getSheet(0)
//1		let  cell = sheet2.getRange('E1:E1', GC.Spread.Sheets.SheetArea.viewport );
		let  cell = sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.curTable , GC.Spread.Sheets.SheetArea.viewport );
		let  cell_checkSql = sheet2.getRange('AH6:AH6', GC.Spread.Sheets.SheetArea.viewport );
		let tbl_name  = sheet2.getValue( cell.row , cell.col ) 
		if( spreadjs_product != null ){ // Check if init.. 
			ezch_tbl_editor_appFactory.spreadJs_factory = spreadJs_factory 
			ezch_tbl_editor_appFactory.spreadjs_product = spreadjs_product 
		}	
	   if( sheetFormat_service != null )ezch_tbl_editor_appFactory.sheetFormat_service = sheetFormat_service 
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
		spread.getSheet(0).getRange('AP6:AP6').text( ezch_tbl_editor_appFactory.tbl_name );
// override configuration. 
//		switch( call_source){
//			case 1:
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
//				break;
//		        case 2:
//				break;
//		}		
//		await this.updateData_1( spreadjs_product , spreadJs_factory , tbl_name , sheetFormat_service) 

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
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	Input:
		module : spreadjs_product
		         spreadJs_factory
				 sheetFormat : retractHead 


*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////	
	this.updateData_columns = ( spread, schema_1_data_tbl_schema )=>{
		var tableColumns = [],
				names = [], 
				labels = [];
		
//		let userHdr  = spreadJs_factory.schema_1_data.tbl_schema 
		let userHdr  = schema_1_data_tbl_schema 
		console.log( userHdr ) 
//		console.log( Data_1.sales )
		ezch_tbl_editor_appFactory.names_sheet0_notNull = [] ;
		ezch_tbl_editor_appFactory.hide_null_check.hide_null_flag = 0 ;
		ezch_tbl_editor_appFactory.hide_null_check.null_list = [] ;
		let i = 0 
		ezch_tbl_editor_appFactory.names_sheet0 = names = labels = userHdr.reduce(( acc , cur )=>{
			  if( cur.visible == true ){
			    	acc.push( { Field: cur.Field , Formatter: cur.Formatter } )
				    if( cur.Null == false )ezch_tbl_editor_appFactory.names_sheet0_notNull.push(i)
				    i++ 
			  }else{
				  if( cur.Null == false ){
					  ezch_tbl_editor_appFactory.hide_null_check.hide_null_flag = 1 ;
					  ezch_tbl_editor_appFactory.hide_null_check.null_list.push( cur.Field ) 
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
		let cell_block = sheet0.getRange('AA11:AA11')
// clear  back first. 
		 sheet0.clear( cell_block.row, cell_block.col, 5, 100 , GC.Spread.Sheets.SheetArea.viewport , GC.Spread.Sheets.StorageType.style ) 

		sheet0.getRange( cell_block.row , cell_block.col , 5 , 1 ).borderLeft( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col+ names.length -1 , 5 , 1 ).borderRight( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col , 1 , names.length ).borderTop( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col , 1 , names.length ).borderBottom( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row + 4 , cell_block.col , 1 , names.length ).borderBottom( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium)) 
		sheet0.getRange( cell_block.row , cell_block.col, 5 , names.length ).value('') 
		sheet0.getRange( cell_block.row , cell_block.col, 5 , names.length ).locked( false )
		
		ezch_tbl_editor_appFactory.names_sheet0_notNull.forEach(( ent )=>{
			sheet0.getRange( cell_block.row  , cell_block.col + parseInt( ent ) , 5, 1 ).backColor('#E3EFDA') 
		})
		sheet0.getRange( cell_block.row , cell_block.col, 5 , 1 ).locked( true ).backColor('#CCCCCC') 
		spread.options.isProtected = true  
		return  tableColumns
	}
	this.updateData_1 = async( 
		spreadjs_product, 
		spreadJs_factory, 
		tbl_name , 
		sheetFormat_service 
	)=>{
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     1. UI interface set up.. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
// start Cell AA10 	
		let spread = spreadJs_factory.spread   
		let sheet0 = spreadJs_factory.sheet0 =  spread.getSheet(0)
//1. remove _start_		
		sheet0.getRange('AB7').locked( false ) 
		sheet0.getRange('AA7').locked( false ) 
		spread.options.isProtected = true 

		this.massCheck_toggle( spreadJs_factory , false ) 
		let r = sheet0.getRange('AA7').value('대량데이터') 
		sheet0.setColumnWidth( r.col, 200 ); 
		 r = sheet0.getRange('AE7:AE7')
		sheet0.setColumnWidth( r.col, 400 ); 
//1. remove _end_ 		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     2. load Data..  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
		spread.setActiveSheet('DbTrLog') 
/* 1. DbTrlog.. remove. 		
		let DbTrLog_sheet = spread.getSheet(5) 
		let dbTrLog_log = ''
		this.sheet_dbTrLog_update( spread , 'sql_state', '' );
		this.sheet_dbTrLog_update( spread , 'db_error', '' );
//		DbTrLog_sheet.getCell(0,0).text('tbl_name:'+tbl_name)
		this.sheet_dbTrLog_update( spread , 'tbl_name', tbl_name ) 
*/		
// Data loading time show pages. 		
		let tbl_name4url = tbl_name.replace('TB_',''); 

		let headers = {}
		let user_DB = ezch_tbl_editor_appFactory.cur_db 
		if( user_DB )headers['user_DB'] = user_DB 

/* 1  DbTrlog remove .. 		
//		DbTrLog_sheet.getCell(1,0).text('Access DB:'+ user_DB+' 데이터 로딩중입니다. 조금만 기다려주세여' )
	    dbTrLog_log +='Access DB:'+ user_DB+' 데이터 로딩중입니다. 조금만 기다려주세여 \r\n' 
		this.sheet_dbTrLog_update( spread, 'log_output', dbTrLog_log ) 
*/		

//1		let DataHdr = await $http.get(`/ezchemtech/TableEditor/Data/${ tbl_name4url }`, { headers: headers } ) 
		let DataHdr = await $http.get(`/tbl_editor/${ user_DB }/${ tbl_name4url }`, { headers: headers } ) 

/*1 DbTrLog remove _start_		
//		DbTrLog_sheet.getCell(2,0).text('DB fetch finished')
	        dbTrLog_log += 'DB fetch finished\r\n'
		this.sheet_dbTrLog_update( spread, 'log_output', dbTrLog_log ) 
*/		

//1		let  Data_1  = ezch_tbl_editor_appFactory.tblView_tbl.tbl_data_1  = DataHdr.data.tbl_data 
		let  Data_1  = ezch_tbl_editor_appFactory.tblView_tbl.tbl_data_1  = DataHdr.data.DATA 

// Check boundary condition.. 
		if( Data_1.length > ezch_tbl_editor_appFactory.max_rowCount ){
			Data_1 = Data_1.slice( (- ezch_tbl_editor_appFactory.max_rowCount) + 10000  )   //   뒤에서  max_rowCount 까지   
			setTimeout( "alert('대용량 데이터 로드되었습니다..');", 0)  
 		}
		if( names.length > ezch_tbl_editor_appFactory.max_columnCount ){
			ezch_tbl_editor_appFactory.max_columnCount = names.length +1 
			sheet0.setColumnCount( ezch_tbl_editor_appFactory.max_columnCount ) 
		}
// 연순 정렬 적용 . 
		Data_1 = Data_1.reverse() 

		if( Data_1.length > 0 ){
	 		ezch_tbl_editor_appFactory.headInfos = sheetFormat_service.retractHead( Data_1[0] ) 
		}
// update spreadJs_factory as well 
		spreadJs_factory.DbData = Data_1 
		ezch_tbl_editor_appFactory.tbl_name  = spreadJs_factory.tbl_name = tbl_name 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     3. Render Data..   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
//1. remove _start_
		let  cell = sheet0.getRange('AA17:AA17', GC.Spread.Sheets.SheetArea.viewport );
		sheet0.getRange('AA10:BA10' ,GC.Spread.Sheets.SheetArea.viewport ).value('')  
//1. remove _end_ 

		// Add table named as "table1"
		let table1 = ezch_tbl_editor_appFactory.tblView_tbl.tbl_view ;

		table1.expandBoundRows(true);
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Table Column binding. 
////////////////////////////////////////////////////////////////////////////////////////////////////			
/*1 DbTrLog ..remove.. 			
//		DbTrLog_sheet.getCell(3,0).text('Data binding started')
		dbTrLog_log += 'Data binding Started\r\n' ;	
// update block update Area. 
//		DbTrLog_sheet.getCell(4,0).text('prepare to drawing..')
		dbTrLog_log += 'prepare to drawing \r\n'; 
		this.sheet_dbTrLog_update( spread, 'log_output', dbTrLog_log ) 
*/		
		
		table1.autoGenerateColumns( false );
		table1.showResizeHandle(true); 
		let tableColumns  = this.updateData_columns( spread,  spreadJs_factory.schema_1_data.tbl_schema )
		ezch_tbl_editor_appFactory.tblView_tbl.tbl_columns = tableColumns
		sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( cell.row, cell.col, ( Data_1.length == 0 )? 4 : Data_1.length  , tableColumns.length )) 
		table1.bind( tableColumns , 'tbl_data_1' , ezch_tbl_editor_appFactory.tblView_tbl )
/*1 DbTrLog ..remvoe .. 		
//		DbTrLog_sheet.getCell(5,0).text('Set DataSource to TblView Sheet ..')
	    dbTrLog_log += 'Set DataSource to TblView Sheet ..'
		this.sheet_dbTrLog_update( spread, 'log_output', dbTrLog_log ) 
*/		
        spread.setActiveSheetIndex(0) 
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Key mapping change.  
////////////////////////////////////////////////////////////////////////////////////////////////////			
		let cell_data_start = sheet0.getRange('AA18:AA18')
	      spread.commandManager().register('nv_down', 
		      function nv_down(){
			     let s_index =  spread.getActiveSheetIndex()  
			     if( s_index == 0){
			     		let end_p = ezch_tbl_editor_appFactory.tblView_tbl.tbl_data_1.length  
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
			     		let end_p = ezch_tbl_editor_appFactory.tblView_tbl.tbl_columns.length + cell_data_start.col - 1 
				        let activeRowIndex = sheet0.getActiveRowIndex() 
					    sheet0.showColumn( end_p , GC.Spread.Sheets.HorizontalPosition.right );
				        sheet0.setActiveCell( activeRowIndex , end_p ) 
			     }	     
		      }	      
	      );	      
	      spread.commandManager().register('bl_down', 
		      function bl_down(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editor_appFactory.bl_set_flag 
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections(); 
				     let rowDelta = ( ezch_tbl_editor_appFactory.tblView_tbl.tbl_data_1.length + 17 ) - (selections[0].row + selections[0].rowCount )	

				     if( selections[0].row > 15 && rowDelta > 0 )
				     {	     
				        spread.commandManager().execute({ cmd: "nv_down", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });  
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount + rowDelta , selections[0].colCount ); 
				     }	     
				     ezch_tbl_editor_appFactory.bl_set_flag = 0 ; 

			     }else{
				    spread.commandManager().execute({ cmd: "selectionDown", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });  
			     }	     
		      }	      
	      );	      
	      spread.commandManager().register('bl_right', 
		      function bl_right(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editor_appFactory.bl_set_flag 
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections(); 
				     let colDelta = ( ezch_tbl_editor_appFactory.tblView_tbl.tbl_columns.length + cell_data_start.col ) - ( selections[0].col + selections[0].colCount ) 	
				     if( selections[0].col > 0 && colDelta > 0){ 	 
				        spread.commandManager().execute({ cmd: "nv_right", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });  
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount + colDelta ); 
					 }
					 ezch_tbl_editor_appFactory.bl_set_flag = 0 ; 

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
	this.initData_1 = async( spreadjs_product, spreadJs_factory , tbl_name , sheetFormat )=>{
		ezch_tbl_editor_appFactory.sheetFormat_service = sheetFormat 

		let spread = spreadJs_factory.spread 
		let sheet0 = spreadJs_factory.sheet0 =  spread.getSheet(0)
		sheet0.setRowCount( ezch_tbl_editor_appFactory.max_rowCount ) 
		sheet0.setColumnCount( ezch_tbl_editor_appFactory.max_columnCount ) 

		var defaultStyle = new GC.Spread.Sheets.Style() 
		sheet0.suspendPaint()
		sheet0.setDefaultStyle( defaultStyle )
		sheet0.resumePaint() 

//1  remove part _start_		
		sheet0.deleteRows( 9 , 2) // remove row 11 
		sheet0.frozenRowCount(17) 
		sheet0.getRange('A4:AAA4').backColor('#57438c');
		sheet0.setRowVisible( 3, true );
		let cell_ = sheet0.getRange('AC1:AC1', GC.Spread.Sheets.SheetArea.viewport ) 
		sheet0.setColumnVisible( cell_.col, true, GC.Spread.Sheets.SheetArea.viewport ) 
		cell_ = sheet0.getRange('AD1:AD1', GC.Spread.Sheets.SheetArea.viewport ) 
		sheet0.setColumnVisible( cell_.col, true, GC.Spread.Sheets.SheetArea.viewport ) 
//1 remove part _end_ 		
	        let source = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editor_appFactory.cellBinding_config_list )	

//1		let cell_massCheck = sheet0.getRange('AB7:AB7') 
		let cell_massCheck = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.check_mass ) 
//1  remove part _start_		
		sheet0.setRowHeight( cell_massCheck.row , 40 )
		let cell_c1 = new GC.Spread.Sheets.CellTypes.CheckBox() 
	    sheet0.clear( cell_massCheck.row , cell_massCheck.col, 1 , 1 , GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style ) 
		sheet0.setCellType( cell_massCheck.row , cell_massCheck.col , cell_c1 ) 
//1 remove part _end_ 		
	    sheet0.setBindingPath( cell_massCheck.row, cell_massCheck.col, 'mass_enable' )		

//1.		let cell_mass = sheet0.getRange('AC7:AC7')  
		let cell_mass = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.btn_insert_data ) 
//1  remove part _start_		
		let cell_button1 = new GC.Spread.Sheets.CellTypes.Button() 
		cell_button1.text('대량데이터 실행') 
		sheet0.getCell( cell_mass.row , cell_mass.col ).backColor('#CCCCCC').cellType( cell_button1 ) 
// Select Filter button.. 
//1		  let cell_filterCells = sheet0.getRange('AD7:AD7'); 
		let cell_filterCells = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.btn_filter_selected ) 
	      let cell_bt5 = new GC.Spread.Sheets.CellTypes.Button() 
	      ezch_tbl_editor_appFactory.tblView_filter.button_obj = cell_bt5 ;	
	      cell_bt5.text( ezch_tbl_editor_appFactory.tblView_filter.text[0] )
	      sheet0.setCellType( cell_filterCells.row , cell_filterCells.col , cell_bt5 ) 

		let cell_button = sheet0.getRange('AG7:AG7') 
		let cell_button2 = new GC.Spread.Sheets.CellTypes.Button() 
		cell_button2.text('잠금해제') 
		sheet0.getCell( cell_button.row, cell_button.col ).backColor('#EEEEEE').cellType( cell_button2 ) 

		sheet0.addSpan( cell_button.row , cell_button.col+1, 1, 2 )
		let cell_button3 = new GC.Spread.Sheets.CellTypes.Button() 
		cell_button3.text('새로고침/SQL실행') 
		sheet0.getCell( cell_button.row, cell_button.col+1).backColor('#EEEEEE').cellType( cell_button3 )

                sheet0.getRange('AI5:AI5').backColor('#E3EFDA')
//1 remove part _end_ 		
// SQL input Enable. 
//1		r = sheet0.getRange('AH6:AH6')
		r = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.check_enableSql ) 
//1  remove part _start_		
		let sql_checkBox = new GC.Spread.Sheets.CellTypes.CheckBox()
		sql_checkBox.caption('SQL 실행 활성')
		r.cellType( sql_checkBox )
		sheet0.addSpan( r.row, r.col, 1,2 )
//1 remove part _end_ 		
	        sheet0.setBindingPath( r.row, r.col, 'sql_enable' )		
		sheet0.isProtected = false 
		r.locked( false )
		sheet0.isProtected = true 

//1		r = sheet0.getRange('AJ5:AO7')
		r = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.input_sqlState ) 
//1  remove part _start_		
		r.setBorder( new GC.Spread.Sheets.LineBorder('#57438c', GC.Spread.Sheets.LineStyle.medium ), {all: true }, 3 ); 
		sheet0.addSpan( r.row, r.col, 3, 6 ) 
		sheet0.getCell( r.row, r.col).backColor('#fefce3')
//1 remove part _end_ 		
	    	sheet0.setBindingPath( r.row , r.col , 'sqlState_where' );	
		sheet0.isProtected = false 
		r.locked( false )
		sheet0.isProtected = true 

		r  = sheet0.getRange('AP6:AP6').backColor('#fefce3')
		r.setBorder( new GC.Spread.Sheets.LineBorder('#57438c', GC.Spread.Sheets.LineStyle.medium ), {all: true }, 3 ); 
		sheet0.setColumnWidth( r.col, 400 )
	    	sheet0.setBindingPath( r.row , r.col , 'cur_config_name' );	
		sheet0.isProtected = false 
		r.locked( false )
		sheet0.isProtected = true 

		r = sheet0.getRange('AP7:AP7')
		let save_config_btn = new GC.Spread.Sheets.CellTypes.Button()
		r.locked( false )
		sheet0.isProtected = true 
//1  remove part _start_		
//		r = sheet0.getRange('AP7:AP7')
//		let save_config_btn = new GC.Spread.Sheets.CellTypes.Button()
		save_config_btn.text('즐겨찾기 저장')
		r.cellType( save_config_btn ) 

		sheet0.frozenColumnCount(0); 
//1 remove part _end_ 		

// Style Init.. 
		ezch_tbl_editor_appFactory.lock_style = new GC.Spread.Sheets.Style() 
		ezch_tbl_editor_appFactory.unlock_style = new GC.Spread.Sheets.Style() 
		ezch_tbl_editor_appFactory.lock_style.name = 'LockStyle' 
		ezch_tbl_editor_appFactory.unlock_style.name  = 'UNlockStyle' 
	    	ezch_tbl_editor_appFactory.lock_style.backColor = '#EEEEEE'
		ezch_tbl_editor_appFactory.unlock_style.backColor = 'LemonChiffon' 
		sheet0.addNamedStyle( ezch_tbl_editor_appFactory.lock_style ) 
		sheet0.addNamedStyle( ezch_tbl_editor_appFactory.unlock_style )

		let headers = {}
//		let user_DB = $cookies.get('user_DB') 
		let user_DB = ezch_tbl_editor_appFactory.cur_db 
		if( user_DB )headers['user_DB'] = user_DB 
//1		let DataHdr = await $http.get(`/ezchemtech/TableEditor/Data/${ tbl_name }`, { headers : headers } ) 
		let DataHdr = await $http.get(`/tbl_editor/${ user_DB }/${ tbl_name }`, { headers : headers } ) 
		spreadJs_factory.tbl_name = tbl_name = ezch_tbl_editor_appFactory.tbl_name  
// start Cell AA10 	
//		spreadJs_factory.DbData  = Data_1.sales = DataHdr.data.tbl_data 
//1		spreadJs_factory.DbData  = DataHdr.data.tbl_data 
		spreadJs_factory.DbData  = DataHdr.data.DATA

//1		let  cell = sheet0.getRange('AA17:AA17', GC.Spread.Sheets.SheetArea.viewport );
		let  cell = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.pos_data_start, GC.Spread.Sheets.SheetArea.viewport );
		sheet0.tables.remove('tableRecords') 
		let table1 = ezch_tbl_editor_appFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableRecords', cell.row, cell.col, 4, 30);
		ezch_tbl_editor_appFactory.tblView_tbl.tbl_pos = cell 
		table1.style( GC.Spread.Sheets.Tables.TableThemes["light14"]);
// clear  rows ..
//1 remove _start_		 
		cell = sheet0.getRange('AP10:AP10') 
		console.log( cell.locked() )
//1 remove _end_ 		

		let clear_area = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.pos_insert_data_block,GC.Spread.Sheets.SheetArea.viewport ) 
		sheet0.options.isProtected = false 
		clear_area.locked(false) 
		sheet0.getCell( cell.row, cell.col ).locked(false)  
		sheet0.options.isProtected = true 
		sheet0.options.protectionOptions.allowResizeColumns = true ; 

		sheet0.getCell( cell.row, cell.col ).text("");    
	        console.log( sheet0.getCell(cell.row, cell.col).text() )
		sheet0.clear( clear_area , GC.Spread.Sheets.SheetArea.viewport  ) 
		clear_area.value("")
//		sheet0.setDataSource(dataSource);
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Table Column binding. 
////////////////////////////////////////////////////////////////////////////////////////////////////			
//		sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( cell.row, cell.col, 4, names.length )) 
// update block update Area. 
		spread.options.isProtected = false 
		sheet0.setRowVisible( 11, true )
		sheet0.setRowVisible( 10, true )
//1		let cell_block = sheet0.getRange('AA11:AA11')
		let cell_block = sheet0.getRange( ezch_tbl_editor_appFactory.pos.TblView.pos_insert_data_block_start )
// clear  back first. 
		sheet0.getRange( cell_block.row , cell_block.col, 5 , names.length ).value('') 
		sheet0.getRange( cell_block.row , cell_block.col, 5 , names.length ).locked( false )

		ezch_tbl_editor_appFactory.names_sheet0_notNull.forEach(( ent )=>{
			sheet0.getRange( cell_block.row  , cell_block.col + parseInt( ent ) , 5, 1 ).backColor('#E3EFDA') 
		})
		sheet0.getRange( cell_block.row , cell_block.col, 5 , 1 ).locked( true ).backColor('#CCCCCC') 

//1 remove _start_
		sheet0.getRange('AB7').locked( false ) 
		sheet0.getRange('AA7').locked( false ) 
//1 remove _end_		
		spread.options.isProtected = true 
		sheet0.options.protectionOptions.allowResizeColumns = true ; 

		this.massCheck_toggle( spreadJs_factory , false ) 
//1. remove 		sheet0.getRange('AA7').value('대량삽입') 
	    sheet0.setDataSource( source )
/////////////////////////////////////////////////////////////////////////////////////////////////////
//  Key mapping change.  
////////////////////////////////////////////////////////////////////////////////////////////////////			
	// key mapping init..	
//	     let cell_data_start = sheet0.getRange('AA18:AA18')
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
				 ezch_tbl_editor_appFactory.bl_set_flag = 1;   
			     }	     
		      }	      
	      );	
	      spread.commandManager().register('bl_up', 
		      function bl_up(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editor_appFactory.bl_set_flag 
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections(); 
				     if( selections[0].row > 16 )
				     {	     
				     	selections[0].rowCount += selections[0].row - 16 	
				     	selections[0].row = 16 
				     	sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount ); 
				     }	     
				     ezch_tbl_editor_appFactory.bl_set_flag = 0 ; 

			     }else{
				    spread.commandManager().execute({ cmd: "selectionUp", sheetName: "TblView" , row: sheet0.getActiveRowIndex() , col: sheet0.getActiveColumnIndex() });  
			     }	     
		      }	      
	      );	      
	      spread.commandManager().register('bl_left', 
		      function bl_left(){
			     let s_index = spread.getActiveSheetIndex()
			     let bl_set_flag = ezch_tbl_editor_appFactory.bl_set_flag 
			     if( s_index == 0 && bl_set_flag ){
				     let sheet0 = spread.getSheet( s_index )
				     let selections = sheet0.getSelections(); 
				     selections[0].colCount += selections[0].col - cell_data_start.col  	
				     selections[0].col = cell_data_start.col   
				     sheet0.setSelection( selections[0].row , selections[0].col , selections[0].rowCount, selections[0].colCount ); 
				     ezch_tbl_editor_appFactory.bl_set_flag = 0 ; 

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
		  ezch_tbl_editor_appFactory.endPageLoading();  	

	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   updateSchema_2_data : update from config file. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.updateSchema_2_data = async ( spreadJs_factory  , tbl_all ) => {
		let spread = spreadJs_factory.spread ; 
		let sheet2
		if( old_tbl_editor_flag ){
			sheet2 = spreadJs_factory.spread.getSheet(2) 
		        this.invalid_tblView( spread );
		}else
			sheet2 = spreadJs_factory.spread.getSheetFromName('TblList'); 

		ezch_tbl_editor_appFactory.cellBinding_config_list.sqlState_where = 'order by seq desc'  
		ezch_tbl_editor_appFactory.cellBinding_config_list.sql_enable = false 

		spreadJs_factory.schema_1_data.tbl_schema = tbl_all.tbl_info.tbl_schema 
		spreadJs_factory.schema_1_table.bind(spreadJs_factory.schema_1_columns, 'tbl_schema', spreadJs_factory.schema_1_data );
//1. remove _start_		
//1.		let  cell = sheet2.getRange('L5:L5', GC.Spread.Sheets.SheetArea.viewport );
		let  cell = sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport );
		let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
		cellType2.items([true,false]) 
		spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
			   sheet2.getCell( cell.row + indx , cell.col ).cellType( cellType2 ) 
		}) 
//1. remove _end_

		this.updateTable_name( null , spreadJs_factory , tbl_all.tbl_name  )
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   updateSchema_1_data : init with DB.. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.updateSchema_1_data = async ( spreadjs_product ,spreadJs_factory, tbl_name )=>{
		let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
//1	        let sheet2 = spreadJs_factory.sheet2 =  spread.getSheet(2)
		let sheet2
		if( old_tbl_editor_flag )
			sheet2 = spreadJs_factory.spread.getSheet(2) 
		else
			sheet2 = spreadJs_factory.spread.getSheetFromName('TblList'); 

// invalidate current configure ... 2023-03-09  sqlState_where also. 		
		this.invalid_tblView( spread );
		ezch_tbl_editor_appFactory.cellBinding_config_list.sqlState_where = 'order by seq desc'  
		ezch_tbl_editor_appFactory.cellBinding_config_list.sql_enable = false 
		
		let headers = {}
//		let user_DB = $cookies.get('user_DB') 
		let user_DB = ezch_tbl_editor_appFactory.cur_db
		if( user_DB )headers['user_DB'] = user_DB 

		tbl_name_1 = tbl_name.replace('TB_','') 

//1		let schemaDataHdr = await $http.get(`/ezchemtech/TableEditor/${ tbl_name_1 }`, { headers: headers } ) 
//1		let schema_data = schemaDataHdr.data.tbl_data 
		let schemaDataHdr = await $http.get(`/tbl_editor/${ tbl_name_1 }`, { headers: headers } ) 
		let schema_data = schemaDataHdr.data.DATA  
		ezch_tbl_editor_appFactory.tbl_name = tbl_name
		
		spreadJs_factory.schema_1_data.tbl_schema = [] 
		i = 1 
		for( const [ key, value]  of Object.entries( schema_data )){
			  let formatter = '@'
			  console.log( key, value ) 
			  if( value.type == 'DATETIME' || value.type == 'DATE' )formatter = 'YY/MM/DD';
			  if( value.type == 'MONEY' )formatter = '/* ###,###,###';
			  let entry = { 'No': i , 'Field': key , 'Comment': value.comment , 'Type': value.type , 'Null': value.allowNull, 'primaryKey': value.primaryKey , 'Default': value.defaultValue ,'Formatter': formatter , 'visible': true }  
			  spreadJs_factory.schema_1_data.tbl_schema.push( entry ) 
			  i++ 
		}
	//		spreadJs_factory.schema_1_table.getDirtyRows() 
		spreadJs_factory.schema_1_table.bind(spreadJs_factory.schema_1_columns, 'tbl_schema', spreadJs_factory.schema_1_data );
//1.		let  cell = sheet2.getRange('L5:L5', GC.Spread.Sheets.SheetArea.viewport );
		let  cell = sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport );
		let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
		cellType2.items([true,false]) 
		spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
			   if( indx == 0 )return ; 
			   sheet2.getCell( cell.row + indx , cell.col ).cellType( cellType2 ) 
		}) 
		sheet2.options.isProtected = false 
	//	let column0 = spreadjs_product.getColumn2(0) 
//1		sheet2.getRange("C5:C150").locked( false )
//1		sheet2.getRange("C3:L3").locked( false )
//1		sheet2.getRange("K5:L150").locked( false ) 
		sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.addColumn_info ).locked( false )
		sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.tbl_schema_order_info ).locked( false )
		sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.tbl_schema_edit_info ).locked( false )
//1  remove part _start_		
		let cell_config  = sheet2.getRange("N2").locked(false) 
		sheet2.setValue( cell_config.row , cell_config.col, tbl_name ) 
//1 remove part _end_ 		
		sheet2.options.isProtected = true 
		this.updateTable_name( spreadjs_product , spreadJs_factory , tbl_name )
// clear configName. 
        ezch_tbl_editor_appFactory.config_name = null 
		ezch_tbl_editor_appFactory.updateConfigName( 'no configuration mode')
	}
	 this.change_visible_status = ( spreadjs_product , spreadJs_factory ,current_index , value )=>{
		let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
		 if( spreadJs_factory.schema_1_data?.tbl_schema == undefined )return 
		spread.isPaintSuspended( true ) 
		 if( value != 99 ){
				spreadJs_factory.schema_1_data.tbl_schema[current_index -1].No = spreadJs_factory.schema_1_data.tbl_schema.length + 2 
		 }else{
				spreadJs_factory.schema_1_data.tbl_schema[current_index -1].No = 99 
		 }
		spreadJs_factory.schema_1_data.tbl_schema.sort((a,b)=>{ return ( a.No - b.No )})
		spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
			if( ent.No != 99 )ent.No = indx + 1   
		}) 
		spread.isPaintSuspended( false ) 
	 }
	 this.change_schema_order = ( spreadjs_product, spreadJs_factory ,insert_index , current_index )=>{		
		 // if No. seq don't change order.. 
		if( insert_index == 1 )insert_index = current_index 

		let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
		if( spreadJs_factory.schema_1_data?.tbl_schema == undefined )return 
		if( current_index == null ) return 
		 try{
      		spreadJs_factory.schema_1_data.tbl_schema[current_index -1].No = 900 + insert_index  
		 }catch(err){
			 return err
		 }
		spread.isPaintSuspended( true ) 

		spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
			if( ent.No >= insert_index && ent.No < current_index )ent.No++
			if( ent.No <= insert_index && ent.No >= current_index )ent.No--
		})
		spreadJs_factory.schema_1_data.tbl_schema[current_index -1].No =  insert_index  
		spreadJs_factory.schema_1_data.tbl_schema.sort((a,b)=>{ return ( a.No - b.No )})
		spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
			if( ent.No != 99 )ent.No = indx + 1   
		}) 
		spread.isPaintSuspended( false ) 
	}
		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Global menu : Service.     
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.setUpdate_editLists = ( update_editLists_f  )=>{
		ezch_tbl_editor_appFactory.update_editLists = update_editLists_f ; 
		ezch_tbl_editor_appFactory.update_editLists( ezch_tbl_editor_appFactory.saved_config_list.tbl_data ) 
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Sheet 2 reset( TblList reset )   
/* sheet2_init
	Input: module:
	      
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.sheet2_reset = async (
		spreadjs_product , 
		spreadJs_factory ,
	    user_DB_
	)=>{	
		if( spreadjs_product == null ){
			spreadjs_product = ezch_tbl_editor_appFactory.spreadjs_product
			spreadiJs_factory = ezch_tbl_editor_appFactory.spreadJs_factory 
		}
		  
		let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  

		let sheet2 = spread.getSheet(2); 
		let headers = {}
	   	let user_id =	ezch_tbl_editor_appFactory.cur_id = $cookies.get('user') 
	    let user_DB = ezch_tbl_editor_appFactory.cur_db = user_DB_	

		if( user_DB )headers['user_DB'] = user_DB 
		if( user_id )headers['user_id'] = user_id 
		
		let appDataHdr = await $http.get('/ezchemtech/TableEditor', { headers: headers }) 
		let tbl_list_data  = appDataHdr.data.tbl_data 
		let tbl_list = ezch_tbl_editor_appFactory.table_list ;
// TB_	tbl_list.tbl_data  = tbl_list_data.map( (ent)=>{ return { tbl_name : ent.TABLE_NAME.replace('TB_','') }} ) 
     	tbl_list.tbl_data  = tbl_list_data.map( (ent)=>{ return { tbl_name : ent.TABLE_NAME }} ) 
// Add Sorting. 		
		tbl_list.tbl_data.sort((a,b)=>{
		   if( a.tbl_name[0] < b.tbl_name[0] )return -1 ;
		   if( a.tbl_name[0] > b.tbl_name[0] )return 1 ;
		   return 0;  
		})

		tbl_list.tbl_view.autoGenerateColumns(false);
		tbl_list.tbl_view.bind( tbl_list.tbl_columns , 'tbl_data', tbl_list );
		ezch_tbl_editor_appFactory.tbl_name  = tbl_list.tbl_data[0].tbl_name ; 
		this.updateSchema_1_data( spreadjs_product , spreadJs_factory, ezch_tbl_editor_appFactory.tbl_name   ) 
// confi table re init.. 		
		let cell_savedConfig = sheet2.getRange('N2').backColor('#E3EFDA') 	
// udapte user saved config. 
        await this.getServerSide() 
		let saved_config_list = ezch_tbl_editor_appFactory.saved_config_list 
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		sheet2.setValue( cell_savedConfig.row , cell_savedConfig.col , ezch_tbl_editor_appFactory.tbl_name ) 
		spread.getSheet(0).visible(false); 
// udapte user saved config. 
		spread.setActiveSheetIndex(2) 

   }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Sheet 2 Init( TblList init )   
/* sheet2_init
	Input: module:
	      
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	this.sheet2_init  = async ( 
		spreadjs_product , 
		spreadJs_factory ,
	    user_DB_	
	)=>{	
		if( spreadjs_product != null ){ // Check if init.. 
			ezch_tbl_editor_appFactory.spreadJs_factory = spreadJs_factory 
			ezch_tbl_editor_appFactory.spreadjs_product = spreadjs_product 
		}	
		let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
// move from spreadjs service.. 		
		let initDesign = await $http.get('/app/ezch_tbl_editor_app/ezct_tbl_editor.ssjson')
		if( old_tbl_editor_flag )
			spread.fromJSON( ezchemtech_tbl_editor_design ) 
		else
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
//1 remove..		spread.getSheet(4).visible(false); 

// create new sheet for DB exe log. 
/*1 DbTrLog remove.		 
		if( user_DB_ == undefined ){
			let log_sheet = new GC.Spread.Sheets.Worksheet(); 
			log_sheet.name('DbTrLog')
			spread.addSheet(5,log_sheet )
			this.sheet_dbTrLog_init( spread ) 
		}
*/		

//1  remove part _start_		
		let sheet2, sheet1, tables , TableList ;
		if( old_tbl_editor_flag ){
			sheet2 = spreadJs_factory.sheet2 =  spread.getSheet(2)
			sheet1 = spreadJs_factory.sheet1 =  spread.getSheet(1) 
	// set rowCount. 
			sheet2.setRowCount( 250 ); 
			sheet2.frozenColumnCount(0); 

			sheet1.suspendEvent() 
			sheet2.getRange('E1:E1').backColor('#bbb3d1'); 


			tables = sheet2.tables.all() 
			TableList = tables[0] 
			sheet2.tables.remove( TableList , GC.Spread.Sheets.Tables.TableRemoveOptions.keepData ) 
			sheet2.getRange( 2,2,120,10).value('')
			sheet2.getRange('A3:A120').value('')
		}else{
			sheet2 = spreadJs_factory.sheet2 = spread.getSheetFromName('TblList')
			tables = sheet2.tables.all() 
			TableList = tables[0] 
		}
//1 remove part _end_ 		

		let headers = {}
	   	let user_id =	ezch_tbl_editor_appFactory.cur_id = $cookies.get('user') 
		let user_DB
		if( user_DB_ == undefined ){	
			 user_DB = ezch_tbl_editor_appFactory.cur_db =  $cookies.get('user_DB') 
		}else{
		     user_DB = ezch_tbl_editor_appFactory.cur_db = user_DB_	
		}

		if( user_DB )headers['user_DB'] = user_DB 
		if( user_id )headers['user_id'] = user_id 
		
//1.		let appDataHdr = await $http.get('/ezchemtech/TableEditor', { headers: headers }) 
		let appDataHdr = await $http.get(`/tbl_editor/${ user_DB }/tbl_list`) 
//1		let tbl_list  = appDataHdr.data.tbl_data 
		let tbl_list  = appDataHdr.data.DATA

		var  spreadNS = GC.Spread.Sheets;
//1  remove part _start_		
		if( old_tbl_editor_flag ){
			spread.setActiveSheetIndex(2) 
			sheet2.deleteColumns(10,10) 
			sheet2.setColumnWidth( 10, 220 ) 
			sheet2.getCell(0,0).backColor('black') 
		}else{
			spread.setActiveSheetIndex(1) 
		}
//1 remove part _end_ 		

		sheet2.options.isProtected = false 
	//	let column0 = spreadjs_product.getColumn2(0) 
//		sheet2.getRange("C2:K3").locked( false )
//		sheet2.getRange("C5:C150").locked( false )
//		sheet2.getRange("K3:L150").locked( false ) 
		sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.addColumn_info ).locked( false )
		sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.tbl_schema_order_info ).locked( false )
		sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.tbl_schema_edit_info ).locked( false )
//1  remove part _start_		
		sheet2.getRange("N2:O2").backColor('#E3EFDA').locked(false ) 
		sheet2.getRange("D1").backColor('#E3EFDA') 
//1 remove part _end_ 		
		sheet2.options.isProtected = true 
		sheet2.options.protectionOptions.allowResizeColumns = true ; 

//1  remove part _start_		
		let cell_clean = sheet2.getRange('E2:E2', GC.Spread.Sheets.SheetArea.viewport );
		for( var i = 0 ; i< 6 ;i++){
			sheet2.setValue( cell_clean.row , cell_clean.col + i   , '' )
			sheet2.setValue( cell_clean.row + 1 , cell_clean.col + i   , '' )
		}
//1 remove part _end_ 		
		let cellSource = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editor_appFactory.schema_add ) 
//		let cell_bind = sheet2.getRange('C3:C3') 
		let cell_bind = sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.pos_schema_add.No )
		sheet2.setBindingPath( cell_bind.row, cell_bind.col , 'No' )
		sheet2.setBindingPath( cell_bind.row, cell_bind.col +1  , 'Field' )
		sheet2.setDataSource( cellSource ) 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Sheet2 button type. init .. 			
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
//1  remove partyy _start_		
		if( old_tbl_editor_flag ){	
			let cell_tblName = sheet2.getRange('E1:E1', GC.Spread.Sheets.SheetArea.viewport );
			sheet2.getDataValidator( cell_tblName.row, cell_tblName.col ).reset() 

			let cell_button = sheet2.getRange('K2:K2') 
			let cellType_button = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button.text('Add Column') 
			sheet2.setCellType( cell_button.row , cell_button.col ,cellType_button ) 
			cell_button = sheet2.getRange('O2:O2') 
			let cellType_button1 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button1.text('Save') 
			sheet2.setCellType( cell_button.row , cell_button.col ,cellType_button1 ) 
			cell_button = sheet2.getRange('K1:K1') 
			let cellType_button2= new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button2.text('TblView 생성') 
			sheet2.setCellType( cell_button.row , cell_button.col ,cellType_button2 ) 
		}	
//1 remove part _end_ 		

		var tbl_name_data = {
					name: 'Jones', region: 'East',
					tbl_name : []
				};
		var tableColumn1 = new spreadNS.Tables.TableColumn(1, "tbl_name", "Table Name");
//TB_		tbl_name_data.tbl_name = tbl_list.map( (ent)=>{ return { tbl_name : ent.TABLE_NAME.replace('TB_','') }} ) 
		tbl_name_data.tbl_name = tbl_list.map( (ent)=>{ return { tbl_name : ent.TABLE_NAME }} ) 
// Add Sorting. 		
		tbl_name_data.tbl_name.sort((a,b)=>{
		   if( a.tbl_name[0] < b.tbl_name[0] )return -1 ;
		   if( a.tbl_name[0] > b.tbl_name[0] )return 1 ;
		   return 0;  
		})
// limit to table list max 200 
//		ezch_tbl_editor_appFactory.table_list.tbl_view  = TableList  = sheet2.tables.add('TableList' , 1, 0, tbl_list.length +1 , 1 ) ;
//1 remove _start_				
		if( old_tbl_editor_flag ){
			ezch_tbl_editor_appFactory.table_list.tbl_view  = TableList  = sheet2.tables.add('TableList' , 1, 0, 200 , 1 ) ;
		}
//1 remove _end_ 

         	ezch_tbl_editor_appFactory.table_list.tbl_columns = [tableColumn1] 
//		TableList.setColumnName(0, 'ezchemtech TableList' ) 

		TableList.autoGenerateColumns(false);
		TableList.bind([tableColumn1], 'tbl_name', tbl_name_data);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Sheet2 col Row config. init .. 			
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
//1  remove partyy _start_		
		let cell_list = sheet2.getRange('A1')
		sheet2.setColumnWidth( cell_list.col, 300 ) 
//		sheet2.addSpan( cell_list.row , cell_list.col+4 , 1, 2 ) 
		cell_list = sheet2.getRange('N2').backColor('#bbb3d1')   
		sheet2.setColumnWidth( cell_list.col, 300 ) 
		sheet2.setRowHeight( cell_list.row, 40 ) 

		cell = sheet2.getRange('F1:F1', GC.Spread.Sheets.SheetArea.viewport ); 
		let style = new GC.Spread.Sheets.Style(); 
		style.cellButtons =[
			{
				caption:"고급정보보기", 
				buttonBackColor:"#00C2D6",
				command: "openColorPicker", 
			}
		]
//1 remove part _end_ 		

		let tbl_name = ezch_tbl_editor_appFactory.tbl_name =  tbl_name_data.tbl_name[0].tbl_name 
		sheet2.setValue( 0, 4 , tbl_name_data.tbl_name[0].tbl_name  ) // E2  
		console.log( TableList.dataRange() ) 


		spreadJs_factory.schema_1_data = { tbl_name: 'tbl_name' , region: 'first' , 
			tbl_schema :[
			]};
		tableColumns = [],
				names = ['No', 'Field', 'Comment', 'Type', 'Null', 'primaryKey', 'Default', 'Extra' , 'Formatter', 'visible' ], 
				labels = ['No', 'Field', 'Comment', 'Type', 'Null', 'primaryKey', 'Default', 'Extra', 'Formatter', 'visible' ];
		if( old_tbl_editor_flag ){
			var table = spreadJs_factory.schema_1_table = sheet2.tables.add('firstSchema' , 3,2, 120, 10 ) ;
		}else{
			var table = spreadJs_factory.schema_1_table = tables[1] ;  
		}
		table.autoGenerateColumns( false );
		names.forEach( (name, index )=>{
			let  tableColumn = new GC.Spread.Sheets.Tables.TableColumn();
			tableColumn.name( labels[index] );
			tableColumn.dataField( name ) ;
			tableColumns.push( tableColumn ); 
		});
		spreadJs_factory.schema_1_columns = tableColumns
		table.bind(tableColumns, 'tbl_schema', spreadJs_factory.schema_1_data );
//1  remove part _start_		
		if( old_tbl_editor_flag ){
			TableList.style( GC.Spread.Sheets.Tables.TableThemes["light14"]);
			table.style( GC.Spread.Sheets.Tables.TableThemes["light14"]);
		}	
///////////////////////////////////
		this.updateSchema_1_data( spreadjs_product , spreadJs_factory , tbl_name ) 
//1.		cell = sheet2.getRange('L5:L5', GC.Spread.Sheets.SheetArea.viewport );
		cell = sheet2.getRange( ezch_tbl_editor_appFactory.pos.TblList.pos_yesno_start , GC.Spread.Sheets.SheetArea.viewport );
		let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
		cellType2.items([true,false]) 
		spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
			   sheet2.getCell( cell.row + indx , cell.col ).cellType( cellType2 ) 
		}) 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Sheet2 save config Table init . 			
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		let cell_savedConfig = sheet2.getRange('N2').backColor('#bbb3d1') 	
//1 remove part _end_ 		
// udapte user saved config. 
/* 1 no need. remove.		 
                await this.getServerSide() 

		let saved_config_list = ezch_tbl_editor_appFactory.saved_config_list 
		saved_config_list.tbl_view = sheet2.tables.add('configList', cell_savedConfig.row + 2 , cell_savedConfig.col , 1, 2 ) 
		let del_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
		del_cellButton.text('Delete') 
		let  tableCol1 = new GC.Spread.Sheets.Tables.TableColumn(1,'configName', 'Config List')
		let  tableCol2 = new GC.Spread.Sheets.Tables.TableColumn(2, 'delete', 'Del', null, del_cellButton ) 
		ezch_tbl_editor_appFactory.saved_config_list.tbl_columns = [ tableCol1 , tableCol2 ] 
		saved_config_list.tbl_view.autoGenerateColumns( false ) 
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		sheet2.setValue( cell_savedConfig.row , cell_savedConfig.col , tbl_name ) 
		
		spread.isPaintSuspended( false ) 
		
//1  remove part _start_		
		saved_config_list.tbl_view.style( GC.Spread.Sheets.Tables.TableThemes["light14"]);
		sheet2.getCell('C3').value('3') 
//1 remove part _end_ 		
*/
		spread.isPaintSuspended( false ) 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
// Tbl_view part init.. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
//		await this.initData_1( spreadjs_product , spreadJs_factory , tbl_name , sheetFormat) 
		await this.initData_1( spreadjs_product , spreadJs_factory , tbl_name , undefined ) 
		spread.getSheet(0).visible(false); 
	}
}])
.service('ezch_tbl_editor_eventsService', [
'$injector',	
'ezch_tbl_editor_appService', 
'ezch_tbl_editor_appFactory',	
	function( 
	    $injector, 
		ezch_tbl_editor_appService,
		ezch_tbl_editor_appFactory
	){

	  var sheetFormat_service = $injector.get('sheetFormat_service') 	
	  var schema_tbl_update_flag = 1 
	  this.init = ()=>{
		  schema_tbl_update_flag = 1 
	  }
	  this.cellChanged_event_sheet0 = ( spreadjs_product , spreadJs_factory , args, sheetFormat_service )=>{
		 let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
		 let sheet0 = spreadJs_factory.sheet0 =  spread.getSheet(0)
		 let activeSheet = spread.getActiveSheet() 
		 let cell_sql = sheet0.getRange('AJ5:AJ5', GC.Spread.Sheets.SheetArea.viewport ); 
		 let cell_saveTitle  = sheet0.getRange('AP6:AP6', GC.Spread.Sheets.SheetArea.viewport ); 
		 if( args.col == cell_sql.col && args.row == cell_sql.row ){
			 ezch_tbl_editor_appFactory.input_sqlState_changed = true 
		 }
	  }
	  this.cellChanged_event_sheet2 = ( spreadjs_product , spreadJs_factory , args, sheetFormat_service )=>{
		 let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
		 let sheet2 = spreadJs_factory.sheet2 =  spread.getSheet(2)
		 let activeSheet = spread.getActiveSheet() 
		 let cell = sheet2.getRange('C4:C4', GC.Spread.Sheets.SheetArea.viewport ); 
		 let cell_visible  = sheet2.getRange('L4:L4', GC.Spread.Sheets.SheetArea.viewport ); 
		if( args.row == 0 && args.col == 4 ){
					const  key  = sheet2.getValue( args.row , args.col ) 
					console.log( key ) 
		}else if( args.col == cell.col  && args.row > cell.row  && !schema_tbl_update_flag ){
					ezch_tbl_editor_appService.change_schema_order( spreadjs_product , spreadJs_factory , args.newValue , args.oldValue ) 
		}else if( args.col == cell_visible.col && args.row > cell_visible.row ){
					switch( args.newValue ){
						case true:
							ezch_tbl_editor_appService.change_visible_status( spreadjs_product , spreadJs_factory , args.row - cell_visible.row , 1  );
							break;
						case false:
							ezch_tbl_editor_appService.change_visible_status( spreadjs_product,  spreadJs_factory, args.row - cell_visible.row ,  99 );
							break; 
						default:
				}
		}
	  }
      this.doubleClick_event_sheet2 = ( 
		  spreadjs_product, 
		  spreadJs_factory , 
		  args, 
		  sheetFormat_service 
	  )=>{
		let spread = spreadJs_factory.spread =  spreadjs_product.getSpread()  
		let sheet2 = spreadJs_factory.sheet2 =  spread.getSheet(2)
		let tables = sheet2.tables.all() 
		let cell = sheet2.getRange('A3:A3', GC.Spread.Sheets.SheetArea.viewport ); 
		let cell_update = sheet2.getRange('N4:N4', GC.Spread.Sheets.SheetArea.viewport ); 
		if( args.col == cell.col ){
				 		const  key  = sheet2.getValue( args.row , args.col ) 
					    console.log( key ) 
					    schema_tbl_update_flag = 1
					    ezch_tbl_editor_appService.updateSchema_1_data( 
							spreadjs_product, 
							spreadJs_factory , 
							key , 
							sheetFormat_service 
						) 
					    setTimeout( ()=>{ schema_tbl_update_flag = 0 }, 3000 ) 
		}else{
			if( args.col == cell_update.col && args.row > cell_update.row ){
				let updateConfig = sheet2.getValue( args.row, args.col ) 
				ezch_tbl_editor_appService.updateConfig( spreadJs_factory, updateConfig )
			}
			schema_tbl_update_flag = 0 
		}
	  }
	  this.sheet0_buttonClicked = ( spreadJs_factory , sender, args )=>{
		  let spread = spreadJs_factory.spread 
		  let sheet0 = spread.getSheet(0) 
		  let cell_lock = sheet0.getRange('AG7:AG7') 
		  let cell_rtArea = sheet0.getRange('AA17:AA17') 
		  let cell_massCheck = sheet0.getRange('AB7') 
		  let cell_exec = sheet0.getRange('AC7') 
		  let cell_update = sheet0.getRange('AH7') 
		  let cell_updateSql = sheet0.getRange('AH7') 
		  let cell_savedConfig = sheet0.getRange('AP7') 
		let cell_filterCells = sheet0.getRange('AD7')

		  if( args.row == cell_lock.row ){
			  console.log( ezch_tbl_editor_appFactory.lastSelections ) 
			  switch( args.col ){
				  case cell_filterCells.col:
						let cell_bt5 = ezch_tbl_editor_appFactory.tblView_filter.button_obj ;
						let state_f = 1 - ezch_tbl_editor_appFactory.tblView_filter.filter_state ;
						cell_bt5.text( ezch_tbl_editor_appFactory.tblView_filter.text[state_f] )
						ezch_tbl_editor_appFactory.tblView_filter.filter_state = state_f ;  
						ezch_tbl_editor_appService.applyFilter( spread, state_f ); 
					  break; 
				  case cell_lock.col:
	//				  spread.options.isProtected = false 
					  console.time("answer time");
					  console.timeLog("answer time");
					  sheet0.options.isProtected = false 
					  sheet0.suspendPaint();
// add selection before Exc update.
					  ezch_tbl_editor_appFactory.currentSelections = ezch_tbl_editor_appFactory.currentSelections.concat( ezch_tbl_editor_appFactory.lastSelections )
//					  for( selection of ezch_tbl_editor_appFactory.lastSelections ){
					  for( selection of ezch_tbl_editor_appFactory.currentSelections ){
						  if( selection.row > cell_rtArea.row )
							  sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).styleName('UNLockStyle').locked( false ) 
					  }
					  sheet0.resumePaint();	
					  console.log("lastSelections:")
					  console.timeLog("answer time");
//					  ezch_tbl_editor_appFactory.currentSelections = ezch_tbl_editor_appFactory.lastSelections 
//					  spread.options.isProtected = true 
					  sheet0.options.isProtected = true 
					  console.timeEnd("answer time");
					  let activeCell = ezch_tbl_editor_appFactory.lastSelections[0] ;
					  sheet0.setActiveCell( activeCell.row, activeCell.col ); 

					  break;
				  case cell_massCheck.col:
					  console.log( sheet0.getCell( cell_massCheck.row , cell_massCheck.col ).value() ) 
					   let  toggle_value  = sheet0.getCell( cell_massCheck.row , cell_massCheck.col ).value() 
					   ezch_tbl_editor_appService.massCheck_toggle( spreadJs_factory, toggle_value ) 
					  break;
				  case cell_exec.col:
				       let insertData  = ezch_tbl_editor_appService.get_insertData( spreadJs_factory ) 
				       console.log( insertData ) 
					   ezch_tbl_editor_appService.insertData_DB( spreadJs_factory ) 
					  break; 
				  case cell_update.col:
//  clear unlock cells.. 					  
					  sheet0.options.isProtected = false 
					  console.log("isProtected:")
					  console.timeLog("answer time");
					  for( selection of ezch_tbl_editor_appFactory.currentSelections ){
						  if( selection.row > cell_rtArea.row ){
							  sheet0.getRange( selection.row , selection.col , selection.rowCount , selection.colCount ).locked( true ) 
							  sheet0.clear( selection.row , selection.col, selection.rowCount , selection.colCount , GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style ) 
						  }
					  }
					  console.log("currentSelections:")
					  console.timeLog("answer time");
					  sheet0.options.isProtected = true  
					  ezch_tbl_editor_appService.updateData_2( ezch_tbl_editor_appFactory.spreadjs_product , spreadJs_factory , ezch_tbl_editor_appFactory.sheetFormat_service, null , 2 )  // call_source 2: TblView update. 
					  break;
				   case cell_savedConfig.col:
					  let newConfig = sheet0.getRange('AP6:AP6').text();
					  ezch_tbl_editor_appService.addConfig( spreadJs_factory , newConfig , 2 );  // call soruce 2 : tblView. 
					  break;
				  default:	  
			  }
		  }
	  }
	  this.sheet2_buttonClicked = ( spreadJs_factory , sender, args )=>{
		  let spread = spreadJs_factory.spread 
		  let sheet2 = spread.getSheet(2) 
		  let cell_genTblView = sheet2.getRange('K1')
		  let cell_addCol  = sheet2.getRange('K2') 
		  let cell_savedConfig  = sheet2.getRange('O2') 
		  console.log( spreadJs_factory.schema_1_data.tbl_schema ); 
		  if( args.row == cell_addCol.row ){
			  switch( args.col ){
			          case cell_genTblView.col:	        
					spreadJs_factory.schema_1_data.tbl_schema.sort((a,b)=>{ return ( a.No - b.No )})
					spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
						if( ent.No != 99 )ent.No = indx + 1   
					}) 
					let table = args.sheet.tables.findByName('firstSchema') 
					table.autoGenerateColumns( false ) 
					table.bind( spreadJs_factory.schema_1_columns, 'tbl_schema', spreadJs_factory.schema_1_data );
					schema_tbl_update_flag = 0 
					let  cell = sheet2.getRange('L5:L5', GC.Spread.Sheets.SheetArea.viewport );
					let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
					cellType2.items([true,false]) 
					spreadJs_factory.schema_1_data.tbl_schema.forEach(( ent, indx )=>{
						   sheet2.getCell( cell.row + indx , cell.col ).cellType( cellType2 ) 
					}) 
					break;
				  case cell_savedConfig.col:
					  let newConfig = sheet2.getValue( cell_savedConfig.row, cell_savedConfig.col -1 ) 
					  ezch_tbl_editor_appService.addConfig( spreadJs_factory, newConfig ) 
					  break; 
				default:
			  }
		  }else if( args.col == cell_savedConfig.col ){
			  switch( args.row ){
				  default:
					  let delConfig = sheet2.getValue( args.row, args.col -1 ) 
					  ezch_tbl_editor_appService.removeConfig( delConfig ) 
			  }
		  }else if( args.row == cell_genTblView.row ){  // row 0 
			  switch( args.col){
				  case cell_genTblView.col:
					  spread.getSheet(0).visible(true); 
					  ezch_tbl_editor_appService.updateData_2( null , spreadJs_factory, sheetFormat_service ) 
					  break;
				  default:
			  }
		  }
	  }
	  this.sheet0_selectionChanged = ( spreadJs_factory , sender, args )=>{
		  let spread = spreadJs_factory.spread 
		  let sheet0 = spread.getSheet(0) 
		  ezch_tbl_editor_appFactory.lastSelections = args.oldSelections 	
	  }
}])
