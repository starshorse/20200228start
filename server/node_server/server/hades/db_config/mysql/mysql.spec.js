/*
const { ezWqs , ezSQL } = require('./conf') 
const { promisify } = require('util') 

const mysql = require('mysql') 
const connection = mysql.createConnection( ezSQL ) 

connection.connect() 

const query_sync2 = promisify( connection.query ).bind( connection ) 

const querySync_mysql = async( stmt )=>{
	return await query_sync2( stmt ) 
}
const queryAll_mysql = ( stmt, cb_f )=>{
	connection.query( stmt , (err, rows )=>{
		if(err) throw err 
		cb_f( rows )	
	})
}
const exec_mysql = ( stmt )=>{
	connection.query( stmt ) 
}

module.exports = { exec_mysql, querySync_mysql , queryAll_mysql }
*/
describe('mysql db test ' ,()=>{
	it('should get data from mysql', async ()=>{
		const { querySync_mysql , queryAll_mysql } =require('./index') 
		const data = await querySync_mysql('show tables') 
//		console.log('mysql',data)
//        console.dir( data, { 'maxArrayLength': null })
		var  stmt = 'select * from 직원체온체크' 
		stmt = `select UPDATE_TIME FROM information_schema.tables WHERE TABLE_SCHEMA='ezdb' AND TABLE_NAME = '직원체온체크'` 
		const promise = new Promise( (done )=>{
			queryAll_mysql( stmt, ( rows )=>{
//				  console.log( rows ) 
				  done()
			})
		})	
	})
})
