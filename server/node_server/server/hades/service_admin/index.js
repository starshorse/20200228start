'use strict';

var express = require('express'); 
var controller = require('./controller');

var router = express.Router();

router.get('/service_serviceList/', controller.get_service_serviceList ) 
router.get('/service_permissionList/', controller.get_service_permissionList ) 
router.get('/service_setting/', controller.get_service_setting )
router.get('/service_setting/:orgName', controller.get_service_setting_org )

router.get('/service_orgList/', controller.get_service_orgList )    // all users over DB 
router.get('/service_orgList/:service_id', controller.get_service_orgList_serviceId )    // all users over DB 
router.get('/service_userList/:orgName', controller.get_service_userList )    // all users over DB 
router.get('/service_machinekeyInfoList/:user_id', controller.get_service_machinekeyInfoList )    // all users over DB 
router.get('/service_machinekeyList/:user_id', controller.get_service_machinekeyList )    // all users over DB 

router.get('/codeFApi_rpaConfig', controller.get_codeFApi_rpaConfig ) 
router.get('/codeFApi_rpaLog', controller.get_codeFApi_rpaLog ) 
router.get('/codeFApi_collectionAccountList/:org_name', controller.get_codeFApi_collection_accountList ) 
router.get('/codeFApi_collectionAccountEnableList/:org_name', controller.get_codeFApi_collection_accountEnableList ) 
router.get('/codeFApi_service/:service_name', controller.get_codeFApi_service ) 

router.post('/service_orgList/:orgName', controller.update_orgService ) 
router.post('/service_userList/:user_id', controller.update_userService ) 
router.post('/service_machinekeyList/:machinekey', controller.update_machinekeyService ) 
router.post('/service_setting/:orgName/:service_id', controller.update_serviceSetting ) 

router.post('/codeFApi_rpaLog', controller.insert_codeFApi_rpaLog ) 
router.post('/codeFApi_rpaLog/:seq', controller.update_codeFApi_rpaLog ) 
router.post('/codeFApi_rpaConfig', controller.merge_codeFApi_rpaConfig ) 
router.post('/codeFApi_collectionAccountList/:org_name', controller.merge_codeFApi_collectionAccount ) 
router.post('/codeFApi_service/:service_name', controller.merge_codeFApi_service ) 

module.exports = router; 
