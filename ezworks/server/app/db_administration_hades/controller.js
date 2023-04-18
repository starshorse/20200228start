'use strict'
const sql = require('mssql')
const axios = require('axios') 
const sqlServer = require('../../config/database/sqlserver')
const hades_url_base ='http://192.168.0.80:8000'
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

exports.get_logins_list = async( req, res )=>{ 
	let hades_url = hades_url_base + '/db_administration/logins_list'
	let result = await axios.get( hades_url )
	
        console.log( result.data ); 

	return res.status(200).json(result.data) 

}
exports.get_db_default = async( req, res )=>{
	const login_id = req.params.id 
	let hades_url = hades_url_base + `/db_administration/db_default/${ login_id }`
	let result = await axios.get( hades_url )
	return res.status(200).json(result.data) 
}
exports.get_db_list = async( req, res )=>{
	const  login_id = req.params.id
	const  db_name = req.params.db_name 
	let hades_url = hades_url_base + `/db_administration/db_list/${ db_name }/${ login_id }`
	let result = await axios.get( hades_url )
	return res.status(200).json(result.data) 
}
exports.get_roles_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	let hades_url = hades_url_base + `/db_administration/roles_list/${ db_name }`
	let result = await axios.get( hades_url )
	return res.status(200).json(result.data) 

}
exports.get_rolesId_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	const  login_id = req.params.id 
	let hades_url = hades_url_base + `/db_administration/roles_list/${ db_name }/${ login_id }`
	let result = await axios.get( hades_url )
	return res.status(200).json(result.data ) 
}
exports.get_tables_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	let hades_url = hades_url_base + `/db_administration/tables_list/${ db_name }`
	let result = await axios.get( hades_url )
	return res.status(200).json(result.data ) 

}
exports.get_roles_data = async( req, res )=>{
	const  db_name = req.params.db_name 
	const  role = req.params.role 
	let hades_url = hades_url_base + `/db_administration/roles_data/${ db_name }/${ role }`
	let result = await axios.get( hades_url )
	return res.status(200).json(result.data ) 

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
exports.add_login = async( req, res )=>{}
exports.exe_sql = async( req, res)=>{
	let db_name = 'master'
	let sql_state = req.body.sql_state 
	let id = req.body.id 
	let pw = '!@34qwer' 
        let result = await sql_exec_post( id , pw , db_name , sql_state );   
	return res.status(200).json( result ) 
}
exports.add_role = async( req, res )=>{
	let db_name = req.body.db_name 
	let role = req.body.role 
	let member = req.body.login_id
	let sql_state = `CREATE ROLE ${role}`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json( result ) 
}
exports.add_role_member = async( req, res )=>{
	let db_name = req.body.db_name 
	let role = req.body.role 
	let member = req.body.login_id
	let isDelete = req.body.isDelete 
	let sql_state 
	if( isDelete ){
		sql_state = `
		ALTER ROLE ${role} DROP MEMBER "${ member }"
		`
	}else{
		sql_state = `
		ALTER ROLE ${role} ADD MEMBER "${ member }"
		`
	}	
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json( result ) 
}
exports.update_roles_data = async( req, res )=>{
	let role = req.params.id
	let db_name = req.body.db
	let tbl_name = req.body.tbl_name 
	let grant_per = req.body.grant_per 
	let sql_state = `GRANT ${grant_per} ON "${tbl_name}" TO ${ role }`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json( result ) 
}
