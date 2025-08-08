const route = require('express').Router() 
const server_name = process.env.SERVER_NAME 

route.get('/',function( req, res ){
	console.log("root")
	res.send(`<h1>${ server_name } working</h1>`);
//		res.end();
})
route.get('/ids_list', function( req, res){
	let result = { STATUS: 0 , RESULT:'success' , ERRORMESSAGE:'' , DATA: null }; 
	let user_DB = req.cookies.user_DB 
	if( user_DB == undefined ){
		result.STATUS = -1 , result.ERRORMESSAGE ='no user DB defined' ;
		return res.json( result ) 
	}
	return res.json( result ) 
})
module.exports =  route; 
