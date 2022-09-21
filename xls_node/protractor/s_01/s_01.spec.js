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
		let elems = element.all( by.css('.items li')).filter((elem, index)=>{ return elem.getText().then( (text)=>text =='Third')})	
		let f_text = await first.getText()

		console.log( f_text )
		expect( elems.first().getText()).toBe('Third') 
		let t_text = await elems.first().getText() 
		console.log( t_text ) 

		element( by.id('foo')).click()
		let items = element( by.css(',items')).$$('li')
//		expect( items.first().getText()).toBe('First')

		expect($('.items').isPresent()).toBeTruthy()
		
		let s1 = await $$('.items li').first().getText()
		console.log(s1) 
		 
		console.log( $('.items').locator() )

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

