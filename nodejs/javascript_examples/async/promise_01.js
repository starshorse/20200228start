/*
 *  Promise non block next  procedure..
 *
*/
console.log( Promise.resolve(7))
let pr1 = Promise.resolve(7);
// pr1.then( value => console.log( value ))
console.log('Here skip promise result :7');


// promise in function..
//
function async_ft( wait_sec ){
	return new Promise(( resolve , reject )=>{
		setTimeout( ()=>{ reject( new Error("Fail"))} , wait_sec ) 
	})
}

// async_ft( 1000 ).catch( err => console.log(err ));
console.log('Here skip promise err');
Promise.all([ pr1, async_ft( 1000 )]).then( results => console.log( results ))

