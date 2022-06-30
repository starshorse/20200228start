function wait(sec){
	return new Promise(( resolve, reject )=>{
		setTimeout(()=>{
			reject('Error')
		}, sec*1000 )
	})
}
wait(3).catch( e =>{ 
	console.log('1st catch', e)
	throw e 
}).catch( e =>{
	console.log('2nd catch', e)
})
