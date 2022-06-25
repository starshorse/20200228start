/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
// app.use('/', express.static( __dirname +'/client')); 

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// 몽구스 연결
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://rrr:ch1whdrb@cluster0.9fnmklj.mongodb.net/?retryWrites=true&w=majority',	  
//'mongodb+srv://devCecy:<password>@devcecy.dprgf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });

// Expose app
exports = module.exports = app;
