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
				curLogin: 'F8:F8',
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
				curLogin: 'E6:E6',
				btn_rolesEdit:'E3:E3',  //2023-06-14 
			}
		      },	
		sheet_Servers_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_Users_table_users :{ name: 'Table2', tbl_view: null , data:[]},
		sheet_Users_table_logins :{ name: 'Table3', tbl_view: null , data:[]},
		sheet_Permissions_table_permissions :{ name: 'Table4', tbl_view: null , data:[], login_id: null, login_DB: null },  // 2023-06-14 
		binding_data: { cur_server : null , cur_DB: null, cur_user: null , cur_organization: null ,  cur_login: null  },
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
	        await this.sheet_Permissions_init( spread ); 
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
//1		let Servers_list = await  $http.get('/web_admin_editor/Servers_list');
                let Servers_list = await  $http.get('/Jupiter/db_edit/jupiter/server_list'); 
		if( Servers_list.data.RESULT == -1 ){
			alert( Servers_list.data.ERRORMESSAGE )
			return ;
		}
		Servers_list.data.DATA = Servers_list.data.DATA.data 

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
                jupitor_admin_editorFactory.binding_data.cur_DB = Server_id; 
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
		let cell_curLogin = sheet.getRange( jupitor_admin_editorFactory.pos.Users.curLogin ) 
		sheet.setBindingPath( cell_cur_server.row, cell_cur_server.col , "cur_server")
		sheet.setBindingPath( cell_curUser.row, cell_curUser.col , "cur_user")
		sheet.setBindingPath( cell_curLogin.row, cell_curLogin.col , "cur_login")
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
		sheet.getRange( jupitor_admin_editorFactory.pos.Users.user_info ).locked( false );
		sheet.getRange( jupitor_admin_editorFactory.pos.Users.pos_user_info.position ).backColor('#bbb3d1').locked( true ); 
		sheet.getRange( jupitor_admin_editorFactory.pos.Users.pos_user_info.level ).backColor('#bbb3d1').locked( true ); 
                sheet.options.isProtected = true ;
	}
	this.sheet_Users_addUser = async( spread , id )=>{
                let org_name  = jupitor_admin_editorFactory.binding_data.cur_server ;
		let result = await $http.get(`/Hades/dba_editor/user/${id}`)
		if( result.data?.DATA.length ){
			let yesno = confirm("DB ID가 존재 합니다. Web ID 생성하시겠습니다?") 
			if( yesno == false ) 
				return -1;
		}else{
			result = await $http({ method:'POST' , url:'/Hades/dba_editor/user' , data: { org_name, id }} )
			if( result.data.RESULT == -1 ){
				alert( result.data.ERRORMESSAGE )
				return -1; 
			}
		}	
		result = await $http.get(`/Hades/dba_editor/user/${id}`)
		if( !result.data?.DATA.length ){
			   alert(" ID 생성 오류 발생") 
			   return -1;
        	}
		let user_info = result.data.DATA[0] 
		result = await $http.get(`/Hades/dba_editor/web_user/${org_name}/${id}`)
		if( result.data?.DATA.length ){
			let yesno = confirm("Web ID가 존재 합니다. 해당 ID로 DB 권한을 원합니까 ?") 
			if( yesno == false ) 
				return -1;
		}else{
			result = await $http({ method:'POST' , url:`/Hades/dba_editor/web_user/${ org_name}` , data: { id }} )
			if( result.data.RESULT == -1 ){
				alert( result.data.ERRORMESSAGE )
				return -1; 
			}
		}	
		let userSeq = user_info.seq 
		result = await $http({ method:'POST' , url:`/Hades/dba_editor/web_userSeq/${ org_name }/${ id }` , data: { userSeq }} )
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1; 
		}
		 this.sheet_Users_list_update( spread ) 
	
	}
	this.sheet_users_update = ( spread )=>{
		this.sheet_Users_list_update( spread );
		this.sheet_Users_invalidate( spread , 0 ); // active
		this.sheet_Permissions_invalidate( spread);
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
		this.sheet_Permissions_invalidate( spread);
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
		// set cur Login.. 
		let cur_user_rec = jupitor_admin_editorFactory.web_users.filter((ent)=>ent.email == user_id );
		let cur_login  = jupitor_admin_editorFactory.sheet_Users_table_logins.data.find((ent)=>ent.seq == cur_user_rec[0].userSeq )
		if( cur_login )
			jupitor_admin_editorFactory.binding_data.cur_login = cur_login.user 
		else 
			jupitor_admin_editorFactory.binding_data.cur_login = null  


		this.sheet_Users_part_loginInfo_invalidate( spread, 0 );
	}
	this.sheet_Users_loginSelected = async ( spread, login_id )=>{
		let selected_login = jupitor_admin_editorFactory.sheet_Users_table_logins.data.find((ent)=>ent.user == login_id );
		console.log( selected_login )
		let cur_user = jupitor_admin_editorFactory.binding_data.cur_user ; 
		let cur_user_rec = jupitor_admin_editorFactory.web_users.filter((ent)=>ent.email == cur_user );
		console.log( cur_user_rec  )
		for( user_ent of cur_user_rec ){
			let db_name = user_ent.db_name 
			let id = user_ent.email 
			let userSeq = selected_login.seq 
			let result  = await $http({ method:'POST', url: `/Hades/dba_editor/web_userSeq/${ db_name }/${ id }` , data:{ userSeq } }).catch((err)=>console.log(err));
			if( result.data.RESULT == -1 ){
				alert( users_list.data.ERRORMESSAGE )
			}
		}
		this.sheet_users_update( spread )
	}	
	this.sheet_Users_editInfo = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
                let user_id  = jupitor_admin_editorFactory.binding_data.cur_user ; 
		let cur_user_rec = jupitor_admin_editorFactory.web_users.filter((ent)=>ent.email == user_id );
		for( const [ key, value ] of Object.entries( cur_user_rec[0] )){
			sheet.getRange( jupitor_admin_editorFactory.pos.Users.pos_user_info[key] ).text( value ).wordWrap(true);
		}
		this.sheet_Users_part_userInfo_invalidate( spread, 0 );
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
	this.sheet_users_part_userInfo_update = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let update_e = { name : sheet.getRange( jupitor_admin_editorFactory.pos.Users.pos_user_info.name ).text() , 
			         password :  sheet.getRange( jupitor_admin_editorFactory.pos.Users.pos_user_info.password ).text() , 
		               } 
		let cur_user = jupitor_admin_editorFactory.binding_data.cur_user ; 
		let cur_user_rec = jupitor_admin_editorFactory.web_users.filter((ent)=>ent.email == cur_user );
		console.log( cur_user_rec  )
		for( user_ent of cur_user_rec ){
			let db_name = user_ent.db_name 
			let id = user_ent.email 
			let result  = await $http({ method:'POST', url: `/Hades/dba_editor/web_user/${ db_name }/${ id }` , data: update_e }).catch((err)=>console.log(err));
			if( result.data.RESULT == -1 ){
				alert( users_list.data.ERRORMESSAGE )
			}
		}
		alert("Data update Done!"); 
	}
	this.sheet_Users_part_userInfo_invalidate = ( spread , yes= 1 )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let cell_userInfo = sheet.getRange( jupitor_admin_editorFactory.pos.Users.user_info )
		setColumnVisible( sheet, yes, cell_userInfo ) 
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Permission 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Permissions_binding_data = async ( spread )=>{
                let sheet = spread.getSheetFromName('Permissions') ;
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( jupitor_admin_editorFactory.binding_data ); 
		let cell_cur_DB = sheet.getRange( jupitor_admin_editorFactory.pos.Permissions.curDB ) 
		let cell_curLogin = sheet.getRange( jupitor_admin_editorFactory.pos.Permissions.curLogin ) 
		sheet.setBindingPath( cell_cur_DB.row, cell_cur_DB.col , "cur_DB")
		sheet.setBindingPath( cell_curLogin.row, cell_curLogin.col , "cur_login")
		sheet.setDataSource( binding_data );
	}
	this.sheet_Permissions_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Permissions') ;
		sheet.setColumnCount( 200 );

		this.sheet_Permissions_binding_data( spread ); 
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( jupitor_admin_editorFactory.sheet_Permissions_table_permissions.name ) 		
		jupitor_admin_editorFactory.sheet_Permissions_table_permissions.tbl_view = table; 
		sheet.getRange( jupitor_admin_editorFactory.pos.Permissions.curDB).locked(false); 
                sheet.options.isProtected = true ;
	}
	this.sheet_Permissions_get_userRolesList = async ( spread, db_name )=>{
		let cur_login = jupitor_admin_editorFactory.binding_data.cur_login 
		let roles_list = await  $http.get(`/Hades/db_administration/roles_list/${db_name}/${cur_login}`);
		if( roles_list.data.RESULT == -1){ alert( roles_list.data.ERRORMESSAGE ); return; }
		return roles_list.data.DATA 
	}
	// update from userRoles sheet. using login ID.. 
	this.sheet_Permissions_get_matrix = async( spread , cur_login )=>{
		let db_name = jupitor_admin_editorFactory.binding_data.cur_DB 
                let sheet = spread.getSheetFromName('Permissions') ;
		let result = await $http.get(`/web_admin_editor/permissions_matrix_login/${ db_name }/${ cur_login}`) 
		if( result.data.RESULT == -1 ){ alert( result.data.ERRORMESSAGE ); return; }

		role_matrix = result.data.DATA;

		jupitor_admin_editorFactory.sheet_Permissions_table_permissions.data = role_matrix  
		let table  = jupitor_admin_editorFactory.sheet_Permissions_table_permissions.tbl_view 
		let tbl_info  = jupitor_admin_editorFactory.sheet_Permissions_table_permissions 
//		table.expandBoundRows( true ); 
		table.bind( null , 'data' , tbl_info ) 
		let drange = table.dataRange() 
		let checkBox = new GC.Spread.Sheets.CellTypes.CheckBox(); 
		checkBox.caption("Enabled")
		checkBox.textAlign(GC.Spread.Sheets.CellTypes.CheckBoxTextAlign.right);
		sheet.getRange( drange.row, drange.col + 1, drange.rowCount, drange.colCount -1 ).cellType( checkBox ); 
		let rowFilter  = table.rowFilter();
		spread.resumePaint(); 
	}
	this.sheet_Permissions_update_1 = async ( spread, db_name = null )=>{
		let cur_login = jupitor_admin_editorFactory.binding_data.cur_login 
		this.sheet_Permissions_get_matrix( spread, cur_login ); 
		this.sheet_Permissions_invalidate( spread, 0);
	}
	// 2023-06-14
	this.sheet_Permissions_update_2 = async( spread, db_name = null )=>{
                let sheet = spread.getSheetFromName('Permissions') ;
		let cur_user = jupitor_admin_editorFactory.binding_data.cur_user; 
		let web_login_matrix = await  $http.get(`/Hades/dba_editor/web_login_matrix`);
		if( web_login_matrix.data.RESULT == -1 ){
			alert( web_login_matrix.data.ERRORMESSAGE )
			return -1 ;
		}
		let login_id = web_login_matrix.data.DATA.find((ent)=>ent.web_id == cur_user )
		if( !login_id ){
			alert(" no this web id for DB login id" );
			return -1 ;
		}
		jupitor_admin_editorFactory.sheet_Permissions_table_permissions.login_id = login_id.login_id 
		// 2023-06-14
		if( db_name == null ){
			let db_list = await  $http.get(`/Hades/db_administration/db_list/ezchemtech/${login_id.login_id}`);
			if( db_list.data.RESULT == -1 ){ alert( db_list.data.ERRORMESSAGE ); return; }
			let db_list_items = []
			for( db_name of db_list.data.DATA ){
				db_list_items.push( db_name.name ); 
			}
			let cell_dbl = sheet.getRange( jupitor_admin_editorFactory.pos.Permissions.curDB );
			sheet.getCell( cell_dbl.row, cell_dbl.col).cellType().items(db_list_items)
			sheet.setValue( cell_dbl.row, cell_dbl.col, db_list_items[0] )
			db_name = db_list_items[0];
		}
		jupitor_admin_editorFactory.binding_data.cur_DB = db_name  
		this.sheet_Permissions_get_matrix( spread, login_id.login_id ); 
		this.sheet_Permissions_invalidate( spread, 0);
	}
	// 2023-06-14 
	this.sheet_Permissions_goTo_rolesEdit = ( spread )=>{
		let login_id = jupitor_admin_editorFactory.sheet_Permissions_table_permissions.login_id 
		let login_db = jupitor_admin_editorFactory.binding_data.cur_DB   
		if( login_id == null ){
			alert(" need id for login !")
			return -1 ; 
		}
		$cookies.put( 'login_id' , login_id ,{ path: '/app/db_administration/' } ) 
		$cookies.put( 'login_db' , login_db ,{ path: '/app/db_administration/' } ) 
		window.open('/app/db_administration/')
	}
	// 2023-06-14 
	this.sheet_Permissions_curDB_changed = ( spread, db_name )=>{
		jupitor_admin_editorFactory.binding_data.cur_DB = db_name  
		this.sheet_Permissions_update_2( spread, db_name ) 
	}
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
	this.sheet2_cellChanged = ( spread, sender ,args )=>{
		let sheet2 = spread.getSheet(2)
		let cell_curDB = sheet2.getRange( jupitor_admin_editorFactory.pos.Permissions.curDB );
		switch( args.col ){
			case cell_curDB.col:
				if( args.row == cell_curDB.row )jupitor_admin_editorService.sheet_Permissions_curDB_changed( spread, sheet2.getValue( args.row, args.col ))
				break
			default:
		}
	}
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
				let btn_add_user = args.sheet.getRange( jupitor_admin_editorFactory.pos.Users.btn_add_user ) 
				let btn_edit_info = args.sheet.getRange( jupitor_admin_editorFactory.pos.Users.btn_edit_info ) 
				let btn_view_info = args.sheet.getRange( jupitor_admin_editorFactory.pos.Users.btn_view_info ) 
				let btn_select_start = args.sheet.getRange( jupitor_admin_editorFactory.pos.Users.btn_select_start ) 
				let btn_user_info_update = args.sheet.getRange( jupitor_admin_editorFactory.pos.Users.btn_user_info_update ) 
				let cell_add_user = args.sheet.getRange( jupitor_admin_editorFactory.pos.Users.addUser ) 
				// check click login list .. 
				let table = jupitor_admin_editorFactory.sheet_Users_table_logins.tbl_view 
				let data = jupitor_admin_editorFactory.sheet_Users_table_logins.data 
				let drange = table.dataRange();
				switch( args.col ){
					case btn_add_user.col:
						if( args.row == btn_add_user.row )
							jupitor_admin_editorService.sheet_Users_addUser( spread , args.sheet.getValue( cell_add_user.row, cell_add_user.col ))
						break;
					case btn_edit_info.col:
						if( args.row == btn_edit_info.row )
							jupitor_admin_editorService.sheet_Users_editInfo( spread )
						else if( args.row == btn_view_info.row )
						//	jupitor_admin_editorService.sheet_Permissions_update_1( spread ) 
							jupitor_admin_editorService.sheet_Permissions_update_2( spread ) 
						else if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
							jupitor_admin_editorService.sheet_Users_loginSelected( spread, spread.getSheet(1).getValue( args.row, args.col -1 )); 
						break;
					case btn_user_info_update.col:
						if( args.row == btn_user_info_update.row )
							jupitor_admin_editorService.sheet_users_part_userInfo_update( spread );
						break;
				}
				break;
			case 'Permissions':  // 2023-06-14 
				let btn_rolesEdit = args.sheet.getRange( jupitor_admin_editorFactory.pos.Permissions.btn_rolesEdit ) 
				switch( args.col ){
					case btn_rolesEdit.col:
						if( args.row == btn_rolesEdit.row )
							jupitor_admin_editorService.sheet_Permissions_goTo_rolesEdit( spread ) 
						break;
					default:	
				}
		}	
	}
}])
