'use strict'

module.exports = function( app ){
	app.use('/tbl_editor', require('./app/tbl_editor')); 
	app.use('/log_monitor', require('./app/log_monitor')); 

}
