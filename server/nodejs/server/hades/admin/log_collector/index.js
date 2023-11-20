const log_collect = async function( db_name , query , hostname, filepath )
{
	 const sequelize_ = require('../../sequelize')
     const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
	 let auto = sequelize_auto.getAuto(db_name , ['TB_Log_Collector'] ) 
	 let data = await  auto.run()
	 const { models } = sequelize_.initModels( db_name )
	 const log_collect_tbl = models['TB_Log_Collector']
 	await log_collect_tbl.create( { query, hostname , filepath }).catch( (err)=>console.log(err)); 
}	
exports.log_collect_wrap = async function( db_name , task_name , query , hostname , cookie ){
	let filepath  = cookie.user 
	await log_collect( db_name, query, hostname , filepath ) 
}
