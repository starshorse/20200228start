const fs = require('fs') 
require('dotenv').config({ path:'../../.env'}) 
const hostlist_fn = 'sqlserver.json' 

console.log( process.env.DB_SERVER ) 

var	user_d  = process.env.DB_USER
var	password_d = process.env.DB_PWD
var	database_d =  process.env.DB_NAME

exports.set_hostlist = ( host_name, host_ip , host_port = 1433 )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'', DATA: null  } 
    let hostlist = JSON.parse( fs.readFileSync( hostlist_fn, 'utf-8'))
	if( hostlist[host_name] ){
		result.STATUS = -1 , result.RESULT = 'failure' , result.ERRORMESSAGE ='Host already exist!'
		return result; 
	}
	hostlist[host_name] = { ip: host_ip , port: host_port };
	fs.writeFileSync( hostlist_fn , hostlist , 'utf-8'); 
	return result 

}
exports.get_sqlConfig = ( host = 'starshorse_01' , user = user_d , password = password_d , database = database_d )=>{
	let result = { STATUS : 0 , RESULT :'success' , ERRORMESSAGE:'', DATA: null  } 
	let hosts = require('./sqlserver.json');
	let host1 = hosts[ host ] 
	if( !host1 ){
		result.STATUS = -1 , result.RESULT = 'failure' , result.ERRORMESSAGE ='no host found'
		return result;  
	}	
	const sqlConfig = {
		user,
		password,
		database,
		server: host1.ip, 
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
	result.DATA = sqlConfig ;
	return result; 
}

