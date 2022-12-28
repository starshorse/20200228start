var express = require('express');
var router = express.Router();

var models = require('../models')

/* GET users listing. */
router.get('/', async function(req, res, next) {
//  res.send('respond with a resource');
    let data = await models['TB_admin_1'].findAll({}) 
    try{	
    	await models['TB_Log_Collector'].create({ query: 'TB_admin_1.findAll()' , hostname:'Jupitor' })
    }catch(err){	    
	 console.log( err ) 
    }
    res.json( data ) 	
});

module.exports = router;
