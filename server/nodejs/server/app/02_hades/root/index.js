const route = require('express').Router() 
const server_name = process.env.SERVER_NAME 
const DB_Inf = require('../DB_Inf') 
const _ = require('underscore');  
const app_route = require('./app_route') 
const collection_route = require('./collection_route') 

route.get('/',function( req, res ){
	console.log("root")
	res.send(`<h1>${ server_name } working</h1>`);
//		res.end();
})
route.use('/app', app_route );
route.use('/collection', collection_route );
route.get('/ids_list', async function( req, res ){
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let user_DB = req.cookies.user_DB 
	console.log( req.cookies )
	console.log( req.headers )
	if( user_DB == undefined ){
		user_DB = req.headers.User_db 
		if( user_DB == undefined ){
			result.STATUS = -1 , result.ERRORMESSAGE ='no user DB defined' ;
			return res.json( result ) 
		}
	}
    let sql_state = 'select * from TB_admin_1'; 
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log(response) 
    result.DATA = _.pluck( response.recordset , 'email' )
	return res.status(200).json(result) ;
})
route.get('/ids_list/:db_name', async function( req, res ){
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name ; 
    let sql_state = 'select * from TB_admin_1'; 
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log(response) 
    result.DATA = _.pluck( response.recordset , 'email' )
	return res.status(200).json(result) ;
})
route.get('/collections/:db_name', async function( req, res ){
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name ; 
    let sql_state = 'select * from TB_collections'; 
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log(response) 
    result.DATA = _.pluck( response.recordset , 'name' )
	return res.status(200).json(result) ;
})
route.get('/apps/:db_name', async function( req, res ){
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name ; 
    let sql_state = 'select * from TB_apps'; 
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log(response) 
    result.DATA = _.pluck( response.recordset , 'name' )
	return res.status(200).json(result) ;
})
module.exports =  route; 
