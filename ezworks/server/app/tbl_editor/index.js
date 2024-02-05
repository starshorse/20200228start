'use strict';

// url_base : /tbl_editor

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

// router.get('/:tbl_name/', controller.get_tbl_schema ) 
// router.get('/:db/tbl_list/', controller.get_tbl_list )
// router.get('/:db/user/', controller.index ) 
// router.get('/:db/user_config/', controller.get_user_config ) 
router.get('/:db/user_config/', controller.get_config ) // local GET user_config  
router.get('/user_config_tree/', controller.get_config_tree ) // local GET user_config  
// router.get('/:db/:tbl_name/', controller.get_tbl )
// router.post('/:db/user/', controller.update ) 
// router.post('/:db/user_config/', controller.update_user_config ) 
router.post('/:db/user_config/', controller.update_config ) // local PUT user_config 
router.post('/user_config_tree/', controller.update_config_tree ) // local PUT user_config 
// router.post('/:tbl_name/', controller.insert_tbl ) 
// router.post('/:tbl_name/tr/', controller.insert_tbl_tr ) 
// router.post('/:tbl_name/:seq/', controller.update_tbl ) 
// router.post('/:db/:tbl_name/sql', controller.get_tblSql )

module.exports = router; 
