var express = require('express');
var router = express.Router();

var models_ = require('../models')
var sequelizeAuto = require('../company')

/* GET users listing. */
router.get('/', async function(req, res, next) {
//  res.send('respond with a resource');
    let db_name = 'ezchemtech' 
    let models = sequelizeAuto.initModels(db_name); 
    let data = await models['TB_admin_1'].findAll({}) 
    try{	
//    	await models['TB_Log_Collector'].create({ query: 'TB_admin_1.findAll()' , hostname:'Jupitor' })
	let query = 'TB_admin_1.findAll()' ;
	let hostname = 'Jupitor' ;
	let filepath = 'star_horse@naver.com' ; 
	sequelizeAuto.log_collect( db_name, query, hostname, filepath );     
    }catch(err){	    
	 console.log( err ) 
    }
    res.json( data ) 	
});

module.exports = router;
