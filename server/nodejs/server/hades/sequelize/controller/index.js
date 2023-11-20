/*
auto.run().then(data => {
  console.log(data.tables);      // table and field list
  console.log(data.foreignKeys); // table foreign key list
  console.log(data.indexes);     // table indexes
  console.log(data.hasTriggerTables); // tables that have triggers
  console.log(data.relations);   // relationships between models
  console.log(data.text)         // text of generated models
*/			
exports.get_all_tables = async function( req, res){
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
  try{
       const { sequelize_ , models }  = sequelize_config.initModels( db_name )
	  let auto = sequelize_auto.getAuto(db_name , null ) 
//	   sequelize_.getQueryInterface().showAllSchemas().then(( tblObj)=>{
	  let data = await  auto.run()
	  result_status.STATUS = 1 
	  result_status.RESULT = 'success' 
	  result_status.ROWS =  data.tables     
	  return res.status( 200 ).json( result_status ) 
//	   })

  }catch(err){
	   result_status.MESSAGEERROR = err
	   return res.status( 500 ).json( result_status ) 
  }
}
exports.get_all_columns = async function( req, res ){
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let tbl_list = []	
  tbl_name = 'TB_'+ tbl_name 
  tbl_list.push( tbl_name ) 
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
  try{
	  let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	  let data = await  auto.run()
      const { sequelize_ , models }  = sequelize_config.initModels( db_name )
	  let model_ = models[tbl_name]
	  result_status.ROWS = await model_.describe() 
//	   result_status.ROWS = new models[tbl_name]  
//	   result_status.ROWS = data.text['dbo.'+tbl_name]  
	   result_status.STATUS = 1 
	   result_status.RESULT = 'success' 
	   return res.status( 200 ).json( result_status ) 
  }catch(err){
	   result_status.MESSAGEERROR = err
	   return res.status( 500 ).json( result_status ) 
  }
}
exports.get_column = async function( req, res ){
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let tbl_list = []	
  tbl_name = 'TB_'+ tbl_name 
  tbl_list.push( tbl_name ) 
  let column_name = req.params.column_name 
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
  try{
	   let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	   let data = await  auto.run()
       const { sequelize_ , models }  = sequelize_config.initModels( db_name )
	   let model_ = models[tbl_name]
	   result_status.ROWS = await model_.describe() 
	   result_status.ROWS = result_status.ROWS[column_name]
	   result_status.STATUS = 1 
	   result_status.RESULT = 'success' 
	   return res.status( 200 ).json( result_status ) 
  }catch(err){
	   result_status.MESSAGEERROR = err
	   return res.status( 500 ).json( result_status ) 
  }
}
exports.api_auth = function( req, res, next ){
	return next() 
}
