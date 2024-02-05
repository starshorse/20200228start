const route = require('express').Router()
const axios = require('axios') 
require('dotenv').config() 


route.get('/login/info', async( req, res )=>{
	let org_name = req.cookies['org_name']
	let user = req.cookies['user'] 
	let user_DB = req.cookies['user_DB'] 
	let user_name =  '심규정' 
	res.status(200).json({ org_name , user_name, user })
})
route.get('/flash/login_failure', async( req, res )=>{
	let message =  { isMessage: false , message : null } 
	 message.message = req.flash('login_failure') 
// message.message.length == 0 ? 	
	if( message.message != '' ){
		message.isMessage = true 
	}
	res.status(200).json( message )
})
route.get('/logout', async( req, res )=>{
	res.clearCookie('user') 
	res.clearCookie('org_name')
	res.clearCookie('user_DB')
	return res.redirect('/'); 
})
route.get('/login_companies', async( req , res )=>{
	let hades_address = process.env.HADES_ADDRESS 
	let user = req.cookies['user']
	let password = req.session['password'] 
	let result =  await axios({ method: 'POST' , url:`http://${ hades_address}/dba_editor/getAdmin_list/${ user }`, data: { password }}).catch((err)=>console.log(err))
	if( result.data.STATUS == -1){
		console.log( result.data.ERRORMESSAGE )
	}
	let companies_info = result.data.ROWS
	if( companies_info.length == 0 ){
		req.flash('login_failure', '입력정보가 맞지 않습니다.') 
		res.clearCookie('user') 
	}
    res.status(200).json( companies_info  ) 
})
route.post('/login/org_name', async( req, res )=>{
	let org_name = req.body.org_name 
	res.cookie('org_name', org_name );
	res.cookie('user_DB', org_name ); 
	res.status(200).json({ message:`user_DB set as ${ org_name }`})
})
route.post('/login', async( req, res )=>{
	let user = req.body.email_address 
	let password = req.body.password 
	res.cookie('user', user )
	req.session['password'] = password 
//1	return  res.redirect('/company/maingate') 
	res.status(200).json({ message: 'reidrect to /company/maingate' }) 
})

module.exports = route 
