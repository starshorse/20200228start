'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/:db/user/', controller.index ) 
router.post('/:db/user/', controller.update ) 

module.exports = router; 
