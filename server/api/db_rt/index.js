'use strict';

var express = require('express');
var controller = require('./db_rt.controller');

var router = express.Router();

router.use('/mro_company', require('./mro_company')); 

router.get('/maker_company/', controller.maker_company_index);
router.get('/', controller.maker_company_index);
router.post('/maker_company/', controller.maker_company_create);
router.get('/maker_company/:id', controller.maker_company_show);
router.put('/maker_company/:id', controller.maker_company_update);
router.delete('/maker_company/:id', controller.maker_company_destroy);

module.exports = router;
