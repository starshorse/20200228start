'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 


exports.index = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	const headers = { user_db } 
	
//	let  hades_data = await axios({ method:"GET", url:"http://ezoffice365.com:5000/ezchemtech/TableEditor/Data/Log_Collector", headers : headers })
	let  hades_data = await axios({ method:"GET", url:"http://192.168.0.80:5000/ezchemtech/TableEditor", headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
exports.pr_config  = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
// ezoffice	
	const headers = { user_db, authentication : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJweXRob24iLCJpZCI6ImVkZW4ubGVlQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJPcmdhbml6YXRpb24iLCJpYXQiOjE2NTg0NTcwMTF9.vly8lKU-gNUno1yq5eVQluw1um2No2UrWhbzJC6TIV8 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJleGNlbCIsImlkIjoicmljaGFyZC5jaG9pQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJNYWNoaW5lIiwibm8iOjEsImlhdCI6MTY3MTAwNDE3M30.2gQUCy-w6fsO29zwv3RUJ5I2tCq1gCRo14Ita7aLCzw ezofficeadmin' } 
	let pr_type = req.params.pr_name ;
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
		"roleName":"role_test",
		"defaultDB": db_name ,
		"tableName": tbl_name
	    }
	}
	
	try{
		var  hades_data = await axios({ method:"POST", url:"https://api.ezoffice365.com/api/v0/db/role_table", data:data , headers : headers })
	}catch(err){
		console.log( err );
	}

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
