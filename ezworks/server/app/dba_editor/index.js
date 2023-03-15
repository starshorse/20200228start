'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/:db/', controller.index ) 
router.get('/:db/sql', controller.role_data ) 
router.get('/:db/:tbl_name/:pr_name', controller.pr_config ) 

module.exports = router; 
