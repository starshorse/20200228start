'use strict';

var express = require('express');
var controller = require('./db_rt.controller');

var router = express.Router();

router.use('/mro_company', require('./mro_company')); 

router.get('/:tbl_name', controller.all_request );
// router.get('/', controller.maker_company_index);
router.post('/:tbl_name', controller.all_create );
router.get('/:tbl_name/:id', controller.ent_request );
router.put('/:tbl_name/:id', controller.ent_update);
router.delete('/:tbl_name', controller.all_destroy);
router.delete('/:tbl_name/:id', controller.ent_destroy);

module.exports = router;
