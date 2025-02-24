/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./nosql_config/mongoDb')
const mongoose = require('mongoose');

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
require('./config/express')(app);
require('./routes')(app);
app.use('/', express.static( __dirname +'/client')); 
var server = require('http').createServer(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// const db_mongoose = require('./nosql_config/mongoDb') 
// Expose app
exports = module.exports = app;
