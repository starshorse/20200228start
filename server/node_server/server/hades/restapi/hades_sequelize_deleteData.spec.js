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

// const { DataTypes } = require('sequelize') 
const db_name ='config' 
const tbl_name ='Auth_Organization'
const { DataTypes } = require('sequelize') 

let delete_seq = 12 

chai.use( chaiHttp) 

describe('POST update Data sequelize API /sequelize/ ', ()=>{
	it(' restapi/:db_name/:tbl_name should return correct Info' , async ( done )=>{
		let authentication_token = process.env.JUPITER_TOKEN 
//		params_config_Auth_Organization.dbaPwd = await bcrypt.hash( params_config_Auth_Organization.dbaPwd , 5 ) 
//		params_config_Auth_Organization.orgAuthSecret = await jwt.sign( jwt_data , process.env.HADES_1_KEY )
//		console.log( authentication_token ) 
		chai.request( server ) 
		.delete(encodeURI(`/restapi/data/${ db_name }/${ tbl_name }/${delete_seq}`))
		.set( 'authentication', `Bearer ${ authentication_token }`) 
		.end( (err, res)=>{
//			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
})
