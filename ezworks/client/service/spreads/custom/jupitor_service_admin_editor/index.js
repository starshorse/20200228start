angular.module('jupitor_service_admin_editor',[])
.factory('jupitor_service_admin_editorFactory',function(){
	var jupitor_service_admin_editorFactory = {
		Organization_list: null, 
		web_users: null, 
		pos:{ Organization : {
				curServer: 'F5:F5',
			    btn_update_services: 'C2:C2' 
			},
			Users:{
				curServer: 'C5:C5',
//		        curUser: 'F5:F5',
//				curOrg: 'I5:I5',
				btn_update_services:'C2:C2',
			},
			MachineKeys:{
				curUser:'C5:C5',
				btn_update_services:'C2:C2',
			}
		      },	
		sheet_Organization_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_Organization_table_services :{ name: 'Table4', tbl_view: null , data:[], ch_tbl_list:[] },
		sheet_Users_table_users :{ name: 'Table2', tbl_view: null , data:[]},
		sheet_Users_table_services:{ name: 'Table5', tbl_view: null , data:[], ch_tbl_list: [] },
		sheet_MachineKeys_table_MachineKeyInfos :{ name: 'Table2', tbl_view: null , tbl_columns:[], data:[] },  // 2023-06-14 
		sheet_MachineKeys_table_MachineKeys :{ name: 'Table5', tbl_view: null , tbl_columns:[], data:[], ch_tbl_list: [] },  // 2023-06-14 
		binding_data: { cur_server : null , cur_DB: null, cur_user: null , cur_organization: null ,  cur_login: null  },
	}
	return jupitor_service_admin_editorFactory 	
})
.service('jupitor_service_admin_editorService',['$injector',function($injector){
	var jupitor_service_admin_editorFactory = $injector.get('jupitor_service_admin_editorFactory') 
	var $http = $injector.get('$http') 
	var $cookies = $injector.get('$cookies')
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Workbook init 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.initWorkbook = async ( spread )=>{
//		spread.reset(); 
		let initDesign = await $http.get('/admin/service_admin_editor.ssjson')
		spread.fromJSON( initDesign.data ); 
		this.sheet_Users_invalidate( spread );
		await this.sheet_Organization_init( spread ); 
	    await this.sheet_Users_init( spread ); 
        await this.sheet_MachineKeys_init( spread ); 
	}
	this.sheets_change_list = ( sheet , id_col , drange , ch_tbl_list  )=>{
			sheet.suspendEvent();
		    sheet.suspendDirty();
		    ch_tbl_list = [] 
		    let dirtyCells = sheet.getDirtyCells( drange.row , drange.col, drange.rowCount, drange.colCount ); 
		    for( dirtyCell of dirtyCells ){
					ch_tbl_list.push( sheet.getValue( dirtyCell.row, id_col ))
			}
			ch_tbl_list = [...new Set( ch_tbl_list )]  // set Unique.. 
		    sheet.resumeDirty(); 
			sheet.resumeEvent();
		    return ch_tbl_list 
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Organization  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Organization_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Organization') ;
		sheet.setColumnCount( 200 );
		sheet.options.isProtected = false ;
		let table1 = sheet.tables.findByName( jupitor_service_admin_editorFactory.sheet_Organization_table.name ) 		
		jupitor_service_admin_editorFactory.sheet_Organization_table.tbl_view = table1; 

		let table2 = sheet.tables.findByName( jupitor_service_admin_editorFactory.sheet_Organization_table_services.name ) 		
		jupitor_service_admin_editorFactory.sheet_Organization_table_services.tbl_view = table2; 

		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( jupitor_service_admin_editorFactory.binding_data ); 
		let cell_curOrganization = sheet.getRange( jupitor_service_admin_editorFactory.pos.Organization.curServer ) 
		sheet.setBindingPath( cell_curOrganization.row, cell_curOrganization.col , "cur_server")
		sheet.setDataSource( binding_data );

        sheet.options.isProtected = true ;
	    await this.sheet_Organization_list_update( spread ); 
	}
	this.sheet_Organization_list_update = async ( spread )=>{
        let sheet = spread.getSheetFromName('Organization') ;
//		this.sheet_Organization_part_serverInfo_invalidate( spread );
		this.sheet_Users_invalidate( spread ) ;
//1		let Organization_list = await  $http.get('/web_admin_editor/Organization_list');
//1     let Organization_list = await  $http.get('/Jupiter/db_edit/jupiter/server_list'); 
		let Organization_list = await  $http.get('/Hades/dba_editor/organizations_list');
		if( Organization_list.data.RESULT == -1 ){
			alert( Organization_list.data.ERRORMESSAGE )
			return ;
		}
//1		Organization_list.data.DATA = Organization_list.data.DATA.data 
		jupitor_service_admin_editorFactory.Organization_list = Organization_list.data.DATA 
		jupitor_service_admin_editorFactory.sheet_Organization_table.data = Organization_list.data.DATA 
		let table = jupitor_service_admin_editorFactory.sheet_Organization_table.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Organization');
		tableColumn1.dataField('organization');
		table.bind( [tableColumn1] , 'data' , jupitor_service_admin_editorFactory.sheet_Organization_table ) 

		let org_serviceList = await  $http.get('/Hades/service_admin/service_orgList');
		if( org_serviceList.data.RESULT == -1 ){
			alert( org_serviceList.data.ERRORMESSAGE )
			return ;
		}

        sheet.options.isProtected = false ;

		jupitor_service_admin_editorFactory.sheet_Organization_table_services.data = org_serviceList.data.DATA 
		let table1 = jupitor_service_admin_editorFactory.sheet_Organization_table_services.tbl_view; 

		let drange = table1.dataRange() 
		sheet.getRange( drange.row, drange.col + 1, drange.rowCount, drange.colCount -1 ).locked( true ); 

		table1.bind( null , 'data' , jupitor_service_admin_editorFactory.sheet_Organization_table_services ) 

		drange = table1.dataRange() 
		let checkBox = new GC.Spread.Sheets.CellTypes.CheckBox(); 
		checkBox.caption("Enabled")
		checkBox.textAlign(GC.Spread.Sheets.CellTypes.CheckBoxTextAlign.right);
		sheet.getRange( drange.row, drange.col + 1, drange.rowCount, drange.colCount -1 ).cellType( checkBox ).locked( false ); 
        sheet.options.isProtected = true ;

	}
	this.sheet_Organization_Organizationelected = async ( spread, Server_id )=>{
		jupitor_service_admin_editorFactory.binding_data.cur_server = Server_id; 
		jupitor_service_admin_editorFactory.binding_data.cur_DB = Server_id; 
//1	    await this.sheet_Organization_part_serverInfo_update( spread ); 
		await this.sheet_users_update( spread ) 
	}
	this.sheet_Organization_Service_DBupdate =  async( spread )=>{
		let sheet = spread.getSheetFromName('Organization') 
		let ch_tbl_list = jupitor_service_admin_editorFactory.sheet_Organization_table_services.ch_tbl_list 
		let drange = jupitor_service_admin_editorFactory.sheet_Organization_table_services.tbl_view.dataRange() 
		let data  = jupitor_service_admin_editorFactory.sheet_Organization_table_services.data  
		let id_col = 4  // E col.. 
		ch_tbl_list = this.sheets_change_list( sheet , id_col , drange , ch_tbl_list  ); 
		for( org_name of ch_tbl_list ){
			let entry_data = data.find((ent)=>ent.organization == org_name )
			delete entry_data['organization']
			for( [ key, value ] of Object.entries( entry_data )){
				let service_names = key.split('_') 
				console.log( service_names[0] , service_names[1], value ) 
				value *= 1
				let result  =  await $http({ method: 'POST', url:`/Hades/service_admin/service_orgList/${ org_name }` , data: { serviceClass: service_names[0] , serviceName: service_names[1] , value } })
				if( result.data.RESULT == -1 ){
					alert( result.data.ERRORMESSAGE )
					continue ;
				}
			}
		}

	}
	const setColumnVisible =  ( sheet , yes , cells_area )=>{
		if( yes ){
			for( i = cells_area.col ; i < cells_area.col + cells_area.colCount ; i++ ){
				sheet.setColumnVisible( i, false );
			}
		}else{
			for( i = cells_area.col ; i < cells_area.col + cells_area.colCount ; i++ ){
				sheet.setColumnVisible( i, true );
			}
		}	
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Users  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Users_binding_data = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( jupitor_service_admin_editorFactory.binding_data ); 
		let cell_cur_server = sheet.getRange( jupitor_service_admin_editorFactory.pos.Users.curServer ) 
		let cell_curUser = sheet.getRange( jupitor_service_admin_editorFactory.pos.Users.curUser ) 
		let cell_curLogin = sheet.getRange( jupitor_service_admin_editorFactory.pos.Users.curLogin ) 
		sheet.setBindingPath( cell_cur_server.row, cell_cur_server.col , "cur_server")
		sheet.setBindingPath( cell_curUser.row, cell_curUser.col , "cur_user")
		sheet.setBindingPath( cell_curLogin.row, cell_curLogin.col , "cur_login")
		sheet.setDataSource( binding_data );
	}
	this.sheet_Users_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		sheet.setColumnCount( 200 );
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( jupitor_service_admin_editorFactory.sheet_Users_table_users.name ) 		
		jupitor_service_admin_editorFactory.sheet_Users_table_users.tbl_view = table; 
		table = sheet.tables.findByName( jupitor_service_admin_editorFactory.sheet_Users_table_services.name ) 		
		jupitor_service_admin_editorFactory.sheet_Users_table_services.tbl_view = table; 

		this.sheet_Users_binding_data( spread ); 

        sheet.options.isProtected = true ;
	}
	this.sheet_users_update = ( spread )=>{
		this.sheet_Users_list_update( spread );
		this.sheet_Users_invalidate( spread , 0 ); // active
//1		this.sheet_MachineKeys_invalidate( spread);
	}
	this.sheet_Users_list_update = async ( spread )=>{
        let sheet = spread.getSheetFromName('Users') ;
//1		this.sheet_Users_part_loginInfo_invalidate( spread );
        let server_id  = jupitor_service_admin_editorFactory.binding_data.cur_server ;
		let users_list = await  $http.get(`/Hades/dba_editor/web_users/`);
		if( users_list.data.RESULT == -1 ){
			alert( users_list.data.ERRORMESSAGE )
			return ;
		}
		jupitor_service_admin_editorFactory.web_users = users_list.data.DATA 
		let web_users_server = jupitor_service_admin_editorFactory.web_users.filter((ent)=>ent.db_name == server_id )
//		jupitor_service_admin_editorFactory.sheet_Users_table_users.data = users_list.data.DATA 
		jupitor_service_admin_editorFactory.sheet_Users_table_users.data = web_users_server; 
		let table = jupitor_service_admin_editorFactory.sheet_Users_table_users.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Users');
		tableColumn1.dataField('email');
		table.bind( [tableColumn1] , 'data' , jupitor_service_admin_editorFactory.sheet_Users_table_users ) 

		let user_serviceList = await  $http.get(`/Hades/service_admin/service_userList/${ server_id }`);
		if( user_serviceList.data.RESULT == -1 ){
			alert( user_serviceList.data.ERRORMESSAGE )
			return ;
		}
        sheet.options.isProtected = false ;
		jupitor_service_admin_editorFactory.sheet_Users_table_services.data = user_serviceList.data.DATA 
		let table1 = jupitor_service_admin_editorFactory.sheet_Users_table_services.tbl_view; 

		let drange = table1.dataRange() 
        sheet.getRange( drange.row, drange.col + 1, drange.rowCount , drange.colCount -1  ).locked(true);
		table1.bind( null , 'data' , jupitor_service_admin_editorFactory.sheet_Users_table_services ) 

		drange = table1.dataRange() 
		let checkBox = new GC.Spread.Sheets.CellTypes.CheckBox(); 
		checkBox.caption("Enabled")
		checkBox.textAlign(GC.Spread.Sheets.CellTypes.CheckBoxTextAlign.right);
		sheet.getRange( drange.row, drange.col + 1, drange.rowCount, drange.colCount -1 ).cellType( checkBox ).locked( false ); 
        sheet.options.isProtected = true ;

	}
	this.sheet_Users_userSelected = async ( spread, user_id )=>{
//1		this.sheet_Users_part_userInfo_invalidate( spread );
		this.sheet_MachineKeys_invalidate( spread, 0 );    // active machineKeys sheet. 
        jupitor_service_admin_editorFactory.binding_data.cur_user = user_id; 
		this.sheet_MachineKeys_get_MachineKeys( spread , user_id );
	}
	this.sheet_Users_Service_DBupdate =  async( spread )=>{
		let sheet = spread.getSheetFromName('Users') 
		let ch_tbl_list = jupitor_service_admin_editorFactory.sheet_Users_table_services.ch_tbl_list 
		let drange = jupitor_service_admin_editorFactory.sheet_Users_table_services.tbl_view.dataRange() 
		let data  = jupitor_service_admin_editorFactory.sheet_Users_table_services.data  
		let id_col = 4  // E col.. 
		ch_tbl_list = this.sheets_change_list( sheet , id_col , drange , ch_tbl_list  ); 
		for( user_id of ch_tbl_list ){
			let entry_data = data.find((ent)=>ent.user_id == user_id )
			delete entry_data['user_id']
			for( [ key, value ] of Object.entries( entry_data )){
				let service_names = key.split('_') 
				console.log( service_names[0] , service_names[1], value ) 
				value *= 1
				let result  =  await $http({ method: 'POST', url:`/Hades/service_admin/service_userList/${ user_id }` , data: { serviceClass: service_names[0] , serviceName: service_names[1] , value } })
				if( result.data.RESULT == -1 ){
					alert( result.data.ERRORMESSAGE )
					continue ;
				}
			}
		}
	}
	this.sheet_Users_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('Users').visible( false );
			this.sheet_MachineKeys_invalidate( spread ); 
		}else{
			spread.getSheetFromName('Users').visible( true );
			spread.setActiveSheet('Users')
		}			
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Permission 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_MachineKeys_binding_data = async ( spread )=>{
        let sheet = spread.getSheetFromName('MachineKeys') ;
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( jupitor_service_admin_editorFactory.binding_data ); 
		let cell_cur_user = sheet.getRange( jupitor_service_admin_editorFactory.pos.MachineKeys.curUser ) 
//1		let cell_curLogin = sheet.getRange( jupitor_service_admin_editorFactory.pos.MachineKeys.curLogin ) 
		sheet.setBindingPath( cell_cur_user.row, cell_cur_user.col , "cur_user")
//1		sheet.setBindingPath( cell_curLogin.row, cell_curLogin.col , "cur_login")
		sheet.setDataSource( binding_data );
	}
	this.sheet_MachineKeys_init = async ( spread )=>{
        let sheet = spread.getSheetFromName('MachineKeys') ;
		sheet.setColumnCount( 200 );
		let cell_rolesInfo = sheet.getRange(jupitor_service_admin_editorFactory.pos.MachineKeys.rolesInfo) 
		sheet.setColumnWidth( cell_rolesInfo.col, 30 ) 

		this.sheet_MachineKeys_binding_data( spread ); 
		sheet.options.isProtected = false ;
		let table1 = sheet.tables.findByName( jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeyInfos.name ) 		
		jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeyInfos.tbl_view = table1; 
		let table2 = sheet.tables.findByName( jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.name ) 		
		jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.tbl_view = table2; 
//1		sheet.getRange( jupitor_service_admin_editorFactory.pos.MachineKeys.curDB).locked(false); 
                sheet.options.isProtected = true ;
//1
	}
	this.sheet_MachineKeys_get_MachineKeys = async( spread, user_id )=>{
        let sheet = spread.getSheetFromName('MachineKeys') ;
		let machine_key_serviceInfoList = await  $http.get(`/Hades/service_admin/service_machinekeyInfoList/${ user_id }`);
		if( machine_key_serviceInfoList.data.RESULT == -1 ){
			alert( machine_key_serviceInfoList.data.ERRORMESSAGE )
			return ;
		}

		jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeyInfos.data = machine_key_serviceInfoList.data.DATA 
		let table = jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeyInfos.tbl_view; 
		table.bind( null , 'data' , jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeyInfos ) 

		let machine_key_serviceList = await  $http.get(`/Hades/service_admin/service_machinekeyList/${ user_id }`);
		if( machine_key_serviceList.data.RESULT == -1 ){
			alert( machine_key_serviceList.data.ERRORMESSAGE )
			return ;
		}

		jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.data = machine_key_serviceList.data.DATA 
		let table1 = jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.tbl_view; 
// lock first. 
		sheet.options.isProtected = false ;
		let drange = table1.dataRange()
        sheet.getRange( drange.row, drange.col + 1, drange.rowCount , drange.colCount -1  ).locked(true);

		table1.bind( null , 'data' , jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys ) 

		drange = table1.dataRange() 
		let checkBox = new GC.Spread.Sheets.CellTypes.CheckBox(); 
		checkBox.caption("Enabled")
		checkBox.textAlign(GC.Spread.Sheets.CellTypes.CheckBoxTextAlign.right);
		sheet.getRange( drange.row, drange.col + 1, drange.rowCount, drange.colCount -1 ).cellType( checkBox ).locked( false ); 
        sheet.options.isProtected = true ;

	}
	this.sheet_MachineKeys_update = async( spread )=>{
	}
	this.sheet_MachineKeys_Service_DBupdate =  async( spread )=>{
		let sheet = spread.getSheetFromName('MachineKeys') 
		let ch_tbl_list = jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.ch_tbl_list 
		let drange = jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.tbl_view.dataRange() 
		let data  = jupitor_service_admin_editorFactory.sheet_MachineKeys_table_MachineKeys.data  
		let id_col = 5  // F col.. 
		ch_tbl_list = this.sheets_change_list( sheet , id_col , drange , ch_tbl_list  ); 
		for( MachineKey of ch_tbl_list ){
			let entry_data = data.find((ent)=>ent.MachineKey == MachineKey )
			delete entry_data['MachineKey']
			for( [ key, value ] of Object.entries( entry_data )){
				let service_names = key.split('_') 
				console.log( service_names[0] , service_names[1], value ) 
				value *= 1
				let result  =  await $http({ method: 'POST', url:`/Hades/service_admin/service_machinekeyList/${ MachineKey }` , data: { serviceClass: service_names[0] , serviceName: service_names[1] , value } })
				if( result.data.RESULT == -1 ){
					alert( result.data.ERRORMESSAGE )
					continue ;
				}
			}
		}
	}
	this.sheet_MachineKeys_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('MachineKeys').visible( false );
		}else{
			spread.getSheetFromName('MachineKeys').visible( true );
			spread.setActiveSheet('MachineKeys')
		}			
	}
}])
.service('jupitor_service_admin_editor_eventsService', ['$injector', function($injector){
	var jupitor_service_admin_editorService = $injector.get('jupitor_service_admin_editorService') 
	var jupitor_service_admin_editorFactory = $injector.get('jupitor_service_admin_editorFactory') 
	this.sheet2_cellChanged = ( spread, sender ,args )=>{
		let sheet2 = spread.getSheet(2)
		let cell_curDB = sheet2.getRange( jupitor_service_admin_editorFactory.pos.MachineKeys.curDB );
		switch( args.col ){
			case cell_curDB.col:
				if( args.row == cell_curDB.row )jupitor_service_admin_editorService.sheet_MachineKeys_curDB_changed( spread, sheet2.getValue( args.row, args.col ))
				break
			default:
		}
	}
	this.sheet0_cellDoubleClick =( spread, sender, args )=>{
		// check login list .. 
		let table = jupitor_service_admin_editorFactory.sheet_Organization_table.tbl_view 
		let data = jupitor_service_admin_editorFactory.sheet_Organization_table.data 
		let drange = table.dataRange();

		switch( args.col ){
			case drange.col:
				if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
					jupitor_service_admin_editorService.sheet_Organization_Organizationelected( spread, spread.getSheet(0).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.sheet1_cellDoubleClick =( spread, sender, args )=>{
		// check login list .. 
		let table = jupitor_service_admin_editorFactory.sheet_Users_table_users.tbl_view 
		let data = jupitor_service_admin_editorFactory.sheet_Users_table_users.data 
		let drange = table.dataRange();

		switch( args.col ){
			case drange.col:
				if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
					jupitor_service_admin_editorService.sheet_Users_userSelected( spread, spread.getSheet(1).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.spread_buttonClicked = ( spread, sender ,args )=>{
		let sheetName  = args.sheet.name()
		switch( sheetName ){
			case 'Organization':
				let btn_organization_update_services = args.sheet.getRange( jupitor_service_admin_editorFactory.pos.Organization.btn_update_services ) 
				switch( args.col ){
					case btn_organization_update_services.col:
							jupitor_service_admin_editorService.sheet_Organization_Service_DBupdate( spread ); 
						break;
					default:	
				}
				break;
			case 'Users':
				let btn_users_update_services = args.sheet.getRange( jupitor_service_admin_editorFactory.pos.Users.btn_update_services ) 
				let table = jupitor_service_admin_editorFactory.sheet_Users_table_services.tbl_view 
				let data = jupitor_service_admin_editorFactory.sheet_Users_table_services.data 
				let drange = table.dataRange();
				switch( args.col ){
					case btn_users_update_services.col:
							jupitor_service_admin_editorService.sheet_Users_Service_DBupdate( spread ); 
						break;
					default:	
				}
				break;
			case 'MachineKeys':  // 2023-06-14 
				let btn_MachineKeys_update_services = args.sheet.getRange( jupitor_service_admin_editorFactory.pos.MachineKeys.btn_update_services ) 
				switch( args.col ){
					case btn_MachineKeys_update_services.col:
							jupitor_service_admin_editorService.sheet_MachineKeys_Service_DBupdate( spread ); 
						break;
					default:	
				}
		}	
	}
}])
