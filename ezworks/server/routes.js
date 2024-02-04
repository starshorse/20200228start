'use strict'

require('dotenv').config() 
var hades_address = process.env.HADES_ADDRESS 
var client_tar = process.env.CLIENT_TAR 
// const { createProxyMiddleware } = require('http-proxy-middleware') 
//---------------------------------------------------
var routing_for_angluarjs = require('./routes/route_for_angularjs');
var routing_for_apis = require('./routes/route_for_apis');

//---------------------------------------------------

module.exports = function( app ){
	app.get('/info', (req ,res )=>{
		res.status(200).json( { hades_address,  client_tar } ) 
	})
	app.use('/admin', require('./admin')); 
	app.use('/tbl_editor', require('./app/tbl_editor')); 
	if( process.env.PROXY_HADES == 'indirect' ){
	        app.use('/Hades/dba_editor', require('./app/dba_editor_hades')); 
		app.use('/Hades/db_administration', require('./app/db_administration_hades')); 
	}	
	else if( process.env.PROXY_HADES == 'local' ){ 
	        app.use('/Hades/dba_editor', require('./app/dba_editor')); 
		app.use('/Hades/db_administration', require('./app/db_administration')); 
	}	
	if( process.env.PROXY_JUPITER == 'indirect' ){
	}
	else if( process.env.PROXY_JUPITER == 'local' ){
	}
	app.use('/web_admin_editor', require('./app/web_admin_editor')); 
	app.use('/log_monitor', require('./app/log_monitor')); 
	app.use('/mlk_auth', require('./tools/authentication')); 
//1 temp	app.use('/cron', require('./services/cron')(app));
//1	
	app.use('/apis', routing_for_apis);
	if( process.env.CLIENT_TAR == 'client'){	
		app.use('/', routing_for_angluarjs);
	}
}
