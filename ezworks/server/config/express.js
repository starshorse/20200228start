'use strict';

var express = require('express')
var cookieParser = require('cookieparser') 
var path = require('path')
var config = require('./environment') 

module.exports = function( app ){
	var env=app.get('env'); 
	app.use( express.json() )
//	app.use( cookieParser() )
	console.log( config.root ) 
	app.use( express.static( path.join( config.root, 'client'))); 
}