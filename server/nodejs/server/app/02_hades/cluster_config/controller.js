'use strict'
/*
	.env  add 
	HERMES_ADDESS=${ proxy_hermes_address }  192.168.0.80:5001
 */
const { readFileSync , writeFileSync,  statSync, existsSync , mkdirSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 

require('dotenv').config() 
var proxy_hermes_address = process.env.HERMES_ADDRESS 

const config_sync = require('../company/data/user_config'); 


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
exports.get_config = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
//1	let id = req.headers.id 
//1	let db = req.params.db 
	let id = req.cookies.user  
	let db = req.cookies.org_name  
	if( id == undefined )return res.status( 500 ).json( result )

	let  id_path = path.join( __dirname , `../company/data/${ db }/user/${id}.json` )
	let  userDir_path = path.join( __dirname , `../company/data/${ db }/user` )
	try{
		statSync(id_path)
	}catch(error){
//		let dir = `../../company/data/${ db }/user` 
		if( !existsSync(userDir_path)){
			mkdirSync( userDir_path, { recursive: true });
		}
		let data = JSON.stringify( {id})
		writeFileSync( id_path, data , 'utf-8')  
	}
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
exports.get_config_tree = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.cookies.user  
	let db = req.cookies.org_name  
	if( id == undefined )return res.status( 500 ).json( result )

	let  id_path = path.join( __dirname , `../company/data/${ db }/user/tbl_editor/${id}.json` )
	let  userDir_path = path.join( __dirname , `../company/data/${ db }/user/tbl_editor` )
	try{
		statSync(id_path)
	}catch(error){
		if( !existsSync(userDir_path)){
			mkdirSync( userDir_path, { recursive: true });
		}
		let data = JSON.stringify( {id})
		writeFileSync( id_path, data , 'utf-8')  
	}
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
exports.get_config_cluster = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
//	let id = req.cookies.user  
//	let db = req.cookies.org_name  
	let db = req.params.db_name 
	let id = req.params.id 
	if( id == undefined )return res.status( 500 ).json( result )

	let  id_path = path.join( __dirname , `../company/data/${ db }/user/cluster_editor/${id}.json` )
	let  userDir_path = path.join( __dirname , `../company/data/${ db }/user/cluster_editor` )
	try{
		statSync(id_path)
	}catch(error){
		if( !existsSync(userDir_path)){
			mkdirSync( userDir_path, { recursive: true });
		}
		let data = JSON.stringify( {id})
		writeFileSync( id_path, data , 'utf-8')  
	}
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
exports.update_config = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let db = req.params.db 
        let data = JSON.stringify( req.body ) 
	if( id == undefined  || data == undefined )return res.status( 500 ).json( result )
	let  id_path = path.join( __dirname , `../company/data/${ db }/user/${id}.json` )
	
	writeFileSync( id_path, data , 'utf-8' )
//1 sync to tree_view 
	config_sync.sync_tblEdtior_configName( db ,  id , 'tree_view' );
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
exports.update_config_tree = function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.cookies.user 
	let db = req.cookies.org_name 
// use session cookie .. 	
	let data = req.body.data 
	if( id == undefined  || data == undefined )return res.status( 500 ).json( result )
	let  id_path = path.join( __dirname , `../company/data/${ db }/user/tbl_editor/${id}.json` )
	
	writeFileSync( id_path, data , 'utf-8' )
//1 sync to tbl_editor
	config_sync.sync_tblEdtior_configName( db , id, 'tbl_editor' );
	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = id_path 
	result.DATA = JSON.parse( readFileSync( id_path, 'utf-8'))
	return res.status( 200 ).json( result ) 
}
///////////////////////////////////////////////////////////////////////////////////////////
//  Session flash .   
//////////////////////////////////////////////////////////////////////////////////////////
exports.get_configFlash = function( req, res ){
	let configMode = { isConfigMode: false , configName: null } 
	configMode.configName = req.flash('tbl_editor_configName') 
	if( configMode.configName != '' ){
		configMode.isConfigMode = true 
	}
    res.status(200).json( configMode )
}
exports.set_configFlash = function( req, res ){
	let configName = req.body.configName 
	req.flash('tbl_editor_configName', configName ) 
	res.status(200).json( { configName } ) 
}









