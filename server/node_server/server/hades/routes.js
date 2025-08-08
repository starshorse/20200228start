/**
 * Main application routes
 */

'use strict';

//var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
   app.use('/restapi', require('./restapi'));
   app.use('/api/v0', require('./ezch_sql'));
   app.use('/sequelize', require('./sequelize/route'));
   app.use('/db_administration', require('./db_administration')); 
   app.use('/dba_editor', require('./dba_editor')); 
   app.use('/service_admin', require('./service_admin')); 
   app.use('/app_collection', require('./app_collection')); 
  
   app.route('/*').get(( req , res)=>{
	 res.send('Hello Hades DB API server') 
    })
};
