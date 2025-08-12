var	express	=	require('express');
var	app	=	express();
const mysql = require('mysql');
//1
const path = require('path') 
const { writeFileSync , existsSync } = require('fs')
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(
	dbconfig
)
const equations_jdata = path.join( __dirname , '../../../public/Resource/equations_jdata.json' )
const SERVER_PORT = process.env.SERVER_PORT

connection.connect();

connection.query('SHOW TABLES', function( error, rows, fields ){
	if (error) throw error;
	console.log('Tables info is:', rows);
});
// connection.end();
app.use(express.json());
app.get('/EzQuations',function(req, res){
	// connection.connect();
	connection.query('SELECT * FROM quotations', function( error, rows, fields ){
	console.log( rows ); 
	res.send(rows);
	})
//	connection.end();
});
app.post('/EzQuations',function(req, res){
	// connection.connect();
	data ={ company : "TBTECH" , generated_by : "TBTECH" , progress_status : 1 , user : "최종규" }; 
	connection.query('INSERT INTO quotations SET ?', data,  function( error, results ){
	// if(err) throw err;
	console.log( results ); 
	res.send(results );
	})
//	connection.end();
});
app.get('/EzQuations/:id',function(req, res){
	// connection.connect();
	connection.query('SELECT * FROM quotations WHERE idx =' + req.params.id , function( error, rows, fields ){
	console.log( rows ); 
	res.send(rows[0]);
	})
//	connection.end();
});
app.put('/EzQuations/:id',function(req, res){
	// connection.connect();
	var object = JSON.parse(req.body.text);
	const columns = Object.keys(object);
	const values = Object.values(object);
    let sql = "UPDATE quotations SET " + columns.join(" = ? ,") +" = ?";
	connection.query( sql + ' WHERE idx =' + req.params.id  , values , function( error, results, fields ){
	console.log( results ); 
	res.send(results);
	})
//	connection.end();
});
app.delete('/EzQuations/:id',function(req, res){
	connection.query('DELETE FROM quotations WHERE idx =' + req.params.id ,  function( error, results ){
		console.log( results ); 
		res.send(results );
	})
});
console.log(path.join( __dirname,'../../../public')); 
app.use('/', express.static(path.join( __dirname,'../../../public'))); 
app.get('/getajax', function(req, res) {
	connection.query('SELECT * FROM quotations', function( error, rows, fields ){
// SargonI 2020-08-18		
	writeFileSync( equations_jdata , JSON.stringify( rows ), 'utf-8' )
	var responseData = {'result' : 'ok', 'data' : rows  };
	res.json(responseData);
	});
});
app.listen( SERVER_PORT , ()=>{
	console.log(` server is working on port ${ SERVER_PORT }`); 
});
