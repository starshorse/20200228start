/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /maker_company              ->  index
 * POST    /maker_company              ->  create
 * GET     /maker_company/:id          ->  show
 * PUT     /maker_company/:id          ->  update
 * DELETE  /maker_company/:id          ->  destroy
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
});

// var Database = function () {
//   this.Things = [{
//     id: 1,
//     name: 'Thing1',
//     status: false
//   }, {
//     id: 2,
//     name: 'Thing2',
//     status: true
//   }, {
//     id: 3,
//     name: 'Thing3',
//     status: true
//   }];

//   this.find = function (table, id) {
//     if(_.isString(id)) id = parseInt(id, 10);
//     return _.find(this[table], function (n) {
//       return n.id === id
//     });
//   }
// };
// var db = new Database();

// Get list of things
exports.maker_company_index = function (req, res) {
  // res.json(db.Things);
  connection.query('SELECT * FROM maker_company', function( error, rows, fields ){
    // SargonI 2020-08-18		
    //	var responseData = {'result' : 'ok', 'data' : JSON.stringify( curData ) };
      var responseData = {'result' : 'ok', 'data' : rows  };
      res.json(responseData);
      });
};

// Create new thing
exports.maker_company_create = function (req, res) {
  // var thing = {
  //   id: db.Things.length + 1,
  //   name: req.body.name || 'Thing',
  //   status: req.body.status || false
  // };
  // db.Things.push(thing);
  // res.json(201, thing);
};

// Get a things
exports.maker_company_show = function (req, res) {
  // var thing = db.find('Things', req.params.id);
  // if (!thing) return res.send(404);
  // res.json(thing);
};

// Update a thing
exports.maker_company_update = function (req, res) {
  // var thing = db.find('Things', req.params.id);
  // if (!thing) return res.send(404);
  // if (req.body.hasOwnProperty('name')) thing.name = req.body.name;
  // if (req.body.hasOwnProperty('status')) thing.status = req.body.status;
  // res.json(thing);
};

// Delete a thing
exports.maker_company_destroy = function (req, res) {
  // var id = parseInt(req.params.id, 10);
  // _.remove(db.Things, function (n) {
  //   return n.id === id;
  // });
  // res.send(204);
};