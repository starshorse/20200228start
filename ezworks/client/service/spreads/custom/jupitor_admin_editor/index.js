angular.module('jupitor_admin_editor',[])
.factory('jupitor_admin_editorFactory',function(){
	var jupitor_admin_editorFactory = {
		pos:{ Servers : {
				curServer: 'G5:G5',
			        addServer: 'C8:C8',
			        server_info:'F3:H16',
				btn_add_server:'D8:D8',
				btn_memebers:'H5:H5',
				pos_server_info: { mainDB: 'G11:G11' , name: 'G12:G12' , port : 'G13:G13' }, 
			        btn_server_info_update: 'H20:H20'

			},
			Users:{
				curServer: 'C5:C5',
			        curUser: 'F5:F5',
				curOrg: 'I5:I5',
			        addUser: 'C8:C8',
				addMLK: 'F8:F8',
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
	this.sheet_Users_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('Users').visible( false );
			this.sheet_Permissions_invalidate( spread ); 
		}else{
			spread.getSheetFromName('Users').visible( true );
			spread.setActiveSheet('Users')
		}			
	}
	this.sheet_Permissions_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('Permissions').visible( false );
		}else{
			spread.getSheetFromName('Permissions').visible( true );
			spread.setActiveSheet('Permissions')
		}			
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Servers  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Servers_init = ( spread )=>{
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Users  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.sheet_Users_init = ( spread )=>{
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Sheet Permission 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
}])
