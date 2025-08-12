'use strict';

var express = require('express'); 
var controller = require('./controller');
var admin_controller = require('../admin/controller') 

var router = express.Router();

router.get('/app_list', admin_controller.session_auth , controller.get_app_list ); 
router.get('/collection_intro_heads', admin_controller.session_auth , controller.get_collection_intro_heads ); 
router.get('/app_list/:app', admin_controller.session_auth , controller.get_app ); 
router.get('/collection/:collection', admin_controller.session_auth , controller.get_collection ); 
router.get('/collection_heads/:collection', admin_controller.session_auth , controller.get_collection_heads ); 
router.get('/collection_apps/:collection', admin_controller.session_auth , controller.get_collection_apps ); 
router.post('/app_list', admin_controller.session_auth , controller.add_app_list ); 

module.exports = router; 
