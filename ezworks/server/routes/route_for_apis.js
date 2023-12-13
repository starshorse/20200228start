var express = require('express');
const axios = require('axios') 
var router = express.Router();
require('dotenv').config() 


const hades_url ='http://192.168.0.80:8000/restapi/data/ezoffice/bullentinBoard'

var empty_res = [] ;
var init = 1
var auto_increment = function(){
	return ++init
}
//-----------------------------------------------------------------------------

var my_utils = require('./my-common-utils'); //date functions

//-----------------------------------------------------------------------------
router.get('/countAll',async function(req, res) {
	let headers = { authentication:`bearer ${ process.env.JUPITER_TOKEN }` }
	let result = await axios({ method:'GET',url:hades_url, headers })
    console.log( result.data )
	return res.json( result.data.ROWS )
});

//-----------------------------------------------------------------------------
router.get('/list/:page/:listPerPage', async function(req, res) {
    console.log('******** list page , req.params.page :'+ req.params.page  ); //debug
    console.log('******** list page , req.params.listPerPage :'+ req.params.listPerPage  ); //debug
/*
    if(req.params.page==1){
        db.GuestBookMsgs.find().sort({_id:-1}).limit( parseInt(req.params.listPerPage)  , function(err, page_msgs) {
            if (err) {
                console.log('******** list page error ************'); //debug
                res.send(err)
            }

            res.json(page_msgs);	
        });
    }else{
        db.GuestBookMsgs.find().sort({_id:-1}).skip((req.params.page-1)*parseInt(req.params.listPerPage)  ).limit(parseInt(req.params.listPerPage)  , function(err, page_msgs) {
            if (err) {
                console.log('******** list page error ************'); //debug
                res.send(err)
            }

            res.json(page_msgs);
        });
    }
	res.json( empty_res ) 
	*/

	let headers = { authentication:`bearer ${ process.env.JUPITER_TOKEN }` }
	let result = await axios({ method:'GET',url:hades_url, headers })
    console.log( result.data )
	return res.json( result.data.ROWS )
});

//-----------------------------------------------------------------------------
router.get('/view/:msgObjId', async function(req, res) {
    console.log('******** view ,req.params.msgObjId:'+req.params.msgObjId); //debug
	let _id = req.params.msgObjId 
	let headers = { authentication:`bearer ${ process.env.JUPITER_TOKEN }` }
	let result = await axios({ method:'GET',url:`${ hades_url }/${ _id }?id_key=seq`, headers })
    console.log( result.data )
	let entry_obj = result.data[0]
	let data = { hits: ++entry_obj['hits'] }
	let result_update = await axios({ method:'POST',url:`${ hades_url }/${ entry_obj['seq'] }`,data, headers })
	return res.json( entry_obj  )

});


//-----------------------------------------------------------------------------
router.post('/write', async function(req, res) {
    console.log('******** write : '+my_utils.getTimeStamp()); //debug
	let data = {  user : req.body.user , title : req.body.title , contents : req.body.contents , video_url:req.body.video_url } 
	let headers = { authentication:`bearer ${ process.env.JUPITER_TOKEN }` }
	let result = await axios({ method:'POST',url:hades_url,data, headers })
    console.log( result.data )
	return res.end();
});

//-----------------------------------------------------------------------------
router.delete('/:msgObjId', async function(req, res) {
    console.log('******** delete ,req.params.msgObjId:'+req.params.msgObjId); //debug
	let headers = { authentication:`bearer ${ process.env.JUPITER_TOKEN }` }
	let result = await axios({ method:'DELETE',url:`${ hades_url }/${ req.params.msgObjId }`, headers })
    console.log( result.data )
	return res.end();
});

//-----------------------------------------------------------------------------
router.put('/', async function(req, res) {
    console.log('******** update : _id ==>'+req.body.seq); //debug
	let data = {  user : req.body.user , title : req.body.title , contents : req.body.contents , video_url:req.body.video_url } 
	let headers = { authentication:`bearer ${ process.env.JUPITER_TOKEN }` }
	let result = await axios({ method:'POST',url:`${ hades_url }/${ req.body.seq }`,data, headers })
    console.log( result.data )
	return res.end();

});

//-----------------------------------------------------------------------------
module.exports = router;
