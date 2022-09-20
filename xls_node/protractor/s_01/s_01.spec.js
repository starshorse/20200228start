describe('s_01', function(){
	beforeAll( async function(){
		browser.waitForAngularEnabled(false) 
		await browser.get('http://localhost:8000')
	})
/*
 *  G.I.T note 
 */
	it('protractor test', async function(){
		browser.waitForAngularEnabled(false) 
		await browser.get('http://localhost:8000/protractor_test.html') 
		browser.sleep(5000)
//		browser.pause()
		let first = element.all(by.css('.items li')).first() 
		expect( first.getText()).toBe('First')
		let elem = element.all( by.css('.items li')).filter((elem, index)=>{ return elem.getText().then( (text)=>text =='Third')})	
		console.log( elem[0])

		element( by.id('foo')).click()

	})
/*	
	it('should get affx page', async function(){
		browser.waitForAngularEnabled(false) 
		await browser.get('http://localhost:8000/affix.html') 
		let  title = await browser.driver.getTitle()
		expect( title ).toEqual('AFFIX') 
		var fork = await browser.forkNewDriverInstance()
		await fork.get('http://localhost:8000/bt4withsp.html')

	})
*/	
})

