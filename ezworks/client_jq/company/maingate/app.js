$( function(){
	$.get('/admin/login_companies', ( response )=>{
		   let companies_info = response 
		   if( companies_info.length == 0 )
				window.location.href = '/';
		   for( let company of companies_info ){
             let new_entry =`
				<div class='form-group row mb-3' ng-show='1' ng-repeat='company in login_companies'>
					<div class='col-md-4'></div>
					<div class='col-md-1'>
						 ${ company.dbName } 
					</div> 	
					<div class='col-md-1'>${ company.dbName }</div>
					<div class='col-md-2'>
						<BUTTON  class='btn btn-secondary btn-block w-100' value='${ company.dbName }'>GO</BUTTON>	
					</div>
				</div>
			`	
			 $('#companies_info').append(new_entry);   
		   }
	})
	$(document).on("click", 'button',  function(e){
//		alert('button clicked') 
		e.preventDefault(); 
		let org_name  = this.value ; 
		$.post('/admin/login/org_name', { org_name }, ( response )=>{
			window.location.href = '/company/main'
		})
	})
})
