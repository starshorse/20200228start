// pm2 start index.js 
const Koa = require('koa');
const app = new Koa();


app.use((ctx)=>{
	ctx.body = "<h1>Hello node.js and Koa</h1>"
});

app.listen( 3000, ()=>{ console.log('Server listen to port 3000');
})
