'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 
const sql = require('mssql')
const sqlServer = require('../../config/database/sqlserver')
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   GET Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
exports.get_organizations_list = async( req, res )=>{ 
	const db_name = 'config'
	const sql_state = `	
	SELECT
	      orgName AS organization  
	FROM TB_Organization
	ORDER BY seq DESC;
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
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
exports.get_authOrg = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	const sql_state = `
	SELECT 
	 Auth.authKey , Auth.orgAuthSecret , Auth.orgAuthSecretExpiredDateTime, Auth.remark      
	FROM TB_Organization AS Org INNER JOIN TB_Auth_Organization AS Auth ON Org.seq = Auth.orgSeq 
	WHERE Org.orgName = '${org_name}'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Post Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
exports.add_organization = async( req, res )=>{
	const db_name = 'config'
	let data = req.body 
	let data_fields = Object.keys( data ).join(',') , data_values = ( Object.values( data ).map( (e)=>"'"+e+"'" )).join(',');
	const sql_state = `
	INSERT INTO TB_Organization ( ${ data_fields } ) VALUES ( ${ data_values } ) 
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_organization = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	let data = req.body 
	let dataSet = []
	for( const [ key , value ] of Object.entries( data )){
		let data_e = `${key} = '${value}'`
		dataSet.push( data_e );
	}
	let sqlSet = dataSet.join(',') 
	const sql_state = `
	UPDATE  TB_Organization SET  ${ sqlSet } WHERE orgName = '${ org_name }' 
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.add_authOrg = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.body.org_name 
	let MLK_KEY  = req.body.mlk_value 

	const sql_state = `
	INSERT INTO TB_Auth_Organization( orgSeq, authKey , orgAuthSecret , orgAuthSecretExpiredDateTime  )
	select seq  , 'TBD', '${ MLK_KEY }' , '2024-12-31'
	from TB_Organization
	where orgName = '${ org_name }'
	`	
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   old Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.index = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	const headers = { user_db } 
	
//	let  hades_data = await axios({ method:"GET", url:"http://ezoffice365.com:5000/ezchemtech/TableEditor/Data/Log_Collector", headers : headers })
//	let  hades_data = await axios({ method:"GET", url:"https://192.168.0.80:5000/ezchemtech/TableEditor", headers : headers })
	let  hades_data = await axios({ method:"GET", url:"https://ezoffice365.com:5000/ezchemtech/TableEditor", headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
exports.role_data = async function( req, res ){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	let sql_state = `exec config.dbo.SP_GRANT @dbName='${user_db}'`
	let  hades_data = await axios({ method:"POST", url:`https://ezoffice365.com:5000/ezchemtech/TableEditor/${user_db}/sql`, data:{ sql_state } })
	if( hades_data ){
		result.STATUS = 1 
		result.RESULT = 'success'
		result.MESSAGE = '' 
		result.DATA = hades_data.data.tbl_data  
		return res.status(200).json( result )
	}
	return res.status( 401 ).json( result )
}
exports.pr_config  = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
// ezoffice	
	const headers = { user_db, authentication : 'Bearer '+ 
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJweXRob24iLCJpZCI6ImVkZW4ubGVlQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJPcmdhbml6YXRpb24iLCJpYXQiOjE2NTg0NTcwMTF9.vly8lKU-gNUno1yq5eVQluw1um2No2UrWhbzJC6TIV8'+
		' '+
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJleGNlbCIsImlkIjoicmljaGFyZC5jaG9pQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJNYWNoaW5lIiwibm8iOjEsImlhdCI6MTY3MTAwNDE3M30.2gQUCy-w6fsO29zwv3RUJ5I2tCq1gCRo14Ita7aLCzw'
		+ ' ezofficeadmin' } 
	let pr_type = req.params.pr_name.toLowerCase() ;
	let tbl_name = req.params.tbl_name ; 
	let db_name = req.params.db ; 
	let data = {
	    "requestType": "incomingWebhook",
	    "clientMachineType": "PC",
	    "clientMachineHostName": "DESKTOP-ABCDEF",
	    "clientAppName": "aaa.xlsm",
	    "clientAppPath": "C://temp",
	    "clientAppVersion": "앱버전",
	    "clientAppProcessedTime": "2023-01-03 13:10:10 200",
	    "runData": {
		"type": pr_type,
		"roleName":"role_default",
		"defaultDB": db_name ,
		"tableName": tbl_name
	    }
	}
	
	try{
		var  hades_data = await axios({ method:"POST", url:"https://api.ezoffice365.com/api/v0/db/sub/role_table", data:data , headers : headers })
	}catch(err){
		console.log( err );
	}

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
