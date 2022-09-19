describe('s_01', function(){
	beforeAll( async function(){
		browser.waitForAngularEnabled(false) 
		await browser.get('http://localhost:8000')
	})
	it('should get affx page', async function(){
		browser.waitForAngularEnabled(false) 
		await browser.get('http://localhost:8000/affix.html') 
		let  title = await browser.driver.getTitle()
		expect( title ).toEqual('AFFIX') 
		var fork = await browser.forkNewDriverInstance()
		await fork.get('http://localhost:8000/bt4withsp.html')

	})
})

