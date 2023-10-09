// const http = require('http')
const express = require('express')
const cors = require('cors') 
const path = require('path') 
// const debug = require('debug')
var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';


var debug_express = require('debug')('express')

require('dotenv').config({ path: '../../.env' }) 

debug('booting %o', name);

const app = express();
const httpServerLog = debug('http:Server');

app.use( express.json() )
app.use( cors() ) 

/*
app.get('/', ( req, res)=>{
	debug(req.method + ' ' + req.url);
	res.send('<h1>Hello debug</h1>')
	res.end()
})
*/
app.use( express.static( path.join( __dirname , 'public' ))) 

http.createServer( app ).listen( process.env.SERVER_PORT , 
	()=>{ 
		console.log(`server is working on port ${ process.env.SERVER_PORT } `) 
//		httpServerLog('listening'); 
		debug('hello debug');
	}) 
// test 


