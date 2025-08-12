const { ezChemtech, objDbConfig, update_objDbConfig , refresh_objDbConfig  } = require('./conf')
const mssql = require('mssql')
const path  = require('path') 
require('dotenv').config({ path: path.join( __dirname, '../../../../../../.env')})  
// console.log( objDbConfig ) 
var mssql_connection_flag = 0 
const get_mssql_connection_flag = ()=>mssql_connection_flag 
const set_mssql_connection_flag = ( flag )=>{ 
if( process.env.MSSQL_EN == 1 )	
	mssql_connection_flag = flag 
} 
var appConfig_ins = require('../../app_config') 
var connection = null  
const promise_db_connection =( dbConfig_ , db_name = null )=>{
     let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
    return new Promise(( resolve, reject ) =>{
	console.log( dbConfig_ )
	if( dbConfig_ == undefined ){
		result_status.MESSAGEERROR ='no matched DB configuration check the DB name !!' 
		reject( result_status ) 
	}
	try{
		connection = mssql.connect( dbConfig_ , function(err){
				if(err){
					console.log('mssql connection failed', err) 
					reject({ status:'failed'}) 
				}
				console.log( appConfig_ins.companyInfo.name , ':MSSQL  연결 완료') 
				console.log( dbConfig_.database , ':DB  연결 완료') 
			if( process.env.MSSQL_EN == 1 )	mssql_connection_flag = 1 
			console.log('MSSQL en:', mssql_connection_flag ) 
	//		console.log( connection ) 
			const check_conectionChanged = ( connection , dbConfig_ )=>{
				console.log( connection.config ) 
				if( connection.config.database = dbConfig_.database )resolve( { status:'ok' }) 
				else setTimeout( check_conectionChanged , 1000 , connection, dbConfig_ ) 
			}
	//			resolve( {status:'ok'}) 
			check_conectionChanged( connection, dbConfig_ ) 
		})
	}catch(err){
		result_status.MESSAGEERR1OR ='no matched DB configuration check the DB name !!' 
		result_status.err = err 
		reject( result_status ) 
	}
//	console.log( connection ) 
})}
const sync_db_connection_transaction = async ( dbConfig_ , transaction_list )=>{
	const conn = await new mssql.connect( dbConfig_ ) 
	const transaction = new mssql.Transaction() 
	let transaction_result = {'STATUS': 1 , 'ROWS': []} 
	let result, i 
	try{
		await new Promise( resolve => transaction.begin( resolve )) 
		const request = new mssql.Request( transaction ) 
		for( i = 0 ; i < transaction_list.length ; i++ ){
			result = await request.query( transaction_list[i] ) 
			let result_status = result.recordsets[0][0]
			if( result_status.RESULT == 'error')throw result_status.ERRORMESSAGE
			transaction_result['ROWS'].push( JSON.parse( JSON.stringify( result.recordsets[0][0] )))  
		}
		await transaction.commit() 
	}catch(err){
//		await transaction.rollback() 
		await transaction.rollback(err=>console.log(err)) 
//		console.log('Error:' + err ) 
		transaction_result['STATUS'] = -1 
		transaction_result['RESULT'] = 'error' 
		transaction_result['ERRORMESSAGE'] = err 
		transaction_result['QUERY_INDEX'] = i
		delete transaction_result['ROWS'] 
//		transaction_result['ROWS'].push( JSON.parse( JSON.stringify( result.recordsets[0][0] )))  
	}
	return transaction_result
}
const gcp_ezchemtechDbConnection = async ( cb_f, db_name_ = appConfig_ins.companyInfo.name , transaction_mode = 0 , transaction_list = null  )=>{
// udpate  DB list. 	
	let objDbConfig = refresh_objDbConfig(); 
	switch( transaction_mode ){ 
		case 0: // single async transaction_mode 
					promise_db_connection( objDbConfig[db_name_] ).then(( res_ )=>{
						cb_f( res_ ) 
				// Fri May  6 04:23:02 UTC 2022
					}).catch((err)=>console.log(err)) 
				break;
		case 1: // single sync transaction_mode 
			    return  await promise_db_connection( objDbConfig[db_name_])
				break; 
        case 2: // transaction_mode : multi List. 
				 return  await sync_db_connection_transaction( objDbConfig[db_name_] , transaction_list ) 
			    break;
		default:
	}
}
const allDbConnection = ( cb_f )=>{
	Promise.all([ promise_db_connection( objDbConfig.local_ezChemtech ), promise_db_connection( objDbConfig.ezChemtech )]).then((Data_S)=>{
		cb_f( Data_S ) 
	})
}
const e2 = `exec SP_법인카드승인내역_IU
				@resUsedDate= '20211122',
				@resUsedTime= '140654',
				@resCardNo= '94300306****5957',
				@resMemberStoreName= '교통요금',
				@resUsedAmount= '2000',
				@resPaymentType= '1',
				@resInstallmentMonth= '',
				@resApprovalNo= '42196429',
				@resPaymentDueDate= '',
				@resMemberStoreCorpNo= '2148137726',
				@resMemberStoreType= '기타전문점',
				@resMemberStoreAddr= '서울+중구+을지로+170+B동+(을지로4가,+을지트윈타워)',
				@resMemberStoreTelNo= '0215884000',
				@resAccountCurrency= 'KRW',
				@resHomeForeignType= '1',
				@resCancelYN= '0',
				@resCancelAmount= '',
				@resVAT= '',
				@resCashBack= '',
				@resKRWAmt= '',
				@resMemberStoreNo= '734523881',
				@resFee= '',
				@commStartDate= '20211101',
				@commEndDate= '20211129'`
const e1 = `exec SP_법인카드승인내역_IU
				@resUsedDate= '20211123',
				@resUsedTime= '140654',
				@resCardNo= '94300306****5957',
				@resMemberStoreName= '교통요금',
				@resUsedAmount= '2000',
				@resPaymentType= '1',
				@resInstallmentMonth= '',
				@resApprovalNo= '42196429',
				@resPaymentDueDate= '',
				@resMemberStoreCorpNo= '2148137726',
				@resMemberStoreType= '기타전문점',
				@resMemberStoreAddr= '서울+중구+을지로+170+B동+(을지로4가,+을지트윈타워)',
				@resMemberStoreTelNo= '0215884000',
				@resAccountCurrency= 'KRW',
				@resHomeForeignType= '1',
				@resCancelYN= '0',
				@resCancelAmount= '',
				@resVAT= '',
				@resCashBack= '',
				@resKRWAmt= '',
				@resMemberStoreNo= '734523881',
				@resFee= '',
				@commStartDate= '20211101',
				@commEndDate= '20211129'`

async function connectTest(){
	let pool = await mssql.connect( ezChemtech ) 
	let result1 = await pool.request().query('sp_table_info  tb_법인카드승인내역') 
	await pool.request().query( e1 +';'+ e2 )
//	console.log(result1 )
}
const exec_mssql = ( stmt, callback )=>{
	console.log( stmt, callback )
	connection.request().query( stmt , ( err, res )=>{
		if( err ) callback( err) 
		else callback( res )
		connection.close() 
		console.log(res) 
	})
}
const queryAll_mssql = ( stmt, callback )=>{
	connection.request().query( stmt, (err, res)=>{
		connection.close() 
		if(err) callback( err) 
		else  callback( res ) 
	})
}
module.exports = { exec_mssql , queryAll_mssql , get_mssql_connection_flag , set_mssql_connection_flag , gcp_ezchemtechDbConnection , allDbConnection } 
//connectTest() 

