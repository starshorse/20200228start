/* angularJs calling order.. 
	app.config()
	app.run()
	directive's compile functions (if they are found in the dom)
	app.controller()
	directive's link functions (again, if found)
*/
angular.module('create_app', [])
.run( function(){ 
/*	
   angularJs.module('create_app').value( 'first_c', [{"name":"seq","displayName":"seq","size":120,"formatter":"* ######","locked":true,"data-type":"string"}]) 
                                 .value( 'first_data', [{"seq":1}] )  */
})
.factory('createApp_factory'[function(){
	return {
		createdApp_list:[]
	}
}])
.service('createApp_service',['restApiServiceDbEdit','spreadJs_service','workSpace_service','sheetFormat_service','workSpaceCollections_service','workSpace_factory',
	function( restApiServiceDbEdit, spreadJs_service, workSpace_service, sheetFormat_service, 
		workSpaceCollections_service, workSpace_factory ){
 	     var  first_c = [{"name":"seq","displayName":"seq","size":120,"formatter":"* ######","locked":true,"TYPE":"NVARCHAR(120)"}]
	     var  newAppInfo = { id: 9999 , name:'new App' ,path:'./server/company/data/tbl/',parent:'newApp', level:2 , edit_level:2,level_limit: 5,  stage:1, configuration:'{}', disable: false , mssql: 0 , ext_link: 0 }  
		 var  first_data = [{"seq":1}]  
		 var  post_deleteApp_f_list = [] 
		 let  dbName = null 
/////////////////////////////////////////////////////////////////////////////////////////////////////////			 
//  function : Create Table on Db_name. 
////////////////////////////////////////////////////////////////////////////////////////////////////////				 
		const setDB_name_tempApp  = ( db_name_ , tbl_name_ )=>{
			 spreadJs_service.initData( JSON.parse( JSON.stringify( first_data )))  
			 let  headInfos  =  sheetFormat_service.retract_loadHead( first_data ) 
			 spreadJs_service.setTbl_name( tbl_name_ ) 
			 dbName = db_name_ 
		}
	     this.tempApp = ( tbl_name_ )=>{
			let dbTbl_check = tbl_name_.split('@') 
			let dbSql_check = tbl_name_.split('#') 
			dbName = null 
/////////////////////////////////////////////////////////////////////////////////////////////////////////			 
// 1 First Check  dbName@tbl_name.. 			 
////////////////////////////////////////////////////////////////////////////////////////////////////////				 
			if( dbTbl_check.length == 2 ){
			   // now First Check DB.. 
// Wed Jun 15 14:38:33 KST 2022
			   let tbl_name_only = dbTbl_check[1] 
			   dbName = dbTbl_check[0] 
			   const tempApp_cb = ( res_ , inargs , err )=>{
					if( err ){ 
						console.log(err) 
					/////////////////////////////////
					// Try DB tbl_creat 
					////////////////////////////////
					    setDB_name_tempApp( dbName , tbl_name_only ) 
						return 
					}
				    spreadJs_service.initData( res_ )
				    spreadJs_service.setTbl_name( tbl_name_ ) 
				    sheetFormat_service.retract_loadHead( res_ ) 
			   }
			   restApiServiceDbEdit.getData( tbl_name_ , tempApp_cb  , { db_mode: 'mssql' } ) 
// Wed Jun 15 14:58:20 KST 2022
			   tbl_name_ = tbl_name_only
			   return  { tbl_name : tbl_name_ , newApp_cur : {'name': tbl_name_ , 'title': tbl_name_ } } 
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
// 2 Second Check dbName#Sql. 
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
            if( dbSql_check.length == 3 ){
				let sql_state = dbSql_check[2]
                let tbl_name_sql = dbSql_check[1]
				dbName = dbSql_check[0] 
			   const tempApp_sql_cb = ( res_ )=>{
				    spreadJs_service.initData( res_.dataFrame.recordset )
				    spreadJs_service.setTbl_name( tbl_name_sql ) 
				    sheetFormat_service.retract_loadHead( res_.dataFrame.recordset ) 
			   }
			// opt : 3 for  CreateApp with sq join 	
		       restApiServiceDbEdit.postDataDoSql( 3  , tempApp_sql_cb , {'query': sql_state , 'db_name': dbName })   
// Wed Jun 15 14:58:20 KST 2022
			   return  { tbl_name : tbl_name_sql , newApp_cur : {'name': tbl_name_sql , 'title': tbl_name_sql } } 
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
// 3. Existing App. 
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
			if( foundApp =  this.findApp( tbl_name_ , 1 )){
				spreadJs_service.openTbl( tbl_name_  )   
				workSpace_service.setAppCur_post( foundApp ) 
				return { tbl_name : tbl_name_ , newApp_cur: foundApp } 
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
// 4. new App. 
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
			 spreadJs_service.initData( JSON.parse( JSON.stringify( first_data )))  
//			 spreadJs_service.initHead( JSON.parse( JSON.stringify( first_c ))) 
			 sheetFormat_service.retract_loadHead( first_data ) 
			 spreadJs_service.setTbl_name( tbl_name_ ) 
			  return  { tbl_name : tbl_name_ , newApp_cur : {'name': tbl_name_ , 'title': tbl_name_ } } 
		 }
		 this.findApp = ( app_name_ , return_obj = 0 )=>{
			 let apps_list_all = workSpace_service.getAppsListAll2_post() 
            if( ( foundApp =  apps_list_all.find(( ent)=>ent.name == app_name_ )) != undefined ){
				if( return_obj ) return foundApp 
				return 1 
			}
			return 0 
		 }
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
/*			
   CreateApp.addNew_app  : 새로운 app 생성하고 DB에 Table를 생성 한다. 
   		global: 
				[ workSpace_service , apps_list_all ] 
		input:
				[ app_name_ : tableName to Create  
				   path :  
			    ]
		return: [
				this.updateApp_list_fdb( app_name_ , spreadJs_service.saveTbl )
				]
*/			
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
	     this.addNew_app = (  app_name_, path= null )=>{
			 let apps_list_all = workSpace_service.getAppsListAll_post() 
			 let lastId = apps_list_all.reduce((acc, cur )=>{
				 if( cur.id > acc ) acc = cur.id 
				 return acc 
			}, 0 )
			lastId++ 
// above part to get lastId  for index. .. ( app_name_ , lastId )
// Global: newAppInfo , workSpace_factory.app_companyInfo , dbName , spreadJs_service.getHeadInfos ,  			 
/*
		External var: 
*/
					 let headInfos_ = spreadJs_service.getHeadInfos() 
			         let companyName =  workSpace_factory.app_companyInfo[0].CorporationName 
/*
	    External Call: 
*/
			 		 const afterDb_cb_f = ( newOne_)=>{
								 apps_list_all.push( newOne_ ) 
								 workSpace_service.setAppsListAll_post( apps_list_all )
								 this.updateApp_list_fdb( app_name_, spreadJs_service.saveTbl )  
					 }
			 this.addNew_app_db( lastId, app_name_ , headInfos_ , companyName , path, dbName, afterDb_cb_f ) 
		 }
		 this.addNew_app_db = ( lastId , app_name_ , headInfos_ , companyName , path, dbName, afterDb_cb_f )=>{
			var newOne = JSON.parse( JSON.stringify( newAppInfo )) 
			newOne.id = lastId , newOne.title =  newOne.name = app_name_ 
// Fri Feb 25 16:40:08 KST 2022
			newOne.path = `./server/company/data/company/${ companyName }/`
			if(path)newOne.path = path 
			 try{	 
				 if( dbName ){ 
					 newOne.configuration = JSON.parse( newOne.configuration ) 
					 newOne.configuration['db_name'] = dbName 
					 newOne.mssql = 1 
					 restApiServiceDbEdit.command_db('createTbl_mssql', app_name_ , { app_info: newOne , headInfo : headInfos_ } , 
						 ( res_ )=>{ 
							 console.log( res_ ) 
							 if( res_.STATUS == 1 ){
					             newOne.configuration = JSON.stringify( newOne.configuration ) 
								 console.log( newOne ) 
								 afterDb_cb_f( newOne ) 
							 }
						 })
//					 throw { STATUS: -1 , RESULT :'err' , ERRORMESSAGE :'Test' }
				 }else{
					 //temp return 
					 //		return 
					 //Tue Jul 12 13:18:15 KST 2022
					 afterDb_cb_f( newOne ) 
				 }
			 }catch(err){
				 console.log( err.ERRORMESSAGE ) 
			 }
     	}
/*		
Tue May 17 01:26:40 UTC 2022 , update apps_list function. 
*/
	    this.updateApp_list_entry = ( app_name_ , key_ , value_ )=>{
			 let apps_list_all = workSpace_service.getAppsListAll_post() 
			 if( app_ent = apps_list_all.find((ent)=> ent.name == app_name_ )){
				 if( app_ent.edit_level > -1 )
				   		app_ent[key_] = value_ 
		     }	
			 workSpace_service.setAppsListAll_post( apps_list_all ) 
		    this.updateApp_list_fdb( app_name_, spreadJs_service.saveTbl )  
		}
		this.addPost_deleteApp_f_list = ( ft_name )=>{
			post_deleteApp_f_list.push( ft_name ) 
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
/*			
   CreateApp.deleteApp  :  DB에 Table를 삭제  
   		global: 
				[ workSpace_service , apps_list_all ] 
		input:
				[ app_name_ : tableName to Delete   
			    ]
		return: [
			 		this.updateApp_list_fdb( app_name_ ),
					post_deleteApp_f_list.forEach((ent)=>ent()) 
				]
*/			
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
		this.deleteApp_db = ( app_name_ , db_name , afterDb_cb_f )=>{
				restApiServiceDbEdit.command_db('deleteTbl_mssql', app_name_ , { db_name } , afterDb_cb_f  ) 
		}
		this.deleteApp = ( app_name_ )=>{
//Mon May 16 06:22:57 UTC 2022
			workSpaceCollections_service.deleteApp_collectionList( app_name_ ) 
// Let..			return 
		    let apps_list_all = workSpace_service.getAppsListAll_post() 
            let pos = apps_list_all.map((ent)=>ent.name).indexOf(app_name_)  			
			let app1 = apps_list_all.find( i=>i.name == app_name_ ) 
			let paramsApp ={ mssql: app1.mssql , appConfiguration : JSON.parse( app1.configuration ) } 
 // remove the tbl from MSSQL. 			
			const afterDb_cb_f = ( res_ )=>{
				if( res_.STATUS == 1 ){
					console.log('1', pos, app1 )
					pos = apps_list_all.findIndex( i=>i.name == app_name_ ) 
					console.log('2', pos ) 
					apps_list_all.splice( pos , 1 ) 
					workSpace_service.setAppsListAll_post( apps_list_all )
					this.updateApp_list_fdb( app_name_ ) 
					post_deleteApp_f_list.forEach((ent)=>ent()) 
				}
			}
            if( paramsApp.mssql ){
				let db_name = paramsApp.appConfiguration.db_name 
				this.deleteApp_db( app_name_ , db_name , afterDb_cb_f ) 
			}else{
			    console.log('1', pos, app1 )
			    pos = apps_list_all.findIndex( i=>i.name == app_name_ ) 
			    console.log('2', pos ) 
			    apps_list_all.splice( pos , 1 ) 
				workSpace_service.setAppsListAll_post( apps_list_all )
				this.updateApp_list_fdb( app_name_ ) 
				post_deleteApp_f_list.forEach((ent)=>ent()) 
			}
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
/*			
   CreateApp.updateApp  :  DB에 Table를 변경   
   		global: 
				[ workSpace_service , apps_list_all ] 
		input:
				[ 	command_id : id of command. 
					app_name_  : tableName to Modify    
					col_name_  : col_name  to Modify 
					col_data_  :
					cb_f       : call back function. 
			    ]
		return: [
					cb_f 
				]
*/			
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
		this.updateApp_db = ( command_id , app_name_ , params , cb_f ) =>{
		    switch( command_id ){
				 case 'addCol':
				 case 'deleteCol':
				 case 'updateCol':
					restApiServiceDbEdit.command_db( command_id, app_name_ , params , cb_f  )   
					 break;
				 default:
			 }
		}
        this.updateApp = ( command_id , app_name_ , col_name_ = null, col_data_ = null , cb_f = null )=>{
			let result = { STATUS : -1 , RESULT:'err' , CODE: 200 , ERRORMESSAGE:'' } 
		    let apps_list_all = workSpace_service.getAppsListAll_post() 
			let app1 = apps_list_all.find( i=>i.name == app_name_ ) 
			let paramsApp ={ mssql: app1.mssql , appConfiguration : JSON.parse( app1.configuration ) } 
			if( !paramsApp.mssql ) return cb_f( result )  
			let db_name = paramsApp.appConfiguration.db_name 
			let params  = { col_name : col_name_ , col_data : col_data_ , db_name_test : db_name  }
			this.updateApp_db( command_id , app_name_ , params , cb_f ) 
		}
// add new app  to updateApp_list_fdb _start_		
      	this.updateApp_list_fdb = ( app_name_ , cb_f = null )=>{
			let apps_list_all = workSpace_service.getAppsListAll_post() 
			let app_apps_list = workSpace_service.getAppAppsList_post() 
			restApiServiceDbEdit.postData( app_apps_list.name, apps_list_all , (res)=>{
//				spreadJs_service.saveTbl( app_name_ )
				if( cb_f )cb_f( app_name_ ) 
			})
	     } 
		this.saveApp = ( app_name_ = null )=>{
			if( this.findApp( app_name_ ) ) spreadJs_service.saveTbl( app_name_ ) 
		}
		this.saveToApp = ( app_name_ , app_path_ )=>{
			 let apps_list_all = workSpace_service.getAppsListAll_post() 
			 let app1 = apps_list_all.find( i=>i.name == app_name_ ) 
			 app1.path  = app_path_
		    workSpace_service.setAppsListAll_post( apps_list_all )
		    this.updateApp_list_fdb( app_name_, spreadJs_service.saveTbl )  
		}
}])
