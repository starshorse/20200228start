const http = require('http')
const express = require('express')
const formidable = require('formidable') 
const util = require('util') 
const fs = require('fs')
const path = require('path') 

var app = express();

app.use( express.json()) 
app.post('/upload', (req, res)=>{
//	let form = new formidable.incomingForm();
	const form = formidable({ multiples: true });
	
	form.encoding = 'utf-8'
	form.keepExtensions = true 
	form.uploadDir = path.join( __dirname , '/upload' )
	form.on('file', function( field, file ){
		fs.rename( file.filepath, form.uploadDir+ '/' + file.originalFilename, ()=>{ `Succesfully renamed to ${ form.uploadDir + "/" + file.originalFilename }` })
	})
	form.parse( req, (err, fields, files )=>{
		res.writeHead( 200, {'content-type':'text/plain'})
		res.write('recevied upload:\n\n');
		res.end( util.inspect({ fields , files }));  
	})
})
app.get('/', (req, res)=>{
	res.writeHead( 200, {'content-type':'text/html'}) 
	res.end(
		`<form action='/upload' enctype='multipart/form-data' method='post' >
		 <input type='text' name='title'><br>
		 <input type='file' name='upload' multiple='multiple'><br>
		 <input type='submit' value='Upload'>
		 </form>
		`
	)
})
http.createServer(app).listen(8888)


