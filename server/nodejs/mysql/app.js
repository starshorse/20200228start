const mysql = require('mysql');
const path = require('path') 
const dbconfig = require('./connection_configObject.js');
const connection = mysql.createConnection( 
	dbconfig['goorm'] // webQt , localhost , goorm  
)
console.log( dbconfig );
connection.connect();

connection.query('SHOW TABLES', function( error, rows, fields ){
	if (error) throw error;
	console.log('Tables info is:', rows);
});
