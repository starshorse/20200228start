const sql =  require('mssql') 
const sqlConnection = require('../../../database/connect_configObject')

exports.get_sql= async ( db_name , sql_state )=>{
	let data = sqlConnection.get_sqlConfig( undefined, 'sa', '1234', db_name) 
	let sqlConfig = data.DATA ; 
	await sql.connect( sqlConfig )
 	const result = await sql.query( sql_state )
	return result
}

