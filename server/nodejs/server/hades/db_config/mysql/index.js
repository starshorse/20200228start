///////////////////////////////////////////////////////////////////////////////////////
// Mon May 16 00:29:48 UTC 2022
// Server disconnects issue

const { ezWqs , ezSQL, ezOffice, ezChemtech } = require('./conf') 
const { promisify } = require('util') 

const mysql = require('mysql') 
var connection = mysql.createConnection( ezChemtech ) 
//const connection = mysql.createConnection( ezOffice ) 
function handleDisconnect(connection){
	connection.on('error', function(err){
		if(!err.fatal){
			return;
		}
		if( err.code !== 'PROTOCOL_CONNECTION_LOST'){
			throw err; 
		}
		console.log('Re-connection lost connection:' + err.stack )
		connection = mysql.createConnection( ezChemtech ) 
		handleDisconnect( connection ) 
//		connection.connect();
	})
}
handleDisconnect( connection ) 
connection.connect() 

const query_sync2 = promisify( connection.query ).bind( connection ) 

const querySync_mysql = async( stmt )=>{
//    connection.connect() 
	let data_ =   await query_sync2( stmt ) 
//	connection.end()
	return data_
}
const queryAll_mysql = ( stmt, cb_f, pa = null )=>{
//    connection.connect() 
	connection.query( stmt , (err, rows )=>{
		if(err) throw err 
		cb_f( rows, pa )	
	})
//	connection.end()
}
const exec_mysql = ( stmt )=>{
//	connection.connect()
	connection.query( stmt ) 
//	connection.end() 
}

module.exports = { exec_mysql, querySync_mysql , queryAll_mysql }
