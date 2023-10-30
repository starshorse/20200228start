/*
	require Extrn . module . 
'UserService',
'AuthenticationService',
'FlashService'	
*/
angular.module('admin_app',[
'ngCookies',
'UserService',
'AuthenticationService',
'FlashService'	
])
.factory('adminApp_factory',function(){
	var adminApp_factory = {
		cur_user_info: { cookie_user: null , cookie_orgName: null , cookie_user_DB: null, configuration: null , data: null },  
		cur_collections_info: null, 
		cur_apps_info: null ,
	}
	return adminApp_factory 
})
.service('adminApp_service',['$cookies','$location','$window','$injector',function($cookies, $location, $window, $injector){
	const adminApp = 'admin_1' 
	var AuthenticationService = $injector.get('AuthenticationService'); 
	var FlashService = $injector.get('FlashService');
	var $http = $injector.get('$http') ;
	var adminApp_factory = $injector.get('adminApp_factory');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Get/Set var.. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	this.getCur_user_info = ()=> adminApp_factory.cur_user_info 
	this.getCur_user_configuration = ()=> adminApp_factory.cur_user_info.configuration 
	this.ClearCredentials = ()=>{
			AuthenticationService.ClearCredentials();
	}
	this.Login = ( username , password, cb_f )=>{
	  	 AuthenticationService.Login( username , password, async function( response ){
			if( response.success ){
				AuthenticationService.SetCredentials( username , password );
//				let db_admin_1 = await $http.get('/Hades/dba_editor/web_users'); 
//				console.log( db_admin_1 ) 
			}else{
				FlashService.Error( response.message);
			}
		    cb_f( response ) 	 
		})

	}
	this.goBack = ()=>{
		$window.location.href = '/company/main/0/' 
	    throw new Error('Forward to back !'); 
	}
	const getCookie_ids = ()=>{
	   let cur_id = adminApp_factory.cur_user_info.cookie_user = $cookies.get('user') 
	    adminApp_factory.cur_user_info.cookie_orgName = $cookies.get('org_name') 
	    adminApp_factory.cur_user_info.cookie_user_DB = $cookies.get('user_DB') 
     	if( cur_id == undefined ){
/*			
			$window.location.href ='/' 
	        throw new Error('Forward to back !'); 
*/			
			alert("please set cookie 'user' 'user_DB' 'org_name'" );
		}
    	console.log( cur_id ) 
		return adminApp_factory.cur_user_info
	}
	getCookie_ids(); 
	const getAdminData = ()=>{
		// let db_admin_1 = await $http.get(`/Hades/dba_editor/web_users/:db_name/:user_id 
		return db_admin_1 
    }
/*
   access 가능 한 collection과app만 노출 시킨다.
*/
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
	this.authenticateApp = ( my_app_ )=>{
         if( cur_user_info.level < 1  )return 0  // sucess 
		 if( !cur_user_configuration?.access?.appList.includes( my_app_.name ) 
			 &&  cur_user_info.level >  my_app_.level_limit ){
		 return 1   // failure 
		 }
		return 0 
	} 
/*	
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
*/	
}])
