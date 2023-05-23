/*
	external params :
	scope : apps_list , app_cur , cur_user_info , apps_list_parent( name , title )  
*/
angular.module('work_space', [])
.factory('workSpace_factory',function(){
	var workSpace_factory  =  {
//1	   frame_type : null , 
	   cur_user_info : null ,	
//1	   cur_user_configuration : null, 
//1	   collection_list: null, 
	   app_cur : null ,
	   app_cur_parent : null, 	
	   apps_list : null , 	
	   apps_list_all: null ,
	   apps_list_all2: null ,
	   apps_list_parent: null , 
	   apps_list_parent_all : null , 
	   app_apps_list : null,
//1	   app_noAccess : null,
	   app_companyInfo: null ,
	   app_server_list: null, 
//1		
	   cur_server: null, 	
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..  part function.. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
		serverList_update: null 	
	}
         
	return workSpace_factory 
})
.service('workSpace_service',['$injector',
'$window',
'adminApp_service',
'workSpace_factory',
	function( $injector , 
$window, 
adminApp_service,
workSpace_factory 
)
{
	var $http = $injector.get('$http')
///////////////////////////////////////////////////////////////////////////////////////////////////
//  shared  use olny variables and functions .. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
	const companyInfoApp = '회사정보' 
	const appsListApp = 'app_list' 
	var app_apps_list 	
	var app_companyInfo 
	var apps_list_all
	var apps_list_all2
	var apps_list 
        var apps_list_parent 
        var apps_list_parent_all 
	var app_cur
	var app_cur_parent 
	var cur_user_info 
	var post_initAppsList_f_list = [] 
	var post_initSidebars_f_list = []
// following variable should move to factory.. 	
	this.getWorkSpace_factory = ()=>workSpace_factory 
///////////////////////////////////////////////////////////////////////////////////////////////////
//  externl use. Promise..  
///////////////////////////////////////////////////////////////////////////////////////////////////		
  const  getWorkSpace_data = ( Data_s )=>{
		  var argsList 
		  console.log('*[workSpace_service]![async_callback] adminApp_service.getCookie_id _call_') 
	      const cur_id = adminApp_service.getCookie_id()
		  console.log('*[workSpace_service]![async_callback] adminApp_service.getCookie_id _callEnd_') 
		  cur_user_info = workSpace_factory.cur_user_info =  Data_s[0].find((ent)=> ent.email == cur_id )
		  if( cur_user_info == undefined ){
			  alert("no user information exit") ;
			  return -1;
/*1			  
		       cur_user_info = workSpace_factory.cur_user_info=  Data_s[0].find((ent)=> ent.email == 'guest@ez-office.co.kr' )
			   cur_user_info.email = workSpace_factory.cur_user_info.email =  cur_id 
*/			   
		  }
		  console.log('*[workSpace_service]![async_callback] cur_user_info set', cur_user_info ) 
//Wed Mar 16 10:49:35 KST 2022
		  adminApp_service.setCur_user_info( workSpace_factory.cur_user_info ) 
	     workSpace_factory.app_apps_list   =  Data_s[1].find(( ent)=> ent.name == 'app_list') 
	     workSpace_factory.app_cur = workSpace_factory.collection_list =  Data_s[1].find((ent)=> ent.name == 'collection_list' ) 
	     workSpace_factory.app_server_list  = Data_s[1].find((ent)=> ent.name == '관리회사' ) 

	      workSpace_factory.app_companyInfo = app_companyInfo = Data_s[2] 
	      adminApp_service.setCompany_info( app_companyInfo[0] ) 
	      console.log('*[workSpace_service]![async_callback].post_initAppsList_f_list_call_:', post_initAppsList_f_list ) 
	      post_initAppsList_f_list.forEach((ent)=>ent()) 
   }
  this.initAppsList = async ( cb_f)=>{
	  console.log(`*[workSpace_service].initAppsList _Start_
	  			   desc: restData / adminData , appsList , companyInfo. 
				         and Processing. 
	  ` ) 

//1. new code with async. 
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..  
///////////////////////////////////////////////////////////////////////////////////////////////////		
         let Data_s = Array(5); 
	 let cur_server = workSpace_factory.cur_server
	 let temp_data = await $http.get(`/tbl_editor/${ cur_server }/admin_1`).catch((err)=>{ console.log( err )} )
	 Data_s[0] = temp_data.data.DATA 
	 temp_data = await $http.get(`/web_admin_editor/apps_list/${ cur_server }`).catch((err)=>{ console.log( err )})	 
	 Data_s[1] = temp_data.data.DATA 
	 temp_data = await $http.get('/web_admin_editor/servers_list').catch((err)=>{ console.log( err )})	 
	 Data_s[2] = temp_data.data.DATA 
	 let serversList = Data_s[2].reduce(( acc, cur, index )=>{
		 if( cur['enabled']) 
			 acc.push( cur['server_name']);
		 return acc 
	 }, [])
	 workSpace_factory.serverList_update( serversList );   
	 getWorkSpace_data( Data_s ) ;

  }
  this.addPost_initAppsList_f_list = ( ft_name )=>{
	  post_initAppsList_f_list.push( ft_name ) 
  }
  this.execPost_initAppsList_f_list = ()=>{
	   post_initAppsList_f_list.forEach((ent)=>ent()) 
  }
  this.addPost_initSidebars_f_list = ( ft_name )=>{
	  post_initSidebars_f_list.push( ft_name ) 
  }
  this.execPost_initSidebars_f_list = ()=>{
	   post_initSidebars_f_list.forEach((ent)=>ent()) 
  }
///////////////////////////////////////////////////////////////////////////////////////////////////
//  internal use olny variables and functions .. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
	this.updateApps_list = ( apps_list_parent_title )=>{
		const cur_parent = apps_list_all.find((ent)=>ent.title == apps_list_parent_title )
		return  ( apps_list_all.reduce((acc, cur)=>{
			if( cur.parent == cur_parent.name )acc.push( cur )
		    return acc 
		},[]))
	}
	this.updateApps_list_withLimit = ( apps_list_parent_title, cur_user_info )=>{
		const cur_parent = apps_list_all.find((ent)=>ent.title == apps_list_parent_title )
		return  ( apps_list_all.reduce((acc, cur)=>{
			if( cur.parent == cur_parent.name && cur_user_info[ cur.name ] != 5 )acc.push( cur )
		    return acc 
		},[]))
	}
///////////////////////////////////////////////////////////////////////////////////////////////////
//  externl use. variables and functions .. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
/*
	this function has dependency of cur_user_info, so before all this , cur_user_info, should be avaiable. 
*/
	this.getAppsList_parent = ( apps_list_all_i , cur_user_info_i )=>{
	      console.log(`*[workSpace_service].getAppsList_parent_ _start
		  	           desc:  set workSpace_factory.apps_listi_all  cur_user_info, app_apps_list , collection_list , app_noAccess , apps_list_all 
		  ` ) 
		apps_list_all = apps_list_all_i 
		workSpace_factory.apps_list_all = apps_list_all_i

		apps_list_all2  =  workSpace_factory.apps_list_all2  = apps_list_all_i 
		cur_user_info   =  workSpace_factory.cur_user_info   = cur_user_info_i 
		app_apps_list   =  workSpace_factory.app_apps_list   = apps_list_all.find(( ent)=> ent.name == 'app_list') 
		collection_list =  workSpace_factory.collection_list =  apps_list_all.find((ent)=> ent.name == 'collection_list' ) 
		app_noAccess    =  workSpace_factory.app_noAccess    = apps_list_all.find((ent)=> ent.name == 'noAccess' ) 
		workSpace_factory.app_server_list    = apps_list_all.find((ent)=> ent.name == '관리회사' ) 
	    console.log('*[workSpace_service][getAppsList_parent] workSpace_factory.setTemplates_app  _call_') 
		workSpace_factory.setTemplates_app( apps_list_all ) 
	    console.log('*[workSpace_service][getAppsList_parent] workSpace_factory.setTemplates_app  _callEnd_') 
//		app_companyInfo = apps_list_all.find((ent)=> ent.name == '회사정보' ) 
		apps_list_parent_all = workSpace_factory.apps_list_parent_all =  apps_list_all.reduce(( acc, cur )=>{
			if( cur.level == 1 )acc.push( cur )
			return acc 
		},[])
		apps_list_parent =  workSpace_factory.apps_list_parent =  apps_list_all 
		console.log( workSpace_factory ) 
		return apps_list_parent 
	}
///////////////////////////////////////////////////////////////////////////////////////////////////
//  externl use. return variables
///////////////////////////////////////////////////////////////////////////////////////////////////		
	this.getAppsList_parent_post = ()=>{
		return apps_list_parent 
	}
	this.setAppsList_parent_post = ( apps_list_parent_ )=>{
		apps_list_parent = apps_list_parent_  
	}
	this.getAppsList_parentAll_post = ()=>{
		return apps_list_parent_all   
	}
	this.setAppsListAll_parent_post = ( apps_list_parent_ )=>{
		apps_list_parent_all  = apps_list_parent_  
	}
	this.getAppsList_post = ()=>{
		return apps_list 
	}
	this.setAppsList_post =( apps_list_)=>{
		apps_list = apps_list_
	}
	this.getAppsListAll_post = ()=>{
		workSpace_factory.apps_list_all = apps_list_all
		return apps_list_all
	}
	this.getAppsListAll2_post = ()=>{
		return apps_list_all2 
	}
	this.setAppsListAll_post = ( apps_list_ )=>{
		apps_list_all = apps_list_ 
		workSpace_factory.apps_list_all = apps_list_all
	}
	this.getAppCur_post = ()=>{
	     return workSpace_factory.app_cur  
	}
	this.setAppCur_post = ( app_obj )=>{
		workSpace_factory.app_cur = app_obj 
		app_cur = app_obj 
	}
	this.getAppAppsList_post = ()=>{
		return app_apps_list 
	}
	this.getCollectionList_post = ()=>{
		return collection_list 
	}
	this.getAppNoAccess_post = ()=>{
		return app_noAccess 
	}
	this.getAppCur_userInfo_post =() =>{
		return cur_user_info 
	}
	this.getAppCur_userConfiguration_post = ()=> cur_user_configuration  
	this.getAppCompanyInfo_post = ()=> app_companyInfo
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..  
///////////////////////////////////////////////////////////////////////////////////////////////////		
	this.update_curServer = ( cur_server )=>{
		workSpace_factory.cur_server = cur_server ;
	}
	this.set_f_serverList_update = ( f_serverList_update )=>{
		workSpace_factory.serverList_update = f_serverList_update 
	}
}])

