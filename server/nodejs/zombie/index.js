const browser = require('zombie')

// browser.localhost('ezoffice365.com:3004', 3000)
// console.log( browser )
browser.visit('https://ezoffice365.com:3004/admin/user/login', function( error , browser, status){
	console.log( browser.location.href ); 
	console.log( browser.html() )
	browser.fill('email_address', 'star_horse@naver.com' );
	browser.fill('password', 'ch1whdrb' );
	browser.pressButton('.btn', function(){
		 console.log( browser.location.href );
//		 console.log( browser.text() )
		 console.log( browser.html('.col-md-1'));
	})
});
