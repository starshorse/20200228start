const http = require('http')
const express = require('express')
const formidable = require('formidable') 
const util = require('util') 
const fs = require('fs')
const path = require('path') 
const upload_dir = path.join( __dirname , '/public/upload') 
const module_dir = path.join( __dirname , '/public/module_file') 

var app = express();

app.use( express.json()) 
app.use( express.static( path.join( __dirname , '/public'))) 

app.post('/upload', (req, res)=>{
//	let form = new formidable.incomingForm();
	const form = formidable({ multiples: true });
	
	form.encoding = 'utf-8'
	form.keepExtensions = true 
	form.uploadDir = path.join( __dirname , '/public/upload' )
	form.on('file', function( field, file ){
		fs.rename( file.filepath, form.uploadDir+ '/' + file.originalFilename, ()=>{ `Succesfully renamed to ${ form.uploadDir + "/" + file.originalFilename }` })
	})
	form.parse( req, (err, fields, files )=>{
		res.writeHead( 200, {'content-type':'text/plain'})
		res.write('recevied upload:\n\n');
		res.end( util.inspect({ fields , files }));  
	})
})
app.post('/upload/:fileName', ( req, res)=>{
	let result ={ STATUS: -1 , RESULT:"failure" , ERRORMESSAGE:"" , DATA: null } 
	let fileName = req.params.fileName 
	let data = req.body 
	try{
        	fs.writeFileSync( upload_dir + '/' + fileName +'.json' , JSON.stringify( data ), 'utf-8' ) 
		let dir = module_dir+'/' + fileName
		if( !fs.existsSync( dir )){
			fs.mkdirSync(dir) 
		}	
		result.STATUS = 0 
		result.RESULT ="success" 
	}	
	catch(err){
		result.ERRORMESSAGE = err.message 
	}		
	res.json( result ) 
})
/*
app.get('/upload', (req, res)=>{
	res.writeHead( 200, {'content-type':'text/html'}) 
	res.end(
		`<html> 
		 <head><meta charset='utf-8'></head> 
		 <body>
		  <button><a href='/'>Editor PAGE</a></button> 
		 <form action='/upload' enctype='multipart/form-data' method='post' >
		 <input type='text' name='title'><br>
		 <input type='file' name='upload' multiple='multiple'><br>
		 <input type='submit' value='Upload'>
		 </form>
		 </body>
		 </html>
		`
	)
})
*/
app.get('/file_list', ( req, res)=>{
	let file_list  =  fs.readdirSync( upload_dir ) 
	res.json( file_list )	
})
app.get('/file_data', ( req, res )=>{
	let result ={ STATUS: -1 , RESULT: 'failure' , MESSAGE:'' ,DATA:null } 
	let file_name = decodeURIComponent( req.query.file_name )
	let data =  fs.readFileSync( upload_dir +'/' + file_name , 'utf-8')
	if( data ){
		result.STATUS = 0 , result.RESULT = 'success' , result.DATA = data 
		return res.json( result ) 
	}
	res.json( result )
})
http.createServer(app).listen(8888)


