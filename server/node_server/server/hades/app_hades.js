/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

/*
Thu Jun 23 09:23:10 KST 2022
	const http = require('http') 
	const express = require('express') 
*/	
const sequelize_ = require('./sequelize') 
// const models_ =  sequelize_.initModels('ezchemtech') 
const path = require('path')
const ip = require('ip')

var express = require('express')
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const FileStore = require('session-file-store')(session);
let env_path = path.join( __dirname , '../../../../.env') 
console.log( env_path )
require('dotenv').config({ path: env_path }) 
const app = express() 

const maxAge = 1000*60*60*24   // 24 hours 
const sessionObj = {
	secret: 'ez-office.co.kr',
	resave: true,
	saveUninitialized: true ,
//	store: new memoryStore({ checkPeriod: maxAge } ),
    store: new FileStore({ checkPeriod: maxAge }), 
	cookie:{
		maxAge 
	},
}

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));
app.use( session( sessionObj )); 
/* 
   req.session.cookie.maxAge = maxAge ;
   req.session.hades_access_token ; 
*/

var server = require('http').createServer(app)
require('../config/express')(app)
require('./routes')(app)

server.listen( process.env.SERVER_HADES_PORT, ()=>{
	console.log( `hades now working on ${ ip.address() }  port ${ process.env.SERVER_HADES_PORT }` )
})

exports = module.exports = app 
