var assert = require('assert') 
var Browser = require('zombie') 


describe('login', function(){
var brower = browser = new Browser() 
  it('should load the signup form', function(done){
	this.timeout(10000) ;  
    browser.visit('http://ez-office.co.kr:3004/admin/user/login', function(){
	console.log('[test_automation] brower.visit') 
	assert.ok( browser.success, 'page loaded' )
	var form = brower.query('form') 
	assert( form ,'form exists') 
	done()
})
})
})
