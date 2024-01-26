$( function(){
	$.get('/admin/flash/login_failure', (response)=>{
		if( response.isMessage == true ){
			$('#exampleModalLongTitle').html('로그인 에러' )
			$('#exampleModalContent').html( response.message )
//			$('#exampleModalCenter').show();
			$('#exampleModalCenter').modal('show');
		}
	}) 
	$('#btn_login').click( function(){
		let email_address = $('#email_address').val() 
		let password = $('#password').val() 
		$.post('/admin/login', { email_address, password }, function( response ){
			window.location.href = '/company/maingate'
		})
	});
})
