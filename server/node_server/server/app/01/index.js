const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser') 
const cors = require('cors')

let server_name = process.env.SERVER_NAME 
let server_port = process.env.SERVER_PORT 

const app = express();
app.use( cors()) 
app.use( cookieParser()); 
app.use( express.json());
const server_root = require('./root') 
console.log( server_root )
const p1 = require('./router/p1.js')( app )

app.get('/', ( req, res)=>{
	res.send('<h1>Hello</h1>')
})
/*
// app.use('/p1', p1 ); 
app.get(`/${ server_name }`, ( req, res )=>{
	res.send(`<h1>${ server_name }</h1>`);
}) */
app.use(`/${ server_name }`, server_root )
	
http.createServer(app).listen( server_port, ()=>{  console.log(` server ${ server_name } is working on port: ${ server_port }` )} ) 






