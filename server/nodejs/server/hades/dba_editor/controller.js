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
exports.get_organizations_list = async( req, res )=>{ 
	const db_name = 'config'
	const sql_state = `	
	SELECT
	      orgName AS organization  
	FROM TB_Organization
	ORDER BY seq DESC;
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_organization = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	const sql_state = `
	SELECT 
		*
	FROM TB_Organization
	WHERE orgName = '${org_name}'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_authOrg = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	const sql_state = `
	SELECT 
	 Auth.authKey , Auth.orgAuthSecret , Auth.orgAuthSecretExpiredDateTime, Auth.remark      
	FROM TB_Organization AS Org INNER JOIN TB_Auth_Organization AS Auth ON Org.seq = Auth.orgSeq 
	WHERE Org.orgName = '${org_name}'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/*
	per login_id , MLKs 
*/
exports.get_authMlk = async( req, res )=>{
	const db_name = 'config'
	let login_id = req.params.id 
	const sql_state = `
	 SELECT b.seq AS seq 
	      ,[machAuthSecret]
	      ,[machAuthSecretExpiredDateTime]
	      ,[machAuthIdentifier]
	      ,[machInfo]
	  FROM TB_User AS a INNER JOIN TB_Auth_Machine AS b ON b.userSeq = a.seq 
	  WHERE dbLoginID = '${ login_id }'	
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_user = async( req, res )=>{
	const db_name = 'config'
	let user_id  = req.params.id 
	const sql_state = `
	SELECT seq, defaultDB 
	from TB_User  
	where dbLoginID = '${ user_id }'
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/*
	per Org TB_User 
*/
exports.get_users_list = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	const sql_state = `
	SELECT a.seq AS 'seq', defaultDB , dbLoginID AS 'user'
	from TB_User a INNER JOIN TB_Organization b on a.orgSeq = b.seq 
	where orgName = '${ org_name }'
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/*
	per Org Login with mlkCount  
*/
exports.get_users_list_mlkCount = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	const sql_state = `
	select b.dbLoginID AS 'user', count(machAuthSecret) AS 'mlkCount' from TB_User b left join TB_Auth_Machine a on a.userSeq = b.seq  where defaultDB = '${ org_name }'  group by b.dbLoginID order by count(machAuthSecret) DESC
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/* 
   All TB_admin_1 consolidate. 
*/
exports.get_web_users = async( req, res )=>{
	const db_name = 'config' 
	const sql_state = `
	DECLARE @name NVARCHAR(MAX);
	DECLARE @USE_TEMPLATE NVARCHAR(MAX); 
	DECLARE	@SQLString NVARCHAR(MAX);
	DECLARE dbs_list CURSOR 
	FOR SELECT [name]
	FROM master.sys.databases 
	-- WHERE HAS_DBACCESS([name])=1 AND name NOT IN('model','master','tempdb','msdb','common','config','ezchemtech_dev','ezchemtech_scraping_log', 'ezparts', 'numberonetax', 'ezchemtech_web_sales') 
	WHERE HAS_DBACCESS([name])=1 AND name IN( select mainDB from TB_Organization ) 

	OPEN dbs_list;
	FETCH NEXT FROM dbs_list INTO 
		@name
	DROP TABLE IF EXISTS ##All_admin_1
	CREATE TABLE  ##All_admin_1 ( db_name NVARCHAR(20) ,name NVARCHAR(20) , userSeq INT, password NVARCHAR(50), email NVARCHAR(50)) 
		SET @USE_TEMPLATE = 'USE [{db_name}]; INSERT INTO ##All_admin_1(db_name, name, userSeq, password , email ) SELECT db_name = ''{db_name}'', name, userSeq ,password, email FROM TB_admin_1';
	WHILE @@FETCH_STATUS = 0 
		BEGIN
		    PRINT @name
			SET @SQLString = REPLACE( @USE_TEMPLATE, '{db_name}', @name );
		    PRINT @SQLString 
			EXECUTE ( @SQLString ) ; 
			FETCH NEXT FROM dbs_list INTO
				@name 
		END 
	CLOSE dbs_list;
	DEALLOCATE dbs_list;
	SELECT * from ##All_admin_1
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/*
    Per DB  get TB_admin_1 
*/
exports.get_web_users_db = async( req, res )=>{
	const db_name = req.params.db 
	const sql_state = `
	SELECT * FROM TB_admin_1 
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/*
    Per DB  get TB_admin_1 / id 
*/
exports.get_web_user_db = async( req, res )=>{
	const db_name = req.params.db 
	const id = req.params.id 
	const sql_state = `
	SELECT * FROM TB_admin_1 where email = '${ id }'
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_web_login_matrix = async( req, res )=>{
	const db_name = 'config'
    const sql_state = `
	DECLARE @name NVARCHAR(MAX);
	DECLARE @USE_TEMPLATE NVARCHAR(MAX); 
	DECLARE	@SQLString NVARCHAR(MAX);
	DECLARE dbs_list CURSOR 
	FOR SELECT [name]
	FROM master.sys.databases 
	WHERE HAS_DBACCESS([name])=1 AND name IN( select orgName from [dbo].[TB_Organization] ) 

	OPEN dbs_list;
	FETCH NEXT FROM dbs_list INTO 
		@name
	DROP TABLE IF EXISTS ##All_admin_1
	CREATE TABLE  ##All_admin_1 ( db_name NVARCHAR(20) ,name NVARCHAR(20) , userSeq INT, password NVARCHAR(50), email NVARCHAR(50)) 
		SET @USE_TEMPLATE = 'USE [{db_name}]; INSERT INTO ##All_admin_1(db_name, name, userSeq, password , email ) SELECT db_name = ''{db_name}'', name, userSeq ,password, email FROM TB_admin_1';
	WHILE @@FETCH_STATUS = 0 
		BEGIN
		    PRINT @name
			SET @SQLString = REPLACE( @USE_TEMPLATE, '{db_name}', @name );
		    PRINT @SQLString 
			EXECUTE ( @SQLString ) ; 
			FETCH NEXT FROM dbs_list INTO
				@name 
		END 
	CLOSE dbs_list;
	DEALLOCATE dbs_list;
	SELECT DISTINCT name , email AS web_id , dbLoginID AS login_id from ##All_admin_1 a inner join TB_User b on a.userSeq = b.seq ;
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/*
    get Login info from web email_id 
'*/
exports.get_db_login_web = async( req, res )=>{
	const db_name = req.params.db 
	const id = req.params.id 
	const sql_state = `
	SELECT email as web_id, dbLoginID as login_id
	FROM TB_admin_1 a inner join [config].dbo.TB_User b on a.userSeq = b.seq   
	WHERE a.email = '${id}'
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
 //       	let errors  = Array.from( err.originalError.errors )
//			let messages = _.plunk( errors, message ) 
//   		result.ERRORMESSAGE = messages.join(':')
			for( let i = 0 ; i < err.originalError.errors.length ; i++ ){
				result.ERRORMESSAGE += ': ' + err.originalError.errors[i].message 
			}
		}
		result.RAWDATA = JSON.parse( JSON.stringify( err ))
	        return  result
	}
}
exports.add_database = async( req, res )=>{
	const db_name = 'config' 
	let target_db_name = req.params.db   
	const sql_state =`
		CREATE DATABASE [${ target_db_name }]
		 CONTAINMENT = NONE
			 ON  PRIMARY 
			( NAME = N'${ target_db_name }', FILENAME = N'C:\\Program Files\\Microsoft SQL Server\\MSSQL16.MSSQLSERVER\\MSSQL\\DATA\\${ target_db_name }.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
			 LOG ON 
			( NAME = N'${ target_db_name }_log', FILENAME = N'C:\\Program Files\\Microsoft SQL Server\\MSSQL16.MSSQLSERVER\\MSSQL\\DATA\\${ target_db_name}_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
	`
     let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.init_database = async( req, res )=>{
	let db_name = req.params.db 
	const sql_state = `
		CREATE TABLE [dbo].[TB_admin_1](
			[seq] [int] IDENTITY(1,1) NOT NULL,
				[id_jpt] [int] NULL,
				[name] [nvarchar](120) NULL,
				[position] [nvarchar](120) NULL,
				[level] [int] NULL,
				[password] [nvarchar](120) NULL,
				[email] [nvarchar](120) NULL,
				[important] [int] NULL,
				[약칭] [nvarchar](120) NULL,
				[jandi_id_map] [nvarchar](120) NULL,
				[depart] [nvarchar](120) NULL,
				[configuration] [nvarchar](120) NULL,
				[createdAt] [datetimeoffset](7) NOT NULL,
				[updatedAt] [datetimeoffset](7) NOT NULL,
				[userSeq] [int] NULL,
			PRIMARY KEY CLUSTERED 
		(
			[seq] ASC
		)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
		) ON [PRIMARY]
		ALTER TABLE [dbo].[TB_admin_1] ADD  CONSTRAINT [DF_TB_admin_1_createdAt]  DEFAULT (getdate()) FOR [createdAt]
		ALTER TABLE [dbo].[TB_admin_1] ADD  CONSTRAINT [DF_TB_admin_1_updatedAt]  DEFAULT (getdate()) FOR [updatedAt]
    ` 
     let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.add_organization = async( req, res )=>{
	const db_name = 'config'
	let data = req.body 
	let data_fields = Object.keys( data ).join(',') , data_values = ( Object.values( data ).map( (e)=>"'"+e+"'" )).join(',');
	const sql_state = `
	INSERT INTO TB_Organization ( ${ data_fields } ) VALUES ( ${ data_values } ) 
	`
     let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_organization = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	let data = req.body 
	let dataSet = []
	for( const [ key , value ] of Object.entries( data )){
		let data_e = `${key} = '${value}'`
		dataSet.push( data_e );
	}
	let sqlSet = dataSet.join(',') 
	const sql_state = `
	UPDATE  TB_Organization SET  ${ sqlSet } WHERE orgName = '${ org_name }' 
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.add_authOrg = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.body.org_name 
	let MLK_KEY  = req.body.mlk_value 

	const sql_state = `
	INSERT INTO TB_Auth_Organization( orgSeq, authKey , orgAuthSecret , orgAuthSecretExpiredDateTime  )
	SELECT seq  , 'TBD', '${ MLK_KEY }' , '2024-12-31'
	FROM TB_Organization
	WHERE orgName = '${ org_name }'
	`	
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_authOrg = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.id 
	let authKey = req.body.authKey 
	let remark = req.body.remark 

	const sql_state = `
        DECLARE
	@V_SEQ AS INT
	SET @V_SEQ = 0 ;

	BEGIN
	select @V_SEQ  =  orgSeq 
	from  TB_Auth_Organization a inner join TB_Organization b on a.orgSeq = b.seq 
	where b.orgName = '${ org_name }'

	IF @V_SEQ <> 0
	UPDATE TB_Auth_Organization SET authKey = '${ authKey }', remark ='${ remark }' WHERE orgSeq = @V_SEQ 
	END;
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.add_authMlk = async( req, res )=>{
	const db_name = 'config'
	let user_id  = req.body.user_id 
	let user_db  = req.body.user_db 
	let machInfo = req.body.machInfo 
	let MLK_KEY  = req.body.mlk_value

	const sql_state = `
	DECLARE @user_db NVARCHAR(120),@user_id NVARCHAR(120), @authOrgUserSeq INT ,  @query_TB_admin_1 NVARCHAR(200) 
	set @user_db = '${ user_db }'
	set @user_id = '${ user_id }'
	set @query_TB_admin_1 = 'select @authOrgUserSeq = seq from [' + @user_db +'].dbo.TB_admin_1 where email = ''' + @user_id + ''''
	EXECUTE sp_executesql @query_TB_admin_1, N'@authOrgUserSeq INT OUTPUT' , @authOrgUserSeq =  @authOrgUserSeq OUTPUT

	INSERT INTO TB_Auth_Machine (
	      orgSeq
	      ,authOrgSeq
	      ,userSeq
		  ,authOrgUserSeq 
	      ,isUnattended
	      ,machAuthSecret
	      ,machAuthSecretExpiredDateTime
	      ,machInfo)
	SELECT  b.orgSeq As orgSeq , b.seq AS authOrgSeq , a.seq AS userSeq, @authOrgUserSeq As authOrgUserSeq , isUnattended = 0, machAuthSecret = '${ MLK_KEY }', machAuthSecretExpiredDateTime=CONVERT(DATETIME,'2024-12-31'), machInfo='${ machInfo }'
	FROM TB_User AS a INNER JOIN TB_Auth_Organization AS b ON a.orgSeq = b.orgSeq
	WHERE a.dbLoginID = '${ user_id }'
	`	
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_authMlk = async( req, res )=>{
	const db_name = 'config'
	let seq = req.params.id 
	let machInfo = req.body.machInfo 

	const sql_state = `
	UPDATE TB_Auth_Machine SET machInfo = '${ machInfo }' WHERE seq = ${ seq } 
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.add_user = async( req, res )=>{
//	const db_name = 'config'
	const pwd = '!@34qwer' 
	let org_name = req.body.org_name   // defaultDB name .  
	let db_name = org_name 
	let id = req.body.id 
	const sql_state = `
		CREATE LOGIN "${ id }" WITH PASSWORD = '${ pwd }' 
		CREATE USER "${ id }" FOR LOGIN "${ id }"
		USE config 
		INSERT INTO TB_User( orgSeq, authOrgSeq,  defaultDB , dbLoginID , dbLoginPWD ) 
		SELECT a.seq , b.seq , mainDB , '${ id }', '${ pwd }'
		FROM TB_Organization a left join TB_Auth_Organization b on b.orgSeq = a.seq 
		WHERE orgName = '${ org_name }'
		USE  common 
		CREATE USER "${ id }" FOR LOGIN "${ id }"
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.assign_userDB = async( req, res )=>{
	const db_name = req.body.mainDB 
	const id = req.body.id 
	const sql_state =`
		CREATE USER "${ id }" FOR LOGIN "${ id }"
		USE  common 
		CREATE USER "${ id }" FOR LOGIN "${ id }"
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_web_userSeq = async( req, res )=>{
	const id = req.params.id 
	const db_name = req.params.db 
	const userSeq = req.body.userSeq 
	const sql_state = `
		UPDATE TB_admin_1 SET userSeq = ${ userSeq } WHERE email = '${ id }' 
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.insert_web_user = async( req, res )=>{
	const db_name = req.params.db 
	const id  = req.body.id 
	const password = defaultPassword  
	const sql_state = `
		INSERT INTO  TB_admin_1( email ,  password ) VALUES( '${ id }', '${ password }') 
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_web_user = async( req, res )=>{
	const id = req.params.id 
	const db_name = req.params.db 
	const name = req.body.name 
	const password = req.body.password 
	const sql_state = `
		UPDATE TB_admin_1 SET name = '${ name }' , password = '${ password }'  WHERE email = '${ id }' 
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   old Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.index = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	const headers = { user_db } 
	
//	let  hades_data = await axios({ method:"GET", url:"http://ezoffice365.com:5000/ezchemtech/TableEditor/Data/Log_Collector", headers : headers })
//	let  hades_data = await axios({ method:"GET", url:"https://192.168.0.80:5000/ezchemtech/TableEditor", headers : headers })
	let  hades_data = await axios({ method:"GET", url:"https://ezoffice365.com:5000/ezchemtech/TableEditor", headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
exports.role_data = async function( req, res ){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	let sql_state = `exec config.dbo.SP_GRANT @dbName='${user_db}'`
	let  hades_data = await axios({ method:"POST", url:`https://ezoffice365.com:5000/ezchemtech/TableEditor/${user_db}/sql`, data:{ sql_state } })
	if( hades_data ){
		result.STATUS = 1 
		result.RESULT = 'success'
		result.MESSAGE = '' 
		result.DATA = hades_data.data.tbl_data  
		return res.status(200).json( result )
	}
	return res.status( 401 ).json( result )
}
exports.pr_config  = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
// ezoffice	
	const headers = { user_db, authentication : 'Bearer '+ 
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJweXRob24iLCJpZCI6ImVkZW4ubGVlQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJPcmdhbml6YXRpb24iLCJpYXQiOjE2NTg0NTcwMTF9.vly8lKU-gNUno1yq5eVQluw1um2No2UrWhbzJC6TIV8'+
		' '+
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJleGNlbCIsImlkIjoicmljaGFyZC5jaG9pQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJNYWNoaW5lIiwibm8iOjEsImlhdCI6MTY3MTAwNDE3M30.2gQUCy-w6fsO29zwv3RUJ5I2tCq1gCRo14Ita7aLCzw'
		+ ' ezofficeadmin' } 
	let pr_type = req.params.pr_name.toLowerCase() ;
	let tbl_name = req.params.tbl_name ; 
	let db_name = req.params.db ; 
	let data = {
	    "requestType": "incomingWebhook",
	    "clientMachineType": "PC",
	    "clientMachineHostName": "DESKTOP-ABCDEF",
	    "clientAppName": "aaa.xlsm",
	    "clientAppPath": "C://temp",
	    "clientAppVersion": "앱버전",
	    "clientAppProcessedTime": "2023-01-03 13:10:10 200",
	    "runData": {
		"type": pr_type,
		"roleName":"role_default",
		"defaultDB": db_name ,
		"tableName": tbl_name
	    }
	}
	
	try{
		var  hades_data = await axios({ method:"POST", url:"https://api.ezoffice365.com/api/v0/db/sub/role_table", data:data , headers : headers })
	}catch(err){
		console.log( err );
	}

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
