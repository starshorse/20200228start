'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/db_list/:id', controller.get_db_list ) 
router.get('/roles_list/:db_name', controller.get_roles_list ) 
router.get('/tables_list/:db_name', controller.get_tables_list ) 
router.get('/roles_list/:db_name/:id', controller.get_rolesId_list ) 
router.get('/roles_data/:db_name/:role', controller.get_roles_data ) 
router.get('/logins_list', controller.get_logins_list ) 

router.post('/login', controller.add_login ) 
router.post('/login/sql',controller.exe_sql ) 
router.post('/role', controller.add_role ) 
router.post('/role_member', controller.add_role_member ) 
router.post('/roles_data/:id', controller.update_roles_data ) 

module.exports = router; 
