'use strict'
const { readFileSync , writeFileSync,  statSync } = require('fs') 
const path = require('path') 
const axios = require('axios') 


exports.index = async function( req, res){
	let result = { STATUS: -1 , RESULT :'fail', MESSAGE :'error:', DATA: null } 
	let user_db = req.params.db 
	const headers = { user_db } 
	
//	let  hades_data = await axios({ method:"GET", url:"http://ezoffice365.com:5000/ezchemtech/TableEditor/Data/Log_Collector", headers : headers })
	let  hades_data = await axios({ method:"GET", url:"http://192.168.0.80:5000/ezchemtech/TableEditor/Data/Log_Collector", headers : headers })

	result.STATUS = 1 
	result.RESULT = 'success'
	result.MESSAGE = '' 
	result.DATA = hades_data.data.tbl_data  
	return res.status( 200 ).json( result ) 
}
