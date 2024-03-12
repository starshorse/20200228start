const route = require('express').Router() 
const DB_Inf = require('../../DB_Inf') 
const app_controller = require('./app_controller') 

route.get('/group_list/:db_name', app_controller.get_groupList ); 
route.get('/info/:db_name/:appName', app_controller.get_appInfo ); 
route.get('/assign/:db_name/:appName', app_controller.get_appAssign ); 

route.post('/assign/:db_name', app_controller.add_assign ); 
route.post('/:db_name/:app_name/:id', app_controller.create_app ); 
route.delete('/assign/:db_name', app_controller.del_assign ); 

module.exports = route; 
