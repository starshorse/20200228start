'use strict'

module.exports = function( app ){
	app.use('/tbl_editor', require('./app/tbl_editor')); 
}
