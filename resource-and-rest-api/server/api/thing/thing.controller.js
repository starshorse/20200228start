/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Database = function () {
  this.Things = [{
    id: 1,
    name: 'Thing1',
    status: false
  }, {
    id: 2,
    name: 'Thing2',
    status: true
  }, {
    id: 3,
    name: 'Thing3',
    status: true
  }];

  this.find = function (table, id) {
    if(_.isString(id)) id = parseInt(id, 10);
    return _.find(this[table], function (n) {
      return n.id === id
    });
  }
};
var db = new Database();

// Get list of things
exports.index = function (req, res) {
  res.json(db.Things);
};

// Create new thing
exports.create = function (req, res) {
  var thing = {
    id: db.Things.length + 1,
    name: req.body.name || 'Thing',
    status: req.body.status || false
  };
  db.Things.push(thing);
  res.json(201, thing);
};

// Get a things
exports.show = function (req, res) {
  var thing = db.find('Things', req.params.id);
  if (!thing) return res.send(404);
  res.json(thing);
};

// Update a thing
exports.update = function (req, res) {
  var thing = db.find('Things', req.params.id);
  if (!thing) return res.send(404);
  if (req.body.hasOwnProperty('name')) thing.name = req.body.name;
  if (req.body.hasOwnProperty('status')) thing.status = req.body.status;
  res.json(thing);
};

// Delete a thing
exports.destroy = function (req, res) {
  var id = parseInt(req.params.id, 10);
  _.remove(db.Things, function (n) {
    return n.id === id;
  });
  res.send(204);
};