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

const data_set = 3 
// const { DataTypes } = require('sequelize') 
let db_name ='config' 
let tbl_name ='Auth_Organization'
const { DataTypes } = require('sequelize') 

let params_config
let update_seq = 13 

let jwt_data 
switch( data_set ){
	case 1:
		params_config = {
					orgSeq: 1 ,
					dbaUid: 'eden.lee@ez-office.co.kr', 
					dbaPwd: 'ezof@',
					defaultDB: 'ezoffice' ,
					orgAuthSecret :'jiejkjflsjfiejgvefefefgedse',
					orgAuthSecretExpiredDateTime : '2022-12-28T00:00:00Z'
				}
       jwt_data = {  company: 'ezoffice', source:'python', id:'eden.lee@ez-office.co.kr' , type: 'Organization' } 
	   update_seq = 14 	
		break;
	case 2:	
        params_config = {
			orgSeq: 2 ,
			dbaUid: 'info7@ezchemtech.com', 
			dbaPwd: 'ezct@',
			defaultDB: 'ezchemtech' ,
			orgAuthSecret :'jiejkjflsjfiejgvefefefgedse',
			orgAuthSecretExpiredDateTime : '2022-12-28T00:00:00Z'
		}
       jwt_data = {  company: 'ezchemtech', source:'excel', id:'info7@ezchemtech.com' , type: 'Organization' } 
	   update_seq = 15 	
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
				params_config.dbaPwd = await bcrypt.hash( params_config_Auth_Organization.dbaPwd , 5 ) 
				params_config.orgAuthSecret = await jwt.sign( jwt_data , process.env.HADES_1_KEY )
				break;
			case 3:
				params_config.machSecret = await jwt.sign( jwt_data , process.env.HADES_1_KEY ) 
				break;
		    default:
		}
//		console.log( authentication_token ) 
		const res = await chai.request( server ) 
		.post(encodeURI(`/restapi/data/${ db_name }/${ tbl_name }/${update_seq}`))
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
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
	})
})
