angular.module('db_administrationService', [])
.factory('db_administrationFactory', ['$injector', function( $injector ){
	var db_administrationFactory  = {
		pos:{ login : {
				SQLEdit:'J11:J11',
				SQLResult:'J23:J23',
				btn_asLogin:'D10:D10',
			 	btn_sqlExec:'K11:K11',	
				asLogin:'G10:G10'
			} ,
			userRoles:{
				curLogin: 'F6:F6',
				dbList: 'C6:C6',
				addRole: 'C8:C8'
			},
			roleEdit:{
				update: 'C2:C2',
				curDb: 'C6:C6',
				curRole: 'E6:E6'
			}
		      },	
		sheet_login_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_login_asLogin: null , 
		sheet_userRoles_table_roles :{ name: 'Table2', tbl_view: null , data:[]},
		sheet_userRoles_table_userRoles :{ name: 'Table3', tbl_view: null , data:[]},
		sheet_roleEdit_table_roleEdit :{ name: 'Table4', tbl_view: null , data:[], ch_tbl_list:[]},
		binding_data: { cur_login : null, cur_role: null, cur_db: null }
	}
	return db_administrationFactory 	
}])
.service('db_administrationService', ['$injector', function( $injector ){
	var db_administrationFactory = $injector.get('db_administrationFactory') 
	var $http = $injector.get('$http');
	var $cookies = $injector.get('$cookies') 
	this.initWorkbook = async ( spread )=>{
		let initDesign = await $http.get('/app/db_administration/dba_editor.ssjson')
		spread.fromJSON( initDesign.data ); 
		spread.getSheet(0).name('Login');
		this.sheet_login_init( spread ); 
		this.sheet_userRoles_invalidate( spread ) ;
		this.sheet_roleEdit_init( spread ); 
		this.sheet_roleEdit_invalidate( spread ) ;
		if( login_id = $cookies.get('login_id') ){
			this.loginSelected( spread, login_id ) 
			$cookies.remove('login_id', { path: '/app/db_administration/'} ); 
		}
	}
	this.sheet_userRoles_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('UserRoles').visible( false );
		}else{
			spread.getSheetFromName('UserRoles').visible( true );
		}			
	}
	this.sheet_roleEdit_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
	        	let table = db_administrationFactory.sheet_roleEdit_table_roleEdit.tbl_view ; 
			let drange = table.dataRange();
//			spread.getSheetFromName('RoleEdit').clear( drange.row, drange.col , drange.rowCount, drange.colCount , GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.style )   
			spread.getSheetFromName('RoleEdit').visible( false );
		}else{
			spread.getSheetFromName('RoleEdit').visible( true );
		}			
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     Login Sheet 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_login_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Login') ;
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( db_administrationFactory.sheet_login_table.name ) 		
		db_administrationFactory.sheet_login_table.tbl_view = table; 
		let login_list = await  $http.get('/db_administration/logins_list');
		if( login_list.data.RESULT == -1 ){
			alert( login_list.data.ERRORMESSAGE )
			return ;
		}
		db_administrationFactory.sheet_login_table.data = login_list.data.DATA 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('LOGIN');
		tableColumn1.dataField('login');
		table.bind( [tableColumn1] , 'data' , db_administrationFactory.sheet_login_table ) 
		let drange = table.dataRange();
		sheet.getRange( drange ).locked(true);
		sheet.getRange( db_administrationFactory.pos.login.SQLEdit ).locked(false)
                sheet.options.isProtected = true ;

		await this.sheet_userRoles_init( spread ); 
	}
	this.loginSelected = async ( spread, login_id )=>{
                db_administrationFactory.binding_data.cur_login = login_id; 
		this.sheet_userRoles_invalidate( spread, 0 ) 
		this.sheet_roleEdit_invalidate( spread ) 
		await this.sheet_userRoles_update_1( spread, null, login_id ); 
		spread.setActiveSheet('UserRoles');
	}
	this.sheet_login_asLogin = async( spread, login_id )=>{
		let sheet = spread.getSheetFromName('Login');
		db_administrationFactory.sheet_login_asLogin = login_id 
		sheet.getRange( db_administrationFactory.pos.login.asLogin ).text( login_id );

	}
	this.sheet_login_exeSql = async( spread )=>{
		let sheet = spread.getSheetFromName('Login');
		sheet.getRange( db_administrationFactory.pos.login.SQLResult ).text('').wordWrap(true);
		let sql_state =  sheet.getRange( db_administrationFactory.pos.login.SQLEdit ).text();
		let user_id  = db_administrationFactory.sheet_login_asLogin  
		let data = { sql_state , id: user_id } 
		let result = await $http({ method:'POST', url:'/db_administration/login/sql', data }) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return ;
		}
		sheet.getRange( db_administrationFactory.pos.login.SQLResult ).text( JSON.stringify( result.data )).wordWrap(true);
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     UserRoles Sheet 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_userRoles_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('UserRoles') ;
		sheet.options.isProtected = false ;
