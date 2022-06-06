var assert = require('assert') 
var Browser = require('zombie') 


describe('login', function(){
var browser = new Browser() 
	before( function(done){
		this.timeout(10000) ;  
		browser.visit('http://ez-office.co.kr:3004/admin/user/login', done ) 
	})
	it('should load the signup form', function(done){
		this.timeout(10000) ;  
			console.log('[test_automation] brower.visit ez-office.co.kr login screen') 
			assert.ok( browser.success, 'page loaded' )
			var form = browser.query('form') 
			assert( form ,'form exists') 
			done()
	})
	 it('should submit', function( done){
		  this.timeout(150000) ;  
		  console.log('[test_automation] brower.submit') 
		  browser.fill('email_address','star_horse@naver.com') 
		  browser.fill('password','ch1whdrb')
		  var form = browser.query('form') 
		  assert( browser.query('button[type=submit]', form ))
		  browser.pressButton('button[type=submit]', function(err){
			  if(err) throw err 
			var form = browser.query('form') 
			assert( form ,'form exists') 
		  done() 	
		  })
  })
})	
