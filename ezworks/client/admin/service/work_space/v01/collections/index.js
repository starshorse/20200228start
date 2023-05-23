angular.module('work_space.collections',[])
.run(function(){
/*	
Mon May 16 23:59:15 UTC 2022 SpreadJS err 
	 Array.prototype.remove_collectionArray  = function() {
    } */	
})
.factory('workSpaceCollections_factory',[function(){
	var workSpaceCollections_factory = {
		post_initCollection_f_list : [], 
		post_overrideCollection_f_list : [], 
		pre_initCollection_f_list : [], 	
		headerList : [],
		sidebarAppsList : [], 
		sidebarAppsParentList : [], 	
		my_collection :  null, 	
		my_collectionConfiguration : null, 
		collections_list : null ,
	}
	return workSpaceCollections_factory 
}])
.service('workSpaceCollections_service', ['$injector','$location','$window','restApiServiceDbEdit' ,'workSpace_service','adminApp_service','workSpaceCollections_factory',
	function( $injector,$location, $window, restApiServiceDbEdit, workSpace_service, adminApp_service, workSpaceCollections_factory ){
	 const collectionListApp = 'collection_list' 
     var post_initCollection_f_list = [] 
     var post_overrideCollection_f_list = [] 
	 var pre_initCollection_f_list = [] 	
	 var headerList = []
	 var sidebarAppsList = [] 
	 var sidebarAppsParentList = [] 	
	 var my_collection  = null 	
	 var my_collectionConfiguration = null 
	 var collections_list = null 
	 this.getHeaderList = ()=>{ return headerList } 
	 this.getSidebarAppsList = ()=>{ return sidebarAppsList } 	
	 this.getSidebarAppsParentList = ()=>{ return sidebarAppsParentList } 	
	 this.getMyCollection = ()=>{ return my_collection } 	
	 this.getMyCollectionConfiguration = ()=>{ return my_collectionConfiguration } 
	 this.getAppCur_post =  workSpace_service.getAppCur_post 

	var $http = $injector.get('$http') 		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Initialization  collections 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	 this.promise_getCollectionListData = ()=>{
		 return new Promise(( resolve , reject )=>{
	         console.log('*[workSpaceCollections_service][promise] promise_getCollectionListData _start_') 	
			 restApiServiceDbEdit.getData( collectionListApp ,( Data_)=>{ resolve( Data_ )}) 
		 })
	 }
	 this.promise_postCollectionListData = ( coll_list_data_, cb_f = null ) =>{
         return new Promise(( resolve , reject )=>{
			 restApiServiceDbEdit.postData( collectionListApp , coll_list_data_ , ( Data_ )=>{
				 if( cb_f )cb_f( Data_ ) 
				 resolve( Data_ ) })
		 })
	 }	
	 this.deleteApp_collectionList = ( app_name_ )=>{
		    const remove_collectionArray = ( arr_entry , app_name_ ) =>{
				let index = arr_entry.indexOf( app_name_ ) 
				if( index !== -1 )arr_entry.splice( index, 1 ) 
			}
			this.promise_getCollectionListData()
			 .then(( Data_ )=>{
				return new Promise(( resolve, reject )=> {
					Data_.forEach((ent)=>{
						if( ent.apps ){
							let arr_entry = JSON.parse( ent.apps ) 
							remove_collectionArray( arr_entry , app_name_ ) 
							ent.apps = JSON.stringify( arr_entry ) 
						}  
					})
					resolve( Data_ ) })
			 })
			  .then(( Data_ )=>{
				  this.promise_postCollectionListData( Data_ , (res_)=>console.log( res_) ) 
			 })
	 }
	 this.makeHeader_list = ( collections_list )=>{
		  console.log('*[workSpaceCollections_service][makeHeader_list]  makeHeader_list _start_') 
		  let headerList_ 
	      try{
			 headerList_ = JSON.parse( my_collection.parent )
		  }catch(err){
			 headerList_ = my_collection.parent 
		  }
		  let workSpace_factory = workSpace_service.getWorkSpace_factory() 
		  headerList = []  // clear headerList
		  if( collections_list == null ){
		          console.log('*[workSpaceCollections_service][makeHeader_list] collections_list should not  null.') 
		  }
		  headerList_.forEach((ent)=>{
			switch( ent ){
				case '%collections_list%':
					let coll_list = collections_list.filter((ent1)=>{
						if( ent1.configuration != undefined ){
							let configuration = JSON.parse( ent1.configuration )
							return configuration.menuListAble == 1
						}else{
							return false 
						}
					}) 
					coll_list.forEach((ent0)=> headerList.push( JSON.parse( JSON.stringify({'title': ent0.title, 'url':ent0.url, 'url_target':ent0.url_target })))) 
					break;
				default:
					let ent0 = collections_list.find((ent1)=>ent1.name == ent )
					  if( ent0 != -1 && ent0 != undefined ){
//						   if( ent0.title == '%user%' ) ent0.title = workSpace_service.getAppCur_userInfo_post().name 
						   if( ent0.title == '%user%' ) ent0.title = workSpace_factory.cur_user_info.name 
						   headerList.push( JSON.parse( JSON.stringify({'title':ent0.title , 'url': ent0.url, 'url_target': ent0.url_target })) )
					  }
		  }})
		  console.log('*[workSpaceCollections_service]![async_callback]  makeHeader_list _end_') 
 	 }
	 this.makeSidebarApps_list = ()=>{
		  console.log('workSpaceCollections_service/makeSidebarApps_list()  my_collection.apps _start_', my_collection.apps ) 
		  if( my_collection.apps == undefined )return 
		  let sidebarAppsList_ 
		  try{
		  	 sidebarAppsList_ = JSON.parse( my_collection.apps )
		  }catch(err){
		  	 sidebarAppsList_ =  my_collection.apps 
		  }
		 if( !sidebarAppsList_ )return 

		  let workSpace_factory = workSpace_service.getWorkSpace_factory() 
//		  let apps_list = workSpace_service.getAppsListAll_post() 
		  let apps_list = workSpace_factory.apps_list_all 
		  console.log( 'apps_list', sidebarAppsList_ )  

		  sidebarAppsList_.forEach((ent)=>{
			 switch( ent){
				 case '%apps_list%':
					  let apps_list_ = apps_list.filter((ent1)=>ent1.stage == 5 ) 
					  apps_list_.forEach((ent0)=>{
							  sidebarAppsList.push( JSON.parse( JSON.stringify( ent0 )) ) 
					  })
					 break;
				  case '%collections_list%':
					    sidebarAppsParentList = []
					    sidebarAppsList = [] 
				    	let coll_list = collections_list.filter((ent1)=>{
							if( ent1.configuration != undefined ){
								let configuration 
								try{
								   configuration = JSON.parse( ent1.configuration )
								}catch(err){
								   configuration = ent1.configuration
								}
								return configuration.menuListAble == 1
							}else{
								return false 
							}
					    }) 
					    coll_list.forEach((ent0)=>sidebarAppsParentList.push( JSON.parse( JSON.stringify({'name': ent0.name,'title': ent0.title, 'url':ent0.url })))) 
					    workSpace_factory.apps_list_parent = coll_list 
					    workSpace_factory.apps_list_all_parent = coll_list 

					    coll_list.filter((ent2)=>ent2.apps != undefined ).forEach((ent0)=>{
							let apps_list_  
							try{
							    apps_list_ = JSON.parse( ent0.apps ) 
							}catch(err){
							    apps_list_ = ent0.apps  
							}
							apps_list_.forEach((ent1)=>{
								try{
									let app_ent = apps_list.find((ent2)=>ent2.name == ent1 ) 
									let app_ent1 = JSON.parse( JSON.stringify( app_ent )) 
									app_ent1.parent = ent0.name 
									sidebarAppsList.push( app_ent1 ) 	
								}catch(err){
									console.log( err ) 
					    			console.log( 'err ent0 ent1',  ent0 , ent1 ) 
								}
							})
						})
					  break;
				 default:	 
					  let ent0 = apps_list.find((ent1)=>ent1.name == ent )
						  if( ent0 != -1 && ent0 != undefined ){
							  sidebarAppsList.push( JSON.parse( JSON.stringify( ent0 )) ) 
						  }
			 }})
		     workSpace_factory.apps_list = sidebarAppsList 
		     workSpace_factory.apps_list_all  = sidebarAppsList
		     console.log('workSpaceCollections_service/makeSidebarApps_list()  my_collection.apps _end_', sidebarAppsList  ) 
 	 }
	 this.initCollection_f = ()=>{
		 this.initCollection_f.addPost_initCollection_f_list = ( ft_name )=>{
			 post_initCollection_f_list.push( ft_name ) 
		 }
		 this.initCollection_f.addPost_overrideCollection_f_list = ( ft_name )=>{
			 post_overrideCollection_f_list.push( ft_name ) 
		 }
	 }
	 console.log('*workSpaceCollections_service register  initCollection_f()') 	
	 this.initCollection_f() 
/*
	Entry point for collection init.. 
*/
	 this.initCollection = async ( my_collection_name = 'AppEdit' , post_initCollections )=>{
//		 this.promise_getCollectionListData().then((Data_)=>{
//1		 let Data_ = await this.promise_getCollectionListData(); 
		 let temp_data = await $http.get('/web_admin_editor/collections_list/ezchemtech').catch((err)=>{ console.log( err )}); 
		 let Data_ = temp_data.data.DATA 

			 console.log('*[workSpaceCollections_service]![async_callback] collectionList all Data\n',Data_ ) 
			 console.log('*[workSpaceCollections_service]![async_callback]  my_collection_name',my_collection_name ) 
			 collections_list = workSpaceCollections_factory.collections_list =  Data_ 
			 my_collection = workSpaceCollections_factory.my_collection =   Data_.find((ent)=>ent.name == my_collection_name ) 
// check authentication  
		 
			 let cur_user_info =  adminApp_service.getCur_user_info() 
			 if( my_collection.level < cur_user_info.level ){
				 adminApp_service.goBack() 
				 throw new Error('Forward to back !'); 
			 }

// Wed Mar 16 11:05:15 KST 2022
			 try{
		     	my_collectionConfiguration = workSpaceCollections_factory.my_collectionConfiguration = JSON.parse( my_collection.configuration ) 
			 }catch(err){
		     	my_collectionConfiguration = workSpaceCollections_factory.my_collectionConfiguration = my_collection.configuration  
			 }
			 console.log('*[workSpaceCollections_service]![async_callback]  this.makeHeader_list with:', Data_ ) 
			 this.makeHeader_list( Data_ )
			 this.makeSidebarApps_list() 
			 console.log('*[workSpaceCollections_service]![async_callback] post_initCollection _f_list _call_', post_initCollection_f_list ) 
			 post_initCollection_f_list.forEach((ent)=>ent()) 
			 console.log('*[workSpaceCollections_service]![async_callback] post_initCollections _call_' ) 
			 post_initCollections() 
//		 })
	 }
	 this.overrideCollection = ( my_collection_name , post_overrideCollections )=>{
			 my_collection = collections_list.find((ent)=>ent.name == my_collection_name ) 
		     my_collectionConfiguration = JSON.parse( my_collection.configuration ) 
			 adminApp_service.authenticateCollection( my_collection )
			 this.makeHeader_list( collections_list )
			 this.makeSidebarApps_list() 
			 post_overrideCollection_f_list.forEach((ent)=>ent()) 
			 post_overrideCollections() 
	 }
///////////////////////////////////////////////////////////////////////////////////////////////////////////	
//  Edit mode. 
///////////////////////////////////////////////////////////////////////////////////////////////////////////			
	var post_openCollection_f_list = [] 		
	this.op_collection = ()=>{		
		this.op_collection.addPost_openCollection_f_list = ( ft_name )=>post_openCollection_f_list.push( ft_name ) 
		this.op_collection.openCollection = ( my_collection )=>{
			post_openCollection_f_list.forEach((ent)=>ent()) 
        }
	}
	console.log('workSpaceCollections_service start op_collection()') 	
	this.op_collection() 
}])
