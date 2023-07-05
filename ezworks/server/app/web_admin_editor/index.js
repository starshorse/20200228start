'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/servers_list', controller.get_servers_list ) 
router.get('/service_limit_list/', controller.get_limit_list ) 
router.get('/service_limit_orglist/', controller.get_limit_orglist ) 

router.get('/servers_list/:opt', controller.get_servers_list_opt ) 
router.get('/apps_list/:server', controller.get_apps_list )
router.get('/apps_list/:server/:opt', controller.get_apps_list_opt )
router.get('/collections_list/:server', controller.get_collections_list ) 
router.get('/permissions_matrix_login/:db/:id', controller.get_permissions_matrix_login ) 
router.get('/permissions_matrix_user/:db/:id', controller.get_permissions_matrix_user ) 
router.get('/collections_list/:server/:opt', controller.get_collections_list_opt ) 
router.post('/apps_list/:server/:opt', controller.post_apps_list_opt )
router.post('/collections_list/:server/:opt', controller.post_collections_list_opt ) 
router.post('/servers_list/:opt', controller.post_servers_list_opt ) 
module.exports = router; 
