var jwt = require('jsonwebtoken') 

const user = { id: 3 }
const token = jwt.sign({ user }, 'my_secret_key' ) 

jwt.verify( token, 'my_secret_key' , ( err, data )=>{
	if(err) console.log('Error:', err )
	console.log( data, token ) 
	return 
})

