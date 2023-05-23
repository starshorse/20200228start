'use strict';

describe('Service: [serivce/create_app] create_app service', function() {
	// load the controller's module 
	beforeEach( module('admin_app'))
	beforeEach( module('async_job'))
	beforeEach( module('work_space'))
	beforeEach( module('work_space.collections'))
	beforeEach( module('create_app'))
	beforeEach( module('spread_js'))
	beforeEach( module('sheetFormat'))
	beforeEach( module('formulas'))
	beforeEach( module('myApp.rest_api_service'))
	var $httpBackend , restApiServiceDbEdit , createApp_service  , spreadJs_service , workSpace_service, workSpace_factory , workSpaceCollections_service, workSpaceCollections_factory  
	beforeEach( inject( function ( $injector){
		 restApiServiceDbEdit = $injector.get('restApiServiceDbEdit') 
		 createApp_service  = $injector.get('createApp_service') 
		 spreadJs_service = $injector.get('spreadJs_service') 
		 workSpace_service = $injector.get('workSpace_service') 
		 workSpace_factory = $injector.get('workSpace_factory') 
		 workSpaceCollections_service = $injector.get('workSpaceCollections_service') 
		 workSpaceCollections_factory = $injector.get('workSpaceCollections_factory') 
		 $httpBackend = $injector.get('$httpBackend') 
	}))
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
/*			
   CreateApp.addNew_app_db  : 새로운 app 생성하고 DB에 Table를 생성 한다. 
   		global: 
				[ workSpace_service , apps_list_all ] 
		input:
				[ app_name_ : tableName to Create  
				   path :  
			    ]
		return: [
				this.updateApp_list_fdb( app_name_ , spreadJs_service.saveTbl )
				]
*/			
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
	 it('[ work_space/create_app] CreateApp addNew_app', function( done ){
	    console.log('__[ work_space/create_app] CreateApp addNew_app __start__' )
		let tbl_name = 'Jupiter_Test1'
		let lastId = 5 
		let headInfos = [{'name':'name', 'TYPE':'NVARCHAR(120)', 'ALLOWNULL': false }] 
		let companyName = 'ezoffice'  
		let dbName = 'ezoffice_test' 
		const cb_f_createApp = ( newOne )=>{
			console.log('create request', newOne ) 
	        console.log('__[ work_space/create_app] CreateApp addNew_app __end__' )
			done() 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/createTbl_mssql/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'' }); 

		createApp_service.addNew_app_db( lastId, tbl_name, headInfos , companyName, null ,  dbName , cb_f_createApp   ) 
		 $httpBackend.flush() 

	 })
//		this.deleteApp_db = ( app_name_ , db_name , afterDb_cb_f )=>{
	 it('[ work_space/delete_app] deleteApp delete_app', function( done ){
	 console.log('__[ work_space/delete_app] deleteApp delete_app _start_' )
		let tbl_name = 'Jupiter_Test1'
//		let lastId = 5 
//		let headInfos = [{'name':'name', 'TYPE':'NVARCHAR(120)', 'ALLOWNULL': false }] 
//		let companyName = 'ezoffice'  
		let dbName = 'ezoffice_test' 
		const cb_f_deleteApp = ( newOne )=>{
			console.log('delete request', newOne ) 
			expect( newOne.STATUS ).toEqual(1) 
	        console.log('[ work_space/delete_app] deleteApp delete_app _end_' )
			done() 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/deleteTbl_mssql/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'' }); 

		createApp_service.deleteApp_db( tbl_name, dbName , cb_f_deleteApp   ) 
		 $httpBackend.flush() 

	 })
/*
			let params  = { col_name : col_name_ , col_data : col_data_ , db_name_test : db_name  }
			this.updateApp_db( command_id , app_name_ , params , cb_f ) 
*/			
	 it('[ work_space/update_app] update_App addCol', function( done ){
	     console.log('__[ work_space/update_app] update_App addCol __start__ ' )
		let tbl_name = 'Jupiter_Test1'
		let col_data_ = [{'name':'name', 'TYPE':'NVARCHAR(120)', 'ALLOWNULL': false }] 
		let companyName = 'ezoffice'  
		let db_name = 'ezoffice_test'
		let col_name_ = 'name' 
		let params  = { col_name : col_name_ , col_data : col_data_ , db_name_test : db_name  }
		const cb_f_addCol = ( newOne )=>{
			console.log('addCol request', newOne ) 
			expect( newOne.STATUS ).toEqual(1) 
	        console.log('[ work_space/update_app] update_App addCol __end__ ' )
			done() 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/addCol/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'' }); 

		createApp_service.updateApp_db( 'addCol', tbl_name , params, cb_f_addCol   ) 
		 $httpBackend.flush() 

	 })
})
