const DB_Inf = require('../../DB_Inf') 
const _=require('underscore') 


exports.get_groupList = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name; 
	let sql_state = `
  		select [name] from TB_apps where parentSeq is NULL
	`
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log( response )
	result.DATA = _.pluck(response.recordset , 'name' ) 
	return res.status(200).json( result ) 
}
exports.get_appInfo = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let appName = req.params.appName ; 
	let user_DB = req.params.db_name; 
	let sql_state = `
	 	-- select a.seq , a.name, a.title, a.level, b.name as group_name , c.url from TB_apps a  inner join TB_apps b on a.parentSeq = b.seq  inner join TB_extrn_urls c on a.extrn_urlSeq = c.seq where a.name = '${ appName }'
		select  seq , name , title , level , extrn_urlSeq from TB_apps where name = '${ appName }' and dbName = '${ user_DB }'
	`
	let response = await DB_Inf.get_sql( 'ezoffice', sql_state )
	console.log( response )
	result.DATA = response.recordset[0] 
	return res.status(200).json( result ) 
}
exports.get_appAssign = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let appName = req.params.appName ; 
	let user_DB = req.params.db_name; 
	let sql_state = `
	select email from TB_apps_assign a left join TB_admin_1 b on a.userSeq = b.seq inner join TB_apps c on a.appSeq = c.seq where c.name = '${ appName }' 
	`
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	result.DATA = _.pluck( response.recordset, 'email' ) 
	return res.status(200).json( result ) 
}
//////////////////////////////////////////////////////////////////
//   POST .. 
//////////////////////////////////////////////////////////////////
exports.add_assign = async( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name; 
    let appName = req.body.appName ; 
	let user_id = req.body.user_id ;
	let sql_state = `
	  declare @userSeq int , @appSeq int 
	  select   @userSeq = seq from TB_admin_1 where email ='${ user_id }' 
	  select   @appSeq = seq from TB_apps where name ='${ appName }' 
	  insert into TB_apps_assign( userSeq , appSeq ) values (@userSeq , @appSeq ) 
	`
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log( response) 
	return res.status(200).json( result ) 
}
exports.create_app = async( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name; 
    let appName = req.params.app_name ; 
	let user_id = req.params.id ;
	let sql_state = `
	  insert into TB_apps( name , title , ownerSeq, dbName ) 
	  select '${ appName }', '${ appName }', seq, dbName from [config].[dbo].[TB_Admin] where email = '${ user_id }' and dbName = '${ user_DB }'
	  insert into TB_collection_apps( collection_assignSeq , app_assignSeq ) 
	  select 1 , seq from TB_apps where name = '${ appName }'  
	`
	let response = await DB_Inf.get_sql( 'ezoffice', sql_state )
	console.log( response) 
	return res.status(200).json( result ) 
}
//////////////////////////////////////////////////////////////////
//   DELETE .. 
//////////////////////////////////////////////////////////////////
exports.del_assign = async( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name; 
    let appName = req.body.appName ; 
	let user_id = req.body.user_id ;
	let sql_state = `
	  declare @userSeq int , @appSeq int 
	  select   @userSeq = seq from TB_admin_1 where email ='${ user_id }' 
	  select   @appSeq = seq from TB_apps where name ='${ appName }' 
	  delete TB_apps_assign where userSeq = @userSeq and appSeq = @appSeq  
	`
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log( sql_state) 
	return res.status(200).json( result ) 
}
exports.del_app = async( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.params.db_name; 
    let appName = req.params.app_name ; 
	let sql_state = `
		delete from TB_collection_apps where app_assignSeq = any(
		select seq from TB_apps where name = '${ appName }')
		delete from TB_apps where name = '${ appName }'
	`
	let response = await DB_Inf.get_sql( user_DB, sql_state )
	console.log( sql_state) 
	return res.status(200).json( result ) 
}
