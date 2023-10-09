var models = require('../models')
var User = require('../models/user')

exports.create = async function( req, res ){
   let user = 	await models.User.create({
	   name: req.body.name,
	   email: req.body.email 
   }) 
   res.json( user )
}
exports.list = async function(  req, res ){
	let users =  await models.User.findAll({})
	res.json( users )
}
exports.entry = async function(  req, res ){
	let id = req.params.id 
	let user =  await models.User.findOne({ where: { email: id }})
	res.json( user )
}
exports.login = async function( req, res ){
	let email = req.body.email 
	let password = req.body.password 
	let user = await models.User.findOne({ where :{ email }})
	if( user ){
		return res.json( user )
	}else{
		return res.redirect( 303, '/register.html' )
    }
}
