'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
require('dotenv').config({ path: __dirname +'/./../../../.env' })

const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 

const data_set = 1 

let db_name = 'ezchemtech'
let tbl_name_1 ='qt_scraping_result_price' 
let tbl_name_2 ='qt_scraping_result_product'
let tbl_name 

const { DataTypes } = require('sequelize') 

let params_config

let jwt_data 
switch( data_set ){
	case 1:
		params_config = { arg: { where: { crSeq : [ 647 , 644 ]  }} }
/*		
		params_config = `{ where: 
		{
			    [Op.or]: [
					{ seq: 647 }
				]
			}
		}`
*/		
		tbl_name = tbl_name_1
		break;
	case 2:	
        params_config = `{}`
		tbl_name = tbl_name_2
	   break;
	case 3:
		tbl_name ='Auth_Machine'
        params_config = {
			authOrgSeq: 14 ,
			machSecret :'jiejkjflsjfiejgvefefefgedse',
			machSecretExpiredDateTime : '2022-12-28T00:00:00Z'
		}
       jwt_data = {  company: 'ezchemtech', source:'excel', id:'info7@ezchemtech.com' , type: 'Machine' } 
	   update_seq = 1 	
		break;
	default:
		console.log( 'please select Entry ') 
		break; 
}


chai.use( chaiHttp) 

describe('POST update Data sequelize API /sequelize/ ', ()=>{
	it(' restapi/:db_name/:tbl_name should return correct Info' , async ()=>{
		let authentication_token = process.env.JUPITER_TOKEN 
		switch( data_set ){
			case 1:
			case 2:
				break;
			case 3:
				break;
		    default:
		}
//		console.log( authentication_token ) 
		const res = await chai.request( server ) 
		.post(encodeURI(`/sequelize/data/${ db_name }/${ tbl_name }`))
		.set( 'authentication', `Bearer ${ authentication_token }`) 
		.send( params_config ) 
/*
		.end( (err, res)=>{
//			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
*/  
			should.exist( res.body )
			console.log( res.body )
			res.body.RESULT.should.equal('success')
	})
})
