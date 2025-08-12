/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /:db_name/:tbl_name         ->  request table information. 
 * POST    /:db_name/:tbl_name         ->  create  TABLE 
 * GET     /:db_name/:tbl_name/:id     ->  request column[id] information. 
 * PUT     /:db_name/:tbl_name/:id     ->  TABLE Modify 
 * DELETE  /:db_name/:tbl_name/        ->  TABLE Distory.. 
 * DELETE  /:db_name/:tbl_name/:column_name      ->  column  Distory.. 
 */
const { DataTypes } = require('sequelize')
const { exec_mssql, queryAll_mssql, get_mssql_connection_flag, gcp_ezchemtechDbConnection } = require('../../db_config/mssql') 
const sequelizeModels = require('../../sequelize/models/gen_model') 

/*
// Get databases information 
 SELECT name FROM master.dbo.sysdatabases 
 EXEC sp_databases 
*/
// #### GET /:db_name 
exports.db_request = function (req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let sql_stmt = 'SELECT * FROM INFORMATION_SCHEMA.TABLES;'
  const db_cb_f = ( res_ )=>{
	  if( !res_ ){ 
		  console.log('Error') 
		  result_status.STATUS.MESSAGEERROR = 'No Data'  
	  }
	  else{
		  result_status.STATUS = 1 
		  result_status.RESULT = 'success' 
		  result_status.ROWS = res_.recordset 
	  }
	return  res.json( result_status );
  }
  gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_stmt , db_cb_f  )} , db_name ) 
};
// Get list from tbl_name.. 
exports.tbl_request = function (req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let sql_stmt = `SELECT * FROM information_schema.columns WHERE table_name='TB_${ tbl_name }' order by 5` 
  const db_cb_f = ( res_ )=>{
	  if( !res_ ){ 
		  console.log('Error') 
		  result_status.STATUS.MESSAGEERROR = 'No Data'  
	  }
	  else{
		  result_status.STATUS = 1 
		  result_status.RESULT = 'success' 
		  result_status.ROWS = res_.recordset 
	  }
	return  res.json( result_status );
  }
  gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_stmt , db_cb_f  )} , db_name ) 
};
/*
// Create tbl 
 * POST    /:db_name/:tbl_name         ->  create  TABLE 
*/ 
exports.tbl_create = async function(req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let args = req.body 	
  let tbl_list = []
  tbl_name = 'TB_' + tbl_name 
  tbl_list.push( tbl_name )     
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
	try{
		  const { sequelize_ } = sequelize_config.initModels( db_name )
		  let tbl_model = sequelize_.define( tbl_name , eval('('+ args.tbl_schema+')') ,  eval('('+ args.tbl_schema_extra+')' )  ) 
		  await tbl_model.sync().catch((err)=> console.log(err))  
//		  result_status = sequelizeModels.saveModel( db_name , tbl_name ,  args.tbl_schema  , args.tbl_schema_extra ) 
/*  create update all		
//		  sequelize_auto.syncModels( db_name , tbl_list ) 
*/
		  sequelize_auto.syncModels( db_name ) 
	      let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	      let data = await  auto.run()

          let model_2   = sequelize_config.initModels( db_name )
	      let model_ = model_2.models[tbl_name]
	      if( model_ == undefined )throw { message: 'table should  exist!' }

		  result_status.STATUS = 1 ; result_status.RESULT = 'success' 
		  return res.status(200).json( result_status );
	}catch(err){
		  result_status.MESSAGEERROR = JSON.stringify( err ) 
		  return res.status(500).json( result_status );
	}
  return res.status(500).json( result_status );
};

// Get entry[column] from tbl_name  
exports.ent_request = function (req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let column_name = req.params.id 
/*	
  let sql_stmt = `SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE 
					TABLE_NAME ='TB_${ tbl_name }' AND 
	                COLUMN_NAME ='${ column_name }'
	`
*/	
  let sql_stmt = `SELECT * FROM information_schema.columns WHERE table_name='TB_${ tbl_name }' order by 5` 
  const db_cb_f = ( res_ )=>{
	  if( !res_ ){ 
		  console.log('Error') 
		  result_status.STATUS.MESSAGEERROR = 'No Data'  
	  }
	  else{
		  try{
		         result_status.ROWS = res_.recordset.find((ent)=> ent.COLUMN_NAME == column_name )   
			     if( !result_status.ROWS || result_status.ROWS == ''  ) throw 'error' 
		         result_status.STATUS = 1 
		         result_status.RESULT = 'success' 
		  }catch(err){
			  	 result_status.MESSAGEERROR = 'column_name error' 
		  }
	  }
	return  res.json( result_status );
  }
  gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_stmt , db_cb_f  )} , db_name ) 
};

