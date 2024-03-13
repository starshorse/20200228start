'use strict';

// url_base : /tbl_editor

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/:db/user_config/', controller.get_config ) // local GET user_config  
router.get('/user_config_tree/', controller.get_config_tree ) // local GET user_config  
router.get('/user_config_cluster/:db_name/:id', controller.get_config_cluster ) // local GET user_config_cluster  
router.get('/flash_config_name/', controller.get_configFlash )  
router.post('/:db/user_config/', controller.update_config ) // local PUT user_config 
router.post('/user_config_tree/', controller.update_config_tree ) // local PUT user_config 
router.post('/flash_config_name/', controller.set_configFlash )  

module.exports = router; 
