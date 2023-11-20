/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /RPA_SHOW_COLUMNS           ->  rpa_show_columns 
 * POST    /RPA_SELECT                 ->  rpa_select  
 * POST    /RPA_UPDATE_V2              ->  rpa_update_v2  
 */
const { exec_mssql, queryAll_mssql, get_mssql_connection_flag, gcp_ezchemtechDbConnection } = require('../../db_config/mssql') 
const callback = ( res_, tbl_name = '' )=>{
	let result_status 
	if( res_.recordsets == undefined ) return  { 'STATUS': -1 , 'RESULT': 'error' , 'ERRORMESSAGE': tbl_name } 
	if( res_.recordsets.length < 2 )return  res_.recordsets[0][0]  
	if( result_status = res_.recordsets[1][0]){
		 switch( result_status.RESULT ){
			 case 'success':
				 let columns = Object.keys( res_.recordsets[0].columns ) 
				 result_status['ROWS']= []
				 let i 
				 let rm_timezone = []
				 let columns_info = res_.recordsets[0].columns
				 for( const key in columns_info ){
					   if( columns_info[key].type.declaration == 'datetime' ||  columns_info[key].type.declaration == 'date' || columns_info[key].type.declaration == 'time' )rm_timezone.push({ 'key': key, 'type': columns_info[key].type.declaration } )  
				 }
				 let tz = ( new Date()).getTimezoneOffset()*60000  
				 for( i = 0; i < res_.recordsets[0].length ; i++ ){
					 let record_info = res_.recordsets[0][i] 
					 rm_timezone.forEach( ent  =>{
						 if( record_info[ent.key] != null ){
							 let nTime = new Date( record_info[ent.key]) 
							 nTime = ( new Date( nTime.getTime() - tz ) ).toISOString().slice(0, -1) 
							 if( ent.type == 'time') record_info[ent.key] = nTime.split('T')[1] 
							 else  record_info[ent.key] =  nTime.replace('T',' ') 
						 }
					 })
					 result_status['ROWS'].push( record_info )
				 }
				 result_status['COLUMNS'] = columns 
				 return  result_status  
				 break;
			 case 'error':
				 return  result_status  
				 break;
			 default:
				return  { 'STATUS': -1 , 'RESULT': 'error' , 'ERRORMESSAGE': tbl_name } 
		 }
	}else{
		return { 'STATUS': -1 , 'RESULT': 'error' , 'ERRORMESSAGE': tbl_name } 
	}
}
exports.rpa_show_columns = ( req, res)=>{
	let args = req.body 
	let tbl_name = args.query  
//	let db_name = 'ezchemtech' 
	let db_name = req.company 
	let sql_state = `exec SP_API_SHOW_COLUMNS @TableName = ${ tbl_name }`
	const callback_this = ( res_ )=>{
	   return res.json(	callback(res_ , tbl_name ) ) 
	}
	gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_state , callback_this  )} , db_name  ) 
}
exports.rpa_select       = ( req, res)=>{
	let args = req.body 
//	let db_name = 'ezchemtech' 
	let db_name = req.company 
	let hostname = req.body.hostname 
	let filepath = req.body.filepath 
	let sql_state 
    args.query = args.query.replace(/'/g, '\'\'') 
	if( hostname != undefined && filepath != undefined ) 
		 sql_state = `exec SP_API_SELECT @query = '${ args.query }', @hostname = '${ hostname }',@filepath='${ filepath }'`
	else
	     sql_state = `exec SP_API_SELECT @query = '${ args.query }', @hostname = 'PREIAN',@filepath='C:>Users>preia>Desktop>excel>테이블편집기_v3_ez.xlsm'`

	const callback_this = ( res_ )=>{
	   return res.json(	callback(res_ ) ) 
	}
	gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_state , callback_this )} , db_name  ) 
}
exports.rpa_update_v2    = async ( req, res)=>{
//	let db_name = 'ezchemtech' 
	let db_name = req.company 
	let queryList = req.body.queryList  
	let hostname  = req.body.hostname 
	let filepath  = req.body.filepath 
	if( hostname == undefined || filepath == undefined ){
		hostname = 'PREIAN' 
		filepath = 'C:>Users>preia>Desktop>excel>테이블편집기_v3_ez.xlsm'
	}
    let transaction_list = []
	let i 
	for( i = 0 ; i< queryList.length ; i++ ){
/*		
		 if( queryList[i].query.startsWith('"')){
			 queryList[i].query.replace(/["']/g, function($1){ return $1 === '"' ? `'` : '"' }) 
		 }
*/
		 queryList[i].query = queryList[i].query.replace(/'/g, '\'\'') 
		 let sql_state = `exec SP_API_UPDATE @rownum=${ queryList[i].rownum },@query = '${ queryList[i].query }',@hostname = '${ hostname }',@filepath='${ filepath }'`
		 transaction_list.push( sql_state ) 
	}
	let result_status = await  gcp_ezchemtechDbConnection( null , db_name , 2 , transaction_list )  // transaction_mode :2  sync_transaction mode. 	
	console.log( result_status ) 
	if( result_status['STATUS'] == 1){
		result_status = result_status['ROWS'] 
		console.log( result_status ) 
	    return res.json( result_status[ result_status.length -1 ] ) 
	}else{
		let j = result_status['QUERY_INDEX'] 
		result_status['QUERY'] = queryList[j].query 
		result_status['HOSTNAME'] = hostname 
		result_status['ROWNUM'] = queryList[j].rownum 
		result_status['FILEPATH'] = filepath 
// retry - for error capture .. 		
		 queryList[j].query = queryList[j].query.replace(/'/g, '\'\'') 
		 let sql_state = `exec SP_API_UPDATE @rownum=${ queryList[j].rownum },@query = '${ queryList[j].query }',@hostname = '${ hostname }',@filepath='${ filepath }'`
		const callback_this = ( res_ )=>{
//		    result_status['ERRORMESSAGE'] = res_.message 
			result_status = res_.recordset[0]  
		   return res.json(	result_status ) 
		}
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( sql_state , callback_this )} , db_name  ) 

	}
//	return res.json( result_status ) 
}
