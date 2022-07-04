NODEJS NPM
===========

# Error Object

### const { isEmail } = require('validator') 
```
let error ={ email:'', password:'' }
userSchema({
	validate:[ isEmail, 'please enter a valid email'] 
})

function errHander(err){
	err.errors
	console.log( err.messge err.code ) 
	if( err.message.include('user validation failed')) 
	
	console.log( Object.values(err.errors).forEach( error=>{
		console.log( error.proerties )
		})
	)
	// validation error 
	Object.values(err.errors).forEach( ({ properties } =>{
		error[properties.path] = properties.message;
		})
	return res.status(200).json( { properties }) 
	// duplicate error code 
	if( err.code === 11000 ){
		errors.email = 'that email already registeed .
	}
}
```
# hash 
### const bcrypt = require('bcrypt') 
[hAjfg]:salt + test123 -[ Hashing Algorthm ] - 
```
userSchema.pre('save', function(){
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash( this.password , salt )
next()
}
```
# Cookie / JWT 
```
// Login Form  Client. 
form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const res = await fetch('/signup', {
		method: 'POST',
		body: JSON.stringify({ email:'aaa@aaa', password:'test123' }) 
		headers: { 'content-type: 'application/json' }
	})

})
```
console. >> document.cookie 로 확인가능 
// node server
npm i jsonwebtoken 
```
res.setHeader('Set-Cookie','newUser=true' ) 
const maxAge = 3*24*60*60 
const createToken = (id)=>{
	return jwt.sign({id}, 'nt ninja secret',{ expiresIn: maxAge }) 
}

const token = createToken( user._id ) 
res.cookie(' jwt', token, { httpOnly: true, maxAge: maxAge* 1000 }) 

userSchema.statics.login = async function( email, password ){
    const  user = await this.findOne({ email }) 
    // Error 
    	throw Error(' Incorret Password') 
    // OK
    	location.assign('/') 
}









