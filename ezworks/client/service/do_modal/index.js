angular.module('do_modal', [])
.service('doModal_service', ['restApiService', function( restApiService ){
	var modals 
	var modal
	const modal_tbl = 'Design_modal' 
	var post_initModals_f_list = [] 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//  External Interface. 
//////////////////////////////////////////////////////////////////////////////////////////////////////////		
	this.getModals = ()=>modals 
	this.getModal = ()=>modal   
	this.addPost_initModals_f_list = ( ft_name )=>{
		post_initModals_f_list.push( ft_name ) 
	}
	this.getDataWithHdr = ( tbl_name, cb_f )=>{
        restApiService.getData( `/app_data/data/with_hdr/${tbl_name}`, cb_f) 
	}
	this.promise_getDataWithHdr = ()=>{
		return new Promise((resolve, reject )=>{
               restApiService.getData( `/app_data/data/with_hdr/${modal_tbl}`, 
				   ( Data_ )=>{ return resolve( Data_ )}) 
		}) 
	}
    this.init_modals = ()=>{
       this.promise_getDataWithHdr().then(( Data_ )=>{
		     modals =  Data_.tbl_data 
		     Data_.tbl_format.forEach(( ent )=>{
				 if( ent.isJson ){ 
					 modals.forEach((ent0)=>{  ent0[ent.name] = JSON.parse( ent0[ ent.name ] ) 
				 })}
	        })
		   post_initModals_f_list.forEach((ent)=>ent()) 
	})}
	this.doModal = ( inx )=>{
		return modal = modals[ inx -1 ] 
	}
}])
