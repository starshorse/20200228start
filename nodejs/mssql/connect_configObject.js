const sql = require('mssql');
require('dotenv').config({ path:'../.env'}) 

console.log( process.env.DB_SERVER ) 

const sqlConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	server: process.env.DB_SERVER, 
	pool:{
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options:{
		encrypt: true,
		trustServerCertificate: true
	}
};

(async ()=>{
	try{	
	// make sure that any items are correctly URL encoded in the connection string 
		await sql.connect( sqlConfig )
	 	const result = await sql.query(`select TOP 10 * from "sales.orders"`)
		console.dir( result )
	}catch(err){
		// ... error checks
		console.log(err)
	}		
})();	
