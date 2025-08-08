'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
chai.use( chaiHttp) 

let ezchemtech_test_ml_auth = {
orgAuthSecret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpjaGVtdGVjaCIsInNvdXJjZSI6ImV4Y2VsIiwiaWQiOiJpbmZvN0BlemNoZW10ZWNoLmNvbSIsInR5cGUiOiJPcmdhbml6YXRpb24iLCJpYXQiOjE2NTg0NTc1Nzl9.FtnGe4EstWvqbPtG02lem_KtXIHuSkYqHqe4HFlxq2o',   
machAuthSecret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpjaGVtdGVjaCIsInNvdXJjZSI6ImV4Y2VsIiwiaWQiOiJpbmZvN0BlemNoZW10ZWNoLmNvbSIsInR5cGUiOiJNYWNoaW5lIiwiaWF0IjoxNjU4NDY3MTQ2fQ.njbtuaXa_lC6EvQfnhfs1yTunMgY3D1cilEi8L3x8AM',        
machAuthIdentifier: '8f8e1ee3751dece96bd6f2d71a4e80f40b65d83bf7c85dce0bafdf280fa0e920e3651dc700fdf8bc6a296325dffe9e24ee52a323d26dc6ca3f3c8860fda9d3ab'
 }
let ezoffice_test_ml_auth = {
orgAuthSecret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJweXRob24iLCJpZCI6ImVkZW4ubGVlQGV6LW9mZmljZS5jby5rciIsInR5cGUiOiJPcmdhbml6YXRpb24iLCJpYXQiOjE2NTg0NTcwMTF9.vly8lKU-gNUno1yq5eVQluw1um2No2UrWhbzJC6TIV8',   
machAuthSecret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiZXpvZmZpY2UiLCJzb3VyY2UiOiJqdXBpdGVyIiwibGV2ZWwiOiJtYXN0ZXIiLCJtYWNoaW5lIjoxLCJpYXQiOjE2NjMwNTIwMjV9.VidQPuDMUv4Dy0e4dV7zQPswk9vH4h4HY15qO0BX9LE',        
machAuthIdentifier: 'Test_key'
 }

let test_ml_auth = ezoffice_test_ml_auth
test_ml_auth = ezchemtech_test_ml_auth 

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
		.set( 'authentication', `Bearer ${ test_ml_auth.orgAuthSecret } ${ test_ml_auth.machAuthSecret } ${ test_ml_auth.machAuthIdentifier }`) 
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
		.set( 'authentication', `Bearer ${ test_ml_auth.orgAuthSecret } ${ test_ml_auth.machAuthSecret } ${ test_ml_auth.machAuthIdentifier }`) 
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
		.set( 'authentication', `Bearer ${ test_ml_auth.orgAuthSecret } ${ test_ml_auth.machAuthSecret } ${ test_ml_auth.machAuthIdentifier }`) 
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
					query : "UPDATE TB_심규정 SET _nvarchar = \"test4\" , UPDATEDATE = DBO.GETDATE() WHERE [seq] = 61 ;"  
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
		.set( 'authentication', `Bearer ${ test_ml_auth.orgAuthSecret } ${ test_ml_auth.machAuthSecret } ${ test_ml_auth.machAuthIdentifier }`) 
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
