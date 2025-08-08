'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/web_users/', controller.get_web_users )    // all users over DB 
router.get('/web_users/:db', controller.get_web_users_db )  // get DB TB_admin_1 
router.get('/web_user/:db/:id' , controller.get_web_user_db ) 
router.get('/web_login_matrix/', controller.get_web_login_matrix )
router.get('/organizations_list/', controller.get_organizations_list ) 
router.get('/organizations_list/:id', controller.get_organization ) 
router.get('/authOrgs_list/:id', controller.get_authOrg ) 
router.get('/authMlks_list/:id', controller.get_authMlk ) 
router.get('/user/:id', controller.get_user ) 
router.get('/users_list/:id', controller.get_users_list ) // get users_id list per organization ID  
router.get('/users_list_mlkCount/:id', controller.get_users_list_mlkCount ) // get users_id list per organization ID with mlkCount. 
router.get('/db_login_web/:db/:id', controller.get_db_login_web )
router.get('/:db/', controller.index ) 
router.get('/:db/sql', controller.role_data ) 
router.get('/:db/:tbl_name/:pr_name', controller.pr_config ) 

router.post('/organization/', controller.add_organization ) 
router.post('/database/:db', controller.add_database ) 
router.post('/init_database/:db', controller.init_database ) 
router.post('/authOrg/', controller.add_authOrg ) 
router.post('/authMlk/', controller.add_authMlk ) 
router.post('/user/', controller.add_user ) 
//router.post('/web_users/', controller.add_web_user )
router.post('/user/assignDB', controller.assign_userDB ) 
router.post('/authOrg/:id', controller.update_authOrg ) 
router.post('/authMlk/:id', controller.update_authMlk ) 
router.post('/organization/:id', controller.update_organization ) 
router.post('/web_userSeq/:db/:id', controller.update_web_userSeq )
router.post('/web_user/:db/', controller.insert_web_user )
router.post('/web_user/:db/:id', controller.update_web_user )

module.exports = router; 
