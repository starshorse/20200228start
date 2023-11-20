/*
		auto_info: xxx 
		decrypt : { "company":"ezchemtech"  , "source":"excel" } 
*/
const { exec_mssql, queryAll_mssql, get_mssql_connection_flag, gcp_ezchemtechDbConnection } = require('../../db_config/mssql') 
const jwt = require('jsonwebtoken') 
require('dotenv').config()

var machine_key_list = null 
/////////////////////////////////////////////////////////////////////////////////////////////
//  api : :db_name/GET_HOOK_SQL 
////////////////////////////////////////////////////////////////////////////////////////////	
update_machine_key = async ( seq , ml_key )=>{
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let db_name  =  'config'  
		let select_state = `update [TB_Auth_Machine] set [machAuthIdentifier] = '${ ml_key }' where [seq] = ${ seq }`
		const callback =  (res_)=>{
			try{
				if( res_.message == undefined ){
			     	result_status.STATUS = 1 ,  result_status.RESULT = 'success' ; 
					if( res_.recordset == undefined ){ 
						get_machine_key() 
                        console.log('result:', machine_key_list )
					}
				}else{
						get_machine_key() 
                        console.log('result:', machine_key_list )
					result_status.MESSAGEERROR = res_.message
				}
				return  result_status 
			}	
			catch (err){
				console.log(err) 
				result_status.MESSAGEERROR = err 
				console.log( 'Error:', path.join(__dirname, __filename)  ,'line:79') 
				return  result_status 
			}
		}
		console.log('select_state', select_state ) 
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( select_state , callback )} , db_name ) 
}
get_machine_key = async ()=>{
		let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
		let db_name  =  'config'  
		let select_state = `SELECT [b].seq , [a].[orgAuthSecret] , [b].[machAuthSecret] , [b].[machAuthIdentifier] FROM [TB_Auth_Organization] AS [a] INNER JOIN [TB_Auth_Machine] AS [b] ON [a].[seq] = [b].[authOrgSeq]`
		const callback = (res_)=>{
			try{
				if( res_.message == undefined ){
			     	result_status.STATUS = 1 ,  result_status.RESULT = 'success' ; 
					if( res_.recordset != undefined ){ 
						result_status.ROWS = JSON.parse( JSON.stringify( res_.recordset )) 
						machine_key_list = result_status.ROWS 
                        console.log('result:', machine_key_list )
					}
				}else{
					result_status.MESSAGEERROR = res_.message
				}
				return  result_status 
			}	
			catch (err){
				console.log(err) 
				result_status.MESSAGEERROR = err 
				console.log( 'Error:', path.join(__dirname, __filename)  ,'line:79') 
				return  result_status 
			}
		}
		console.log('select_state', select_state ) 
		gcp_ezchemtechDbConnection( ()=>{ queryAll_mssql( select_state , callback )} , db_name  ) 
};

let result = (async ()=>{ return await get_machine_key().catch((err)=>console.log(err)) })()
console.log(result )

exports.api_auth = async ( req, res, next )=>{
	if( process.env.HADES_AUTH == 'OFF' )return next() 
	    let auth_info = req.body.auth_info 
	    let auth_info_json 
	try{
	    if( auth_info ){
	       let  decode_text = decode_crypto_js( auth_info , process.env.HADES_1_KEY ) 
	       auth_info_json = JSON.parse( decode_text ) 
		   req['company'] = 'ezchemtech' 
		   req['source']  = 'excel'  
		}else{
			let auth_info = req.headers.authentication  
			if( auth_info == undefined )throw 'authentication error' 
			let tokens = auth_info.split(' ')
			auth_info_json = await jwt.verify( tokens[1] , process.env.HADES_1_KEY ) 
			if( auth_info_json['source'] != 'jupiter' ){
			    auth_info_json = await jwt.verify( tokens[2] , process.env.HADES_1_KEY ) 
				let author_keys = machine_key_list.find((ent)=>ent.machAuthSecret == tokens[2] ) 
				if( author_keys == undefined )throw 'org auth error' 
				if( author_keys.machAuthIdentifier == null && tokens[3] ){
                      await  update_machine_key( author_keys.seq , tokens[3] ) 
	                    return res.status(200).json({ 'STATUS': 1 , 'RESULT': 'success' , 'ERRORMESSAGE': 'machine key changed' })
				}else if( author_keys.machAuthIdentifier != tokens[3]) throw 'machine id auth error'   
			}
		    req['company'] = auth_info_json['company'] 
		    req['source']  = auth_info_json['source'] 
		    return next()
		}
	}catch(err){
		await get_machine_key() 
	    return res.status(403).json({ 'STATUS': -1 , 'RESULT': 'error' , 'ERRORMESSAGE': 'authentication error' })
	}
	return next() 
}
exports.session_auth = async ( req, res, next )=>{
	console.log( req.session );
	if( req.session.hades_session_token ){
		return next() 
	}
	 return res.status(403).json({ 'STATUS': -1 , 'RESULT': 'error' , 'ERRORMESSAGE': 'authentication error' })
}
