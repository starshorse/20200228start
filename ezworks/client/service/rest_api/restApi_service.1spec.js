'use strict';

describe('Service: [serivce/rest_api] rest_api service', function() {
	// load the controller's module 
	beforeEach( module('myApp.rest_api_service'))
	var $httpBackend , restApiServiceDbEdit     
	beforeEach( inject( function ( $injector){
		 restApiServiceDbEdit = $injector.get('restApiServiceDbEdit') 
		 $httpBackend = $injector.get('$httpBackend') 
	}))
/*
	this.command_db = ( cmd_name , tbl_name ,  params , cb_f )=>{
		restApiService.postData(`/db_edit/data/command/${cmd_name}/${tbl_name}` , params , cb_f ) 
	}
*/
	it('[service/rest_api] command_db createTbl  service test', function(done){
		let createTbl_mssql_cmd_name = 'createTbl_mssql' 
		let tbl_name = 'Jupiter_Test1' 
		let createTbl_mssql_params = {
			db_name_test: 'ezoffice_test' , 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/createTbl_mssql/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'' }); 
		const cb_f = ( res_ )=>{
			console.log('createTbl_mssql_cmd_name' ,  res_ ) 
			done() 
		}
		restApiServiceDbEdit.command_db( createTbl_mssql_cmd_name , tbl_name , createTbl_mssql_params , cb_f )  
		$httpBackend.flush() 
	})
	it('[service/rest_api] command_db deleteTbl  service test', function(done){
		let deleteTbl_mssql_cmd_name = 'deleteTbl_mssql' 
		let tbl_name = 'Jupiter_Test1' 
		let deleteTbl_mssql_params = {
			db_name_test: 'ezoffice_test' , 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/deleteTbl_mssql/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'' }); 

		const cb_f = ( res_ )=>{
			console.log('deleteTbl_mssql_cmd_name' ,  res_ ) 
			done() 
		}
		restApiServiceDbEdit.command_db( deleteTbl_mssql_cmd_name , tbl_name , deleteTbl_mssql_params , cb_f )  
		$httpBackend.flush() 
	})
	it('[service/rest_api] command_db  addCol  service test', function(done){
		let addCol_cmd_name = 'addCol' 
		let tbl_name = 'Jupiter_Test1' 
		let addCol_params = {
			db_name_test: 'ezoffice_test' , 
			col_name : 'name',
			col_data :{ name :'name' , 'TYPE':'NVARCHAR(120)' , 'ALLOWNULL': false } 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/addCol/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'', ROWS: addCol_params.col_data  }); 

		const cb_f = ( res_ )=>{
			console.log('addCol_cmd_name' ,  res_ ) 
			done() 
		}
		restApiServiceDbEdit.command_db( addCol_cmd_name , tbl_name , addCol_params , cb_f )  
		$httpBackend.flush() 
	})
	it('[service/rest_api] command_db  updateCol  service test', function(done){
		let updateCol_cmd_name = 'updateCol' 
		let tbl_name = 'Jupiter_Test1' 
		let updateCol_params = {
			db_name_test: 'ezoffice_test' , 
			col_name : 'name',
			col_data :{ name :'name' , 'TYPE':'NVARCHAR(120)' , 'ALLOWNULL': true } 
		}
		$httpBackend.whenPOST(`/db_edit/data/command/updateCol/${ tbl_name }`)
			.respond({ STATUS: 1 , RESULT:'success', ERRORMESSAGE:'', ROWS: updateCol_params.col_data  }); 

		const cb_f = ( res_ )=>{
			console.log('updateCol_cmd_name' ,  res_ ) 
			done() 
		}
		restApiServiceDbEdit.command_db( updateCol_cmd_name , tbl_name , updateCol_params , cb_f )  
		$httpBackend.flush() 
	})
})
