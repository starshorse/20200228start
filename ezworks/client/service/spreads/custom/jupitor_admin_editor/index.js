angular.module('jupitor_admin_editor',[])
.factory('jupitor_admin_editorFactory',function(){
	var jupitor_admin_editorFactory = {
		servers_list: null, 
		web_users: null, 
		pos:{ Servers : {
				curServer: 'F5:F5',
			        addServer: 'C8:C8',
			        server_info:'F3:H16',
				btn_add_server:'D8:D8',
				btn_server_members:'H5:H5',
				pos_server_info: { mainDB: 'G11:G11' , name: 'G12:G12' , port : 'G13:G13' }, 
			        btn_server_info_update: 'H20:H20'

			},
			Users:{
				curServer: 'C5:C5',
			        curUser: 'F5:F5',
				curOrg: 'I5:I5',
			        addUser: 'C8:C8',
				addMLK: 'F8:F8',
				user_info:'I3:K17',
				login_info:'F1:G110',
				btn_add_user:'D8:D8', 
				btn_edit_info:'G5:G5',
				btn_view_info:'G8:G8',
				btn_select_start :'G12:G12',
				pos_user_info:{ name : 'J11:J11', password : 'J12:J12', position :'J13:J13', level:'J14:J14' },
				btn_user_info_update: 'K16:K16' 
			},
			Permissions:{
				curDB:'C6:C6',
				curUser: 'E6:E6',
			}
		      },	
		sheet_Servers_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_Users_table_users :{ name: 'Table2', tbl_view: null , data:[]},
		sheet_Users_table_logins :{ name: 'Table3', tbl_view: null , data:[]},
		sheet_Permissions_table_permissions :{ name: 'Table4', tbl_view: null , data:[]},
		binding_data: { cur_server : null , cur_DB: null, cur_user: null , cur_organization: null },
	}
	return jupitor_admin_editorFactory 	
})
.service('jupitor_admin_editorService',['$injector',function($injector){
	var jupitor_admin_editorFactory = $injector.get('jupitor_admin_editorFactory') 
	var $http = $injector.get('$http') 
	var $cookies = $injector.get('$cookies')
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Workbook init 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.initWorkbook = async ( spread )=>{
		let initDesign = await $http.get('/admin/jupitor_web_admin_editor.ssjson')
		spread.fromJSON( initDesign.data ); 
		this.sheet_Users_invalidate( spread ) ;
		await this.sheet_Servers_init( spread ); 
	        await this.sheet_Users_init( spread ); 
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Servers  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Servers_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Servers') ;
		sheet.setColumnCount( 200 );
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( jupitor_admin_editorFactory.sheet_Servers_table.name ) 		
		jupitor_admin_editorFactory.sheet_Servers_table.tbl_view = table; 

		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( jupitor_admin_editorFactory.binding_data ); 
		let cell_curServers = sheet.getRange( jupitor_admin_editorFactory.pos.Servers.curServer ) 
		sheet.setBindingPath( cell_curServers.row, cell_curServers.col , "cur_server")
		sheet.setDataSource( binding_data );

		sheet.getRange( jupitor_admin_editorFactory.pos.Servers.addServer ).locked( false );
		sheet.getRange( jupitor_admin_editorFactory.pos.Servers.server_info ).locked( false ); 
		sheet.getRange( jupitor_admin_editorFactory.pos.Servers.pos_server_info.mainDB ).backColor('#bbb3d1').locked( true ); 
                sheet.options.isProtected = true ;
	        await this.sheet_Servers_list_update( spread ); 
	}
	this.sheet_Servers_list_update = async ( spread )=>{
                let sheet = spread.getSheetFromName('Servers') ;
		this.sheet_Servers_part_serverInfo_invalidate( spread );
		this.sheet_Users_invalidate( spread ) ;
		let Servers_list = await  $http.get('/web_admin_editor/Servers_list');
		if( Servers_list.data.RESULT == -1 ){
			alert( Servers_list.data.ERRORMESSAGE )
			return ;
		}
		jupitor_admin_editorFactory.servers_list = Servers_list.data.DATA 
		jupitor_admin_editorFactory.sheet_Servers_table.data = Servers_list.data.DATA 
		let table = jupitor_admin_editorFactory.sheet_Servers_table.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Servers');
		tableColumn1.dataField('server_name');
		table.bind( [tableColumn1] , 'data' , jupitor_admin_editorFactory.sheet_Servers_table ) 
	}
	this.sheet_Servers_serverSelected = async ( spread, Server_id )=>{
                jupitor_admin_editorFactory.binding_data.cur_server = Server_id; 
		await this.sheet_Servers_part_serverInfo_update( spread ); 
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
//    Sheet Servers - serverInfo part. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Servers_part_serverInfo_invalidate = ( spread , yes= 1 )=>{
                let sheet = spread.getSheetFromName('Servers') ;
		let cell_orgInfo = sheet.getRange( jupitor_admin_editorFactory.pos.Servers.server_info )
		setColumnVisible( sheet, yes, cell_orgInfo ) 
	}
	this.sheet_Servers_part_serverInfo_update = async ( spread )=>{
		let sheet = spread.getSheetFromName('Servers');
                let Server_id  = jupitor_admin_editorFactory.binding_data.cur_server; 
		
		let server_info = jupitor_admin_editorFactory.servers_list.find((ent)=>ent.server_name == Server_id );
		if( !server_info )return -1 ; 	
			
		for( const [ key, value ] of Object.entries( server_info )){
			let pos =  jupitor_admin_editorFactory.pos.Servers.pos_server_info[key];
			if( pos )
				sheet.getRange( pos ).value( value );
		}
		this.sheet_Users_invalidate( spread );                        // Hide users sheet.
		this.sheet_Servers_part_serverInfo_invalidate( spread , 0 );
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Users  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Users_binding_data = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( jupitor_admin_editorFactory.binding_data ); 
		let cell_cur_server = sheet.getRange( jupitor_admin_editorFactory.pos.Users.curServer ) 
		let cell_curUser = sheet.getRange( jupitor_admin_editorFactory.pos.Users.curUser ) 
		sheet.setBindingPath( cell_cur_server.row, cell_cur_server.col , "cur_server")
		sheet.setBindingPath( cell_curUser.row, cell_curUser.col , "cur_user")
		sheet.setDataSource( binding_data );
	}
	this.sheet_Users_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		sheet.setColumnCount( 200 );
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( jupitor_admin_editorFactory.sheet_Users_table_users.name ) 		
		jupitor_admin_editorFactory.sheet_Users_table_users.tbl_view = table; 
		table = sheet.tables.findByName( jupitor_admin_editorFactory.sheet_Users_table_logins.name ) 		
		jupitor_admin_editorFactory.sheet_Users_table_logins.tbl_view = table; 

		this.sheet_Users_binding_data( spread ); 

		sheet.getRange( jupitor_admin_editorFactory.pos.Users.addUser ).locked( false );
                sheet.options.isProtected = true ;
	}
	this.sheet_users_update = ( spread )=>{
		this.sheet_Users_list_update( spread );
		this.sheet_Users_invalidate( spread , 0 ); // active
	}
	this.sheet_Users_list_update = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		this.sheet_Users_part_loginInfo_invalidate( spread );
                let server_id  = jupitor_admin_editorFactory.binding_data.cur_server ;
		let users_list = await  $http.get(`/Hades/dba_editor/web_users/`);
		if( users_list.data.RESULT == -1 ){
			alert( users_list.data.ERRORMESSAGE )
			return ;
		}
		jupitor_admin_editorFactory.web_users = users_list.data.DATA 
		let web_users_server = jupitor_admin_editorFactory.web_users.filter((ent)=>ent.db_name == server_id )
//		jupitor_admin_editorFactory.sheet_Users_table_users.data = users_list.data.DATA 
		jupitor_admin_editorFactory.sheet_Users_table_users.data = web_users_server; 
		let table = jupitor_admin_editorFactory.sheet_Users_table_users.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Users');
		tableColumn1.dataField('email');
		table.bind( [tableColumn1] , 'data' , jupitor_admin_editorFactory.sheet_Users_table_users ) 

	}
	this.sheet_Users_userSelected = async ( spread, user_id )=>{
		this.sheet_Users_part_userInfo_invalidate( spread );
                jupitor_admin_editorFactory.binding_data.cur_user = user_id; 
                let server_id  = jupitor_admin_editorFactory.binding_data.cur_server ;
		let login_list = await  $http.get(`/Hades/dba_editor/users_list/${ server_id }`);
		if( login_list.data.RESULT == -1 ){
			alert( users_list.data.ERRORMESSAGE )
			return ;
		}
		jupitor_admin_editorFactory.sheet_Users_table_logins.data = login_list.data.DATA 
		let table = jupitor_admin_editorFactory.sheet_Users_table_logins.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Logins');
		tableColumn1.dataField('user');
		table.bind( [tableColumn1] , 'data' , jupitor_admin_editorFactory.sheet_Users_table_logins ) 
		this.sheet_Users_part_loginInfo_invalidate( spread, 0 );
	}
	this.sheet_Users_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('Users').visible( false );
			this.sheet_Permissions_invalidate( spread ); 
		}else{
			spread.getSheetFromName('Users').visible( true );
			spread.setActiveSheet('Users')
		}			
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Users -  part loginInfo 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Users_part_loginInfo_invalidate = ( spread , yes= 1 )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let cell_loginInfo = sheet.getRange( jupitor_admin_editorFactory.pos.Users.login_info )
		setColumnVisible( sheet, yes, cell_loginInfo ) 
		this.sheet_Users_part_userInfo_invalidate( spread );
	
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Users -  part userInfo 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Users_part_userInfo_invalidate = ( spread , yes= 1 )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let cell_userInfo = sheet.getRange( jupitor_admin_editorFactory.pos.Users.user_info )
		setColumnVisible( sheet, yes, cell_userInfo ) 
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Permission 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Permissions_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('Permissions').visible( false );
		}else{
			spread.getSheetFromName('Permissions').visible( true );
			spread.setActiveSheet('Permissions')
		}			
	}
}])
.service('jupitor_admin_editor_eventsService', ['$injector', function($injector){
	var jupitor_admin_editorService = $injector.get('jupitor_admin_editorService') 
	var jupitor_admin_editorFactory = $injector.get('jupitor_admin_editorFactory') 
	this.sheet0_cellDoubleClick =( spread, sender, args )=>{
		// check login list .. 
		let table = jupitor_admin_editorFactory.sheet_Servers_table.tbl_view 
		let data = jupitor_admin_editorFactory.sheet_Servers_table.data 
		let drange = table.dataRange();

		switch( args.col ){
			case drange.col:
				if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
					jupitor_admin_editorService.sheet_Servers_serverSelected( spread, spread.getSheet(0).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.sheet1_cellDoubleClick =( spread, sender, args )=>{
		// check login list .. 
		let table = jupitor_admin_editorFactory.sheet_Users_table_users.tbl_view 
		let data = jupitor_admin_editorFactory.sheet_Users_table_users.data 
		let drange = table.dataRange();

		switch( args.col ){
			case drange.col:
				if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
					jupitor_admin_editorService.sheet_Users_userSelected( spread, spread.getSheet(1).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.spread_buttonClicked = ( spread, sender ,args )=>{
		let sheetName  = args.sheet.name()
		switch( sheetName ){
			case 'Servers':
				let cell_addServer = args.sheet.getRange( jupitor_admin_editorFactory.pos.Servers.addServer ) 
				let btn_server_info_update = args.sheet.getRange( jupitor_admin_editorFactory.pos.Servers.btn_server_info_update ) 
				let btn_server_members = args.sheet.getRange( jupitor_admin_editorFactory.pos.Servers.btn_server_members ) 
				switch( args.col ){
					case (cell_addServer.col + 1):
						jupitor_admin_editorService.sheet_Servers_addServer( spread , args.sheet.getValue( cell_addServer.row, cell_addServer.col )) 
						break;
					case btn_server_info_update.col:
						if( args.row == btn_server_info_update.row )
							jupitor_admin_editorService.sheet_Servers_part_serverInfo_DB_update( spread );
						else if( args.row == btn_server_members.row )
							jupitor_admin_editorService.sheet_users_update( spread ); 
						break;
					default:	
				}
				break;
			case 'Users':
				let btn_add_user = args.sheet.getRange( jupitor_admin_editorFactory.pos.users.btn_add_user ) 
				let btn_add_MLK = args.sheet.getRange( jupitor_admin_editorFactory.pos.users.btn_add_MLK ) 
				let btn_edit_role = args.sheet.getRange( jupitor_admin_editorFactory.pos.users.btn_edit_role ) 
				let btn_MLK_info_update = args.sheet.getRange( jupitor_admin_editorFactory.pos.users.btn_mlk_info_update ) 
				let cell_add_user = args.sheet.getRange( jupitor_admin_editorFactory.pos.users.addUser ) 
				let cell_add_MLK = args.sheet.getRange( jupitor_admin_editorFactory.pos.users.addMLK ) 
				switch( args.col ){
					case btn_add_user.col:
						if( args.row == btn_add_user.row )
							jupitor_admin_editorService.sheet_users_addUser( spread , args.sheet.getValue( cell_add_user.row, cell_add_user.col ))
						break;
					case btn_add_MLK.col:
						if( args.row == btn_add_MLK.row )
							jupitor_admin_editorService.sheet_users_addMLK( spread , args.sheet.getValue( cell_add_MLK.row, cell_add_MLK.col ))
						else if( args.row == btn_edit_role.row )
							jupitor_admin_editorService.sheet_users_goEditRole( spread ) 
						break;
					case btn_MLK_info_update.col:
						if( args.row == btn_MLK_info_update.row )
							jupitor_admin_editorService.sheet_users_part_MLKInfo_DB_update( spread );
						break;
				}
				break;
		}	
	}
}])
