var express = require('express');
var app = express();

app.use('/', express.static( __dirname +'/public')); 

app.listen(8000);
console.log('now learning serer port 8000');
