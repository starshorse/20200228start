var CronJob = require('cron').CronJob
var route = require('express').Router() 
var axios = require('axios') 
require('dotenv').config() 

var flask_server_port = process.env.FLASK_SERVER_PORT 

const create_hours_cron = ( period_hours = 6 )=>{
	let hour_per = parseInt( 24/ period_hours )
    let period_opt = `0 */${ hour_per } * * *`
//   let period_opt = '* * * * * *'
	const cb_job = async ( period_opt )=>{
		   console.log( 'Test 주기(시간) :', period_hours , new Date()) 
		   await axios.get(`http://localhost:${ flask_server_port }/service/전자세금계산서목록`);
		   await axios.get(`http://localhost:${ flask_server_port }/service/계좌거래목록`);
	}
//	cb_job( period_opt ); 
	return new CronJob( period_opt ,()=>{
		cb_job( period_opt ); 
	}, null , true, 'Asia/Seoul')
}

var cron_job = create_hours_cron();

module.exports = ( app )=>{
	route.post('/operation/:service_name' , ( req, res )=>{

	})
	return route;
}
