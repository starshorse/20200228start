
// require('dotenv').config({ path:'../../../../.env'}) 
require('dotenv').config() 

console.log( process.env.DB_SERVER ) 

var sqlConfig = {
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
exports.getConfig = ( user_id = process.env.DB_USER , password = process.env.DB_PWD, database = process.env.DB_NAME )=>{
	sqlConfig.user = user_id , sqlConfig.password = password , sqlConfig.database = database;
	return sqlConfig ; 
}
