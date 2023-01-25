'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/:db/user/', controller.index ) 
router.post('/:db/user/', controller.update ) 
router.get('/:db/:tbl_name/', controller.get_tbl )
router.post('/:db/:tbl_name/sql', controller.get_tblSql )

module.exports = router; 
