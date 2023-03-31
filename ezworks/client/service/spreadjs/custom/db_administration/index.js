angular.module('db_administrationService', [])
.factory('db_administrationFactory', ['$injector', function( $injector ){
	var db_administrationFactory  = {
		sheet_login_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_userRoles_table_roles :{ name: 'Table2', tbl_view: null , data:[]},
		sheet_userRoles_table_userRoles :{ name: 'Table3', tbl_view: null , data:[]},
		binding_data: { cur_login : null, cur_role: null, cur_db: null }
	}
	return db_administrationFactory 	
}])
.service('db_administrationService', ['$injector', function( $injector ){
	var db_administrationFactory = $injector.get('db_administrationFactory') 
	var $http = $injector.get('$http');
	this.initWorkbook = async ( spread )=>{
		let initDesign = await $http.get('/app/db_administration/dba_editor.ssjson')
		spread.fromJSON( initDesign.data ); 
		spread.getSheet(0).name('Login');
		this.sheet_userRoles_invalidate( spread ) ;
		this.sheet_roleEdit_invalidate( spread ) ;
		this.sheet_login_init( spread ); 
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
//		let tables = sheet.tables.all();
		let table = sheet.tables.findByName( db_administrationFactory.sheet_login_table.name ) 		
		db_administrationFactory.sheet_login_table.tbl_view = table; 
		let login_list = await  $http.get('/db_administration/logins_list');
		db_administrationFactory.sheet_login_table.data = login_list.data 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('LOGIN');
		tableColumn1.dataField('login');
		table.bind( [tableColumn1] , 'data' , db_administrationFactory.sheet_login_table ) 
		await this.sheet_userRoles_init( spread ); 
	}
	this.loginSelected = async ( spread, login_id )=>{
                db_administrationFactory.binding_data.cur_login = login_id; 
		this.sheet_userRoles_invalidate( spread, 0 ) 
		await this.sheet_userRoles_update_1( spread, null, login_id ); 
		spread.setActiveSheet('UserRoles');
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     UserRoles Sheet 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_userRoles_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('UserRoles') ;
//		let tables = sheet.tables.all();
		let table1 = sheet.tables.findByName( db_administrationFactory.sheet_userRoles_table_roles.name ) 		
		db_administrationFactory.sheet_userRoles_table_roles.tbl_view = table1; 
		let table2 = sheet.tables.findByName( db_administrationFactory.sheet_userRoles_table_userRoles.name ) 		
		db_administrationFactory.sheet_userRoles_table_userRoles.tbl_view = table2; 
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( db_administrationFactory.binding_data ); 
		let cell_curLogin = sheet.getRange('F6:F6') 
		sheet.setBindingPath( cell_curLogin.row, cell_curLogin.col , "cur_login")
		sheet.setDataSource( binding_data );
	}		
	this.sheet_userRoles_update_1 = async ( spread , db_name = null , login_id )=>{
                let sheet = spread.getSheetFromName('UserRoles') ;
		if( db_name == null ){
			let db_list = await  $http.get(`/db_administration/db_list/${login_id}`);
			let db_list_items = []
			for( db_name of db_list.data ){
				db_list_items.push( db_name.name ); 
			}
			let cell_dbl = sheet.getRange('C6:C6');
			sheet.getCell( cell_dbl.row, cell_dbl.col).cellType().items(db_list_items)
			sheet.setValue( cell_dbl.row, cell_dbl.col, db_list_items[0] )
			db_name = db_list_items[0];
		}
		let roles_list = await  $http.get(`/db_administration/roles_list/${db_name}`);
		db_administrationFactory.sheet_userRoles_table_roles.data = roles_list.data 
		let table = db_administrationFactory.sheet_userRoles_table_roles.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Role');
		tableColumn1.dataField('name');
		table.bind( [tableColumn1] , 'data' , db_administrationFactory.sheet_userRoles_table_roles ) 
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
				if( args.row > drange.row &&  args.row < ( drange.row + data.length ))
					db_administrationService.loginSelected( spread, spread.getSheet(0).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.spread_buttonClicked = ( spread, sender, args )=>{
	}

}])
