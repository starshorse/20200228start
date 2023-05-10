function *getRandom(){
	while(1){
		yield Math.floor( Math.random()*10)
	}	
}

for( num of getRandom()){
	console.log( num )
	if( num >  5 )break;
}
