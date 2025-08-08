'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
require('dotenv').config({ path: __dirname +'/./../../../.env' })

// const { DataTypes } = require('sequelize') 
const db_name ='ezoffice_test' 
const tbl_name ='User'
const { DataTypes } = require('sequelize') 

chai.use( chaiHttp) 

describe('POST creat TABLE sequelize API /sequelize/ ', ()=>{
	it(' restapi/:db_name/:tbl_name should return correct Info' , ( done )=>{
		let params = {
			tbl_schema:  `{ 
				seq: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true  }, 
				name: { type: DataTypes.STRING(30), allowNull: true   }, 
				email: { type: DataTypes.STRING(30), allowNull: false }, 
				level: { type: DataTypes.INTEGER, allowNull: true }, 
			}` 
			,
			tbl_schema_extra:`{ tableName:'TB_${ tbl_name }' }`
		}
		let authentication_token = process.env.JUPITER_TOKEN 
//		console.log( authentication_token ) 
		chai.request( server ) 
		.post(encodeURI(`/restapi/${ db_name }/${ tbl_name }`))
		.set( 'authentication', `Bearer ${ authentication_token }`) 
		.send( params ) 
		.end( (err, res)=>{
//			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
})
