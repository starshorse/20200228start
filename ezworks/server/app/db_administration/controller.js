'use strict'
const sql = require('mssql')
const sqlServer = require('../../config/database/sqlserver')

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
	WHERE sp.type NOT IN ('G', 'R') AND sp.type_desc ='SQL_LOGIN'
	ORDER BY create_date DESC;
	`
	let config = sqlServer.getConfig(); 
	await sql.connect( config )
	let result = await sql.query( sql_state )
	console.log( result.recordset) 
	return res.status(200).json(result.recordset) 
}
exports.get_db_list = async( req, res )=>{
	const  login_id = req.params.id
	const  sql_state =`
	EXECUTE AS LOGIN = '${ login_id }' 
	SELECT [name]
	FROM MASTER.sys.databases
	WHERE HAS_DBACCESS([name]) = 1
	REVERT	
	`
	let config = sqlServer.getConfig(); 
	await sql.connect( config )
	let result = await sql.query( sql_state )
	console.log( result.recordset) 
	return res.status(200).json(result.recordset) 
}
exports.get_roles_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	const  sql_state = `
	SELECT DISTINCT pr.name  
	FROM sys.database_principals AS pr
	JOIN sys.database_permissions AS pe
	    ON pe.grantee_principal_id = pr.principal_id
	where pr.type_desc = 'DATABASE_ROLE';		
	`
	let config = sqlServer.getConfig( undefined , undefined, db_name ); 
	await sql.connect( config )
	let result = await sql.query( sql_state )
	console.log( result.recordset) 
	return res.status(200).json(result.recordset) 
}
exports.get_rolesId_list = async( req, res )=>{
	const  db_name = req.params.db_name 
	const  login_id = req.params.id 
	const  sql_state = `
	`
	let config = sqlServer.getConfig( undefined , undefined, db_name ); 
	await sql.connect( config )
	let result = await sql.query( sql_state )
	console.log( result.recordset) 
	return res.status(200).json(result.recordset) 
}
exports.get_roles_data = async( req, res )=>{}
exports.add_login = async( req, res )=>{}
exports.add_role = async( req, res )=>{}
exports.update_roles_data = async( req, res )=>{}
