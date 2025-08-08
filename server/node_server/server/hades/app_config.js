/*
require('dotenv').config() 
const { createTbl } = require('./server/nosql_config/fdb_json') 
const serverCompany = 'ezoffice' 
// First time  workSpace_serivce not available. 
const companyInfo_path = './server/config/tbl/관리회사' 
const companies = createTbl( companyInfo_path ) 

var appConfig_ins = module.exports = {
	companyInfo_path : companyInfo_path ,
	initAppConfig : ( name_ )=>{
//		console.log( companies ) 
		let companyInfo = companies.find((ent)=>ent.server_name == name_ )
		if( companyInfo == -1 || companyInfo == undefined  )throw 'no company info find !' 
//		console.log( companyInfo ) 
		appConfig_ins.companyInfo.name = companyInfo.server_name 
		appConfig_ins.companyInfo.port = companyInfo.port 
		appConfig_ins.companyInfo.apps_list_path = `./server/db_edit/company/${ name_ }/`

		companyInfo = companies.find((ent)=>ent.server_name == serverCompany )
		if( companyInfo == -1 || companyInfo == undefined  )throw 'no server company info find !' 
//		console.log( companyInfo ) 
		appConfig_ins.serverCompany.name = companyInfo.server_name 
		appConfig_ins.serverCompany.port = companyInfo.port 
	},
	setCompany_name: ( name )=>{
			appConfig_ins.companyInfo.name = name 
	},
	getCompany_name: ()=>{ return  appConfig_ins.companyInfo.name } ,
	companyInfo: {'name': null ,'port': 3004, 'apps_list_path': null  } ,
	serverCompany: { 'name': serverCompany ,'ip': process.env.SERVER_DOMAIN , 'port': process.env.SERVER_SUPERVISOR_PORT }
}
*/
module.exports =  { companyInfo: {'name':'ezoffice' }}  // for Hades .. 


