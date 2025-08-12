	
// need npm install mkdirp 
	var mkdirp	=	require('mkdirp');
	mkdirp('tmpfoo/richard',function(err){
		if	(err)	console.error(err)
		else	console.log('pow!')
		});
