var express = require('express');
var router = express.Router();
var sequelizeAuto = require('../company')

/* GET home page. */
router.get('/:db_name/init', async function( req, res ){
    let db_name = req.params.db_name 	
    let sequelizeAuto_inst = sequelizeAuto.initSequelizeAuto( db_name, null ) 
    await sequelizeAuto_inst.run((err)=>{ console.log( err.message, err.code )}); 	
    res.json({ status: "OK"}) 
   	
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
