var	express	=	require('express');
var	app	=	express();
const mysql = require('mysql2');
//1
const path = require('path') 
const { writeFileSync , existsSync } = require('fs')
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection( //{
	dbconfig
	// host : '35.189.159.xx',
	// user : 'User_WebQt',
	// password : 'test!@3582',
	// database : 'ezWebQt'
//}
)
const equations_jdata = path.join( __dirname , '/public/Resource/equations_jdata.json' )

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
//	let sql = "UPDATE tableName SET '" + columns.join("' = ? ,'") +"' = ?";
    let sql = "UPDATE quotations SET " + columns.join(" = ? ,") +" = ?";
	connection.query( sql + ' WHERE idx =' + req.params.id  , values , function( error, results, fields ){
	console.log( results ); 
	res.send(results);
	})
//	connection.end();
});
app.delete('/EzQuations/:id',function(req, res){
	connection.query('DELETE FROM quotations WHERE idx =' + req.params.id ,  function( error, results ){
		// if(err) throw err;
		console.log( results ); 
		res.send(results );
	})
});
app.use('/', express.static( __dirname +'/public')); 
app.get('/getajax', function(req, res) {
	connection.query('SELECT * FROM quotations', function( error, rows, fields ){
// SargonI 2020-08-18		
//	var responseData = {'result' : 'ok', 'data' : JSON.stringify( curData ) };
	writeFileSync( equations_jdata , JSON.stringify( rows ), 'utf-8' )
	var responseData = {'result' : 'ok', 'data' : rows  };
	res.json(responseData);
	});
});
// app.get('/',	function(req,	res)	{
// 		res.send(200,	'Hello	World');
// 		});
app.listen(8888);
