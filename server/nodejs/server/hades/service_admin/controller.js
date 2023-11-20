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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   GET CodeFApi Service Codes.. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.get_codeFApi_rpaLog = async( req, res )=>{
	const db_name = 'ezoffice'
	const sql_state = `	
	SELECT TOP (1000) [seq]
	      ,[서비스명]
	      ,[org_name]
	      ,[비고]
	      ,[updateTime]
	  FROM [ezoffice].[dbo].[TB_고객서비스_log_codeFApi] order by seq desc 
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_codeFApi_rpaConfig = async( req, res )=>{
	const db_name = 'ezoffice'
	const sql_state = `	
	 with  서비스목록 as (
	     select distinct 서비스명 from [ezoffice].[dbo].[TB_고객서비스_codeFApi]
	  )
	    select a.서비스명 , ISNULL( [주기시간],12) as 주기시간 from 서비스목록 a  left join  [ezoffice].[dbo].[TB_고객서비스_rpa_codeFApi] b on a.서비스명 = b.서비스
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_codeFApi_collection_accountList = async( req, res )=>{
	const db_name = 'ezoffice'
	let org_name = req.params.org_name
	const sql_state = `	
	select [계좌명칭], resAccount as 계좌번호, resAccountName as  계좌명, ISNULL( enabled , 1) as enabled
	 from  [ezoffice].[dbo].[TB_${ org_name }_계좌목록_codeFApi] a left join [ezoffice].[dbo].[TB_bk_기관코드] b 
	 on a.기관코드 = b.기관코드  left join [ezoffice].[dbo].[TB_수집계좌목록_codeFApi] c on  a.resAccount = c.계좌번호
	 where resAccountDeposit = 11  
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_codeFApi_collection_accountEnableList = async( req, res )=>{
	const db_name = 'ezoffice'
	let org_name = req.params.org_name
	const sql_state = `	
	select [계좌명칭], resAccount as 계좌번호, resAccountName as  계좌명, ISNULL( enabled , 1) as enabled
	 from  [ezoffice].[dbo].[TB_${ org_name }_계좌목록_codeFApi] a left join [ezoffice].[dbo].[TB_bk_기관코드] b 
	 on a.기관코드 = b.기관코드  left join [ezoffice].[dbo].[TB_수집계좌목록_codeFApi] c on  a.resAccount = c.계좌번호
	 where resAccountDeposit = 11  and enabled = 1
	`
    let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_codeFApi_service = async( req, res )=>{
	const db_name = 'ezoffice'
	let service_name = req.params.service_name
	const sql_state = `	
	select a.seq ,orgName , mainDB , orgBRN as [사업자번호] ,[인증년월],
	  case [enabled]
	  when 1 then 1
	  when 0 then 0
	  else 0
	  end [enabled]
	    from [config].[dbo].[TB_Organization] a left join
		  ( select * from [ezoffice].[dbo].[TB_고객서비스_codeFApi] where [서비스명] =  '${ service_name }' ) b on a.orgName = b.org_name 
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_service_serviceList = async( req, res )=>{
	const db_name = 'config'
	const sql_state = `	
	SELECT distinct  CONCAT( serviceClass, '_', serviceName ) as serviceFull
	  FROM [config].[dbo].[TB_Service_Setting]
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_service_permissionList = async( req, res )=>{
	const db_name = 'config'
	const sql_state = `	
	select value from string_split('Org,User,Machinekey,Disabled', ',')
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.get_service_orgList = async( req, res )=>{ 
	const db_name = 'config'
	const sql_state = `	
	select  orgName as organization , EMAIL_ , SMS_ , WEBHOOK_JANDI, WEBHOOK_TELEGRAM from dbo.VW_SERVICE_ORG a left join dbo.TB_Organization b on a.orgSeq = b.seq
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_service_setting = async( req, res )=>{ 
	const db_name = 'config'
	const sql_state = `	
	select  orgName as organization , EMAIL_ , SMS_ , WEBHOOK_JANDI, WEBHOOK_TELEGRAM, TAXINVOICE_ from dbo.VW_SERVICE_SETTING 
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_service_setting_org = async( req, res )=>{ 
	const db_name = 'config'
	const orgName = req.params.orgName 
	const sql_state = `	
	select  orgName as organization , EMAIL_ , SMS_ , WEBHOOK_JANDI, WEBHOOK_TELEGRAM, TAXINVOICE_ from dbo.VW_SERVICE_SETTING  where orgName = '${ orgName }'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_service_orgList_serviceId = async( req, res )=>{ 
	const db_name = 'config'
	const services = req.params.service_id.split('_') 
	const sql_state = `	
	select orgName, CONCAT( serviceClass, '_', serviceName ) as serviceFull , permissionType, [enabled] ,
	 case when [enabled] = 'N' then
	      'Disabled'
	 else 
		       [permissionType]
	 end
	 as permissionType_2 
	 from TB_Service_Setting  a left join TB_Organization b on a.orgSeq = b.seq  where serviceClass ='${ services[0]}' and serviceName = '${ services[1] }'   
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_service_userList = async( req, res )=>{ 
	const db_name = 'config'
	let orgName = req.params.orgName 
	const sql_state = `	
	select dbLoginID as user_id , EMAIL_ , SMS_ , WEBHOOK_JANDI, WEBHOOK_TELEGRAM  from dbo.VW_SERVICE_USER a left join TB_Organization b on a.orgSeq = b.seq  left join TB_User c on a.userSeq = c.seq  where orgName ='${ orgName }'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_service_machinekeyInfoList = async( req, res )=>{ 
	const db_name = 'config'
	let user_id = req.params.user_id  
	const sql_state = `	
	select authMachSeq as MachineKey , machinfo from dbo.VW_SERVICE_MACH a left join TB_User b on a.userSeq = b.seq left join TB_Auth_Machine c on a.authMachSeq = c.seq  where dbLoginID = '${ user_id }'
	`
        let result = await sql_exec_get( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 

}
exports.get_service_machinekeyList = async( req, res )=>{ 
	const db_name = 'config'
	let user_id = req.params.user_id  
	const sql_state = `	
	select authMachSeq as MachineKey , EMAIL_, SMS_ ,WEBHOOK_JANDI, WEBHOOK_TELEGRAM  from dbo.VW_SERVICE_MACH a left join TB_User b on a.userSeq = b.seq left join TB_Auth_Machine c on a.authMachSeq = c.seq  where dbLoginID = '${ user_id }'
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
exports.update_serviceSetting = async( req, res )=>{
	const db_name = 'config'
	let orgName = req.params.orgName 
	let service_id  = req.params.service_id   
	let data = req.body 
	let services = service_id.split('_')
	let sql_state
	if( data.permissionType_2 == 'Disabled'){
		sql_state = `
		update TB_Service_Setting set  [enabled] = 'N' 
		  from TB_Service_Setting  
		  where orgSeq = ( select seq from TB_Organization where orgName = '${ orgName }') 
		  and serviceClass = '${ services[0] }' and serviceName ='${ services[1] }'
		` 
	}
	else {
		sql_state =`
		update TB_Service_Setting set  [enabled] = 'Y', permissionType = '${ data.permissionType_2 }' 
		  from TB_Service_Setting  
		  where orgSeq = ( select seq from TB_Organization where orgName = '${ orgName }') 
		  and serviceClass = '${ services[0] }' and serviceName ='${ services[1] }'
		` 
	}
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_orgService = async( req, res )=>{
	const db_name = 'config'
	let org_name = req.params.orgName  
	let data = req.body 
	let value = ['N','Y'][data.value*1]    // true / false to 1 0 
	const sql_state = `
	update TB_Allowed_Organization set enabled = '${ value }'
	where seq = 
	( select a.seq from TB_Allowed_Organization a left join TB_Organization b on a.orgSeq = b.seq where  orgName = '${ org_name }'  and serviceClass = '${ data.serviceClass }' and serviceName= '${ data.serviceName }' )
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_userService = async( req, res )=>{
	const db_name = 'config'
	let user_id = req.params.user_id   
	let data = req.body 
	let value = ['N','Y'][data.value*1]    // true / false to 1 0 
	const sql_state = `

	where seq = 
	( select a.seq from TB_Allowed_User a left join TB_User b on a.userSeq = b.seq where  dbLoginID  = '${ user_id }'  and serviceClass = '${ data.serviceClass }' and serviceName= '${ data.serviceName }' )
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.update_machinekeyService = async( req, res )=>{
	const db_name = 'config'
	let machinekey = req.params.machinekey  
	let data = req.body 
	let value = ['N','Y'][data.value*1]    // true / false to 1 0 
	const sql_state = `
	update TB_Allowed_Machine set enabled = '${ value }'
	where seq = 
	( select a.seq from TB_Allowed_Machine a left join TB_Auth_Machine b on a.authMachSeq = b.seq where  b.seq = '${ machinekey }'  and serviceClass = '${ data.serviceClass }' and serviceName= '${ data.serviceName }' )
	`
        let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	return res.status(200).json(result) 
}
exports.merge_codeFApi_service = async( req, res )=>{
	const db_name = 'ezoffice'
	let data = req.body 
	let service_name = req.params.service_name 
    console.log( data.json )
	const sql_state = `
	update [ezoffice].[dbo].[TB_고객서비스_codeFApi] set [enabled] = 0 where 서비스명='${ service_name }'; 
	merge [ezoffice].[dbo].[TB_고객서비스_codeFApi] T 
	 using (
	 	select 서비스명='${ service_name }', orgName as org_name , mainDB as db_name , replace(사업자번호, '-','') as 사업자번호   from openjson('${ data.json }') with ( orgName nvarchar(20) '$.orgName' , mainDB nvarchar(50) '$.mainDB' , [사업자번호] nvarchar(20) '$."사업자번호"' ) 
	 ) as S on T.서비스명 = S.서비스명 and T.org_name = S.org_name 
	 when matched then 
	      update set T.enabled = 1 
	 when not matched by target then 
	      insert ( [서비스명] , [org_name] , [db_name] , [enabled] , [사업자번호] ) 
		  values( S.[서비스명], S.[org_name], S.[db_name] , 1 , S.[사업자번호] );
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	console.log( sql_state )
	return res.status(200).json(result) 
}
// collection Account  Exclusive  
exports.merge_codeFApi_collectionAccount = async( req, res )=>{
	const db_name = 'ezoffice'
	let org_name = req.params.org_name 
	let data = req.body 
    console.log( data.json )
	const sql_state = `
	update [ezoffice].[dbo].[TB_수집계좌목록_codeFApi] set [enabled] = 1; 
	merge [ezoffice].[dbo].[TB_수집계좌목록_codeFApi] T 
	 using (
	 	select 회사명='${ org_name }', [계좌번호] from openjson('${ data.json }') with ( 계좌번호  nvarchar(50) '$."계좌번호"'  ) 
	 ) as S on T.회사명 = S.회사명 and T.계좌번호 = S.계좌번호 
	 when matched then 
	      update set T.enabled = 0 
	 when not matched by target then 
	      insert ( [회사명] , [계좌번호],[enabled] ) 
		  values( S.[회사명], S.[계좌번호], 0 );
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	console.log( sql_state )
	return res.status(200).json(result) 
}
exports.merge_codeFApi_rpaConfig = async( req, res )=>{
	const db_name = 'ezoffice'
	let data = req.body 
    console.log( data.json )
	const sql_state = `
	merge [ezoffice].[dbo].[TB_고객서비스_rpa_codeFApi] T
	using(
	     select 서비스명 , 주기시간 from openjson( '${ data.json }' ) with ( 서비스명 nvarchar(50) '$."서비스명"' , 주기시간 int '$."주기시간"' )
	)as S on T.서비스명 = S.서비스명 
	when matched then 
	     update set T.주기시간 = S.주기시간 
	when not matched by target then 
	     insert ( 서비스명, 주기시간 )
		 values ( S.서비스명, S.주기시간 );
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	console.log( sql_state )
	return res.status(200).json(result) 
}
exports.insert_codeFApi_rpaLog = async( req, res )=>{
	const db_name = 'ezoffice'
	let data = req.body 
	const sql_state = `
	INSERT INTO [dbo].[TB_고객서비스_log_codeFApi]
	           ([서비스명]
	           ,[org_name]
	           ,[비고]
	     VALUES
	           ('${ data["서비스명"] }'
			    ,'${ data["org_name"] }'
			    ,'${ data["비고"] }'
			   )
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	console.log( sql_state )
	return res.status(200).json(result) 
}
exports.update_codeFApi_rpaLog = async( req, res )=>{
	const db_name = 'ezoffice'
	let seq = req.params.seq 
	let data = req.body 
	const sql_state = `
	UPDATE [dbo].[TB_고객서비스_log_codeFApi]
	SET  [비고] = '${ data["비고"] }'
	WHERE seq = ${ seq }
	`
    let result = await sql_exec_post( undefined , undefined, db_name , sql_state );   
	console.log( sql_state )
	return res.status(200).json(result) 
}
