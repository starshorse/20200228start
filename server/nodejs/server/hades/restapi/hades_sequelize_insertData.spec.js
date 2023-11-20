'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
require('dotenv').config({ path: __dirname +'/./../../../.env' })

// const { DataTypes } = require('sequelize') 
const data_set =  3
let params_config = null  
let db_name ='config' 
let tbl_name ='Auth_Organization'
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
	   break;
	case 3:
		tbl_name ='Auth_Machine'
        params_config = {
			authOrgSeq: 14 ,
			machSecret :'jiejkjflsjfiejgvefefefgedse',
			machSecretExpiredDateTime : '2022-12-28T00:00:00Z'
		}
		break;
	default:
		console.log( 'please select Entry ') 
		break; 
}

const { DataTypes } = require('sequelize') 
chai.use( chaiHttp) 

describe('POST insert Data sequelize API /sequelize/ ', ()=>{
	it(' restapi/:db_name/:tbl_name should return correct Info' , ( done )=>{
		let authentication_token = process.env.JUPITER_TOKEN 
//		console.log( authentication_token ) 
		chai.request( server ) 
		.post(encodeURI(`/restapi/data/${ db_name }/${ tbl_name }`))
		.set( 'authentication', `Bearer ${ authentication_token }`) 
		.send( params_config ) 
		.end( (err, res)=>{
//			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
})
