'use strict';

var express = require('express')
var cookieParser = require('cookieparser') 
var path = require('path')
var config = require('./environment') 

module.exports = function( app, client_tar = 'client' ){
	var env=app.get('env'); 
//1 move to before route. app.use( express.json() )
//	app.use( cookieParser() )
	console.log( config.root ) 
	app.use( express.static( path.join( config.root, client_tar ))); 
}
