'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/logins_list', controller.get_logins_list ) 
router.get('/roles_list', controller.get_roles_list ) 
router.get('/roles_data', controller.get_roles_data ) 

router.post('/login', controller.add_login ) 
router.post('/role', controller.add_role ) 

router.post('/roles_data/:id', controller.update_roles_data ) 

module.exports = router; 
