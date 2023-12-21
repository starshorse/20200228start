const sequelizeAuto = require('sequelize-auto'); 
const objDbConfig  = require('../config/config.json');
const path = require('path');
var initSequelizeAuto, initModels ;
function requireUncached( module ){
	delete require.cache[ require.resolve(module)]
	return require(module);
}

exports.initSequelizeAuto = initSequelizeAuto = function( company, table_list )
{
	let directory_path = path.join( __dirname, `../company/${company}/models` )
	const sequelize_auto = new sequelizeAuto( objDbConfig[ company ].database, objDbConfig[company].username , objDbConfig[company].password, 
	{
		host: objDbConfig[company].host,
		dialect:'mssql',
		directory: directory_path, 
		tables: table_list 
	/*	
		dialectOptions:{
			options:{
				encrypt: false;
			        trustServerCertificate: true,
			}
		}
	*/		
	})
	return sequelize_auto
}
exports.initModels = initModels = ( db_name )=>{
	let sequelizeAuto = initSequelizeAuto( db_name, null ); 
	const initModels = requireUncached(`../company/${db_name}/models/init-models`); 
	let models = initModels.initModels( sequelizeAuto.sequelize );
	return models 
}	
exports.log_collect = async function( db_name , query, hostname, filepath )
{
	let models = initModels( db_name )
	let log_collect_tbl = models['TB_Log_Collector']
	await log_collect_tbl.create( { query , hostname, filepath } ).catch((err)=>conosle.log(err));
        	 
}