// Update entry from tbl..  
exports.ent_update = async function (req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
//  let id = parseInt(req.params.id, 10);
  let id = req.params.id 
  let args = req.body 	
  let tbl_list = []
  tbl_name = 'TB_'+ tbl_name 
  tbl_list.push( tbl_name ) 
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
  const { sequelize_ , models }  = sequelize_config.initModels( db_name )
  const queryInterface = sequelize_.getQueryInterface() 
	try{	
		switch( id ){
			case 'addColumn':
				queryInterface.addColumn( tbl_name , args.column_name , eval('('+args.column_schema+')') ) 
				break ;
			case 'changeColumn':
				queryInterface.changeColumn( tbl_name , args.column_name , eval('('+args.column_schema+')') ) 
				break ;
			default:	
		}
//		sequelize_auto.syncModels( db_name , tbl_list ) 
	    let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	    let data = await  auto.run()
       const { models }  = sequelize_config.initModels( db_name )
	   let model_ = models[tbl_name]
	   result_status.ROWS = await model_.describe() 
	   if( result_status.ROWS[args.column_name] == undefined )throw { message: 'column name not exist' }
	   result_status.STATUS = 1 ; result_status.RESULT = 'success' 
	   return res.status(200).json( result_status );
	}catch(err){
		result_status.STATUS = -1 
		result_status.MESSAGEERROR = JSON.stringify( err ) 
		return res.status(500).json( result_status );
	}
  return res.status(500).json( result_status );
};
// Delete tbl..  
exports.tbl_destroy = async function (req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let tbl_list = []
  tbl_name = 'TB_'+ tbl_name 
  tbl_list.push( tbl_name ) 
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
  const { sequelize_ , models }  = sequelize_config.initModels( db_name )
  let model_1
 try{
		  model_1 =  models[tbl_name] 
		 // tbl_model.destroy({ where: {}, truncate: true }) 
	     if( model_1 )await  model_1.drop()
//		  result_status = sequelizeModels.deleteModel( db_name , tbl_name ) 
		  sequelize_auto.syncModels( db_name , tbl_list ) 
	      let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	      let data = await  auto.run()
//          const {  models }  = sequelize_config.initModels( db_name )
          let model_2 = sequelize_config.initModels( db_name )
	      model_ = model_2.models[tbl_name]
	      if( model_  )throw { message: 'table should drop, but still exist' }

		  result_status.STATUS = 1 ; result_status.RESULT = 'success' 
		  return res.status(200).json( result_status );
	}catch(err){
		  result_status.MESSAGEERROR = JSON.stringify( err ) 
		  return res.status(500).json( result_status );
	}
  return res.status(500).json( result_status );
};

// Delete entry[column] from tbl..  
exports.ent_destroy = async function (req, res) {
  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
  let db_name  = req.params.db_name 
  let tbl_name = req.params.tbl_name 	
  let column_name = req.params.id 
  let tbl_list = []
  tbl_name = 'TB_'+ tbl_name 
  tbl_list.push( tbl_name ) 
  const sequelize_config = require('../../sequelize')
  const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
  const { sequelize_,  models }  = sequelize_config.initModels( db_name )
  const queryInterface = sequelize_.getQueryInterface() 
  try{
          queryInterface.removeColumn( tbl_name , column_name, {} ) 
//		  sequelize_auto.syncModels( db_name , tbl_list ) 
	      let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	      let data = await  auto.run()
          const { models }  = sequelize_config.initModels( db_name )
	      let model_ = models[tbl_name]
	      result_status.ROWS = await model_.describe() 
	      if( result_status.ROWS[column_name] )throw { message: 'column should drop, but still exist' }
		  result_status.STATUS = 1 ; result_status.RESULT = 'success' 
		  return res.status(200).json( result_status );
	}catch(err){
		  result_status.MESSAGEERROR = JSON.stringify( err ) 
		  return res.status(500).json( result_status );
	}
  return res.status(500).json( result_status );
};
