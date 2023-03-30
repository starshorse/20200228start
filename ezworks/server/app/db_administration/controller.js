'use strict'
const sql = require('mssql')
const sqlServer = require('../../config/database/sqlserver')

exports.get_logins_list = async( req, res )=>{ 
	const sql_state = 'select * from "sales.orders"'	
	let config = sqlServer.getConfig(); 
	await sql.connect( config )
	let result = await sql.query( sql_state )
	console.log( result ) 
	return res.status(200).json({}) 
}
exports.get_roles_list = async( req, res )=>{}
exports.get_roles_data = async( req, res )=>{}
exports.add_login = async( req, res )=>{}
exports.add_role = async( req, res )=>{}
exports.update_roles_data = async( req, res )=>{}
