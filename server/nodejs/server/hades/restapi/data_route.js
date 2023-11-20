'use strict';

var express = require('express');
var router = express.Router();
const controller_get_restapi = require('./controller/get_restapi') 
const controller_post_restapi = require('./controller/post_restapi') 
const admin_controller = require('../admin/controller') 

router.post('/:db_name/GET_HOOK_SQL',admin_controller.api_auth , controller_post_restapi.data_dbName_GET_HOOK_SQL )
router.get('/:db_name/:tbl_name',  admin_controller.api_auth , controller_get_restapi.data_dbName_tblName )
router.get('/:db_name/:tbl_name/:id',admin_controller.api_auth , controller_get_restapi.data_dbName_tblName_id )

router.post('/:db_name/GET_HOOK_SQL',admin_controller.api_auth , controller_post_restapi.data_dbName_GET_HOOK_SQL )
router.post('/:db_name/:tbl_name',admin_controller.api_auth , controller_post_restapi.data_dbName_tblName ) 
router.post('/:db_name/:tbl_name/TR',admin_controller.api_auth , controller_post_restapi.data_dbName_tblName_tr ) 
router.post('/:db_name/:tbl_name/GET_HOOK_SQL',admin_controller.api_auth , controller_post_restapi.data_dbName_tblName_GET_HOOK_SQL )
router.post('/:db_name/:tbl_name/:id',admin_controller.api_auth , controller_post_restapi.data_dbName_tblName_id ) 
// router.put('/:db_name/:tbl_name/:id',admin_controller.api_auth , controller_post_restapi.data_dbName_tblName_id ) 
router.delete('/:db_name/:tbl_name/:id',admin_controller.api_auth , controller_post_restapi.data_dbName_tblName_id_delete ) 

module.exports = router 
