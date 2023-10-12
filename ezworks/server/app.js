'use strict';
require('dotenv').config() 
const { createProxyMiddleware } = require('http-proxy-middleware') 

const cors = require('cors')

process.env.NODE_ENV = process.env.NODE_ENV || 'development' ;

var express = require('express');
var config = require('./config/environment');
var app = express(); 
var server = require('http').createServer(app);

app.use( cors() ) 

if( process.env.PROXY_HADES == 'direct' ){
	app.use('/Hades', createProxyMiddleware({
		target: 'http://192.168.0.80:8000',
		changeOrigin: true ,
		pathRewrite:{
			['^/Hades']:''
		}
	}))	
}
if( process.env.PROXY_JUPITER == 'direct' ){
	app.use('/Jupiter', createProxyMiddleware({
		target: 'http://192.168.0.80:3001' ,
		changeOrigin: true ,
		pathRewrite:{
			['^/Jupiter']:''
		}
	}))
}
app.use( express.json() )
require('./routes')(app)
require('./config/express')(app) 

server.listen( config.port, config.ip, function(){
	console.log('Express serer listening on %d,in %s mode', config.port, app.get('env')); 
});

exports = module.exports = app; 
