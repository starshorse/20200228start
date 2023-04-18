angular.module('ezof_dba_editorService',[])
.factory('ezof_dba_editorFactory', ['$injector',function($injector){
	var ezof_dba_editorFactory = {
		pos:{ organization : {
				curOrganization: 'F5:F5',
			        addOrg: 'C8:C8',
			        curOrg_info: 'G11:G16',
			        org_info:'F3:H21',
				btn_org_members:'H5:H5',
				btn_org_info_update:'H20:H20',
			        btn_key_info :'H6:H6',
				pos_org_info: { mainDB: 'G11:G11' , orgName: 'G12:G12' , orgCommonName: 'G13:G13' , orgFullName : 'G14:G14' , orgType: 'G15:G15', orgBRN: 'G16:G16' }, 
			        curOrg_auth_info: 'K11:K13',
				org_auth_info: 'J3:L21',
				btn_org_auth_info_update:'L20:L20',
				pos_org_auth_info:{ authKey: 'K11:K11', orgAuthSecret: 'K12:K12' , remark:'K13:K13' },

			},
			users:{
				curOrganization: 'C5:C5',
			        addUser: 'C8:C8',
				addMLK: 'F8:F8',
				btn_add_user:'D8:D8', 
				btn_add_MLK:'G8:G8',
				btn_edit_role:'G5:G5',
				btn_mlk_info_update:'K16:K16',
			        curUser: 'F5:F5',
			        curMLK: 'I5:I5',
				mlk_list_info:'F4:G110',
			//	curMLK:'J11:J13',
				pos_curMLK_info:{ machAuthSecret: 'J11:J11', machAuthIdentifier: 'J12:J12', machInfo:'J13:J13' },
				curMLK_info:'I3:K17'
			}
		      },	
		sheet_organization_table:{ name: 'Table1', tbl_view: null , data:[]},
		sheet_users_table_users :{ name: 'Table2', tbl_view: null , data:[]},
		sheet_users_table_userMLKs :{ name: 'Table3', tbl_view: null , data:[]},
		binding_data: { cur_organization : null , cur_mainDB: null, cur_user: null, cur_MLK : null, cur_MLK_seq: null },
// old parts.		
		old_part_flag: false ,
		spread: null ,
		tblView_tbl : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		tblName_list : { tbl_pos: null ,  tbl_view : null , tbl_columns: null , tbl_data_1 : null } ,
		saved_config_list :  { tbl_view : null , tbl_columns : null , tbl_data : [{ configName: 'Test01', delete: false },{ configName:'e_approval_request01', delete: false }] } ,
		cur_db: 'demo',
		tbl_name:'TB_admin_1',
		cur_id: 'richard.choi@ez-office.co.kr',
		sql_state: { pos: null , state_1 :  'select ', state_2: null },
//functions.		
		update_editLists : null,		
		update_cur_db: null ,
		updateAlertInfo: null,
	}
	return ezof_dba_editorFactory 
}])
.service('ezof_dba_editorService', ['$injector',function($injector){
	var ezof_dba_editorFactory = $injector.get('ezof_dba_editorFactory') 
	var $http = $injector.get('$http') 
	var $cookies = $injector.get('$cookies')
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Workbook init 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
	this.initWorkbook = async ( spread )=>{
		let initDesign = await $http.get('/app/ezof_dba_editor/ezof_dba_editor.ssjson')
		spread.fromJSON( initDesign.data ); 
		this.sheet_users_invalidate( spread ) ;
		await this.sheet_organization_init( spread ); 
	        await this.sheet_users_init( spread ); 
	}
	this.sheet_users_invalidate = ( spread, yes = 1 )=>{
		if( yes ){
			spread.getSheetFromName('Users').visible( false );
		}else{
			spread.getSheetFromName('Users').visible( true );
			spread.setActiveSheet('Users')
		}			
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     Organization Sheet 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_organization_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Organization') ;
		sheet.setColumnCount( 200 );
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( ezof_dba_editorFactory.sheet_organization_table.name ) 		
		ezof_dba_editorFactory.sheet_organization_table.tbl_view = table; 

		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( ezof_dba_editorFactory.binding_data ); 
		let cell_curOrganization = sheet.getRange( ezof_dba_editorFactory.pos.organization.curOrganization ) 
		sheet.setBindingPath( cell_curOrganization.row, cell_curOrganization.col , "cur_organization")
		sheet.setDataSource( binding_data );

		sheet.getRange( ezof_dba_editorFactory.pos.organization.addOrg ).locked( false );
		sheet.getRange( ezof_dba_editorFactory.pos.organization.curOrg_info ).locked( false ); 
		sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info.orgName ).backColor('#bbb3d1').locked( true ); 
		sheet.getRange( ezof_dba_editorFactory.pos.organization.org_auth_info ).locked( false ); 
		sheet.getRange( ezof_dba_editorFactory.pos.organization.curOrg_auth_info ).locked( false ); 
		sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_auth_info.orgAuthSecret ).backColor('#bbb3d1').locked( true ); 
                sheet.options.isProtected = true ;
	        await this.sheet_organization_list_update( spread ); 
//		await this.sheet_userRoles_init( spread ); 
	}
	this.sheet_organization_list_update = async ( spread )=>{
                let sheet = spread.getSheetFromName('Organization') ;
		this.sheet_organization_part_orgInfo_invalidate( spread );
		let organization_list = await  $http.get('/Hades/dba_editor/organizations_list');
		if( organization_list.data.RESULT == -1 ){
			alert( organization_list.data.ERRORMESSAGE )
			return ;
		}
		ezof_dba_editorFactory.sheet_organization_table.data = organization_list.data.DATA 
		let table = ezof_dba_editorFactory.sheet_organization_table.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Organization');
		tableColumn1.dataField('organization');
		table.bind( [tableColumn1] , 'data' , ezof_dba_editorFactory.sheet_organization_table ) 
	}
	this.sheet_organization_addOrg = async ( spread , nw_orgId )=>{
		if( nw_orgId == null || nw_orgId == ''){
			alert(" orgName can't null or '' ");
			return ; 
		}
		let nw_e = { mainDB: 'TBD' , orgName: nw_orgId , orgCommonName: 'TBD' , orgFullName : 'TBD' , orgType: '법인', orgBRN: 'TBD' } 
	        let result = await  $http({ method:'POST',
					    url: '/Hades/dba_editor/organization',
					    data: nw_e 
					});
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return ;
		}
		this.sheet_organization_list_update( spread )	
		this.sheet_organization_organizationSelected( spread, nw_orgId );
	}
	this.sheet_organization_organizationSelected = async ( spread, organization_id )=>{
                ezof_dba_editorFactory.binding_data.cur_organization = organization_id; 
		await this.sheet_organization_part_orgInfo_update( spread ); 
//		spread.setActiveSheet('UserRoles');
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     Organization Sheet -  orgInfo part 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_organization_part_orgInfo_update = async ( spread )=>{
		let sheet = spread.getSheetFromName('Organization');
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization; 
		let result = await $http.get(`/Hades/dba_editor/organizations_list/${ organization_id }`) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return 
		}

		if( !result.data.DATA[0].mainDB || result.data.DATA[0].mainDB == 'TBD')
			alert("This Organizastion mainDB not informed , plz update mainDB")
	        else
			ezof_dba_editorFactory.binding_data.cur_mainDB = result.data.DATA[0].mainDB 


		for( const [ key, value ] of Object.entries( result.data.DATA[0] )){
			sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info[key] ).text( value );
		}
		this.sheet_organization_part_orgMLKInfo_invalidate( spread ); // Hide machine Key info Section.
		this.sheet_users_invalidate( spread );                        // Hide users sheet.
		this.sheet_organization_part_orgInfo_invalidate( spread , 0 );
	}
	this.sheet_organization_part_orgInfo_DB_update = async ( spread )=>{
		let sheet = spread.getSheetFromName('Organization');
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization; 
		let update_e = { mainDB: sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info.mainDB).text() , 
				 orgCommonName: sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info.orgCommonName).text() , 
			         orgFullName : sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info.orgFullName).text() , 
			         orgType:  sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info.orgType).text() , 
			         orgBRN:  sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_info.orgBRN).text() , 
		               } 
	        let result = await  $http({ method:'POST',
					    url: `/Hades/dba_editor/organization/${ organization_id }`,
					    data: update_e  
					});
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return ;
		}
		alert("DB Update Done!"); 

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
	this.sheet_organization_part_orgInfo_invalidate = ( spread , yes=1 )=>{
                let sheet = spread.getSheetFromName('Organization') ;
		let cell_orgInfo = sheet.getRange( ezof_dba_editorFactory.pos.organization.org_info )
		setColumnVisible( sheet, yes, cell_orgInfo ) 
		if( yes )
			this.sheet_organization_part_orgMLKInfo_invalidate( spread); 
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     Organization Sheet -  orgInfo part -orgMLK part. 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_organization_part_orgMLKInfo_update = async ( spread )=>{
		let sheet = spread.getSheetFromName('Organization');
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization; 
		let result = await $http.get(`/Hades/dba_editor/authOrgs_list/${ organization_id }`) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return 
		}
		let yesNo = false ; 
		if( result.data.DATA.length == 0){
			yesno = confirm(" Organization Key not Exist, do you want to create one ?");
			if( yesno == false ) return ; 
			let  data = { company: organization_id , id: organization_id, type: 'Organization' }
			let result = await $http({ method: 'POST' , url: '/mlk_auth/sign_key', data })
			console.log( result.data ) 
			data = { org_name : organization_id , mlk_value : result.data.MLK_VALUE } 
			result = await $http({ method:'POST' , url:'/Hades/dba_editor/authOrg', data }) 
			if( result.data.RESULT == -1 ){
				alert( result.data.ERRORMESSAGE );
				return 
			}
			confirm("machine Key  generate done!, go check?"); 
		        result = await $http.get(`/Hades/dba_editor/authOrgs_list/${ organization_id }`) 
		}
		for( const [ key, value ] of Object.entries( result.data.DATA[0] )){
			sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_auth_info[key] ).text( value ).wordWrap(true);
		}
		this.sheet_organization_part_orgMLKInfo_invalidate( spread, 0 ); 
	}	
	this.sheet_organization_part_orgMLKInfo_DB_update = async ( spread )=>{
		let sheet = spread.getSheetFromName('Organization');
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization; 
		let update_e = { authKey : sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_auth_info.authKey ).text() , 
			         remark :  sheet.getRange( ezof_dba_editorFactory.pos.organization.pos_org_auth_info.remark ).text() , 
		               } 
	        let result = await  $http({ method:'POST',
					    url: `/Hades/dba_editor/authOrg/${ organization_id }`,
					    data: update_e  
					});
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return ;
		}
		alert("DB Update Done!"); 

	}
	this.sheet_organization_part_orgMLKInfo_invalidate = ( spread , yes=1 )=>{
                let sheet = spread.getSheetFromName('Organization') ;
		let cell_orgAuthInfo = sheet.getRange( ezof_dba_editorFactory.pos.organization.org_auth_info )
		setColumnVisible( sheet, yes, cell_orgAuthInfo ) 
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//     Users Sheet 
///////////////////////////////////////////////////////////////////////////////////////////////////////
	this.sheet_users_binding_data = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let binding_data = new GC.Spread.Sheets.Bindings.CellBindingSource( ezof_dba_editorFactory.binding_data ); 
		let cell_curOrganization = sheet.getRange( ezof_dba_editorFactory.pos.users.curOrganization ) 
		let cell_curUser = sheet.getRange( ezof_dba_editorFactory.pos.users.curUser ) 
		let cell_curMLK = sheet.getRange( ezof_dba_editorFactory.pos.users.curMLK ) 
		sheet.setBindingPath( cell_curOrganization.row, cell_curOrganization.col , "cur_organization")
		sheet.setBindingPath( cell_curUser.row, cell_curUser.col , "cur_user")
		sheet.setBindingPath( cell_curMLK.row, cell_curMLK.col , "cur_MLK")
		sheet.setDataSource( binding_data );
	}
	this.sheet_users_init = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		sheet.setColumnCount( 200 );
		sheet.options.isProtected = false ;
		let table = sheet.tables.findByName( ezof_dba_editorFactory.sheet_users_table_users.name ) 		
		ezof_dba_editorFactory.sheet_users_table_users.tbl_view = table; 
		let table_mlk = sheet.tables.findByName( ezof_dba_editorFactory.sheet_users_table_userMLKs.name ) 		
		ezof_dba_editorFactory.sheet_users_table_userMLKs.tbl_view = table_mlk; 

		this.sheet_users_binding_data( spread ); 

		sheet.getRange( ezof_dba_editorFactory.pos.users.addUser ).locked( false );
		sheet.getRange( ezof_dba_editorFactory.pos.users.addMLK ).locked( false );
		sheet.getRange( ezof_dba_editorFactory.pos.users.curMLK_info ).locked( false ); 
		sheet.getRange( ezof_dba_editorFactory.pos.users.pos_curMLK_info.machAuthSecret ).backColor('#bbb3d1').locked( true ); 
		sheet.getRange( ezof_dba_editorFactory.pos.users.pos_curMLK_info.machAuthIdentifier ).backColor('#bbb3d1').locked( true ); 
                sheet.options.isProtected = true ;
	}
	this.sheet_users_addUser = async ( spread , user_id )=>{
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization ;
		let data = { org_name : organization_id , id: user_id } 
		let result = await $http({ method: 'POST', url:'/Hades/dba_editor/user/', data }) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return ;
		}
	// assign default DB .. 
                let cur_mainDB  = ezof_dba_editorFactory.binding_data.cur_mainDB ;
		data = { mainDB : cur_mainDB , id: user_id } 
		result = await $http({ method: 'POST', url:'/Hades/dba_editor/user/assignDB', data }) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return ;
		}
		this.sheet_users_list_update( spread );
	}
	this.sheet_users_update = ( spread )=>{
		this.sheet_users_list_update( spread );
		this.sheet_users_invalidate( spread , 0 ); // active
	}
	this.sheet_users_list_update = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
		this.sheet_users_part_MLKList_invalidate( spread );
		this.sheet_users_part_MLKInfo_invalidate( spread );
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization ;
		let users_list = await  $http.get(`/Hades/dba_editor/users_list/${ organization_id }`);
		if( users_list.data.RESULT == -1 ){
			alert( users_list.data.ERRORMESSAGE )
			return ;
		}
		ezof_dba_editorFactory.sheet_users_table_users.data = users_list.data.DATA 
		let table = ezof_dba_editorFactory.sheet_users_table_users.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('Users');
		tableColumn1.dataField('user');
		table.bind( [tableColumn1] , 'data' , ezof_dba_editorFactory.sheet_users_table_users ) 
		// await this.sheet_users_binding_data( spread ); 

	}
	this.sheet_users_userSelected = async ( spread, user_id )=>{
                ezof_dba_editorFactory.binding_data.cur_user = user_id; 
		spread.refresh(); 
		this.sheet_users_mlkList_update( spread ) 
		this.sheet_users_part_MLKInfo_invalidate( spread );
		this.sheet_users_part_MLKList_invalidate( spread , 0 );
	}
	this.sheet_users_goEditRole = async ( spread )=>{
		$cookies.put( 'login_id' , ezof_dba_editorFactory.binding_data.cur_user,{ path: '/app/db_administration/' } ) 
		window.open('/app/db_administration/')
	}
	this.sheet_users_addMLK = async ( spread , machInfo )=>{
                let user_id  = ezof_dba_editorFactory.binding_data.cur_user;
                let organization_id  = ezof_dba_editorFactory.binding_data.cur_organization ;
		let data = { company: organization_id , id: user_id, type: 'Machine' }
		let result = await $http({ method: 'POST' , url: '/mlk_auth/sign_key', data })
		console.log( result.data ) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return ;
		}
		let mlk_value = result.data.MLK_VALUE 
		data = { user_id , mlk_value , machInfo }
		result = await $http({ method: 'POST' , url: '/Hades/dba_editor/authMlk', data })
		console.log( result.data ) 
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE )
			return ;
		}

		this.sheet_users_mlkList_update( spread );
	}
	this.sheet_users_mlkList_update = async ( spread )=>{
                let sheet = spread.getSheetFromName('Users') ;
                user_id  = ezof_dba_editorFactory.binding_data.cur_user;
		let mlks_list = await  $http.get(`/Hades/dba_editor/authMlks_list/${ user_id }`);
		if( mlks_list.data.RESULT == -1 ){
			alert( mlks_list.data.ERRORMESSAGE )
			return ;
		}
		ezof_dba_editorFactory.sheet_users_table_userMLKs.data = mlks_list.data.DATA 
		let table = ezof_dba_editorFactory.sheet_users_table_userMLKs.tbl_view; 
		table.autoGenerateColumns( false )
		let tableColumn1 = new GC.Spread.Sheets.Tables.TableColumn(); 
		tableColumn1.name('ID(seq)');
		tableColumn1.dataField('seq');
		table.bind( [tableColumn1] , 'data' , ezof_dba_editorFactory.sheet_users_table_userMLKs ) 
		
	}
	this.sheet_users_userMlkSelected = async ( spread, mlk_id )=>{
                let sheet = spread.getSheetFromName('Users') ;
	        let mlk_obj = data_mlk = ezof_dba_editorFactory.sheet_users_table_userMLKs.data.find((ent)=> ent.seq == mlk_id ) 
                ezof_dba_editorFactory.binding_data.cur_MLK =  mlk_obj.machAuthSecret.slice(-10)
		for( const [ key, value ] of Object.entries( mlk_obj )){
			if(  ezof_dba_editorFactory.pos.users.pos_curMLK_info[key] ) 
				sheet.getRange( ezof_dba_editorFactory.pos.users.pos_curMLK_info[key] ).text( value ).wordWrap(true);
		}
                ezof_dba_editorFactory.binding_data.cur_MLK_seq = mlk_id ; 
		spread.refresh(); 
		this.sheet_users_part_MLKInfo_invalidate( spread, 0 );
	}
	this.sheet_users_part_MLKInfo_DB_update = async ( spread )=>{
		let sheet = spread.getSheetFromName('Users');
                let mlk_id =  ezof_dba_editorFactory.binding_data.cur_MLK_seq ; 
		let update_e = {  machInfo :  sheet.getRange( ezof_dba_editorFactory.pos.users.pos_curMLK_info.machInfo ).text() } 
	        let result = await  $http({ method:'POST',
					    url: `/Hades/dba_editor/authMlk/${ mlk_id }`,
					    data: update_e  
					});
		if( result.data.RESULT == -1 ){
			alert( result.data.ERRORMESSAGE );
			return ;
		}
		alert("DB Update Done!"); 
		await this.sheet_users_userSelected( spread , ezof_dba_editorFactory.binding_data.cur_user ) 

	}
	this.sheet_users_part_MLKList_invalidate = ( spread , yes=1 )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let cell_mlkList = sheet.getRange( ezof_dba_editorFactory.pos.users.mlk_list_info )
		setColumnVisible( sheet, yes, cell_mlkList ) 
	}
	this.sheet_users_part_MLKInfo_invalidate = ( spread , yes=1 )=>{
                let sheet = spread.getSheetFromName('Users') ;
		let cell_mlkList = sheet.getRange( ezof_dba_editorFactory.pos.users.curMLK_info )
		setColumnVisible( sheet, yes, cell_mlkList ) 
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    API server interface..
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.allowConfig = async( spread, pr_name )=>{
	       let pr_name2api = pr_name	
	       let result  = await $http({ method:'GET', url: `/dba_editor/${ ezof_dba_editorFactory.cur_db }/${ ezof_dba_editorFactory.tbl_name}/${ pr_name }`})		
	       console.log( result ) 
	}
	this.updateTblPr_config = async ( spread,  tbl_name )=>{
	      sheet1 = spread.getSheet(1); 	
	      let cellC3 = sheet1.getRange('C3:C3').text( tbl_name ); 
	      sheet1.autoFitColumn( cellC3.col );	
	      ezof_dba_editorFactory.tbl_name =  tbl_name  ; 
	}
	this.updateTblData = async ( spread , db_name )=>{
	      sheet0 = spread.getSheet(0); 	
	      sheet1 = spread.getSheet(1); 	
	      let  tbl_view = ezof_dba_editorFactory.tblView_tbl.tbl_view ;
	      let tblName_view = ezof_dba_editorFactory.tblName_list.tbl_view;  
	      ezof_dba_editorFactory.tblName_list.tbl_data_1 =  await this.get_tblName_list( db_name ) ; 
	      let tblName_list  = ezof_dba_editorFactory.tblName_list ; 
	      let tblName_column = ezof_dba_editorFactory.tblName_list.tbl_columns; 	
	      tblName_view.bind( tblName_column , 'tbl_data_1', tblName_list ) 
	      let tbl_name = ezof_dba_editorFactory.tbl_name =  ezof_dba_editorFactory.tblName_list.tbl_data_1[0].TABLE_NAME ; 
	      sheet1.getRange('C3:C3').text( tbl_name ); 
	      sheet1.autoFitColumn(0) ;
	      sheet1.autoFitColumn(2) ; 
	      ezof_dba_editorFactory.cur_db = db_name ; 	
	      ezof_dba_editorFactory.update_cur_db( db_name ); 	
		
	}
	this.get_tblName_list = async ( db = null )=>{
		if(db == null )db = ezof_dba_editorFactory.cur_db ;
		let url = `/dba_editor/${db}` 
		let headers = {}
		let result = await $http({ method:'GET', url, headers }) 
		let tblName_list  = result.data.DATA.reduce( ( acc, cur , index )=>{
			acc.push({ TABLE_NAME : cur['TABLE_NAME']})
			return acc
		}, [])
		return tblName_list ; 
	}	
	this.setUpdate_editLists = ( update_editLists_f  )=>{
		ezof_dba_editorFactory.update_editLists = update_editLists_f ; 
		ezof_dba_editorFactory.update_editLists( ezof_dba_editorFactory.saved_config_list.tbl_data ) 
	}
	this.getServerSide = async ()=>{
		let id = ezof_dba_editorFactory.cur_id  
		let headers = { id } 
		let db = ezof_dba_editorFactory.cur_db 
		let url = `/tbl_editor/${db}/user/` 
		let result = await $http({ method:'GET', url, headers }) 
		let configList = result.data.DATA.config_list 
		ezof_dba_editorFactory.saved_config_list.tbl_data = ( configList == undefined )? [] : configList ; 
		ezof_dba_editorFactory.update_editLists( ezof_dba_editorFactory.saved_config_list.tbl_data ) 
	}
	this.updateServerSide = async ()=>{
		let id = ezof_dba_editorFactory.cur_id  
		let headers = { id } 
		let data = { id , config_list : ezof_dba_editorFactory.saved_config_list.tbl_data } 
		let db = ezof_dba_editorFactory.cur_db 
		let url = `/tbl_editor/${db}/user/` 
		let result  =  await $http({ method: 'POST', url, data , headers } )
		console.log( result.data ) 
		ezof_dba_editorFactory.update_editLists( ezof_dba_editorFactory.saved_config_list.tbl_data ) 
	}
	this.updateConfig = ( spread , updateConfig )=>{
		if( updateConfig == null || updateConfig == '' ){
			alert("잘못된 정보입니다")
			return 
		}
		let saved_config_list = ezof_dba_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == updateConfig )
		if( recon_index == -1 ){ alert("항목오류입니다."); return }
		let cell_savedConfig = spread.getSheet(1).getRange("N2") 
                spread.getSheet(1).setValue( cell_savedConfig.row, cell_savedConfig.col, updateConfig ) 
		this.updateServerSide()

	}
	this.removeConfig = ( delConfig )=>{
		if( delConfig == null || delConfig == ''){
			alert("잘못된 정보입니다.")
			return 
		}
		let saved_config_list = ezof_dba_editorFactory.saved_config_list 
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
		let saved_config_list = ezof_dba_editorFactory.saved_config_list 
		let recon_index =  saved_config_list.tbl_data.findIndex((ent)=>ent.configName == newConfig )
		if( recon_index != -1 ){
			let yorn = confirm("재설정하시겠습니까?")
			if( yorn == false )return
			else saved_config_list.tbl_data.splice( recon_index, 1 ) 
		}
		saved_config_list.tbl_data.push({ configName: newConfig , delete: false }) 
		saved_config_list.tbl_view.bind( saved_config_list.tbl_columns , 'tbl_data', saved_config_list ) 
		this.updateServerSide()

	}
	this.updateData_1 = async( spread )=>{
		let sheet0 = spread.getSheet(0) 
	        let tbl_data  = await $http({ method:'GET', url: `/dba_editor/${ ezof_dba_editorFactory.cur_db }/sql`})		
		ezof_dba_editorFactory.tblView_tbl.tbl_data_1 =  tbl_data.data.DATA 
		let tbl_info = ezof_dba_editorFactory.tblView_tbl 
		let table1 = ezof_dba_editorFactory.tblView_tbl.tbl_view 
		let tbl_pos = ezof_dba_editorFactory.tblView_tbl.tbl_pos 
	        sheet0.tables.resize( table1, new GC.Spread.Sheets.Range( tbl_pos.row, tbl_pos.col, tbl_info.tbl_data_1.length , 10 ))
		table1.bind( null , 'tbl_data_1', tbl_info ) 
		
                let cell_columns = sheet0.getRange('B1:K1') 
		for( var i = 0 ; i < cell_columns.colCount ;i++ ){
			sheet0.autoFitColumn( cell_columns.col + i ) 	
		}

	}
	this.initTblView = async ( spread )=>{
	      let sheet0 = spread.getSheet(0); 
	      sheet0.name('TblView')
	      sheet0.setColumnCount(30)
	      sheet0.setRowCount(30000)	
	      let defaultStyle = new GC.Spread.Sheets.Style() 
	      sheet0.suspendPaint();
	      sheet0.setDefaultStyle( defaultStyle ) 
	      sheet0.resumePaint() 
	      sheet0.frozenRowCount(17) 

	      let cell_tblData = sheet0.getRange('B17') 	
	      let table1 = ezof_dba_editorFactory.tblView_tbl.tbl_view = sheet0.tables.add('tableView', cell_tblData.row , cell_tblData.col, 120, 20 );
	      ezof_dba_editorFactory.tblView_tbl.tbl_pos = cell_tblData 
	      table1.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	}
	this.initTblList = async ( spread )=>{

	     ezof_dba_editorFactory.spread = spread; 	
             let sheet1 = spread.getSheet(1);
	     sheet1.name('TblList')
	     let cell_savedConfig = sheet1.getRange('N2').backColor('#E3EFDA') 
	     sheet1.setColumnWidth( cell_savedConfig.col, 300 ) 
	     sheet1.setRowHeight( cell_savedConfig.row , 40 ) 	
	     let save_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     save_cellButton.text('Save') 
	     sheet1.setCellType( cell_savedConfig.row , cell_savedConfig.col+1 , save_cellButton )
	     await this.getServerSide() 	
	     let saved_config_list = ezof_dba_editorFactory.saved_config_list 

	     saved_config_list.tbl_view = sheet1.tables.add( 'configList', cell_savedConfig.row + 2 , cell_savedConfig.col , 1 , 2 ) 	
	     let del_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     del_cellButton.text('Delete') 

	     let tableCol1 = new GC.Spread.Sheets.Tables.TableColumn(1, 'configName', 'Conifg List' ) 
	     let tableCol2 = new GC.Spread.Sheets.Tables.TableColumn(2, 'delete', 'Del' , null, del_cellButton ) 	
             
	     ezof_dba_editorFactory.saved_config_list.tbl_columns = [ tableCol1, tableCol2 ]
 
	     saved_config_list.tbl_view.autoGenerateColumns( false ) 
	     saved_config_list.tbl_view.bind([ tableCol1 , tableCol2 ]  , 'tbl_data', saved_config_list )		
	 //    sheet1.options.isProtected = true 	
	     
	//     sheet1.setColumnWidth( 0, 200 );	
	     let tblName_view = ezof_dba_editorFactory.tblName_list.tbl_view = sheet1.tables.add('TABLE_NAME', 1 , 0, 50, 1 ); 
	     ezof_dba_editorFactory.tblName_list.tbl_data_1 =  await this.get_tblName_list() ; 
	     let tblName_list  = ezof_dba_editorFactory.tblName_list ; 
	     let tblName_column = ezof_dba_editorFactory.tblName_list.tbl_columns =  [ new GC.Spread.Sheets.Tables.TableColumn(1, 'TABLE_NAME', 'TABLE_NAME')]; 	
	     tblName_view.bind( tblName_column , 'tbl_data_1', 	tblName_list ) 
	     tblName_view.style( GC.Spread.Sheets.Tables.TableThemes['medium4']) 
	 //    sheet1.setColumnWidth( 2, 200 );	
	     sheet1.getRange('C2:C2').text("테이블 권한").backColor("lightgreen"); 	
	     let tbl_name = ezof_dba_editorFactory.tbl_name =  ezof_dba_editorFactory.tblName_list.tbl_data_1[0].TABLE_NAME ; 
	     sheet1.getRange('C3:C3').text( tbl_name ); 
	     sheet1.autoFitColumn(0) ;
	     sheet1.autoFitColumn(2) ; 

	     let prType_combo = new GC.Spread.Sheets.CellTypes.ComboBox(); 
	     prType_combo.items(["SELECT","UPDATE","INSERT","DELETE","REMOVE_ALL"])	
	     sheet1.getRange('C5:C5').cellType( prType_combo );  	
             let cellC5 = sheet1.getRange('C5:C5').text("SELECT");
	     sheet1.setRowHeight( cellC5.row , 40 );	
	     sheet1.setColumnWidth( cellC5.col -1 , 20 );	
		
	     let allow_cellButton = new GC.Spread.Sheets.CellTypes.Button() 
	     allow_cellButton.text('권한부여') 
	     sheet1.getRange('D5:D5').cellType( allow_cellButton );  	
	     sheet1.autoFitColumn(3) ; 

	     await this.updateData_1( spread ) 
	     spread.setActiveSheetIndex(1); 	

	}
}])
.service('ezof_dba_editor_eventsService', ['$injector', function($injector){
	var ezof_dba_editorService = $injector.get('ezof_dba_editorService') 
	var ezof_dba_editorFactory = $injector.get('ezof_dba_editorFactory') 
	this.sheet0_cellDoubleClick =( spread, sender, args )=>{
		// check login list .. 
		let table = ezof_dba_editorFactory.sheet_organization_table.tbl_view 
		let data = ezof_dba_editorFactory.sheet_organization_table.data 
		let drange = table.dataRange();

		switch( args.col ){
			case drange.col:
				if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
					ezof_dba_editorService.sheet_organization_organizationSelected( spread, spread.getSheet(0).getValue( args.row, args.col )); 
				break;
			default:
		}
	}
	this.sheet1_cellDoubleClick = ( spread, sender, args )=>{
		if( ezof_dba_editorFactory.old_part_flag ){
			let sheet1 = spread.getSheet(1) 
			let cell_savedConfig = sheet1.getRange('N4:N4') 
			let cell_tblName_list = sheet1.getRange('A3:A3')
			let updateConfig = sheet1.getValue( args.row , args.col ) 
			if( args.col == cell_savedConfig.col && args.row > cell_savedConfig.row  ){
				ezof_dba_editorService.updateConfig( spread,  updateConfig )  
			}else if( args.col == cell_tblName_list.col && args.row > 1 && args.row < ( cell_tblName_list.row + ezof_dba_editorFactory.tblName_list.tbl_data_1.length )){
				ezof_dba_editorService.updateTblPr_config( spread, sheet1.getValue( args.row, args.col ))
			}	
		}else{
			// check login list .. 
			let table = ezof_dba_editorFactory.sheet_users_table_users.tbl_view 
			let data = ezof_dba_editorFactory.sheet_users_table_users.data 
			let drange = table.dataRange();
			let table_mlk = ezof_dba_editorFactory.sheet_users_table_userMLKs.tbl_view 
			let data_mlk = ezof_dba_editorFactory.sheet_users_table_userMLKs.data 
			let drange_mlk = table_mlk.dataRange();

			switch( args.col ){
				case drange.col:
					if( args.row >= drange.row &&  args.row < ( drange.row + data.length ))
						ezof_dba_editorService.sheet_users_userSelected( spread, spread.getSheetFromName('Users').getValue( args.row, args.col )); 
					break;
				case drange_mlk.col:
					if( args.row >= drange_mlk.row &&  args.row < ( drange_mlk.row + data_mlk.length ))
						ezof_dba_editorService.sheet_users_userMlkSelected( spread, spread.getSheetFromName('Users').getValue( args.row, args.col )); 
					break;
				default:
			}
		}
	}
	this.spread_buttonClicked = ( spread, sender ,args )=>{
		let sheetName  = args.sheet.name()
		switch( sheetName ){
			case 'Organization':
				let cell_addOrg = args.sheet.getRange( ezof_dba_editorFactory.pos.organization.addOrg ) 
				let btn_org_info_update = args.sheet.getRange( ezof_dba_editorFactory.pos.organization.btn_org_info_update ) 
				let btn_org_auth_info_update = args.sheet.getRange( ezof_dba_editorFactory.pos.organization.btn_org_auth_info_update ) 
				let btn_key_info = args.sheet.getRange( ezof_dba_editorFactory.pos.organization.btn_key_info ) 
				let btn_org_members = args.sheet.getRange( ezof_dba_editorFactory.pos.organization.btn_org_members ) 
				switch( args.col ){
					case (cell_addOrg.col + 1):
						ezof_dba_editorService.sheet_organization_addOrg( spread , args.sheet.getValue( cell_addOrg.row, cell_addOrg.col )) 
						break;
					case btn_org_info_update.col:
						if( args.row == btn_org_info_update.row )
							ezof_dba_editorService.sheet_organization_part_orgInfo_DB_update( spread );
						else if( args.row == btn_key_info.row )
							ezof_dba_editorService.sheet_organization_part_orgMLKInfo_update( spread );
						else if( args.row == btn_org_members.row )
							ezof_dba_editorService.sheet_users_update( spread ); 
						break;
					case btn_org_auth_info_update.col:
						if( args.row == btn_org_auth_info_update.row )
							ezof_dba_editorService.sheet_organization_part_orgMLKInfo_DB_update( spread );
						break;
					default:	
				}
				break;
			case 'Users':
				let btn_add_user = args.sheet.getRange( ezof_dba_editorFactory.pos.users.btn_add_user ) 
				let btn_add_MLK = args.sheet.getRange( ezof_dba_editorFactory.pos.users.btn_add_MLK ) 
				let btn_edit_role = args.sheet.getRange( ezof_dba_editorFactory.pos.users.btn_edit_role ) 
				let btn_MLK_info_update = args.sheet.getRange( ezof_dba_editorFactory.pos.users.btn_mlk_info_update ) 
				let cell_add_user = args.sheet.getRange( ezof_dba_editorFactory.pos.users.addUser ) 
				let cell_add_MLK = args.sheet.getRange( ezof_dba_editorFactory.pos.users.addMLK ) 
				switch( args.col ){
					case btn_add_user.col:
						if( args.row == btn_add_user.row )
							ezof_dba_editorService.sheet_users_addUser( spread , args.sheet.getValue( cell_add_user.row, cell_add_user.col ))
						break;
					case btn_add_MLK.col:
						if( args.row == btn_add_MLK.row )
							ezof_dba_editorService.sheet_users_addMLK( spread , args.sheet.getValue( cell_add_MLK.row, cell_add_MLK.col ))
						else if( args.row == btn_edit_role.row )
							ezof_dba_editorService.sheet_users_goEditRole( spread ) 
						break;
					case btn_MLK_info_update.col:
						if( args.row == btn_MLK_info_update.row )
							ezof_dba_editorService.sheet_users_part_MLKInfo_DB_update( spread );
						break;
				}
				break;
		}	
	}
	this.sheet1_buttonClicked = ( spread, sender, args )=>{
		let sheet1 = spread.getSheet(1) 
		let cell_savedConfig = sheet1.getRange('O2:O2') 
		let cell_prConfig = sheet1.getRange('D5:D5') 
		if( args.col == cell_savedConfig.col ){
			switch( args.row ){
				case cell_savedConfig.row:
					let newConfig = sheet1.getValue( cell_savedConfig.row , cell_savedConfig.col -1 ) 
					ezof_dba_editorService.addConfig( newConfig ) 
					break; 
				default:	
					let delConfig = sheet1.getValue( args.row , args.col -1 ) 
					ezof_dba_editorService.removeConfig( delConfig ) 
			}
		}else if( args.col == cell_prConfig.col ){
			switch( args.row ){
				case cell_prConfig.row:
					ezof_dba_editorService.allowConfig( spread, sheet1.getValue( args.row, args.col -1 ) )
					break;
			        default:		
		        } 		
		}	
	}

}])
