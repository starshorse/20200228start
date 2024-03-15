const DB_Inf = require('../../DB_Inf') 
const _=require('underscore') 


exports.get_collectionInfo = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let sql_state = `
		select a.seq , a.name, a.title, a.level, c.url from TB_collections a  left join TB_collection_extrn_urls c on a.extrn_urlSeq = c.seq where a.name = '${ collectionName }' and a.dbName = '${ user_DB }' 
	`
	let response = await DB_Inf.get_sql( 'ezoffice' , sql_state )
	console.log( response )
	result.DATA = response.recordset[0] 
	return res.status(200).json( result ) 
}
exports.get_collectionAssign = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let sql_state = `
		declare @collectionSeq int
		select  @collectionSeq  = seq from  TB_collections  where name = '${ collectionName }' and dbName = '${ user_DB }'
		select  distinct b.name   from TB_collections_link a inner join TB_collections b on a.collection_assignSeq_S = b.seq where a.collection_assignSeq_T = @collectionSeq
	`
	let response = await DB_Inf.get_sql( 'ezoffice' , sql_state )
	result.DATA = _.pluck( response.recordset, 'name' ) 
	return res.status(200).json( result ) 
}
exports.get_appAssign = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let sql_state = `
	declare @collectionSeq int
	select  @collectionSeq  = seq from  TB_collections  where name = '${ collectionName }' and dbName = '${ user_DB }'
	select  b.name  from TB_collection_apps a inner join TB_apps b on a.app_assignSeq = b.seq where a.collection_assignSeq = @collectionSeq
	`
	let response = await DB_Inf.get_sql( 'ezoffice', sql_state )
	result.DATA = _.pluck( response.recordset, 'name' ) 
	return res.status(200).json( result ) 
}
//////////////////////////////////////////////////////////////////////////////////////////
//     post ..
/////////////////////////////////////////////////////////////////////////////////////////
exports.create = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let id = req.params.id 
	let sql_state = `
	insert [ezoffice].[dbo].[TB_collections]( [name], [title], ownerSeq , dbName )
	select [name] = '${ collectionName }' , [title] = '${ collectionName }',  seq , dbName 
	from [config].[dbo].[TB_Admin] where  email = '${ id }' and dbName = '${ user_DB }' 
	`
	let response = await DB_Inf.get_sql( 'ezoffice' , sql_state )
	return res.status(200).json( result ) 
}
exports.delete_collection = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let sql_state = `
	delete from TB_collections where name = '${ collectionName }' and dbName = '${ user_DB }' 
	`
	let response = await DB_Inf.get_sql( 'ezoffice', sql_state )
	result.DATA = response.recordset ; 
	return res.status(200).json( result ) 
}
exports.update_collectionAssign = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let collections_list = req.body.collections_list 
	collections_list = "'" + collections_list.join("','") +"'" ;
	console.log( collections_list ) 
	let sql_state = `
	--- collection Link query Merge
	declare @collectionSeq_t int
	declare @collectionSeq_s table( assignSeq_T int not null , assignSeq_S int not null) ;
	select  @collectionSeq_t  = seq from  TB_collections  where name = '${ collectionName }' and dbName = '${ user_DB }' ;
	insert into @collectionSeq_s select assignSeq_T = @collectionSeq_t , seq from  TB_collections  where name in (${ collections_list } ) ;
	merge TB_collections_link  T
	-- using  ( select assignSeq_T = @collectionSeq_t , assignSeq_S = @collectionSeq_s ) S on  T.collection_assignSeq_T = S.assignSeq_T and T.collection_assignSeq_S = S.assignSeq_S
	using @collectionSeq_s S on T.collection_assignSeq_T = S.assignSeq_T and T.collection_assignSeq_S = S.assignSeq_S
	when not matched by target then
		 insert ( collection_assignSeq_T , collection_assignSeq_S ) values( @collectionSeq_t , S.assignSeq_S )
	when not matched by source then
		delete;
	select * from  TB_collections_link
	`
	let response = await DB_Inf.get_sql( 'ezoffice', sql_state )
//	result.DATA = _.pluck( response.recordset, 'name' ) 
	result.DATA = response.recordset ; 
	return res.status(200).json( result ) 
}
exports.update_appAssign = async ( req, res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let apps_list = req.body.apps_list 
	apps_list = "'" + apps_list.join("','") +"'" ;
	console.log( apps_list ) 
	let sql_state = `
	declare @collectionAppSeq_t int
	declare @collectionAppSeq_s table( collectionSeq_T int not null , assignAppSeq_S int not null) ;
	select  @collectionAppSeq_t  = seq from  TB_collections  where name = '${ collectionName }' and dbName ='${ user_DB }' ;
	insert into @collectionAppSeq_s select collectionSeq_T = @collectionAppSeq_t , seq from  TB_apps  where name in (${ apps_list } ) ;
	select * from @collectionAppSeq_s
	merge TB_collection_apps  T
	-- using  ( select assignSeq_T = @collectionSeq_t , assignSeq_S = @collectionSeq_s ) S on  T.collection_assignSeq_T = S.assignSeq_T and T.collection_assignSeq_S = S.assignSeq_S
	using @collectionAppSeq_s S on T.collection_assignSeq = S.collectionSeq_T and T.app_assignSeq = S.assignAppSeq_S
	when not matched by target then
	-- insert into TB_collections_link( collection_assignSeq_T , collection_assignSeq_S ) values( @collectionSeq_t , @collectionSeq_s );
	insert ( collection_assignSeq , app_assignSeq ) values( @collectionAppSeq_t , S.assignAppSeq_S )
	when not matched by source then
	-- delete TB_collections_link
	delete;
	select * from  TB_collection_apps
	`
	let response = await DB_Inf.get_sql( 'ezoffice', sql_state )
//	result.DATA = _.pluck( response.recordset, 'name' ) 
	result.DATA = response.recordset ; 
	return res.status(200).json( result ) 
}
//////////////////////////////////////////////////////////////////////////////////////////
//     Delete ..
/////////////////////////////////////////////////////////////////////////////////////////
exports.delete = async ( req , res )=>{
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
    let collectionName = req.params.collectionName ; 
	let user_DB = req.params.db_name; 
	let id = req.params.id 
	let sql_state = `
	delete from [ezoffice].[dbo].[TB_collections] where ownerSeq = 
	( select seq from [config].[dbo].[TB_Admin] where email = '${ id }' and dbName = '${ user_DB }' )
	and name = '${ collectionName }' 
	`
	let response = await DB_Inf.get_sql( 'ezoffice' , sql_state )
	return res.status(200).json( result ) 
}



