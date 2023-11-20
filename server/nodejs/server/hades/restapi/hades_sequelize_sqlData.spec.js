'use strict';

const chai = require('chai') 
const chaiHttp = require('chai-http')
let  should = chai.should() 
//const server = require('../../../app_hades') 
// const server = 'http://ezoffice365.com:8000' 
const server = 'http://localhost:8000' 
require('dotenv').config({ path: __dirname +'/./../../../.env' })

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

let params = null  
let db_name ='ezchemtech' 
let sql_state = `SELECT [EL].[사번], [EL].[성명], [VA].[지급일수], [VU].[전체사용일수], [VU].[차감사용일수],
		   (ISNULL([VU].[전체사용일수],0) - ISNULL([VU].[차감사용일수],0)) AS [미차감사용일수], 
	       (ISNULL([VA].[지급일수],0) - ISNULL([VU].[차감사용일수],0)) AS [잔여일수]
FROM (SELECT distinct [성명], [사번] FROM [TB_임직원명부] WHERE [퇴사일] IS NULL AND [사번] <> '211003') AS [EL]
LEFT JOIN (SELECT [성명], SUM([일수]) AS [지급일수] FROM [TB_휴가일수관리] GROUP BY [성명]) AS [VA]
ON [EL].[성명] = [VA].[성명]
LEFT JOIN (SELECT [성명], SUM(CASE WHEN [종류] = '휴가' THEN 1 WHEN [종류]='반차' THEN 0.5 WHEN [종류]='반반차' THEN 0.25 ELSE 0 END) AS [전체사용일수],
					  SUM(CASE WHEN [종류] = '휴가' THEN 1 WHEN [종류]='반차' THEN 0.5 WHEN [종류]='반반차' THEN 0.25 ELSE 0 END * [휴가일수차감여부]) AS [차감사용일수]
			   FROM [TB_근태관리] GROUP BY [성명]) AS [VU]
ON [EL].[성명] = [VU].[성명]
ORDER BY [EL].[성명];`

chai.use( chaiHttp) 

describe('POST insert Data sequelize API /sequelize/ ', ()=>{
	it(' restapi/data/:db_name/GET_HOOK_SQL should return correct Info' , ( done )=>{
		params = { sql_state } 
		let authentication_token = process.env.JUPITER_TOKEN 
//		console.log( authentication_token ) 
		chai.request( server ) 
		.post(encodeURI(`/restapi/data/${ db_name }/GET_HOOK_SQL`))
//		.set( 'authentication', `Bearer ${ authentication_token }`) 
		.set( 'authentication', `Bearer ${ test_ml_auth.orgAuthSecret } ${ test_ml_auth.machAuthSecret } ${ test_ml_auth.machAuthIdentifier }`) 
		.send( params ) 
		.end( (err, res)=>{
//			res.should.have.status(200) 
			should.exist( res.body )
			console.log( res.body )
			res.body.RESULT.should.equal('success')
			done() 
		})
	})
})
