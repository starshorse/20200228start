angular.module('admin_app',['ngCookies'])
.service('adminApp_service',['$cookies','$location','$window', 
//1 'restApiServiceDbEdit', 
	function($cookies, $location, $window, 
//1	restApiServiceDbEdit 
){
	const adminApp = 'admin_1' 
	var cur_user_info = null 
	var depart_info = null 
	var company_info = null 
	var cur_user_configuration = null 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Get/Set var.. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	this.getCur_user_info = ()=> cur_user_info 
	this.getCur_user_configuration = ()=> cur_user_configuration 
	this.setCur_user_info = ( cur_user_info_ ) =>{ cur_user_info = cur_user_info_ } 
	this.setCur_user_configuration = ( cur_user_configuration_ ) =>{ cur_user_configuration = cur_user_configuration_ } 
	this.setCompany_info = ( cur_company_info )=>{ company_info = cur_company_info }
	this.getCompany_info = ()=>company_info  

	this.goBack = ()=>{
//		$window.history.back() 
		$window.location.href = '/company/main/0/' 
	    throw new Error('Forward to back !'); 
	}
	this.getCookie_id = ()=>{
	    const cur_id = $cookies.get('user') 
     	if( cur_id == undefined ){
			$window.location.href ='/' 
	        throw new Error('Forward to back !'); 
		}
    	console.log( cur_id ) 
		return cur_id 
	}
/*1		
	this.promise_getAdminData = ()=>{
		return new Promise(( resolve, reject )=>{
			restApiServiceDbEdit.getData( adminApp, ( Data_)=>{
				resolve( Data_ ) }, { db_mode :'mssql'} )
	})}	
	this.authenticateCollection = ( my_collection_ ) =>{
		 if( my_collection_.name == 'main')return 
         if( cur_user_info.level == 0 )return 
		 if( !cur_user_configuration.access.collectionList.includes( my_collection_.name ) 
			 &&  cur_user_info.level >  my_collection_.level ){
//				 alert(" no collection access-right!") 
				 console.log(" no collection access-right!", cur_user_info.name) 
//				 $window.history.back() 
			     this.goBack() 
		 }		 
	}
*/	
	this.authenticateApp = ( my_app_ )=>{
         if( cur_user_info.level < 1  )return 0  // sucess 
		 if( !cur_user_configuration?.access?.appList.includes( my_app_.name ) 
			 &&  cur_user_info.level >  my_app_.level_limit ){
		 return 1   // failure 
		 }
		return 0 
	} 
	this.checkAvailableApp = ( apps_list_ )=>{
		let my_app_ = null 
		apps_list_.forEach((ent)=>{
			if( !this.authenticateApp( ent)){
				my_app_ = ent 					
				return 
			}
		})
		return my_app_
	}
}])
