'use strict';

var express = require('express');
var controller = require('./controller')
var query_controller = require('./controller/query')
var admin_controller = require('../admin/controller')
var router = express.Router();

router.get('/:db_name', admin_controller.api_auth, controller.get_all_tables )
router.get('/:db_name/:tbl_name', admin_controller.api_auth,  controller.get_all_columns )
router.get('/:db_name/:tbl_name/:column_name', admin_controller.api_auth,  controller.get_column )
router.post('/data/:db_name/:tbl_name', admin_controller.api_auth,  query_controller.query_findAll )

module.exports = router;
