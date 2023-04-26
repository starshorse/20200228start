'use strict'
const { readFileSync , writeFileSync, statSync, existsSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 
const sql = require('mssql')
const sqlServer = require('../../config/database/sqlserver')
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   GET Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fdb_exec_get = async ( file_path , hdr_include = 0 )=>{
	let result = { RESULT : -1 , ERRORMESSAGE:"" , file_path:file_path , DATABASE:'fdb',DATA: null, RAWDATA: null }
        if( existsSync( file_path )){
		if( hdr_include ){
			result.DATA = {}
			result.DATA['data'] = JSON.parse( readFileSync( file_path, 'utf-8'))
			result.DATA['hdr'] = JSON.parse( readFileSync( file_path + '.hdr' , 'utf-8'))
		}else{
			result.DATA =  JSON.parse( readFileSync( file_path, 'utf-8'))
		}
		console.log( result.DATA );
		result.RESULT = 0 ;
		return result			
	}
	return result.ERRORMESSAGE = 'file not found' + file_path ;
}
const sql_exec_get = async ( user_id , passwd , db_name , sql_state )=>{
	let result = { RESULT : -1 , ERRORMESSAGE:"" , SQL:sql_state , DATABASE:db_name , RAWDATA: null }
	let config = sqlServer.getConfig( user_id , passwd, db_name ); 
	try{
		await sql.connect( config )
		let result_1 = await sql.query( sql_state )
		console.log( result_1.recordset) 
		await sql.close() 
		result.RESULT = 0 
		result.RAWDATA = JSON.parse( JSON.stringify( result_1 ))
		result.DATA = result_1.recordset
	        return  result
	}catch(err){
		await sql.close() 
		console.log(err) 
		result.ERRORMESSAGE = err.originalError.message ;
		result.RAWDATA = JSON.parse( JSON.stringify( err ))
	        return  result
	}
}
exports.get_servers_list = async( req, res )=>{ 
	let file_path = path.join( __dirname , '../../app_data/관리회사')	
	let result = await fdb_exec_get( file_path ); 
	return res.status(200).json(result) 
}
exports.get_servers_list_opt = async( req, res )=>{ 
	let file_path = path.join( __dirname , '../../app_data/관리회사')	
	let opt = req.params.opt 
	let result = await fdb_exec_get( file_path, opt ); 
	return res.status(200).json(result) 
}
exports.get_apps_list = async( req, res )=>{ 
	let server_name = req.params.server 
        let file_path = path.join( __dirname , `../../app_data/apps_list/company/${ server_name }/app_list`)	
	let result = await fdb_exec_get( file_path ); 
	return res.status(200).json(result) 
}
exports.get_apps_list_opt = async( req, res )=>{ 
	let server_name = req.params.server 
	let opt = req.params.opt 
        let file_path = path.join( __dirname , `../../app_data/apps_list/company/${ server_name }/app_list` )	
	let result = await fdb_exec_get( file_path, opt ); 
	return res.status(200).json(result) 
}
exports.get_collections_list = async( req, res )=>{ 
	let server_name = req.params.server 
        let file_path = path.join( __dirname , `../../app_data/collections/company/${ server_name }/collection_list`)	
	let result = await fdb_exec_get( file_path ); 
	return res.status(200).json(result) 
}
exports.get_collections_list_opt = async( req, res )=>{ 
	let server_name = req.params.server 
	let opt = req.params.opt
        let file_path = path.join( __dirname , `../../app_data/collections/company/${ server_name }/collection_list`)	
	let result = await fdb_exec_get( file_path, opt ); 
	return res.status(200).json(result) 
}
exports.get_organization = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	const sql_state = `
	SELECT 
		*
	FROM TB_Organization
	WHERE orgName = '${org_name}'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Post Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fdb_exec_post = async ( file_path , hdr_include = 0 , data )=>{
	let result = { RESULT : -1 , ERRORMESSAGE:"" , file_path:file_path , DATABASE:'fdb',DATA: null, RAWDATA: null }
        if( existsSync( file_path )){
		if( hdr_include ){
			result.DATA = {}
			writeFileSync( file_path, JSON.stringify( data['data']) ,  'utf-8')
			writeFileSync( file_path + '.hdr' , JSON.stringify( data['hdr']) , 'utf-8')
		}else{
			writeFileSync( file_path, JSON.stringify( data ), 'utf-8')
		}
		console.log( result.DATA );
		result.RESULT = 0 ;
		return result			
	}
	return result.ERRORMESSAGE = 'file not found' + file_path ;
}
const sql_exec_post = async ( user_id , passwd , db_name , sql_state )=>{
	let result = { RESULT : -1 , ERRORMESSAGE:"" , SQL:sql_state , DATABASE:db_name , RAWDATA: null }
	let config = sqlServer.getConfig( user_id , passwd, db_name ); 
	try{
		await sql.connect( config )
		let result_1 = await sql.query( sql_state )
		console.log( result.recordset) 
		await sql.close() 
		result.RESULT = 0 
		result.RAWDATA = JSON.parse( JSON.stringify( result_1 ))
	        return  result
	}catch(err){
		await sql.close() 
		console.log(err) 
		result.ERRORMESSAGE = err.originalError.message ;
		result.RAWDATA = JSON.parse( JSON.stringify( err ))
	        return  result
	}
}
exports.post_servers_list_opt = async( req, res )=>{ 
	let file_path = path.join( __dirname , '../../app_data/관리회사')	
	let opt = req.params.opt 
	let data  = req.body
	let result = await fdb_exec_post( file_path, opt, data ); 
	return res.status(200).json(result) 
}
exports.post_apps_list_opt = async( req, res )=>{ 
	let server_name = req.params.server 
	let opt = req.params.opt 
	let data  = req.body
        let file_path = path.join( __dirname , `../../app_data/apps_list/company/${ server_name }/app_list` )	
	let result = await fdb_exec_post( file_path, opt, data ); 
	return res.status(200).json(result) 
}
exports.post_collections_list_opt = async( req, res )=>{ 
	let server_name = req.params.server 
	let opt = req.params.opt
	let data  = req.body
        let file_path = path.join( __dirname , `../../app_data/collections/company/${ server_name }/collection_list`)	
	let result = await fdb_exec_post( file_path, opt, data ); 
	return res.status(200).json(result) 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   old Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
/*	
let file_path = path.join( __dirname , '../../app_data/apps_list/company/ezchemtech/app_list')	
file_path = path.join( __dirname , '../../app_data/관리회사')	
console.log( fdb_exec_get( file_path ).DATA )	
*/
