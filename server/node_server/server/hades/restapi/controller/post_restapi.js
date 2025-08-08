const { exec_mssql, queryAll_mssql, get_mssql_connection_flag, gcp_ezchemtechDbConnection } = require('../../db_config/mssql') 
const log_collector = require('../../admin/log_collector')
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
/*  mssql DB insert Enry */ 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
/////////////////////////////////////////////////////////////////////////////////////////////
//  api : :db_name/:tbl_name?db=fdb_json , mssql 
////////////////////////////////////////////////////////////////////////////////////////////	
exports.data_dbName_tblName = async (req,res)=>{
  		const sequelize_config = require('../../sequelize')
  		const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  decodeURI( req.params.tbl_name ) 
		let db_name  =  req.params.db_name 
	    let data_json = req.body 
		let cookie_req = JSON.parse( req.headers.cookie )

		let tbl_list = []
		
        tbl_name = tbl_name.replace('TB_','') 
		tbl_name = 'TB_' + tbl_name 
		tbl_list.push( tbl_name )     
	    let auto = sequelize_auto.getAuto( db_name , tbl_list ) 
	    let data = await  auto.run()
        let model_2   = sequelize_config.initModels( db_name )
	    let model_ = model_2.models[tbl_name]
	    const newEntry = await model_.create( data_json ).catch((err)=>{
			console.log( err ) 
		})
	    if( newEntry ){
			result_status.STATUS = 1 
			result_status.RESULT = 'success' 
			result_status.ROWS = newEntry 
		    await log_collector.log_collect_wrap( db_name , 'create' , `${tbl_name}.create( ${ JSON.stringify( data_json ) } )` , 'Jupitor' , cookie_req )  
			return res.status(200).json( result_status ) 
		}
		await log_collector.log_collect_wrap( db_name , 'create' , `${tbl_name}.create( ${ JSON.stringify( data_json ) } ):Error` , 'Jupitor' , cookie_req )  
	   return res.status(500).json( result_status ) 
}	
exports.data_dbName_tblName_tr = async (req,res)=>{
  		const sequelize_config = require('../../sequelize')
    	const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  decodeURI( req.params.tbl_name ) 
		let db_name  =  req.params.db_name 
	    let data_json = req.body 
		let cookie_req = JSON.parse( req.headers.cookie )
		let tbl_list = []
        tbl_name = tbl_name.replace('TB_','') 
		tbl_name = 'TB_' + tbl_name 
		tbl_list.push( tbl_name )     
	    let auto = sequelize_auto.getAuto( db_name , tbl_list ) 
	    let data = await  auto.run()
        let sequelize_info  = sequelize_config.initModels( db_name )
	    let model_ = sequelize_info.models[tbl_name]
	    const t = await sequelize_info.sequelize_.transaction() 
	    try{
			for( const ent_json of data_json ){
	    		 await model_.create( ent_json, { transaction:t } ).catch((err)=>{
					throw err  
				})
			} 	
			result_status.STATUS = 1 
			result_status.RESULT = 'success' 
			result_status.ROWS = data_json  
		    await log_collector.log_collect_wrap( db_name , 'create_tr' , `${tbl_name}.create_tr( ${ JSON.stringify( data_json ) } )` , 'Jupitor' , cookie_req )  
			await t.commit() 
			return res.status(200).json( result_status ) 
		}catch(err){
			await t.rollback()
		    await log_collector.log_collect_wrap( db_name , 'create_tr' , `${tbl_name}.create_tr( ${ JSON.stringify( data_json ) } ):Error` , 'Jupitor' , cookie_req )  
	        return res.status(500).json( result_status ) 
		}
}	
/*
     exports.data_dbName_tblName_v1 :  SQL style old  router. 
*/
exports.data_dbName_tblName_v1 = (req,res)=>{
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  req.params.tbl_name 
		let db_name  =  req.params.db_name 
	    let id = req.params.id 
	    let data_json = req.body 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
/* Sql insert to  
 pass: 
 		mssql_data  
 using:
	 db_name & tbl_name
     sql_keys_arr , sql_stmt_arr 
*/ 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		let sql_stmt_arr = [] 
		let sql_keys_arr = [] 
		const keys = Object.keys( data_json ) 
		for( ent of keys ){
			sql_stmt_arr.push( `'${ data_json[ent]}'` ) 
			sql_keys_arr.push( `${ent}` ) 
		}
		let sql_stmt = `INSERT INTO TB_${tbl_name} ( ${ sql_keys_arr.join(',')} ) values( ${ sql_stmt_arr.join(',')} ) ;`
		console.log( sql_stmt ) 
		const db_cb_f = ( res_ )=>{
			if(res_.RequestError ){ 
				result_status.MESSAGEERROR = res_.RequestError
				return  res.json( result_status  ) 
			}else{
				result_status.STATUS = 1 , result_status.RESULT = 'success' , result_status['status_'] = 'ok' ; 
			}
			return  res.json( result_status )
		}
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_stmt , db_cb_f  )} , db_name ) 
}
/////////////////////////////////////////////////////////////////////////////////////////////
//  api : :db_name/:tbl_name/:id?db=fdb_json&id_key=tanker_seq , mssql 
////////////////////////////////////////////////////////////////////////////////////////////	
exports.data_dbName_tblName_id = async (req,res)=>{
  		const sequelize_config = require('../../sequelize')
  		const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  decodeURI( req.params.tbl_name )
		let db_name  =  req.params.db_name 
	    let id = req.params.id 
	    let data_json = req.body 
		let cookie_req = JSON.parse( req.headers.cookie )
		let tbl_list = []
        tbl_name = tbl_name.replace('TB_','') 
		tbl_name = 'TB_' + tbl_name 
		tbl_list.push( tbl_name )     
	    let auto = await sequelize_auto.getAuto( db_name , tbl_list ) 
	    let data = await  auto.run()
        let model_2   = await sequelize_config.initModels( db_name )
	    let model_ = model_2.models[tbl_name]
/*	
	    const newEntry = await model_.update( { data_json }, {
			where: {
				seq: id 
			}
		}).catch((err)=>{
			console.log( err ) 
		}) 
*/		
		let  entry = await model_.findOne({
			where:{ seq: id }}).catch((err)=>{ console.log( err ) 
			}) 

	    if( entry ){
//			entry.dbaPwd = 'refwerewr' 
			for( const [ key, value ] of Object.entries( data_json )){
//				if( entry[key] != undefined ) entry[key] = value 
				if( value != '')entry[key] = value 
			}
			console.log("pre entry.save()"); 
			await entry.save() 
			console.log("post entry.save()"); 
//		    await log_collector.log_collect_wrap( db_name , 'save' , `${tbl_name}.save( ${id} , ${ JSON.stringify( data_json ) } )` , 'Jupitor' , cookie_req )  
			result_status.STATUS = 1 
			result_status.RESULT = 'success' 
			result_status.ROWS = entry 
			return res.status(200).json( result_status ) 
		}
	    await log_collector.log_collect_wrap( db_name , 'save' , `${tbl_name}.save( ${id} , ${ JSON.stringify( data_json ) } ):Error` , 'Jupitor' , cookie_req )  
	   return res.status(500).json( result_status ) 
}	
exports.data_dbName_tblName_id_delete = async (req,res)=>{
  		const sequelize_config = require('../../sequelize')
  		const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name = decodeURI( req.params.tbl_name )
		let db_name  =  req.params.db_name 
	    let id = req.params.id 
	    let data_json = req.body 
		let tbl_list = []
        tbl_name = tbl_name.replace('TB_','') 
		tbl_name = 'TB_' + tbl_name 
		tbl_list.push( tbl_name )     
	    let auto = sequelize_auto.getAuto( db_name , tbl_list ) 
	    let data = await  auto.run()
        let model_2   = sequelize_config.initModels( db_name )
	    let model_ = model_2.models[tbl_name]
		const entry = await model_.findOne({
			where:{ seq: id }}).catch((err)=>{ console.log( err ) }) 
	    if( entry ){
			await entry.destroy().catch((err)=>{
				result_status.MESSAGEERROR = err 
	            return res.status(500).json( result_status ) 
			})
			result_status.STATUS = 1 
			result_status.RESULT = 'success' 
			result_status.ROWS = entry 
			return res.status(200).json( result_status ) 
		}
	   return res.status(500).json( result_status ) 
}	
/*
     exports.data_dbName_tblName_id_v1 :  SQL style old  router. 
*/
exports.data_dbName_tblName_id_v1 = (req,res)=>{
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  req.params.tbl_name 
		let db_name  =  req.params.db_name 
	    let id = req.params.id 
	    let id_key = req.query.id_key 
	    let data_json = req.body 

		let sql_stmt_arr = [] 
		const keys = Object.keys( data_json ) 
		for( ent of keys ){
			sql_stmt_arr.push( `${ent} ='${ data_json[ent] }'` ) 
		}
		if( !id_key )id_key ='id'  
		let sql_stmt = `UPDATE TB_${tbl_name} SET ${ sql_stmt_arr.join(',')} where ${ id_key } = ${id} ;`
		console.log( sql_stmt ) 
		sql_stmt = sql_stmt.replace(/'null'/g, 'NULL' ) 
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_stmt ,
			( res_ )=>{ 
				if( res_ ){
	     			console.log(res_)  
					result_status.STATUS = 1 , result_status.RESULT = 'success' ; 
				}
				return res.json( result_status ) 
			}
		)} , db_name ) 
}
/////////////////////////////////////////////////////////////////////////////////////////////
//  api : :db_name/:tbl_name/GET_HOOK_SQL 
////////////////////////////////////////////////////////////////////////////////////////////	
exports.data_dbName_tblName_GET_HOOK_SQL = ( req, res )=>{
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  req.params.tbl_name 
		let db_name  =  req.params.db_name 
		let select_state = req.body.sql_state  
		const callback = (res_)=>{
			try{
				if( res_.recordset != undefined ){
				result_status.STATUS = 1 ,  result_status.RESULT = 'success' ; 
				result_status.ROWS = JSON.parse( JSON.stringify( res_.recordset )) 
//					return res.json({ tbl_data: res_.recordset , tbl_format:'TBD' } )
				}
				return res.json( result_status ) 
			}	
			catch (err){
				console.log(err) 
				result_status.MESSAGEERROR = err 
				console.log( 'Error:', path.join(__dirname, __filename)  ,'line:79') 
				return res.json( result_status )
			}
		}
		console.log('select_state', select_state ) 
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( select_state , callback )} , db_name  ) 
}
/////////////////////////////////////////////////////////////////////////////////////////////
//  api : :db_name/GET_HOOK_SQL 
////////////////////////////////////////////////////////////////////////////////////////////	
exports.data_dbName_GET_HOOK_SQL = ( req, res )=>{
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let db_name  =  req.params.db_name 
		let select_state = req.body.sql_state  
		const callback = (res_)=>{
			try{
				if( res_.message == undefined ){
			     	result_status.STATUS = 1 ,  result_status.RESULT = 'success' ; 
					if( res_.recordset != undefined )result_status.ROWS = JSON.parse( JSON.stringify( res_.recordset )) 
//					return res.json({ tbl_data: res_.recordset , tbl_format:'TBD' } )
				}else{
					result_status.MESSAGEERROR = res_.message
				}
				return res.json( result_status ) 
			}	
			catch (err){
				console.log(err) 
				result_status.MESSAGEERROR = err 
				console.log( 'Error:', path.join(__dirname, __filename)  ,'line:79') 
				return res.json( result_status )
			}
		}
		console.log('select_state', select_state ) 
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( select_state , callback )} , db_name  ) 
}

