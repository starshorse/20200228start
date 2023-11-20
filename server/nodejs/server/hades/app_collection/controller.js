'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 
const sql = require('mssql')
const sqlServer = require('../db_config/sqlserver')
const defaultPassword = '1234'
// const _= require('underscore') 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   GET Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sql_exec_get = async ( user_id , passwd , db_name , sql_state )=>{
	let result = { RESULT : -1 , ERRORMESSAGE:"" , SQL:sql_state , DATABASE:db_name , RAWDATA: null }
	let config = sqlServer.getConfig( user_id , passwd, db_name ); 
	try{
		await sql.connect( config )
		let result_1 = await sql.query( sql_state )
		console.log( result_1.recordset) 
		await sql.close() 
		result.RESULT = 0 
		result.RAWDATA = JSON.parse( JSON.stringify( result_1 ))
		result.DATA = result_1.recordset
	        return  result
	}catch(err){
		await sql.close() 
		console.log(err) 
		result.ERRORMESSAGE = err.originalError.message ;
		result.RAWDATA = JSON.parse( JSON.stringify( err ))
	        return  result
	}
}
exports.get_app_list = async( req, res )=>{
	const db_name = 'ezoffice'
	const sql_state = `	
	select name, title , configuration from TB_apps a left join TB_app_configs b on a.configSeq = b.seq  where level <> 1
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_collection_intro_heads = async( req, res )=>{
	const db_name = 'ezoffice'
	const sql_state = `	
	with  menuList 
	AS
	(
	  select title , [name] , url , [level] ,  (select [menuListAble] from openjson( [configuration]) with ( menuListAble int '$.menuListAble' ) ) as menuListAble, url_target from TB_collection_list 
	 )
	 select * from menuList where menuListAble = 1
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_app = async( req, res )=>{
	const db_name = 'ezoffice'
	const app = req.params.app 
	const sql_state = `	
	 --select * from TB_app_list where name = '${ app }'; 
	select name, title , configuration from TB_apps a left join TB_app_configs b on a.configSeq = b.seq  where level <> 1 and name = '${ app }'
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_collection = async( req, res )=>{
	const db_name = 'ezoffice'
	const collection = req.params.collection 
	const sql_state = `	
	 select * from TB_collection_list where name = '${ collection }'; 
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_collection_heads = async( req, res )=>{
	const db_name = 'ezoffice'
	const collection = req.params.collection 
	const sql_state = `	
	declare @JsonArray nvarchar(max) , @aggString nvarchar(max)
	select @JsonArray = [parent] from TB_collection_list where name = '${ collection }';
	with collection_list  as
	(
	select [name], [url], [level], [url_target], 
		( select [menuListAble] from openjson([configuration]) with ( menuListAble int '$.menuListAble' ) ) as menuListAble  
	from   TB_collection_list where [name] in ( select j.value  from openjson( @JsonArray ) as j )
	)
	select [name], [url], [level], [url_target] from  collection_list where  menuListAble = 1 
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_collection_apps = async( req, res )=>{
	const db_name = 'ezoffice'
	const collection = req.params.collection 
	const sql_state = `	
	declare @JsonArray nvarchar(max) , @aggString nvarchar(max)
	select @JsonArray = [apps] from TB_collection_list where name = '${ collection }';
	print @JsonArray
	select [name], [title], [level], [level_limit], configuration, [html], [ext_link]  from TB_app_list where [name] in ( select j.value  from openjson( @JsonArray ) as j ) and level_limit <= 5
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Post Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sql_exec_post = async ( user_id , passwd , db_name , sql_state )=>{
	let result = { RESULT : -1 , ERRORMESSAGE:"" , SQL:sql_state , DATABASE:db_name , RAWDATA: null }
	let config = sqlServer.getConfig( user_id , passwd, db_name ); 
	try{
		await sql.connect( config )
		let result_1 = await sql.query( sql_state )
		console.log( result.recordset) 
		await sql.close() 
		result.RESULT = 0 
		result.RAWDATA = JSON.parse( JSON.stringify( result_1 ))
	        return  result
	}catch(err){
		await sql.close() 
		console.log(err) 
		result.ERRORMESSAGE = err.originalError.message ;
		if( err.originalError.errors ){
			for( let i = 0 ; i < err.originalError.errors.length ; i++ ){
				result.ERRORMESSAGE += ': ' + err.originalError.errors[i].message 
			}
		}
		result.RAWDATA = JSON.parse( JSON.stringify( err ))
	        return  result
	}
}
exports.add_app_list = async( req, res )=>{
	const db_name = 'ezoffice'
	let sql_state
		sql_state = `
		` 
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
