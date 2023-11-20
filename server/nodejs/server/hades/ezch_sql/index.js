
'use strict';

var express = require('express');
var controller = require('./controller')
var admin_controller = require('../admin/controller') 
var router = express.Router();

router.post('/RPA_SHOW_COLUMNS', admin_controller.api_auth, controller.rpa_show_columns )
router.post('/RPA_SELECT', admin_controller.api_auth,  controller.rpa_select )
router.post('/RPA_UPDATE_V2', admin_controller.api_auth,  controller.rpa_update_v2 )

module.exports = router;
