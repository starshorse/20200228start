angular.module('db_administrationService', [])
.factory('db_administrationFactory', ['$injector', function( $injector ){
	var db_administrationFactory  = {
		sheet_login_table:{ name: 'Table1', data:[]} 
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
		let login_list = await  $http.get('/db_administration/logins_list');
		db_administrationFactory.sheet_login_table.data = login_list.data 
		table.bind( null , 'data' , db_administrationFactory.sheet_login_table ) 
	}
}])

