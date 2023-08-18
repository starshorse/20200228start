const http = require('http')
const express = require('express') 
const session = require('express-session'); 
const memoryStore = require('memorystore')(session);
const cors = require('cors')

const app = express(); 

app.use(cors()) 
const maxAge = 1000*60*5 

const sessionObj = {
	secret: 'ez-office.co.kr',
	resave: false,
	saveUninitialized: true,
    store: new memoryStore({ checkPeriod: maxAge }),
	cookie:{
		maxAge
	},
}

app.use(session( sessionObj ))

var server = http.createServer(app) 
server.listen( 5010 , ()=>{
	console.log( ' server working on port 5010 ' )
})
	
