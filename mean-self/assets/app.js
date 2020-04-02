var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/social',
        function(){
                    console.log('mongodb    connected')
        })
module.exports = mongoose

var express =   require('express')
var bodyParser  =   require('body-parser')
var Post = require('./models/post')
var app =   express()
    app.use(bodyParser.json())
    app.get('/',	function(req,	res){
        res.sendfile('layouts/posts.html')})
    app.get('/api/posts', function(req,res){
//        res.json([
//                {
//                    username:   'dickeyxxx',
//                    body:   'node   rocks!'
//                }
//        ])
          res.json( Post.find());

    })
//    app.post('/api/posts',	function	(req,	res)	{
//        console.log('post	received!')
//        console.log(req.body.username)
//        console.log(req.body.body)
//        res.send(201)
//    })
    app.post('/api/posts',function(req,res,next){
    var post = new Post({
        username:   req.body.username,
        body:   req.body.body })

        post.save(function	(err,	post)	{
                if	(err)	{	return	next(err)	}
                res.json(201,	post)
            })
        })
    app.listen(3000,function(){
        console.log('Server listening   on',    3000)
    })  

var router = require('express').Router()
router.get('/', function (req, res){
        res.sendfile('layouts/posts.html')
        })
module.exports = router

//var db = require('../db')
//var Post = db.model('Post', {
//    username:{ type: String, required: true },
//    body:{ type: String, required: true },
//    date:{ type: Date,   required: true, default: Date.now    }
//})

var db =[]; 

function Post(inPost){
    this.username= inPost.username;
    this.body= inPost.body;
    this.date= new Date();
    this.save=function(ft_call){
           db.push(this);
           console.log(db);
           ft_call( 0, this ); 

    }
};

Post.find = function(){
        console.log(db)
        return db; 
    }

module.exports = Post

var Post = require('....models/post')
var router = require('express').Router()
router.get('apiposts',function(req,res,next)   {
        Post.find()
        .sort('-date')
        .exec(function(err, posts){
                if(err){ return  next(err)   }
                res.json(posts)
                })
        })
router.post('apiposts',function(req,res,next){
var post    =   new Post({
        username:   req.body.username,
        body:   req.body.body
        })
        post.save(function  (err,   post)   {
            if  (err)   {   return  next(err)   }
            res.json(201,   post)
            })
        })
module.exports  =   router
