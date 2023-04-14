'use strict'
const sql = require('mssql')
const sqlServer = require('../../config/database/sqlserver')
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
	const sql_state = `	
	SELECT
	  sp.name AS login,
	  sp.type_desc AS login_type,
	  CASE
	    WHEN sp.is_disabled = 1 THEN 'Disabled'
	    ELSE 'Enabled'
	  END AS status,
	  sl.password_hash,
	  sp.create_date,
	  sp.modify_date
	FROM sys.server_principals sp
	LEFT JOIN sys.sql_logins sl
	  ON sp.principal_id = sl.principal_id
	WHERE sp.type NOT IN ('G', 'R') AND sp.type_desc ='SQL_LOGIN' AND sp.is_disabled = 0 AND sp.name NOT IN ('sa', 'sqlserver') 
	ORDER BY create_date DESC;
	`
        let result = await sql_exec_get( undefined , undefined, undefined , sql_state );   
	return res.status(200).json(result) 

}
exports.get_db_list = async( req, res )=>{
	const  login_id = req.params.id
	const  sql_state =`
	EXECUTE AS LOGIN = '${ login_id }' 
	SELECT [name]
	FROM MASTER.sys.databases
	WHERE HAS_DBACCESS([name]) = 1 AND name NOT IN ('master', 'tempdb', 'msdb')
	REVERT	
	`
        let result = await sql_exec_get( undefined , undefined, undefined , sql_state );   
	return res.status(200).json(result) 
}
exports.get_roles_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	const sql_state = `
	Select 
	  [name]
	From
	  sysusers
	Where
	  issqlrole = 1 AND name NOT IN ( 'db_accessadmin' , 'db_backupoperator' , 'db_ddladmin', 'public', 'db_owner' ,'db_securityadmin' )
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_tables_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	const sql_state = `
	SELECT
	  TABLE_NAME as name
	FROM
	  INFORMATION_SCHEMA.TABLES
	WHERE TABLE_SCHEMA = 'dbo'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_rolesId_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	const  login_id = req.params.id 
	const  sql_state = `
	SELECT DP1.name AS name
	 FROM sys.database_role_members AS DRM
	 RIGHT OUTER JOIN sys.database_principals AS DP1
	   ON DRM.role_principal_id = DP1.principal_id
	 LEFT OUTER JOIN sys.database_principals AS DP2
	   ON DRM.member_principal_id = DP2.principal_id
	WHERE DP1.type = 'R' AND DP2.name = '${login_id }'
	ORDER BY DP1.name;
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_roles_data = async( req, res )=>{
	const  db_name = req.params.db_name 
	const  role = req.params.role 
	const sql_state = `
	SELECT DISTINCT rp.name,
		ObjectType = rp.type_desc,
		PermissionType = pm.class_desc,
		pm.permission_name,
		pm.state_desc,
		ObjectType_1 = CASE
			       WHEN obj.type_desc IS NULL
				     OR obj.type_desc = 'SYSTEM_TABLE' THEN
			       pm.class_desc
			       ELSE obj.type_desc
			     END,
		s.Name as SchemaName,
		[ObjectName] = Isnull(ss.name, Object_name(pm.major_id))
	FROM   sys.database_principals rp
	       INNER JOIN sys.database_permissions pm
		       ON pm.grantee_principal_id = rp.principal_id
	       LEFT JOIN sys.schemas ss
		      ON pm.major_id = ss.schema_id
	       LEFT JOIN sys.objects obj
		      ON pm.[major_id] = obj.[object_id]
	       LEFT JOIN sys.schemas s
		      ON s.schema_id = obj.schema_id
	WHERE  rp.type_desc = 'DATABASE_ROLE'
	       AND pm.class_desc <> 'DATABASE'
	       AND obj.type_desc = 'USER_TABLE'
	       AND rp.name = '${role}'

	ORDER  BY rp.name,
		  rp.type_desc,
		  pm.class_desc
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

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
