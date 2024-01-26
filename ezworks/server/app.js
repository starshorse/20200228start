'use strict';
require('dotenv').config() 
const { createProxyMiddleware } = require('http-proxy-middleware') 
const cookieParser = require('cookie-parser') 
const session = require('express-session'); 
const flash = require('express-flash'); 
const FileStore = require('session-file-store')(session) 

const cors = require('cors')

process.env.NODE_ENV = process.env.NODE_ENV || 'development' ;

console.log( process.env )

var proxy_hades_address = process.env.HADES_ADDRESS 
var proxy_jupitor_address = process.env.JUPITOR_ADDRESS 


var express = require('express');
var config = require('./config/environment');
var app = express(); 
var server = require('http').createServer(app);

const maxAge = 1000*60*60*24   // 24 hourse 
const sessionObj ={
	secret: 'ez-office.co.kr',
	resave: false, 
	saveUninitialized: true, 
	store: new FileStore({ checkPeriod: maxAge }),
	cookie:{
		maxAge
	},
}

function relayRequestHeaders( proxyReq, req ){
	Object.keys( req.headers).forEach( function(key){
		proxyReq.setHeader( key, req.headers[key]); 
	});
	proxyReq.setHeader('authentication', `bearer ${ process.env.JUPITER_TOKEN }` ); 
}
function replayResponseHeaders( proxyRes, req, res ){
	Object.keys( proxyRes.headers ).forEach( function( key ){
		res.append( key, proxyRes.headers[key]); 
	})
}


if( process.env.PROXY_HADES == 'direct' ){
	app.use('/Hades', createProxyMiddleware({
//		target: 'http://192.168.0.80:8000',
		target: `http://${ proxy_hades_address }`,
		changeOrigin: true ,
		pathRewrite:{
			['^/Hades']:''
		},
		onProxyReq: relayRequestHeaders , 
		onProxyRes: replayResponseHeaders 
	}))	
}
if( process.env.PROXY_JUPITER == 'direct' ){
	app.use('/Jupiter', createProxyMiddleware({
//		target: 'http://192.168.0.80:3001' ,
		target: `http://${ proxy_jupitor_address }` ,
		changeOrigin: true ,
		pathRewrite:{
			['^/Jupiter']:''
		}
	}))
}
app.use( cookieParser())
app.use( express.json({
	limit: "50mb"
}) )
app.use( express.urlencoded({
	limit:"50mb",
	extended: false 
}))
app.use( session( sessionObj )); 
app.use( flash()) 
app.use( cors() ) 
require('./routes')(app)
var client_tar = process.env.CLIENT_TAR
require('./config/express')(app, client_tar ) 

server.listen( config.port, config.ip, function(){
	console.log('Express serer listening on %d,in %s mode', config.port, app.get('env')); 
});

exports = module.exports = app; 
