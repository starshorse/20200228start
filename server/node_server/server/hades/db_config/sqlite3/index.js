 const sqlite3 = require('sqlite3').verbose() 
const { promisify } = require('util') 
var db = new sqlite3.Database('sargonI.db')
const query_sync = promisify( db.all ).bind( db ) 
const exec_sync = promisify( db.run).bind( db ) 
const exec_sqlite3 = ( stmt )=>db.run( stmt ) 
const execSync_sqlite3 = async( stmt )=>{
	await exec_sync( stmt ) 
}
const queryAll_sqlite3 = ( stmt, cb_f  )=>{
       db.all( stmt , (err, rows )=>{
		   if(err) throw err
		   cb_f( rows )
	   } ) 
}
const queryAllSync_sqlite3 = async ( stmt )=>{
	return await query_sync( stmt ) 
}
module.exports = { exec_sqlite3 , queryAll_sqlite3, execSync_sqlite3, queryAllSync_sqlite3 } 
