const route = require('express').Router() 
const controller = require('./controller')

route.use(( req, res, next)=>{
	 console.log('test')
	 next();
})
route.get('/test', ( req, res)=>{
	res.send('<h1>Hello Test! </h1>')
})
route.get('/list', controller.list );
route.get('/list/:id', controller.entry );
route.post('/register', controller.create );
route.post('/login', controller.login ); 

module.exports = route 

