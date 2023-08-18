var express = require('express');
const path = require('path');
var app = express();

// using body-parser  built-in 
app.use(express.json());

var p1 = express.Router();
p1.get('/',function(req,res){
    res.end('<h1>Sperated router</h1>');
})
app.use('/router', p1);
app.use('/', express.static( path.join(  __dirname +'/public'))); 

// var r1 = require('./router/p1')(app);
require('./router/p1')(app);
// app.use('/p1', r1); 
app.get('/user/:id',function(req,res){
    // res.end('<h1>Hello' + req.params.id + '</h1>');
    console.log(req.params.id); 
    var data = { id: 123 , foo: "bar", something: 123 };
    res.send(data); 
})
app.get('/user',function(req,res){
    // res.end('<h1>Hello' + req.params.id + '</h1>');
    var data = [{ id: 123 , foo: "bar", something: 123 },
                { id: 124 , foo: "boo", something: 124 }
    ];
    res.send(data); 
})
app.post('/user',function(req,res){
    console.log(req.body); 
    res.send("OK");
})

app.listen(8888);
console.log('now running serer port 8888');
