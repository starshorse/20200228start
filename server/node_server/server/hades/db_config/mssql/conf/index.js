/*
	DataBase move  34.64.110.64 to .. 
    .env MSSQL_IP_UNMAN=34.64.60.213 
*/

require('dotenv').config() 
const mssql_unmanaged = process.env.MSSQL_IP_UNMAN  
const mssql_managed_2023 = '34.64.110.64' 
const fs = require('fs'); 
const path = require('path') 



var  ezChemtech = {
	    server:'192.168.0.39',
		user:'sa',
		password:'!@34qwer',
		database:'ezworks',
	    options:{
        	encrypt: false,
			useUTC: false
		}
}
 var ref_config =  {
    "server": mssql_unmanaged,
    "user": "sqlserver",
    "password": "!csdlwlof#1286",
    "database": "ezChemtech",
    "options": {
      "encrypt": false,
      "trustServerCertificate": true,
      "useUTC": false
    }
 }
var objDbConfig = JSON.parse( fs.readFileSync( path.join( __dirname ,'objDbConfig.json'), 'utf-8') );

const update_objDbConfig = ( db_name )=>{
	   ref_config['database'] = db_name ; 
	   let new_entry = {} 
	   new_entry[db_name] = ref_config ;
	   let  cur_objDbConfig = JSON.parse( fs.readFileSync( path.join( __dirname ,'objDbConfig.json'), 'utf-8') );
	   let  nw_objDbConfig = Object.assign( cur_objDbConfig , new_entry );
	   fs.writeFileSync( path.join( __dirname, 'objDbConfig.json' ), JSON.stringify( nw_objDbConfig ), 'utf-8' ); 
}
const refresh_objDbConfig = ()=>{
       return JSON.parse( fs.readFileSync( path.join( __dirname ,'objDbConfig.json'), 'utf-8') );
}

console.log( objDbConfig )
module.exports ={ ezChemtech, objDbConfig , update_objDbConfig , refresh_objDbConfig  }

// fs.writeFileSync('objDbConfig.json', JSON.stringify( objDbConfig ), 'utf-8' ) ;
