const { exec_mssql, queryAll_mssql, get_mssql_connection_flag, gcp_ezchemtechDbConnection } = require('../../db_config/mssql') 
const log_collector = require('../../admin/log_collector')

exports.data_dbName_tblName = async ( req, res )=>{
	let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
	let tbl_name =  req.params.tbl_name 
	let db_name  =  req.params.db_name 
	// 	TBD .. 
	tbl_name = decodeURI( tbl_name ) 
	let get_args = {}
	let base64_ = req.query.base64 
	if( base64_ == undefined ){
		get_args.where = req.query 		 
	}else{
		let buff = new Buffer( base64_, 'base64' ) 
		let json_str = buff.toString('utf8') 
		get_args = JSON.parse( json_str ) 
	}
	// remove require.cache 
	let  key_obj = Object.keys( require.cache ) 
	let  ent1 = key_obj.find((ent)=>{ return ent.includes( tbl_name )} ) 
	delete require.cache[ent1] 

	const sequelize_ = require('../../sequelize')
	const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
	let tbl_list = []
	tbl_name = 'TB_' + tbl_name 
	tbl_list.push( tbl_name )     
	if( db_name == 'config'){
		tbl_list.push('TB_User')
		tbl_list.push('TB_Auth_Organization')
		tbl_list.push('TB_Organization')
	}	 
	let auto = sequelize_auto.getAuto(db_name , tbl_list ) 
	let data = await  auto.run()

	const { models } = sequelize_.initModels( db_name )

	const tbl_model = models[tbl_name]

	// get limit 20000, order seq. 
	get_args['order'] = [['seq','DESC']] ;
	get_args['limit'] = 20000 ;

	try {
		const tbl_data = await tbl_model.findAll( get_args ) 
		result_status.ROWS = JSON.parse( JSON.stringify( tbl_data )) 
		result_status.STATUS = 1 ,  result_status.RESULT = 'success' ; 
		return res.json( result_status )

	}catch(err){
		console.log( err ) 
	}
	return res.json( result_status )
}
// #### /:db_name/:tbl_name/:id?id_key=id_key.. 
exports.data_dbName_tblName_id =  ( req, res )=>{
	  let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
	  let db_name  = req.params.db_name 
	  let tbl_name = req.params.tbl_name 	
	  let id = parseInt(req.params.id, 10);
	  let id_key = 'seq' 
	  if( req.query.id_key )id_key = req.query.id_key 

	  let sql_state = `SELECT * FROM TB_${ tbl_name } WHERE ${ id_key } = ${ id }` 
	  const callback = ( res_ )=>{
		if( res_.recordset ) res.json( res_.recordset ) 
		else if( res_.name == 'RequestError' ){
			result_status.MESSAGEERROR = res_.message 
			return res.json( result_status )
		}else{
			result_status.MESSAGEERROR = 'unknown Error'  
			return res.json( result_status ) 
		}
	  }
	  gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_state , callback )} , db_name  ) 
}
