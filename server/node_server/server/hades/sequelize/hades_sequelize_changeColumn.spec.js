'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
// const { DataTypes } = require('sequelize') 
const db_name ='ezoffice_test' 
const tbl_name ='User'
const column_name_1 = 'email' 
const column_name_2 = 'level' 

const { DataTypes } = require('sequelize') 

chai.use( chaiHttp) 

describe('PUT change Column  sequelize API /sequelize/ ', ()=>{
	it(' restapi/:db_name/:tbl_name/[level] should return correct Info' , ( done )=>{
		let params = {
			column_name : column_name_2 ,
			column_schema:  `{ type: DataTypes.FLOAT , allowNull: false }` ,
			column_schema_extra:`{}`
		}
		chai.request( server ) 
		.put(encodeURI(`/restapi/${ db_name }/${ tbl_name }/changeColumn`))
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
