const http = require('http')
const debug = require('debug')
const express = require('express')
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') 
require('dotenv').config({ path: '../../.env' })

debug_me = debug('custom:debug') 

const app = express()
app.use( express.json())
app.use( express.urlencoded({ extended: true }))
app.use( cookieParser()) 
app.use( cors())

app.use( express.static( path.join( __dirname , 'public' )))

app.get('/test', authentication , ( req, res )=>{
	console.log( req.header )
	res.send('<h1>TEST!</h1>')
	res.end() 
})
app.post('/login', ( req, res )=>{
	let email = req.body.email 
	let password = req.body.password 
	let user = { name: 'RICHARD.CHOI', email } 
	const token = jwt.sign( { email } , process.env.JWT_SECRET , { expiresIn: '1h' }) 
//	res.header('Autherization', token ).send( user )
	res.cookie('Autherization', token ) 
	res.redirect(303, '/test')
})

http.createServer(app).listen( process.env.SERVER_PORT , ()=>{
	debug_me(` server is working on PORT ${ process.env.SERVER_PORT } `)
})

//test 

async function authentication( req, res, next ){
	let crential = req.cookies['Autherization']
	if( crential == undefined ){
		res.redirect(303, '/' )
	}else if( result =  await jwt.verify( crential , process.env.JWT_SECRET )){
	   console.log( result )
	   next() 
	}
	res.redirect(303, '/' )
}
