const loadJS = function( FILE_URL, async = true ){
	let scriptEle = document.createElement('script')
	scriptEle.setAttribute('src', FILE_URL );
	scriptEle.setAttribute('type', 'text/javascript');
	scriptEle.setAttribute('async', async );
	document.body.appendChild( scriptEle ); 
	// success event 
	scriptEle.addEventListener("load",()=>{
		console.log("File loaded")
	});
	// error event 
	scriptEle.addEventListener("error",(ev)=>{
		console.log("Error on loading file", ev );
	})
}

export { loadJS } 
