'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/web_users/', controller.get_web_users )
router.get('/organizations_list/', controller.get_organizations_list ) 
router.get('/organizations_list/:id', controller.get_organization ) 
router.get('/authOrgs_list/:id', controller.get_authOrg ) 
router.get('/authMlks_list/:id', controller.get_authMlk ) 
router.get('/users_list/:id', controller.get_users_list ) 
router.get('/:db/', controller.index ) 
router.get('/:db/sql', controller.role_data ) 
router.get('/:db/:tbl_name/:pr_name', controller.pr_config ) 

router.post('/organization/', controller.add_organization ) 
router.post('/authOrg/', controller.add_authOrg ) 
router.post('/authMlk/', controller.add_authMlk ) 
router.post('/user/', controller.add_user ) 
router.post('/user/assignDB', controller.assign_userDB ) 
router.post('/authOrg/:id', controller.update_authOrg ) 
router.post('/authMlk/:id', controller.update_authMlk ) 
router.post('/organization/:id', controller.update_organization ) 
router.post('/web_userSeq/:db/:id', controller.update_web_userSeq )
router.post('/web_user/:db/:id', controller.update_web_user )

module.exports = router; 
