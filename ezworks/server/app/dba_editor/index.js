'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/organizations_list/', controller.get_organizations_list ) 
router.get('/organizations_list/:id', controller.get_organization ) 
router.get('/authOrgs_list/:id', controller.get_authOrg ) 
router.get('/:db/', controller.index ) 
router.get('/:db/sql', controller.role_data ) 
router.get('/:db/:tbl_name/:pr_name', controller.pr_config ) 

router.post('/organization/', controller.add_organization ) 
router.post('/authOrg/', controller.add_authOrg ) 
router.post('/organization/:id', controller.update_organization ) 

module.exports = router; 
