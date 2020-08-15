var	express	=	require('express');
var	app	=	express();
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection( //{
	dbconfig
	// host : '35.189.159.65',
	// user : 'User_WebQt',
	// password : 'test!@3582',
	// database : 'ezWebQt'
//}
)

connection.connect();

connection.query('SHOW TABLES', function( error, rows, fields ){
	if (error) throw error;
	console.log('Tables info is:', rows);
	// for(  row in rows ){
	// 	connection.query('SELECT * FROM ' + rows[row]['Tables_in_ezWebQt'], function( error, rows, fields ){
	// 		console.log( rows ); 
	// 	});
	//}	
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
app.get('/EzQuations/:id',function(req, res){
	// connection.connect();
	connection.query('SELECT * FROM quotations WHERE idx =' + req.params.id , function( error, rows, fields ){
	console.log( rows ); 
	res.send(rows);
	})
//	connection.end();
});
app.get('/',	function(req,	res)	{
		res.send(200,	'Hello	World');
		});
app.listen(8888);
