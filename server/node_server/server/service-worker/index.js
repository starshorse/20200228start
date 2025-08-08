const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const SERVER_PORT = process.env.SERVER_PORT 

const app = express();

app.use( cors())
app.use( cookieParser()) 
app.use( express.json()) 
app.use( express.static( path.join( __dirname , '../../public' ))) 

app.get('/', ( req, res)=>{
	res.send('<h3>Hello World</h3>'); 
})

const server = http.createServer(app);
server.listen( SERVER_PORT , ()=> console.log(`Service-Server working on ${ SERVER_PORT }`))  

