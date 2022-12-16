'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 

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
