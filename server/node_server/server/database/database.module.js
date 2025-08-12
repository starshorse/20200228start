const sql =  require('mssql') 
const sqlConnection = require('./connect_configObject')


let data = sqlConnection.get_sqlConfig( undefined, 'sa', '1234','Bikestores') 
let sqlConfig = data.DATA ; 

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
