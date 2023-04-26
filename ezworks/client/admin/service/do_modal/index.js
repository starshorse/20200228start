angular.module('do_modal', [])
.service('doModal_service', ['restApi_service', function( restApi_service ){
	this.getDataWithHdr = ( tbl_name, cb_f )=>{
        restApi_service.getData( `/app_data/data/with_hdr/${tbl_name}`, cb_f) 
	}
}])
