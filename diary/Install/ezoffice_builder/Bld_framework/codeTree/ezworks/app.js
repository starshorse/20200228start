 const http = require('http')
const express = require('express')
const path = require('path')
// const routeUser = require('./server/user')
const logger = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware') 
var app = express()
    app.use(logger())
    app.use('/Hermes', createProxyMiddleware({
		target: 'http://ezoffice365.com:5000',
		changeOrigin: true , 
		pathRewrite:{
			['^/Hermes']:''
		}
	}))
    app.use( express.json())
    app.use( express.urlencoded({ extended: true } ) )
    app.use( express.static( path.join( __dirname , 'app' )))
//  app.use('/user',routeUser )
    const server = http.createServer(app)
    const io = require('socket.io')(server )
    const routeEzworks = require('./server/ezworks')( io, app )
    const routeDbEdit = require('./server/db_edit')( io, app )
    const routeDbEditSqlite3 = require('./server/db_edit/sqlite3')( io, app )
    app.use('/ezworks',routeEzworks )
    app.use('/db_edit',routeDbEdit )
    app.use('/db_edit/sqlite3',routeDbEditSqlite3 )
    server.listen(3000)
	
