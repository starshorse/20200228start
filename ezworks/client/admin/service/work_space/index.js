angular.module('work_spaceDbEdit',[])
.service('workSpaceDbEdit_service',['restApiServiceDbEdit', function( restApiServiceDbEdit ){
	this.init_app ='app_list'
	this.app_app_list ='app_list' 
	var newAppInfo = { id: 9999 , name:'new App' ,path:'./server/company/data/tbl/',parent:'newApp', level:2 ,stage:1  }  
// following part dupliated with general workSpace_service 	
	this.sidebarApps_init = ( scope )=>{ 
		const cb_f_main =( res )=>{
			scope.apps_list = res
			scope.apps_list_parent = res.reduce(( acc, cur )=>{
				if( cur.level == 1 )acc.push( cur )
				return acc 
			},[])
			this.openApp( scope, this.init_app) 
		}
   		restApiServiceDbEdit.getData( this.init_app , cb_f_main )
	}
// following will move to sidbars parts all 	
	this.openApp = ( scope, tbl_name )=>{
		scope.app_cur = scope.apps_list.find((ent)=>ent.name == tbl_name ) 
 		if( scope.app_cur.stage == 5 ) scope.cmdControlOptions.fileUpload = 0 
		scope.tbl_name = tbl_name
		scope.openTbl( tbl_name ) 
	}
	this.createApp = ( scope )=>{
	     scope.modals[0].callback = ( modal_args , modal )=>{
				scope.tbl_name = modal.input_1.text 
				scope.openTbl( scope.tbl_name ) 
		 }
		 scope.doModal(1) 
	}
	this.saveApp = ( scope )=>{
		if( this.findApp( scope, scope.tbl_name ) == undefined && scope.tbl_name != this.app_app_list ){
			scope.modals[1].callback = ( modal_args, modals )=>{
				this.addNew_app( scope ) 
			}
			scope.doModal(2)  // new app save. 
		}else{
			scope.saveTbl( scope.tbl_name )
		}
	}	
	this.addNew_app = ( scope )=>{
			var lastId = scope.apps_list.reduce((acc, cur )=>{
				 if( cur.id > acc ) acc = cur.id 
				 return acc 
			}, 0 )
			lastId++ 
			var newOne = JSON.parse( JSON.stringify( newAppInfo )) 
			newOne.id = lastId , newOne.title =  newOne.name = scope.tbl_name 
			scope.apps_list.push( newOne ) 
		    scope.updateApp_list_fdb()  
	}
	this.findApp = ( scope , app_name )=>{
		return scope.apps_list.find((ent)=>ent.name == app_name ) 
	}
// mssql App_mssql_flag setting. _start_ 		
// App_mssql_flag. 
// folowing code will used in spreadjs module.. 	
	this.isApp_mssql_exist = ( scope, app_name )=>{
		  const app_info = this.findApp( scope, app_name ) 
		  return app_info.mssql
	}
	this.updateApp_mssql = ( scope, app_name, flag )=>{
		  var app_info = this.findApp( scope, app_name ) 
		  app_info.mssql = flag
	}
// mssql flag setting _end_		
// add new app  to updateApp_list_fdb _start_		
	this.updateApp_list_fdb = ( scope )=>{
			restApiServiceDbEdit.postData( this.app_app_list , scope.apps_list , ( res)=>{
				scope.saveTbl( scope.tbl_name )
			})
	}
	this.command_db_accept = ( scope , args )=>{
		switch( args.cmd_name ){
			case 'createTbl_mssql':
				this.updateApp_mssql( scope , scope.tbl_name , 1 ) // sidebar.js function updateApp_mssql 
				break;
			case 'deleteTbl_mssql':
				this.updateApp_mssql( scope , scope.tbl_name , 0 ) // sidebar.js function updateApp_mssql
				break;
			default:
		}
		this.updateApp_list_fdb( scope ) // sidebar.js function updateApp_list_fdb .. 
	}
	this.command_db = ( scope, cmd_name, data_ )=>{
		switch( cmd_name ){
			case 'createTbl_mssql':
				if( this.isApp_mssql_exist( scope, scope.tbl_name))return  // sidbar.js function  isApp_mssql_exist 
				scope.modals[2].args = { cmd_name, data_ } 
				scope.modals[2].callback = scope.command_db_accept 
				scope.modals[2].content =`${scope.tbl_name}을  Mssql에서 생성합니다.` 
                scope.doModal(3)  
				return 
				break;
			case 'deleteTbl_mssql':
				if( !this.isApp_mssql_exist(scope , scope.tbl_name))return  
				scope.modals[3].args = { cmd_name, data_ } 
				scope.modals[3].callback = scope.command_db_accept 
				scope.modals[3].content =`${scope.tbl_name}을  Mssql에서 삭제합니다.` 
				scope.doModal(4)
				return 
				break;
			default:
		}

	}
}])
