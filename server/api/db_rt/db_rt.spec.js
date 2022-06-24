'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
const server = require('../../app') 

chai.use( chaiHttp) 

describe('restAPI test /db_rt/:tbl_name/:id ', ()=>{
	it('all_request(GET) should return correct Info' , ( done )=>{
		let tbl_name = 'maker_company'
		chai.request( server ) 
		.get(`/db_rt/${tbl_name}`)
//		.send( params ) 
		.end( (err, res)=>{
			res.should.have.status(200) 
			should.exist( res.body )
			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
})
