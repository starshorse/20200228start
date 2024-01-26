$( function(){
	$.get('/admin/login/info', ( response )=>{
		 let org_name = response.org_name
		 let first = org_name[0].toUpperCase(); 
		 let second = org_name[1].toUpperCase();
		 org_name = first + second + org_name.slice( 2, org_name.length )
		 $('#org_name').html( org_name );
		 $('#user_name').html( response.user_name );
	})
})
