const route = require('express').Router()
const { createTbl, updateTbl } = require('../nosql_config/fdb_json')
const tbl_name = 'test.fdb'
var DbData = createTbl( tbl_name )
module.exports = ( io, app )=>{
	io.on('connection', ( socket )=>{
	    socket.on('getData', ()=>{

		})
	})
const routeSub_appBuynsell = require('./sub_app/buynsell/server')(io, app )
	route.use('/buynsell', routeSub_appBuynsell )
	return route
}

