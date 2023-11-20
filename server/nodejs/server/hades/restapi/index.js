'use strict';

var express = require('express');
var controller = require('./controller/ddl_restapi')
var admin_controller = require('../admin/controller') 
var router = express.Router();

router.use('/data', require('./data_route')); 

router.get('/:db_name', admin_controller.api_auth,  controller.db_request )
router.get('/:db_name/:tbl_name',admin_controller.api_auth, controller.tbl_request )
router.get('/:db_name/:tbl_name/:id',admin_controller.api_auth, controller.ent_request)
// router.post('/:db_name', controller.db_create)
router.post('/:db_name/:tbl_name',admin_controller.api_auth, controller.tbl_create)
// router.put('/:db_name', controller.db_update)
// router.put('/:db_name/:tbl_name', controller.tbl_update)
router.put('/:db_name/:tbl_name/:id',admin_controller.api_auth, controller.ent_update)
// router.delete('/:db_name', controller.db_destroy)
router.delete('/:db_name/:tbl_name',admin_controller.api_auth, controller.tbl_destroy)
router.delete('/:db_name/:tbl_name/:id',admin_controller.api_auth, controller.ent_destroy)

module.exports = router;
