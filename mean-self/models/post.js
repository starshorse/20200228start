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
