/*
	external params :
	scope : apps_list , app_cur , cur_user_info , apps_list_parent( name , title )  
*/
angular.module('work_space', [])
.factory('workSpace_factory',function(){
	var workSpace_factory  =  {
	   frame_type : null , 
	   cur_user_info : null ,	
	   cur_user_configuration : null, 
	   collection_list: null, 
	   app_cur : null ,
	   app_cur_parent : null, 	
	   apps_list : null , 	
	   apps_list_all: null ,
	   apps_list_all2: null ,
	   apps_list_parent: null , 
	   apps_list_parent_all : null , 
	   app_apps_list : null,
	   app_noAccess : null,
	   app_companyInfo: null ,
	   templates_app : [] ,
	   setTemplates_app : ( apps_list_all_ )=>{
	    console.log('*[workSpace_factory][setTemplates_app] _start_') 
		  let template_app = apps_list_all_.filter((ent)=>{
//			  console.log( ent.name )
			  if( ent.name == undefined )return 0 
			  let configuration = ( typeof ent.configuration == 'object' )? ent.configuration : JSON.parse( ent.configuration )  
			  return ( configuration.template_app != undefined ) 
		  	})
	    console.log('*[workSpace_factory][setTemplates_app] template_app', template_app ) 
		  template_app.forEach((ent)=>{
			  let configuration = ( typeof ent.configuration == 'object' )? ent.configuration : JSON.parse( ent.configuration )  
			  if(  configuration.template_app.enable != undefined ){
				  let enable_flag = configuration.template_app.enable 
				  let id_arr = workSpace_factory.templates_app.map((ent)=>ent.id) 
				  if( !id_arr.includes( configuration.template_app.id ) && enable_flag ){
					  configuration.template_app.enable = 0 
					  workSpace_factory.templates_app.push( {'id': configuration.template_app.id , 'configuration': configuration } )  
				  }
		  }})
	  }
	}
	return workSpace_factory 
})
.service('workSpace_service',['$injector','$location','$window',
'workSpace_factory',
	function( $injector , $location, $window, 
workSpace_factory  )
{
///////////////////////////////////////////////////////////////////////////////////////////////////
//  shared  use olny variables and functions .. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
	const companyInfoApp = '회사정보' 
	const appsListApp = 'app_list' 
	var app_apps_list 	
	var collection_list 
	var app_noAccess 
	var app_companyInfo 
	var apps_list_all
	var apps_list_all2
	var apps_list 
    var apps_list_parent 
    var apps_list_parent_all 
	var app_cur
	var app_cur_parent 
	var cur_user_info 
	var cur_user_configuration = null 
	var post_initAppsList_f_list = [] 
	var post_initSidebars_f_list = []
// following variable should move to factory.. 	
	this.getWorkSpace_factory = ()=>workSpace_factory 
///////////////////////////////////////////////////////////////////////////////////////////////////
//  externl use. Promise..  
///////////////////////////////////////////////////////////////////////////////////////////////////		
   this.promise_getCompanyInfoData = ()=>{
	   return { "org_name":"ezchemtech" }
   }
   this.getCollections = ( cur_collection = "home" )=>{
	   collections = { 
		   home : ['home','내업무','권한','logout'], 
		   '내업무': ['home','권한','logout'], 
		   '권한':['home','logout']
	   }
	   return collections[ cur_collection ]
   }
   this.promise_getAppsListData = ( cur_collection )=>{
	   apps = {
		   home: ['profile','password','company_info'],
		   '내업무':['테이블생성기','테이블편집기'],
		   '권한':['DB_role','Services']
	   }
	   return apps[ cur_collection ];
   }
   this.promise_postAppsListData = ( apps_data_ )=>{
/*	   
		return new Promise(( resolve, reject )=>{
			restApiServiceDbEdit.postData( appsListApp ,  apps_data_ , ( Data_ )=>{ resolve( Data_ ) }) 
		})
*/		
   }
//  args: 1. callback_f ptr, 2. callback_args ptr. 	
  this.initAppsList = ( cb_f)=>{
	  console.log(`*[workSpace_service].initAppsList _Start_
	  			   desc: restData / adminData , appsList , companyInfo. 
				         and Processing. 
	  ` ) 
/*	  
	  Promise.all( [ adminApp_service.promise_getAdminData(), this.promise_getAppsListData(), this.promise_getCompanyInfoData() ] ).then(( Data_s )=>{
		  var argsList 
		  console.log('*[workSpace_service]![async_callback] adminApp_service.getCookie_id _call_') 
	      const cur_id = adminApp_service.getCookie_id()
		  console.log('*[workSpace_service]![async_callback] adminApp_service.getCookie_id _callEnd_') 
		  cur_user_info = workSpace_factory.cur_user_info =  Data_s[0].find((ent)=> ent.email == cur_id )
		  if( cur_user_info == undefined ){
		       cur_user_info = workSpace_factory.cur_user_info=  Data_s[0].find((ent)=> ent.email == 'guest@ez-office.co.kr' )
			   cur_user_info.email = workSpace_factory.cur_user_info.email =  cur_id 
		  }
		  console.log('*[workSpace_service]![async_callback] cur_user_info set', cur_user_info ) 
//Wed Mar 16 10:49:35 KST 2022
		  try{
		  		cur_user_configuration = workSpace_factory.cur_user_configuration = JSON.parse( cur_user_info.configuration ) 	
		  }catch(err){
		  		cur_user_configuration = workSpace_factory.cur_user_configuration =  cur_user_info.configuration  	
		  }
		  adminApp_service.setCur_user_info( workSpace_factory.cur_user_info ) 
		  adminApp_service.setCur_user_configuration( workSpace_factory.cur_user_configuration ) 
//Wed Mar 23 09:43:18 KST 2022
	      const apps_list_parent =  this.getAppsList_parent( Data_s[1] ,  cur_user_info )
	      console.log('*[workSpace_service]![async_callback].initAppsList_by_parent_id _call_' ) 
          this.initAppsList_by_parent_id( apps_list_parent[0].title )
	      console.log('*[workSpace_service]![async_callback].initAppsList_by_parent_id _call_ after', workSpace_factory ) 
     	  cb_f( argsList ) 
		  workSpace_factory.app_companyInfo = app_companyInfo = Data_s[2] 
		  adminApp_service.setCompany_info( app_companyInfo[0] ) 
	      console.log('*[workSpace_service]![async_callback].post_initAppsList_f_list_call_:', post_initAppsList_f_list ) 
		  post_initAppsList_f_list.forEach((ent)=>ent()) 
	  })
*/	  
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
	    workSpace_factory.app_cur = app_cur 
		return app_cur 
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
/*
	external params :
	scope : apps_list , app_cur , cur_user_info , apps_list_parent( name , title )  
*/
    this.initAppsList_by_parent_id =( apps_list_parent_name )=>{
	      console.log(`workSpace_service.initAppsList_by_parent_id _start
		  	           desc:  set workSpace_factory.apps_list  and app_cur. 
		  ` ) 
//		cur_user_info = scope.cur_user_info 
		apps_list = workSpace_factory.apps_list = this.updateApps_list_withLimit( apps_list_parent_name, cur_user_info ) 
		app_cur = workSpace_factory.app_cur =  apps_list[0]
// Ezworks adding. 		
		try{
		if( app_cur.ext_link ){
				 $location.path(app_cur.ext_link) 
				 $window.location.href = apps_list[0].ext_link
		}}catch(err){ console.log(err) } 
//		initSpreadjs( apps_list[0].name ) 
	}
///////////////////////////////////////////////////////////////////////////////////////////////////
//  application create / Edit. related..  
///////////////////////////////////////////////////////////////////////////////////////////////////		
	this.createApp = ( app_name ) =>{
	}
}])

