$( async function(){
// await $.get
	function fetchingData( url ){
		return new Promise(( resolve, reject )=>{
			$.get( url, ( response )=>{
				resolve( response );
			})
		})
	}
    function fetchingPost( url, data ){
		return new Promise(( resolve, reject )=>{
			$.post( url, data, ( response )=>{
				resolve( response );
			})
		})
	}
    $('#TblView_menu').hide() 
	$('#TblView_btn').on('click' , function(e){
		$('#TblList_menu').hide() 
		$('#TblView_menu').show() 
	})
	$('#TblList_btn').on('click' , function(e){
		$('#TblView_menu').hide() 
		$('#TblList_menu').show() 
	})
	let response = await fetchingData('/admin/login/info').catch((err)=>console.log(err)); 
    let org_name = response.org_name 
	let id = response.user 
	let result = await fetchingData(`/Hades/db_administration/db_list/${ org_name }/${ id }`).catch((err)=>console.log(err))
	let DB_list = result.DATA 
    DB_list.forEach(( ent )=>{
		$('#user_db_list').append(`<option value='${ent.name}'>${ent.name }</option>`) 
	})
	$('#user_db_list').val( org_name ).prop("selected", true ); 
	$('#favorite_name').val('NONE');
	result = await fetchingData(`/tbl_editor/${ org_name }/user_config`).catch((err)=>console.log(err)) 
	if( result.STATUS == -1 ){
		alert('User config load Error'); 
	}
	var  config_list = result.DATA?.config_list 
	console.log( config_list ) 
	config_list.forEach((ent)=>{
		let newEnt = 	
	`
	<li class="dropdown-item">
		<span ng-click="edit_item_favorite_click( edit_list.configName, $event )" ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21.436 7.586l-3.998-4.02c-.752-.756-2.063-.764-2.83-.006c-.196.196-.35.436-.418.629c-.653 1.362-1.354 2.215-2.254 2.727l-.217.105C10.751 7.506 9.434 8 7 8c-.266 0-.521.052-.766.152a2.022 2.022 0 0 0-1.082 1.084a2.022 2.022 0 0 0 0 1.525c.104.249.25.471.435.651l3.235 3.235L5 20l5.352-3.822l3.227 3.227c.186.189.406.339.656.441a1.974 1.974 0 0 0 1.531 0a1.963 1.963 0 0 0 1.08-1.078c.103-.242.155-.507.155-.768c0-2.436.494-3.752.978-4.721c.496-.992 1.369-1.748 2.754-2.414c.271-.104.51-.256.711-.457a2.005 2.005 0 0 0-.008-2.822m-5.248 4.801c-.819 1.643-1.188 3.37-1.195 5.604L7 10c2.139 0 3.814-.335 5.396-1.084l.235-.105c1.399-.699 2.468-1.893 3.388-3.834l3.924 4.051c-1.863.893-3.056 1.96-3.755 3.359"/></svg>
		</span> 
		<a ng-click="edit_list_click( edit_list.configName , $event )" data-toggle="tooltip" title="Ctrl 키와 클릭시 새창열기">${ ent.configName }</a>
		<span ng-click="edit_item_remove_click( edit_list.configName, $event )" >
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8s8-3.582 8-8s-3.581-8-8-8zm3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0a.999.999 0 0 1 0-1.414L10.586 12L8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12l2.293 2.293z"/></svg>
		</span> 
	</li>  
    `  
		$('#favorite_list').append( newEnt );	
		$('#favorite_list').on('click', function(e){
			e.preventDefault()
			console.log( e.defaultPrevented ); 
            console.log( e )
			let item = e.target.innerHTML
			$('#favorite_name').val( item )
		})
		$('#full_screen').on('click', function(e){
			e.preventDefault()
			$('#header_menu').toggle();
			$('#part_menu').toggle();
		})
	})

})
