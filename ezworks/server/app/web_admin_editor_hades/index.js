'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/servers_list/', controller.get_servers_list ) 
router.get('/servers_list/:id', controller.get_server ) 
router.get('/organizations_list/', controller.get_organization_list ) 
router.get('/organizations_list/:id', controller.get_organization ) 
router.get('/admin_1s_list/', controller.get_admin_1s ) 
router.get('/users_list/', controller.get_users ) 

router.post('/server/', controller.add_server ) 
router.post('/server/:id', controller.update_server ) 
router.post('/admin_1/:id', controller.add_webUser )  // update. 
router.post('/organization/:id', controller.update_organization ) 

module.exports = router; 
