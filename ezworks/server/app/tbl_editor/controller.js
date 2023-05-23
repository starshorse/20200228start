'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 
///////////////////////////////////////////////////////////////////////////////////////////
//  Axios timeout added.. 
//////////////////////////////////////////////////////////////////////////////////////////
console.log = (() => {
  var console_log = console.log;
  var timeStart = new Date().getTime();
  
  return function() {
    var delta = new Date().getTime() - timeStart;
    var args = [];
    args.push((delta / 1000).toFixed(2) + ':');
    for(var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console_log.apply(console, args);
  };
})();

axios.interceptors.request.use( req => {
  req.meta = req.meta || {}
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

axios.interceptors.response.use(res => {
  console.log(`Execution time for: ${res.config.url} - ${ new Date().getTime() - res.config.meta.requestStartedAt} ms`)
  return res;
},
res => {
  console.error(`Execution time for: ${res.config.url} - ${new Date().getTime() - res.config.meta.requestStartedAt} ms`)
  throw res;
});	
	

///////////////////////////////////////////////////////////////////////////////////////////
//  Router..  
//////////////////////////////////////////////////////////////////////////////////////////
exports.index = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let db = req.params.db 
	if( id == undefined )return res.status( 500 ).json( result )

	let  id_path = path.join( __dirname , `../../company/data/${ db }/user/${id}.json` )
	try{
		statSync(id_path)
	}catch(error){
		let data = JSON.stringify( {id})
		writeFileSync( id_path, data , 'utf-8')  
	}
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
exports.update = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let db = req.params.db 
        let data = JSON.stringify( req.body ) 
	if( id == undefined  || data == undefined )return res.status( 500 ).json( result )
	let  id_path = path.join( __dirname , `../../company/data/${ db }/user/${id}.json` )
	
	writeFileSync( id_path, data , 'utf-8' )
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
exports.insert_tbl = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let user_db = req.headers.db 
	let seq = req.params.seq 
	let tbl_name = req.params.tbl_name ;
	let data = req.body 
	let headers = { user_db ,id } 
	
	let  hades_data 
	hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${tbl_name}/`, data , headers : headers })
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.DATA ; 
	return res.status( 200 ).json( result ) 
}
exports.insert_tbl_tr = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let user_db = req.headers.db 
	let seq = req.params.seq 
	let tbl_name = req.params.tbl_name ;
	let data = req.body 
	let headers = { user_db ,id } 
	
	let  hades_data 
	hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${tbl_name}/tr`, data , headers : headers })
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data ; 
	return res.status( 200 ).json( result ) 
}
exports.update_tbl = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let user_db = req.headers.db 
	let seq = req.params.seq 
	let tbl_name = req.params.tbl_name ;
	let data = req.body 
	let headers = { user_db ,id } 
	
	let  hades_data 
	try{
		hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${tbl_name}/${seq}`, data , headers : headers, timeout: 2000 })
		result.STATUS = 1 
		result.RESULT = 'success'
		result.MESSAGE = '' 
		result.DATA = hades_data.data.tbl_data ; 
	}catch(err){
		try{
			hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${tbl_name}/${seq}`, data , headers : headers, timeout: 2000 })
			result.STATUS = 1 
			result.RESULT = 'success'
			result.MESSAGE = '' 
			result.DATA = hades_data.data.tbl_data ; 
	        }catch(err){		
                	console.log( "server", err ) 	
		}
	}	
	return res.status( 200 ).json( result ) 
}
exports.update_user_config = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let user_db = req.params.db 
	let data = req.body 
	let headers = { id } 
	
	let  hades_data 
	hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${ user_db }/user`, data , headers : headers })
	result.STATUS = 1 
        result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.DATA ; 

	return res.status( 200 ).json( result ) 
}
///////////////////////////////////////////////////////////////////////////////////////////
//  Router.. GET  
//////////////////////////////////////////////////////////////////////////////////////////
exports.get_tbl_list = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	let headers = { user_db } 
		
	let  hades_data = await axios({ method:"GET", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/`, headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data ;  
	return res.status( 200 ).json( result ) 
}
exports.get_tbl_schema = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let tbl_name = req.params.tbl_name 
	let user_db = req.headers.user_db 
	let headers = { user_db } 
		
	let  hades_data = await axios({ method:"GET", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${ tbl_name }`, headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data ;  
	return res.status( 200 ).json( result ) 
}
exports.get_user_config = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	let id = req.headers.id 
	let headers = { id } 
		
	try{
	let  hades_data = await axios({ method:"GET", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/${ user_db }/user`, headers : headers })
		result.STATUS = 1 
		result.RESULT = 'success'
		result.MESSAGE = '' 
	//1	result.DATA = hades_data.data.tbl_data ;  
		result.DATA = hades_data.data.DATA ;  
	}catch(err){
		result.STATUS = -1
		result.RESULT = 'failure'
		result.MESSAGE = err.ERRORMESSAGE
	}
	return res.status( 200 ).json( result ) 
}
exports.get_tbl = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let user_db = req.params.db 
	let tbl_name = req.params.tbl_name ;
	let headers = { user_db } 
		
	let  hades_data = await axios({ method:"GET", url:`http://192.168.0.80:5001/ezchemtech/TableEditor/Data/${tbl_name}`, headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data ;  
	return res.status( 200 ).json( result ) 
}
exports.get_tblSql = async function( req, res ){
	let data = { db_name : req.params.db , sql_state: req.body.sql_state } 
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	try{
		let  hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5001/ezchemtech/TableMaker/`, data })
		if( hades_data.data.RESULT == 'err'){
			throw new Error( hades_data.data.ERRORMESSAGE.message );
		}
		result.STATUS = 1 
		result.RESULT = 'success'
		result.MESSAGE = '' 
		result.DATA = hades_data.data.tbl_data ;  
	}catch(err){
		result.STATUS = -1
		result.RESULT = 'failure'
		result.MESSAGE = err.message 
	}
	return res.status( 200 ).json( result ) 
}	




