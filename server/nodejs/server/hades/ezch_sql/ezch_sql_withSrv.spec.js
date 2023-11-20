'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
chai.use( chaiHttp) 

describe('POST request ezch_sql API /ezch_sql/ ', ()=>{
    let ver = 'v0' 

	it(' RPA_SHOW_COLUMNS should return correct Info' , ( done )=>{
		let params = {
			auth_info : 
			'U2FsdGVkX19bqVQuKM9TjdrLr/B4iR3LUl7z6ocZec1/p3O8Zbm2PKbfQ0GhrrMDrtbz/iQ802cpKLt87j3nsA==',
			query: 'TB_심규정',
			"hostname": "PCNAME", 
			"filepath": "C:/OneDrive/EZworkKJ/Neo_MSSQL/테이블편집기.xlsm"
		}
		chai.request( server ) 
		.post(encodeURI(`/api/${ver}/RPA_SHOW_COLUMNS`))
		.send( params ) 
		.end( (err, res)=>{
			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
	it(' RPA_SELECT should return correct Info' , ( done )=>{
		let params = {
			auth_info : 
            'U2FsdGVkX19bqVQuKM9TjdrLr/B4iR3LUl7z6ocZec1/p3O8Zbm2PKbfQ0GhrrMDrtbz/iQ802cpKLt87j3nsA==',
//			query: 'SELECT TOP 1 * FROM TB_심규정',
			"query":"SELECT TOP 1 [seq], [RegDate], [UpdateDate], [_nvarchar], [_nchar], [_datetime], [_date], [_time], [_decimal], [_int], [_bigint], [_float], [_money] FROM TB_심규정 WHERE _nvarchar = '가나다' ORDER BY seq ;",
			"hostname": "PCNAME", 
			"filepath": "C:/OneDrive/EZworkKJ/Neo_MSSQL/테이블편집기.xlsm"
		}
		chai.request( server ) 
		.post(encodeURI(`/api/${ver}/RPA_SELECT`))
		.send( params ) 
		.end( (err, res)=>{
			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
	it(' RPA_UPDATE_V2 should return correct out with correct input' , ( done )=>{
		let params = {
			auth_info :
			'U2FsdGVkX19bqVQuKM9TjdrLr/B4iR3LUl7z6ocZec1/p3O8Zbm2PKbfQ0GhrrMDrtbz/iQ802cpKLt87j3nsA==',
			queryList:[
				{ 	
					rownum: 11,
					query : "UPDATE TB_심규정 SET _nvarchar = 'test4' , UPDATEDATE = DBO.GETDATE() WHERE [seq] = '61' ;"  
				},
				{ 	
					rownum: 12,
					query : "UPDATE TB_심규정 SET _nvarchar = \"test3\" , UPDATEDATE = DBO.GETDATE() WHERE [seq] = 62 ;"  
				},
				{ 	
					rownum: 13,
					query : "INSERT INTO TB_심규정 (_nvarchar) VALUES (\"test5\");"  
				},
			],
			"hostname": "PCNAME", 
			"filepath": "C:/OneDrive/EZworkKJ/Neo_MSSQL/테이블편집기.xlsm"
		}
		chai.request( server ) 
		.post(encodeURI(`/api/${ver}/RPA_UPDATE_V2`))
		.send( params ) 
		.end( (err, res)=>{
			res.should.have.status(200) 
			should.exist( res.body )
//			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
	it(' RPA_UPDATE_V2 should return error out with incorrect input' , ( done )=>{
		let params = {
			auth_info :
			'U2FsdGVkX19bqVQuKM9TjdrLr/B4iR3LUl7z6ocZec1/p3O8Zbm2PKbfQ0GhrrMDrtbz/iQ802cpKLt87j3nsA==',
			queryList:[
				{ 	
					rownum: 11,
					query : "UPDATE TB_심규정1 SET _nvarchar = \"test4\" , UPDATEDATE = DBO.GETDATE() WHERE [seq] = 61 ;"  
				},
				{ 	
					rownum: 12,
					query : "UPDATE TB_심규정 SET _nvarchar = \"test3\" , UPDATEDATE = DBO.GETDATE() WHERE [seq] = 62 ;"  
				},
				{   rownum: 12,
					query:"UPDATE TB_심규정 SET [_decimal] = 'aaa' , UPDATEDATE = DBO.GETDATE() WHERE [seq] = '101';"
				},
				{ 	
					rownum: 13,
					query : "INSERT INTO TB_심규정 (_nvarchar2) VALUES (\"test5\");"  
				},

			],
			"hostname": "PCNAME", 
			"filepath": "C:/OneDrive/EZworkKJ/Neo_MSSQL/테이블편집기.xlsm"
		}
		chai.request( server ) 
		.post(encodeURI(`/api/${ver}/RPA_UPDATE_V2`))
		.send( params ) 
		.end( (err, res)=>{
			res.should.have.status(200) 
			should.exist( res.body )
			console.log( res.body )
			res.body.RESULT.should.equal('error')
			done() 
		})
	})
})
