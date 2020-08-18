module.exports = function(app){
    var express = require('express');
    var router = express.Router();
    router.get('/r1',function(req,res){
               res.end('<h1>r1 router</h1>');
    })
    subR1(router);    
    app.use('/p1', router);
    return router;
};
function subR1(router){
    var r1 = require('express').Router();
    r1.get('/r2',function(req,res){
        res.end('<h1>r2 router</h1>');
    });
    router.use('/p2',r1);
}