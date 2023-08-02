async function myAsyncFunc(){
	throw 'myAsyncFunc Error!';
}

function myPromiseFunc(){
	return new Promise((resolve, reject )=>{
		reject('myPromiseFunc Error!') 
	})
}

const result = myAsyncFunc().catch( e =>{ console.log(e)}) 
const result1 = myPromiseFunc().catch( e =>{ console.log(e) }) 
