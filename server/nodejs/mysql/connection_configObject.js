require('dotenv').config({ path:'../../../.env' })

var connection_configs = {
	'webQt':{
		'host': process.env.MYSQL_WQT_HOST,
		'database': process.env.MYSQL_WQT_DATABASE,
		'user': process.env.MYSQL_WQT_ID,
		'password': process.env.MYSQL_WQT_PASSWORD 
	},
	'localhost':{
		'host': process.env.MYSQL_LOCAL_HOST ,
		'database': process.env.MYSQL_LOCAL_DATABASE,
		'user': process.env.MYSQL_LOCAL_ID,
		'password': process.env.MYSQL_LOCAL_PASSWORD 
	},
	'goorm':{
		'host': process.env.MYSQL_GOORM_HOST ,
		'database': process.env.MYSQL_GOORM_DATABASE,
		'user': process.env.MYSQL_GOORM_ID,
//		'password': process.env.MYSQL_GOORM_PASSWORD, 
		'port': process.env.MYSQL_GOORM_PORT 
	}
}
module.exports = connection_configs

