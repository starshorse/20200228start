'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development' ;

var express = require('express');
var config = require('./config/environment');
var app = express(); 
var server = require('http').createServer(app);
app.use( express.json() )
require('./routes')(app)
require('./config/express')(app) 

server.listen( config.port, config.ip, function(){
	console.log('Express serer listening on %d,in %s mode', config.port, app.get('env')); 
});

exports = module.exports = app; 
