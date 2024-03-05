const route = require('express').Router() 
const DB_Inf = require('../../DB_Inf') 
const collection_controller = require('./collection_controller') 

route.get('/info/:db_name/:collectionName', collection_controller.get_collectionInfo ); 
route.get('/assign/:db_name/:collectionName', collection_controller.get_collectionAssign ); 
route.get('/app_assign/:db_name/:collectionName', collection_controller.get_appAssign ); 
/*
route.get('/app_assign/:db_name/:collectionName', collection_controller.get_appAssign ); 
*/
route.post('/:db_name/:collectionName/:id',  collection_controller.create ); 
route.post('/assign/:db_name/:collectionName', collection_controller.update_collectionAssign ); 
route.post('/app_assign/:db_name/:collectionName', collection_controller.update_appAssign ); 
/*
route.delete('/assign/:db_name', collection_controller.del_assign ); 
route.delete('/app_assign/:db_name', collection_controller.del_appAssign ); 
*/
module.exports = route; 
