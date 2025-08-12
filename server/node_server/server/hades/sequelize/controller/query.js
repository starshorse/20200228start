exports.query_findAll = async ( req, res )=>{
  		const sequelize_config = require('../../sequelize')
  		const { Op } = require('../../sequelize')
  		const sequelize_auto = require('../../sequelize/models/sequelize-auto') 
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let tbl_name =  decodeURI( req.params.tbl_name )
		let db_name  =  req.params.db_name 
//	    let id = req.params.id 
	    let data_json =  req.body.arg   
		let tbl_list = []
		tbl_name = 'TB_' + tbl_name 
		tbl_list.push( tbl_name )     
	    let auto = sequelize_auto.getAuto( db_name , tbl_list ) 
	    let data = await  auto.run()
        let model_2   = sequelize_config.initModels( db_name )
	    let model_ = model_2.models[tbl_name]
//	    let Rows = await model_.findAll( eval('('+ data_json +')') ).catch((err)=>{ console.log(err) } )  
	    let Rows = await model_.findAll( data_json ).catch((err)=>{ console.log(err) } )  
/*	

		let  entry = await model_.findOne({
			where:{ seq: id }}).catch((err)=>{ console.log( err ) 
			}) 

	    if( entry ){
//			entry.dbaPwd = 'refwerewr' 
			for( const [ key, value ] of Object.entries( data_json )){
				if( entry[key] ) entry[key] = value 
			}
			entry.save() 
*/			
	    if( Rows ){
			result_status.STATUS = 1 
			result_status.RESULT = 'success' 
			result_status.ROWS = Rows 
			return res.status(200).json( result_status ) 
		}
	   return res.status(500).json( result_status ) 
}
