'use strict'

module.exports = function( app ){
	app.use('/tbl_editor', require('./app/tbl_editor')); 
	app.use('/dba_editor', require('./app/dba_editor')); 
	app.use('/db_administration', require('./app/db_administration')); 
	app.use('/log_monitor', require('./app/log_monitor')); 
	app.use('/mlk_auth', require('./tools/authentication')); 


}