//		let tables = sheet.tables.all();
		let table1 = sheet.tables.findByName( db_administrationFactory.sheet_userRoles_table_roles.name ) 		
		db_administrationFactory.sheet_userRoles_table_roles.tbl_view = table1; 
		let table2 = sheet.tables.findByName( db_administrationFactory.sheet_userRoles_table_userRoles.name ) 		
		db_administrationFactory.sheet_userRoles_table_userRoles.tbl_view = table2; 
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( db_administrationFactory.binding_data ); 
//		let cell_curLogin = sheet.getRange('F6:F6') 
		let cell_curLogin = sheet.getRange( db_administrationFactory.pos.userRoles.curLogin ) 
		sheet.setBindingPath( cell_curLogin.row, cell_curLogin.col , "cur_login")
		sheet.setDataSource( binding_data );
		sheet.getRange( db_administrationFactory.pos.userRoles.dbList ).locked(false) 
		sheet.getRange( db_administrationFactory.pos.userRoles.addRole ).locked(false) 
                sheet.options.isProtected = true ;
	}		
	this.sheet_userRoles_update_1 = async ( spread , db_name = null , login_id )=>{
                let sheet = spread.getSheetFromName('UserRoles') ;
		if( db_name == null ){
			let db_list = await  $http.get(`/db_administration/db_list/${login_id}`);
			if( db_list.data.RESULT == -1 ){ alert( db_list.data.ERRORMESSAGE ); return; }
			let db_list_items = []
			for( db_name of db_list.data.DATA ){
				db_list_items.push( db_name.name ); 
			}
//			let cell_dbl = sheet.getRange('C6:C6');
			let cell_dbl = sheet.getRange( db_administrationFactory.pos.userRoles.dbList );
			sheet.getCell( cell_dbl.row, cell_dbl.col).cellType().items(db_list_items)
			sheet.setValue( cell_dbl.row, cell_dbl.col, db_list_items[0] )
			db_name = db_list_items[0];
		}
		db_administrationFactory.binding_data.cur_db = db_name ; 
		await this.sheet_userRoles_update_1_rolesList( spread, db_name )
		await this.sheet_userRoles_update_1_userRolesList( spread, db_name , login_id )
	}
	this.sheet_userRoles_update_1_rolesList = async ( spread, db_name )=>{
		let roles_list = await  $http.get(`/db_administration/roles_list/${db_name}`);
		if( roles_list.data.RESULT == -1){ alert( roles_list.data.ERRORMESSAGE ); return; }
		db_administrationFactory.sheet_userRoles_table_roles.data = roles_list.data.DATA 
		this.sheet_userRoles_update_1_rolesList_tblBinding( spread, db_administrationFactory.sheet_userRoles_table_roles ) 
		db_administrationFactory.binding_data.cur_db = db_name ; 
	}
	this.sheet_userRoles_update_1_userRolesList = async ( spread, db_name )=>{
		let cur_login = db_administrationFactory.binding_data.cur_login 
		let roles_list = await  $http.get(`/db_administration/roles_list/${db_name}/${cur_login}`);
		if( roles_list.data.RESULT == -1){ alert( roles_list.data.ERRORMESSAGE ); return; }
		db_administrationFactory.sheet_userRoles_table_userRoles.data = roles_list.data.DATA 
		this.sheet_userRoles_update_1_rolesList_tblBinding( spread, db_administrationFactory.sheet_userRoles_table_userRoles ) 
	}
	this.sheet_userRoles_update_1_rolesList_tblBinding = async ( spread, tbl_info )=>{
		let table = tbl_info.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Role');
		tableColumn1.dataField('name');
		table.bind( [tableColumn1] , 'data' , tbl_info ) 
	}
	this.sheet_userRoles_dbList_changed = async( spread, nw_db )=>{
		this.sheet_roleEdit_invalidate( spread ) 
		await this.sheet_userRoles_update_1_rolesList( spread, nw_db );
		await this.sheet_userRoles_update_1_userRolesList( spread, nw_db,  db_administrationFactory.binding_data.cur_login ) 
	}
	this.sheet_userRoles_roleAdd_selected = async( spread, nw_role, isDelete = false )=>{
		let db_name = db_administrationFactory.binding_data.cur_db 
		let result = await $http({ method: 'POST' , 
					   url: '/db_administration/role_member' ,
					   data: { db_name: db_name , login_id: db_administrationFactory.binding_data.cur_login , role: nw_role , isDelete: isDelete } })   
		
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return ;
		}
		await this.sheet_userRoles_update_1_userRolesList( spread, db_name ,  db_administrationFactory.binding_data.cur_login ) 
	}
	this.sheet_userRoles_role_selected = async( spread, selected_role )=>{
		this.sheet_roleEdit_invalidate( spread ) 
		spread.getSheetFromName('RoleEdit').visible( true );
		let db_name = db_administrationFactory.binding_data.cur_db 
		db_administrationFactory.binding_data.cur_role = selected_role 
		let roles_data = await  $http.get(`/db_administration/roles_data/${db_name}/${selected_role}`);
		if( roles_data.data.RESULT == -1 ){ alert( roles_data.data.ERRORMESSAGE ); return; }
		console.log( roles_data.data.DATA );
		await this.sheet_roleEdit_update_1( spread, roles_data.data.DATA ) 
		spread.setActiveSheetIndex(2); 
		
	}
	this.sheet_userRoles_roleNew = async( spread, nw_role )=>{
		let db_name = db_administrationFactory.binding_data.cur_db 
		let result = await $http({ method: 'POST' , 
					   url: '/db_administration/role' ,
					   data: { db_name: db_name , login_id: db_administrationFactory.binding_data.cur_login , role: nw_role } })   
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return ;
		}
		await this.sheet_userRoles_update_1_rolesList( spread, db_name );
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     RoleEdit Sheet 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_roleEdit_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('RoleEdit') ;
		sheet.options.isProtected = false ;
		let table3 = sheet.tables.findByName( db_administrationFactory.sheet_roleEdit_table_roleEdit.name ) 		
		db_administrationFactory.sheet_roleEdit_table_roleEdit.tbl_view = table3; 
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( db_administrationFactory.binding_data ); 
		let cell_curRole = sheet.getRange( db_administrationFactory.pos.roleEdit.curRole ) 
		sheet.setBindingPath( cell_curRole.row, cell_curRole.col , "cur_role")
		let cell_curDb = sheet.getRange( db_administrationFactory.pos.roleEdit.curDb ) 
		sheet.setBindingPath( cell_curDb.row, cell_curDb.col , "cur_db")
		sheet.setDataSource( binding_data );
		let drange = table3.dataRange();
		sheet.getRange( drange.row, drange.col + 1, drange.rowCount, drange.colCount -1 ).locked(false);
		sheet.options.isProtected = true ;
	}		
	// update from userRoles sheet. 
	this.sheet_roleEdit_update_1 = async ( spread, role_data )=>{
		let db_name = db_administrationFactory.binding_data.cur_db 
		let tables_list = await  $http.get(`/db_administration/tables_list/${db_name}`);
		if( tables_list.data.RESULT == -1 ){ alert( tables_list.data.ERRORMESSAGE ); return; }
		let role_matrix = [] 
		for( tbl_e of tables_list.data.DATA ){
			nw_entry ={ name : tbl_e['name'] , SELECT: false , INSERT: false , UPDATE: false , DELETE: false , ETC: false } 
			role_matrix.push( JSON.parse( JSON.stringify( nw_entry )))
		}
		for( role_e of role_data ){
			for( tbl_e_1 of role_matrix ){
				if( tbl_e_1['name'] == role_e['ObjectName'] )
					tbl_e_1[ role_e['permission_name']] = true 
			}	
		}
		db_administrationFactory.sheet_roleEdit_table_roleEdit.data = role_matrix  
		let table  = db_administrationFactory.sheet_roleEdit_table_roleEdit.tbl_view 
		let tbl_info  = db_administrationFactory.sheet_roleEdit_table_roleEdit 
		table.bind( null , 'data' , tbl_info ) 
	}
	// udpate from update button.. 
	this.sheet_roleEdit_update_2 = async ( spread )=>{
		let db_name = db_administrationFactory.binding_data.cur_db 
		let role_name = db_administrationFactory.binding_data.cur_role
		let tbl_per_list = db_administrationFactory.sheet_roleEdit_table_roleEdit.data
		let ch_tbl_list = db_administrationFactory.sheet_roleEdit_table_roleEdit.ch_tbl_list 
		let isNeed_update = false 
		for( per_e of tbl_per_list ){
			// 1. check changed?
			if( ch_tbl_list.includes( per_e['name'] )){
				let grant_names = []
				for( const [ key, value ] of Object.entries( per_e )){
					if( value == true )grant_names.push( key ) 
				}	
				let result = await $http({ 
					method:'POST', 
					url: `/db_administration/roles_data/${role_name}`,
					data: { db: db_name , tbl_name: per_e['name'] , grant_per: grant_names.join(',') }
					})	
				if( result.data.RESULT == -1 ){
					alert( result.ERRORMESSAGE )
					return 
				}
			  	isNeed_update = true 	
			}
		}
		if( isNeed_update) 
			this.sheet_userRoles_role_selected( spread, role_name )
	}
	
}])
.service('db_administration_eventsService', ['$injector', function($injector){
	var db_administrationFactory = $injector.get('db_administrationFactory') 
	var db_administrationService = $injector.get('db_administrationService') 
	this.sheet0_cellDoubleClick =( spread, sender, args )=>{
		// check login list .. 
		let table = db_administrationFactory.sheet_login_table.tbl_view 
		let data = db_administrationFactory.sheet_login_table.data 
		let drange = table.dataRange();

		switch( args.col ){
			case drange.col:
				if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
					db_administrationService.loginSelected( spread, spread.getSheet(0).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.sheet1_cellDoubleClick =( spread, sender, args )=>{
		let table_roles = db_administrationFactory.sheet_userRoles_table_roles.tbl_view 
		let drange_roles = table_roles.dataRange();
		let table_userRoles = db_administrationFactory.sheet_userRoles_table_userRoles.tbl_view 
		let drange_userRoles = table_userRoles.dataRange();
		let drange , data
		if( args.col == drange_roles.col ){
		// role edit inforamtion  	
			data = db_administrationFactory.sheet_userRoles_table_roles.data 
			drange = drange_roles 
			if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
				db_administrationService.sheet_userRoles_role_selected( spread, spread.getSheetFromName('UserRoles').getValue( args.row, args.col  )); 
		}	
		else if( args.col == drange_userRoles.col ){
		//  role edit information  	
			data = db_administrationFactory.sheet_userRoles_table_userRoles.data 
			drange = drange_userRoles 
			if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
				db_administrationService.sheet_userRoles_role_selected( spread, spread.getSheetFromName('UserRoles').getValue( args.row, args.col )); 
		}
	}
	this.sheet0_cellChanged = ( spread, sender ,args )=>{
	}
	this.sheet1_cellChanged = ( spread, sender ,args )=>{
		let sheet1 = spread.getSheet(1)
		let cell_dbList = sheet1.getRange( db_administrationFactory.pos.userRoles.dbList );
		switch( args.col ){
			case cell_dbList.col:
				if( args.row == cell_dbList.row )db_administrationService.sheet_userRoles_dbList_changed( spread, sheet1.getValue( args.row, args.col ))
				break
			default:
		}
	}
	this.sheet2_cellChanged = ( spread, sender, args )=>{
		let sheet2 = spread.getSheet(2) 
	        let table = db_administrationFactory.sheet_roleEdit_table_roleEdit.tbl_view ; 
		let drange = table.dataRange();
		if( args.row >= drange.row  &&  args.row < drange.row + drange.rowCount &&  args.col >= drange.col && args.col < drange.col + drange.colCount ){
			sheet2.suspendEvent()
//			sheet2.getCell( args.row , args.col ).backColor('#bbb3d1') 
			let ch_tbl_list = db_administrationFactory.sheet_roleEdit_table_roleEdit.ch_tbl_list
			ch_tbl_list.push( sheet2.getValue( args.row, 2 ))
			ch_tbl_list = [...new Set( ch_tbl_list )]  // set Unique.. 
			sheet2.resumeEvent()
		}
	}
	this.spread_buttonClicked = async ( spread, sender, args )=>{
		let sheet_name = args.sheet.name() 
		switch( sheet_name ){
			case 'Login':
				let btn_asLogin = args.sheet.getRange( db_administrationFactory.pos.login.btn_asLogin ) 
				let btn_sqlExec = args.sheet.getRange( db_administrationFactory.pos.login.btn_sqlExec ) 
				if( args.col == btn_asLogin.col ){
					// check login list .. 
					let table = db_administrationFactory.sheet_login_table.tbl_view 
					let data = db_administrationFactory.sheet_login_table.data 
					let drange = table.dataRange();
				        if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
						db_administrationService.sheet_login_asLogin( spread, args.sheet.getValue( args.row , args.col -1 )) 

				}else if( args.col == btn_sqlExec.col ){
					await db_administrationService.sheet_login_exeSql( spread ) 
				}
				break;
			case 'UserRoles':
				let table_roles = db_administrationFactory.sheet_userRoles_table_roles.tbl_view 
				let drange_roles = table_roles.dataRange();
				let table_userRoles = db_administrationFactory.sheet_userRoles_table_userRoles.tbl_view 
				let drange_userRoles = table_userRoles.dataRange();
				let addRole = spread.getSheetFromName('UserRoles').getRange( db_administrationFactory.pos.userRoles.addRole ) 
				let drange , data
				if( args.col == drange_roles.col + 1 ){
				// add roles 	
					if( args.row == addRole.row )
						db_administrationService.sheet_userRoles_roleNew( spread, spread.getSheetFromName('UserRoles').getValue( args.row, args.col - 1 )); 
					else{
						data = db_administrationFactory.sheet_userRoles_table_roles.data 
						drange = drange_roles 
						if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
							db_administrationService.sheet_userRoles_roleAdd_selected( spread, spread.getSheetFromName('UserRoles').getValue( args.row, args.col - 1 )); 
					}	
				}	
				else if( args.col == drange_userRoles.col + 1 ){
				// remove roles 	
			 	        data = db_administrationFactory.sheet_userRoles_table_userRoles.data 
					drange = drange_userRoles 
					if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
						db_administrationService.sheet_userRoles_roleAdd_selected( spread, spread.getSheetFromName('UserRoles').getValue( args.row, args.col - 1 ), true ); 
				}
				break;
			case 'RoleEdit':
				let cell_update = args.sheet.getRange( db_administrationFactory.pos.roleEdit.update )
				if( args.col == cell_update.col && args.row == cell_update.row )
					db_administrationService.sheet_roleEdit_update_2( spread );
				break;
			default:
		}
	}

}])
