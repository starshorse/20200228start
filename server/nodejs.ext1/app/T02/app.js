const http = require('http')
const debug = require('debug') 
const express = require('express')
const cookieParser = require('cookie-parser') 
const cors = require('cors')
const path = require('path')
const ip = require('ip')
require('dotenv').config( { path: '../../.env'})
const debug_custom = debug('custom') 

const app = express()
app.use( cors())
app.use( express.json() )
app.use( express.urlencoded({ exteneded : true }) )
app.use( cookieParser()) 

app.use('/' , require('./route'))
app.use( express.static( path.join( __dirname , 'public'))) 

http.createServer(app).listen( process.env.SERVER_PORT , ()=>{
	debug_custom(`server is working on  ${ ip.address() } port ${ process.env.SERVER_PORT }` )
})





