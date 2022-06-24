/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /:tbl_name                  ->  request
 * POST    /:tbl_name                  ->  create
 * GET     /:tbl_name/:id              ->  request(ent) 
 * PUT     /:tbl_name/:id              ->  update
 * DELETE  /:tbl_name                  ->  destroy 
 * DELETE  /:tbl_name/:id              ->  destroy(ent) 
 */

'use strict';
var _ = require('lodash');

var	express	=	require('express');
var	app	=	express();
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection( //{
	dbconfig
	// host : '35.189.159.xx',
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
})

// Get list of things
exports.all_request = function (req, res) {
  let tbl_name = req.params.tbl_name 
  connection.query(`SELECT * FROM ${tbl_name}`, function( error, rows, fields ){
    // SargonI 2020-08-18		
      let responseData
      if( rows ){
	      responseData = {'STATUS': 1 ,'RESULT' : 'success', 'ROWS' : rows  }
	      return res.json(responseData);
      }else{

	      responseData = {'STATUS': -1 ,'RESULT' : 'error', 'ROWS' : null , 'message': error }
	      return res.json(responseData);
      }
      });
}
exports.ent_request = function (req, res) {
  let tbl_name = req.params.tbl_name 
  let id = req.params.id 
  connection.query(`SELECT * FROM ${tbl_name} WHERE id = ${id}`, function( error, rows, fields ){
    // SargonI 2020-08-18		
      let responseData
      if( rows ){
	      responseData = {'STATUS': 1 ,'RESULT' : 'success', 'ROWS' : rows  }
	      return res.json(responseData);
      }else{

	      responseData = {'STATUS': -1 ,'RESULT' : 'error', 'ROWS' : null , 'message': error }
	      return res.json(responseData);
      }
      });
}

// Create new thing
exports.all_create = function (req, res) {
  // var thing = {
  //   id: db.Things.length + 1,
  //   name: req.body.name || 'Thing',
  //   status: req.body.status || false
  // };
  // db.Things.push(thing);
  // res.json(201, thing);
}

// Update a thing
exports.ent_update = function (req, res) {
  // var thing = db.find('Things', req.params.id);
  // if (!thing) return res.send(404);
  // if (req.body.hasOwnProperty('name')) thing.name = req.body.name;
  // if (req.body.hasOwnProperty('status')) thing.status = req.body.status;
  // res.json(thing);
}

// Delete a thing
exports.ent_destroy = function (req, res) {
  // var id = parseInt(req.params.id, 10);
  // _.remove(db.Things, function (n) {
  //   return n.id === id;
  // });
  // res.send(204);
}
// Delete a thing
exports.all_destroy = function (req, res) {
  // var id = parseInt(req.params.id, 10);
  // _.remove(db.Things, function (n) {
  //   return n.id === id;
  // });
  // res.send(204);
}
