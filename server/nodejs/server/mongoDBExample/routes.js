/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
 // app.use('/api/things', require('./api/thing'));
  app.use('/ezwqs', require('./api/Ezwqs'));
  app.use('/db_rt', require('./api/db_rt'));
  app.use('/nosql', require('./api/nosql'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
