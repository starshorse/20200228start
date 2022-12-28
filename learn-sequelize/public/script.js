 document.getElementById('FindAll').addEventListener('click', function(e){
	 let tbl_name = 'TB_admin_1'; 
	 const xhr = new XMLHttpRequest(); 
	 xhr.open('GET', '/users');
	 xhr.send(); 
         xhr.onreadystatechange = function(e){
		if( xhr.readyState != XMLHttpRequest.DONE ) return;
		if( xhr.status == 200 ){
	  	console.log( xhr.responseText );
			document.getElementById('RESP').value = xhr.responseText ; 
	  	}else{
          	console.log('Error!');
	  	}		
	  }
 })	 
