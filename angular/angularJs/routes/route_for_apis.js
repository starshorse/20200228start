var express = require('express');
var router = express.Router();

//------------- mongojs -------------------------------------------------------
var databaseUrl = "guest_book"; // "username:password@example.com/mydb"
var collections = ["GuestBookMsgs"];
/* No mongojs 
var ObjectId = require("mongojs").ObjectId;
var db = require("mongojs").connect(databaseUrl, collections);
*/

var empty_res = [] ;
var init = 1
var auto_increment = function(){
	return ++init
}
//-----------------------------------------------------------------------------

var my_utils = require('./my-common-utils'); //date functions

//-----------------------------------------------------------------------------
router.get('/countAll', function(req, res) {
/*	
    db.GuestBookMsgs.count(function(error,result){
        if(!error) {
            console.log("count :"+result);
            res.json(result);
        }
    });
	*/
	res.json( empty_res )
});

//-----------------------------------------------------------------------------
router.get('/list/:page/:listPerPage', function(req, res) {
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
	*/
	res.json( empty_res ) 

});

//-----------------------------------------------------------------------------
router.get('/view/:msgObjId', function(req, res) {
    console.log('******** view ,req.params.msgObjId:'+req.params.msgObjId); //debug
	let _id = req.params.msgObjId 
/*	
    //update hits
    db.GuestBookMsgs.update( {"_id": ObjectId(req.params.msgObjId)}, {$inc:{hits:1}},
        function(err, one_guest_msg) {
            if (err) {
                console.log('******** update hits ,Error!'+err); //debug
                res.send(err)
            }
        });

    //findOne!!
    db.GuestBookMsgs.findOne( {"_id": ObjectId(req.params.msgObjId)}, function(err, one_guest_msg) {
        if (err) {
            console.log('******** view ,Error!'+err); //debug
            res.send(err)
        }
        res.json(one_guest_msg);
    });
	*/
	let empty_res_1 = empty_res.find((ent)=>ent._id == _id) ;
	empty_res_1['hits']++; 
	res.json( empty_res_1);
});


//-----------------------------------------------------------------------------
router.post('/write', function(req, res) {
    console.log('******** write : '+my_utils.getTimeStamp()); //debug
/*	
    db.GuestBookMsgs.save({
            user  : req.body.user,
            title : req.body.title,
            contents : req.body.contents,
            reg_date : my_utils.getTimeStamp(),
            hits : 0
        },
        function(err, saved) {
            if( err || !saved) {
                console.log("msg not saved");
            } else {
                res.end(); //필요하다.
            }
        });
		*/
	let _id = auto_increment(); 
	empty_res.push({ _id , user : req.body.user , title : req.body.title , contents : req.body.contents , video_url:req.body.video_url , reg_date: my_utils.getTimeStamp() , hits: 0 } )
	res.end();
});

//-----------------------------------------------------------------------------
router.delete('/:msgObjId', function(req, res) {
    console.log('******** delete ,req.params.msgObjId:'+req.params.msgObjId); //debug
/*	
    //findOne!!
    db.GuestBookMsgs.remove( {"_id": ObjectId(req.params.msgObjId)}, function(err, data) {
        if (err) {
            console.log('******** remove ,Error!'+err); //debug
            res.send(err)
        }
        res.end(); //필요하다.
    });
	*/
	let _id =  req.params.msgObjId 
	let _id_index = empty_res.findIndex((ent)=>ent._id == _id )
	empty_res.splice( _id_index, 1 );
	res.end();
});

//-----------------------------------------------------------------------------
router.put('/', function(req, res) {
    console.log('******** update : _id ==>'+req.body._id); //debug
/*
    db.GuestBookMsgs.findOne(
        {"_id": ObjectId(req.body._id)},
        function(err, one_guest_msg) {
            if (err) {
                console.log('******** edit ,Error!'+err); //debug
                res.send(err)
            }

            db.GuestBookMsgs.update(
                {"_id": ObjectId(req.body._id)},
                {
                    user  : req.body.user,
                    title : req.body.title,
                    contents : req.body.contents,
                    reg_date : one_guest_msg.reg_date, //기존값 그대로 !!
                    hits : one_guest_msg.hits //기존값 그대로 !!
                },
                function(err, data) {
                    if (err) {
                        console.log('******** update msg ,Error!'+err); //debug
                        res.send(err)
                    }
                    res.end(); //필요하다.
                });
        });
*/		
	let _id = req.body._id 
	let empty_res_1 = empty_res.find((ent)=>ent._id == _id )
	empty_res_1.user = req.body.user
	empty_res_1.title = req.body.title
	empty_res_1.contents = req.body.contents
	empty_res_1.video_url = req.body.video_url 
	res.end();

});

//-----------------------------------------------------------------------------
module.exports = router;
