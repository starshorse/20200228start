const route = require('express').Router() 
const server_name = process.env.SERVER_NAME 

route.get('/',function( req, res ){
	console.log("root")
	res.send(`<h1>${ server_name } working</h1>`);
//		res.end();
})

module.exports =  route; 
