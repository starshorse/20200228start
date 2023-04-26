'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/servers_list', controller.get_servers_list ) 
router.get('/servers_list/:opt', controller.get_servers_list_opt ) 
// router.get('/servers_list/:id', controller.get_server ) 
router.get('/apps_list/:server', controller.get_apps_list )
router.get('/apps_list/:server/:opt', controller.get_apps_list_opt )
router.get('/collections_list/:server', controller.get_collections_list ) 
router.get('/collections_list/:server/:opt', controller.get_collections_list_opt ) 
/*
router.get('/organizations_list/', controller.get_organization_list ) 
router.get('/organizations_list/:id', controller.get_organization ) 
router.get('/admin_1s_list/', controller.get_admin_1s )  // hades. 
router.get('/users_list/', controller.get_users )        // hades..    
router.post('/server/', controller.add_server ) 
router.post('/server/:id', controller.update_server ) 
router.post('/admin_1/:server', controller.add_webUser )  // update. 
router.post('/organization/:id', controller.update_organization ) 
*/
router.post('/apps_list/:server/:opt', controller.post_apps_list_opt )
router.post('/collections_list/:server/:opt', controller.post_collections_list_opt ) 
router.post('/servers_list/:opt', controller.post_servers_list_opt ) 
module.exports = router; 
