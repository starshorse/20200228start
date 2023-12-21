var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sequelize = require('./models').sequelize 
var models = require('./models')

var app = express();
const { QueryTypes } = require('sequelize');
require('dotenv').config() 
if( process.env.NODE_ENV == 'development' ){
	( async ()=>{
		const users = await sequelize.query("SELECT * FROM `quotations`", { type: sequelize.QueryTypes.SELECT });
		console.log( users )
	})()
}else if( process.env.NODE_ENV == 'production' ){
	( async ()=>{
		const users = await sequelize.query("SELECT * FROM `test`", { type: sequelize.QueryTypes.SELECT });
		console.log( users )
	})()
}else if( process.env.NODE_ENV == 'test' ){
	( async ()=>{
		const users = await sequelize.query("SELECT * FROM Book", { type: sequelize.QueryTypes.SELECT });
		console.log( users )
	})();
	( async ()=>{
		const t = await sequelize.transaction() 
		try{
		     for( const i of [0,1,2,3,4,5] ){
			await  models.User.create({ name:`RICHARD ${i}` , email :`richard.${i}@ez-office.co.kr` },{ transaction: t } ) 
		     }
		     await t.commit();	
		}catch(err){
		     await t.rollback(); 	
		}

	})()
}else if( process.env.NODE_ENV == 'ezoffice' ){
	console.log( models );
	( async ()=>{
	    let  data =	await models['TB_admin_1'].findAll()
	    console.log( data ) 	
	})()
};

// sequelize.sync() 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
