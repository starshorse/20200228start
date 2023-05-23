angular.module('hotLink', [])
.factory('hotLink_factory',['spreadJs_service',function(spreadJs_service){
	var hotLink_factory = {
		app_cur_ent_id: 0,
		hotLink_enable : 0, 
		path_dataedit2go : ()=>{ 
			let app_cur_ent_id = hotLink_factory.app_cur_ent_id
			if( app_cur_ent_id != 0 ){
				let spread_data = spreadJs_service.getDbData() 
				working_ent = spread_data.find(( ent)=> ent.id == app_cur_ent_id ) 
				if( working_ent == undefined ) working_ent = spread_data.find(( ent)=> ent.seq == app_cur_ent_id ) 
				spreadJs_service.setWorking_ent( working_ent ) 
				app_cur_ent_id = 0 
				return 1 
				//			scope.mode = 1
				//			scope.change_dataedit() 
				//			$scope.$apply() 
			}
			return 0 
		}
	}
	return hotLink_factory 
}])
.service('hotLink_service',['$location','workSpace_service','hotLink_factory', function($location, workSpace_service ,hotLink_factory  ){
	 var _params 
	 var app_cur_ent_id = 0 
	 this.setHotLink_enable = ( flag) =>{ hotLink_factory.hotLink_enable = flag } 
	 this.getHotLink_enable = ()=>hotLink_factory.hotLink_enable 
	 this.getPath = ()=>{
		 console.log('hotLink_service getPath _start') 
		 return $location.path() 

	 }
     this.getParams = ()=>{
		 console.log('hotLink_service getParams _start') 
	    return  _params = $location.search() 
	 }
	 this.path_url2go = ()=>{
		let hotLink_flag = 0 
		this.getParams() 
		if( _params.tbl_name != undefined ){
			let apps_list_all = workSpace_service.getAppsListAll2_post() 
			var req_app = apps_list_all.find((ent)=>ent.name == _params.tbl_name ) 
			if( req_app != undefined ){
		        workSpace_service.setAppCur_post( req_app )  
			    let apps_list_parent = workSpace_service.getAppsList_parent_post() 
				let cur_user_info = workSpace_service.getAppCur_userInfo_post() 
				try{
					let  req_app_parent = apps_list_parent.find((ent)=>ent.name == req_app.parent ) 
		        	let apps_list = workSpace_service.updateApps_list_withLimit( req_app_parent.title , cur_user_info ) 
					workSpace_service.setAppsList_post( apps_list ) 
				}catch(err){
					console.log(err) 
				}
				if( _params.id != undefined ) app_cur_ent_id  = parseInt(_params.id ) ; 
//		        initSpreadjs( scope.app_cur.name ) 
//clear Parms data 
				_params = undefined 
				 hotLink_flag = 1 
				 return { hotLink_flag , req_app } 
            }
		}
		return { hotLink_flag , req_app } 
	 }
// following path_dataedit2go function need spreadJs_service... 
	 this.path_dataedit2go = ()=>{
		 hotLink_factory.path_dataedit2go() 
	 }
	this.path_clear = ()=>{
		    $location.url($location.path()) 
	}
	this.path_set_app = ( my_collection, tbl_name_ )=>{
		   $location.path('/') 
		   $location.url( $location.path() +`?my_collection=${my_collection}&tbl_name=${tbl_name_}`) 
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   External interface.. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
    this.getApp_cur_ent_id = ()=> app_cur_ent_id  
}])
