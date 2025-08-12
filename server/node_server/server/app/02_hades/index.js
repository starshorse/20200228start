const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser') 
const cors = require('cors')
// require('./database') 

let server_name = process.env.SERVER_NAME 
let server_port = process.env.SERVER_PORT 

const app = express();
/*
app.set('trust proxy', 1);
app.use((req, res, next)=>{
	console.log( req.headers )
	next();
});
app.use( cors( { origin:['http://localhost:8000','http://localhost'] , credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    exposedHeaders: ["set-cookie"]
} ));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
*/
app.use( cors());
app.use( cookieParser()); 
app.use( express.json())
const server_root = require('./root') 
console.log( server_root )
/*
const p1 = require('./router/p1.js')( app )

app.get('/', ( req, res)=>{
	res.send('<h1>Hello</h1>')
})
*/
/*
// app.use('/p1', p1 ); 
app.get(`/${ server_name }`, ( req, res )=>{
	res.send(`<h1>${ server_name }</h1>`);
}) */
app.use('/', server_root )
	
http.createServer(app).listen( server_port, ()=>{  console.log(` server ${ server_name } is working on port: ${ server_port }` )} ) 






