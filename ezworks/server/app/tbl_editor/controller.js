'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 

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
exports.get_tbl = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let id = req.headers.id 
	let user_db = req.params.db 
	let tbl_name = req.params.tbl_name ;
	let headers = { user_db } 
		
	let  hades_data = await axios({ method:"GET", url:`http://192.168.0.80:5000/ezchemtech/TableEditor/Data/${tbl_name}`, headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data ;  
	return res.status( 200 ).json( result ) 
}
exports.get_tblSql = async function( req, res ){
	let data = { db_name : req.params.db , sql_state: req.body.sql_state } 
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let  hades_data = await axios({ method:"POST", url:`http://192.168.0.80:5000/ezchemtech/TableMaker/`, data })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data ;  
	return res.status( 200 ).json( result ) 
}	




