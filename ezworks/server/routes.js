'use strict'

require('dotenv').config() 
// const { createProxyMiddleware } = require('http-proxy-middleware') 
//---------------------------------------------------
var routing_for_angluarjs = require('./routes/route_for_angularjs');
var routing_for_apis = require('./routes/route_for_apis');

//---------------------------------------------------

module.exports = function( app ){
	app.use('/tbl_editor', require('./app/tbl_editor')); 
	if( process.env.PROXY_HADES == 'indirect' ){
	        app.use('/Hades/dba_editor', require('./app/dba_editor_hades')); 
		app.use('/Hades/db_administration', require('./app/db_administration_hades')); 
	}	
	else if( process.env.PROXY_HADES == 'local' ){ 
	        app.use('/Hades/dba_editor', require('./app/dba_editor')); 
		app.use('/Hades/db_administration', require('./app/db_administration')); 
	}	
/*	
	else{	
		app.use('/Hades', createProxyMiddleware({
			target: 'http://192.168.0.80:8000',
			changeOrigin: true ,
			pathRewrite:{
				['^/Hades']:''
			}
		}))	
	}
*/	
	if( process.env.PROXY_JUPITER == 'indirect' ){
	}
	else if( process.env.PROXY_JUPITER == 'local' ){
	}
/*	
	else{
               app.use('/Jupiter', createProxyMiddleware({
		       target: 'http://192.168.0.80:3001' ,
		       changeOrigin: true ,
		       pathRewrite:{
			       ['^/Jupiter']:''
		       }
	       }))
	}
*/	
	app.use('/web_admin_editor', require('./app/web_admin_editor')); 
	app.use('/log_monitor', require('./app/log_monitor')); 
	app.use('/mlk_auth', require('./tools/authentication')); 
	app.use('/cron', require('./services/cron')(app));
//1	
	app.use('/apis', routing_for_apis);
	app.use('/', routing_for_angluarjs);
}
