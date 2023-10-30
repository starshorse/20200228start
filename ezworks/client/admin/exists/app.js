/*
 *	Jupitor Web admin  collections and appl management. 
 */
 angular.module('myDbEditExists', ['ngRoute',
// parts components. 	 
	'myDbEditCmdInput',
	'mySpreadjs',
	'myDbEditSheet1', 
	'myDbEditAddOpts',
	'myDbEditSidebar', 
	'myFooter',
	'myDomodal', 
	'status_indicate', 
	 'work_space',
	 'spread_js',
	 'spreadjs_filters',
	 'spreadjs_events',
	 'admin_app',
	 'sheetFormat',
	 'sheetCmd',
	 'addSheets',
	 'gc_spreadjs',
])
.config( function($locationProvider, $routeProvider ){
	$locationProvider.html5Mode({ enabled:true , requireBase: false} )
	$routeProvider.when('/',{ 
	})
	.when('/jupitor_config/:config_name',{
		template:`
		<div id='appWrapper' class='mx-2 px-2'>
			<my-indicate></my-indicate> 
			<cmd-input></cmd-input>                                    
			<my-spreadjs></my-spreadjs>                                
			<my-events></my-events>
			<my-sheet1></my-sheet1>
			<my-addopts></my-addopts>
		</div>
		`,
		controller: function($scope, $routeParams,$location ){
			$scope.$parent.is_jupitorConfig = 1 ;
			let config_name =  $routeParams.config_name 
			if( config_name != 'first' ){
				let config_obj = $scope.$parent[config_name]
				$scope.$parent.set_spreadCreate_flag(0) // request create spread. 
				$scope.$parent.openApp( config_obj ) 
			}
		}

	})
	.when('/codeFApi/:service_name', {
		templateUrl: '/admin/templates/limit_codeFApiService.html' ,
		controller:'limit_codeFApiCtrl' ,
		resolve:{
			limit_codeFApi:['$route','limit_codeFApiService',async function( $route, limit_codeFApiService ){
				let  service_name = $route.current.params.service_name 
				return await limit_codeFApiService.getCodeFApiService( service_name  )
			}]
		},
	})
	.when('/limit_orgList', {
		templateUrl: '/admin/templates/limit_orgList.html' ,
		controller:'limit_orgListCtrl' ,
		resolve:{
			limit_orgList: async function( limit_orgListService ){
				return await limit_orgListService.getAllData()
			},
			limit_list: async function( limit_orgListService ){
				return await limit_orgListService.getLimit_list() 
			},
			service_list: async function( limit_orgListService ){
				return await limit_orgListService.getServices_list() 
			}
		},
	})
	.otherwise( { redirectTo :'/jupitor_config/first' } ) 
})
.controller('myDbEditExistsCtrl', 
['$scope','$injector',
'workSpace_service', 
//1 'restApiServiceDbEdit',
'adminApp_service',
	function($scope, $injector, 
workSpace_service , 
//1 restApiServiceDbEdit,
adminApp_service, 
){
	$cookies = $injector.get('$cookies')	
//1   
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..  part function.. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
	$scope.cur_server = 'ezoffice' 
	$scope.server_list = ['demo','ezoffice','ezchemtech','unionlogis','orientpi'] 
	$scope.openApp_1 = ( app_server_list )=>{
		if( $scope.cur_server != 'ezoffice' ){
			alert("Only ezoffice menu!")
			return -1; 
		}
		$scope.openApp( app_server_list ); 
	}
	$scope.cur_server = $cookies.get('user_DB') 	
// Here check hostname , juipter only support ezoffice365.com 
	const serverList_update = ( serverList )=>{
		$scope.server_list = serverList 
		$scope.$apply()
		document.getElementById('inputGroupSelect01').value = $scope.cur_server
 	}
	workSpace_service.set_f_serverList_update( serverList_update ); 	
	workSpace_service.update_curServer( $scope.cur_server )

	var $location = $injector.get('$location')  
	let host = $location.host() 
	if( host != 'localhost' &&  host != 'ezoffice365.com' ){
		let port = $location.port() 
		let url = $location.url() 
		console.log('host:port/url', host, port, url ) 
		window.location.href = `http://ezoffice365.com:${port}/db_edit/exists${ url }`
	}
// Wed Mar  2 14:37:01 KST 2022
	angular.extend(this, new appCtrl( $scope, $injector, 
workSpace_service , 
adminApp_service, 
// workSpaceCollections_service 
)) 
///////////////////////////////////////////////////////////////////////////////////////////////////
//  2023-04-26  Work..   company workSpace. part. 
///////////////////////////////////////////////////////////////////////////////////////////////////		
}])
.controller('limit_codeFApiCtrl', ['$scope',
'$routeParams',
'limit_codeFApi',
'limit_codeFApiService',
'$routeParams',	
	function(
		$scope, 
        $routeParams,
		limit_codeFApi,
        limit_codeFApiService,
		$routeParams
	){
		$scope.$parent.is_jupitorConfig = 0 ;
		  let update_result = { title: '결과' , content:' 업데이트 완료' , callback: async function(){} }
	      let update_confirm = { title: '업데이트' , content:'변경사항을 업데이트 하시겠습니까?' , callback: async function(){ 
               var result = await $scope.updateService_limits_codeFApi_DB();
//			   alert("update done!")} 
			   if( result.RESULT == -1 ){
				   update_result.content = result.ERRORMESSAGE 
			   }
			   $scope.modal = update_result
			   $scope.$apply() 
			   $scope.$broadcast('doModal'); 
		 }}
		$scope.modal = update_confirm 	   
		console.log( $scope.is_jupitorConfig );
		$scope.service_name = $routeParams.service_name
	    limit_codeFApi.forEach((ent)=>{
			   if( ent['enabled'] )
				   ent['enabled'] = true ;
			   else
				   ent['enabled'] = false;
		 })
		$scope.limit_codeFApi = limit_codeFApi 
	    $scope.button_click =()=>{
		       $scope.modal = update_confirm 	   
			   $scope.$broadcast('doModal'); 
			   console.log( $scope.service_name , limit_codeFApi ) 
        }
		$scope.updateService_limits_codeFApi_DB = async ()=>{
			let json = limit_codeFApi.filter((ent)=>ent.enabled == true && ent.enabled == 1 ) 
            return await limit_codeFApiService.merge_codeFApiservice( $routeParams.service_name, json )
		}
}
])
.controller('limit_orgListCtrl', ['$scope',
'limit_orgList',
'limit_list',
'service_list',
'limit_orgListService',  
 function( 
		$scope, 
		limit_orgList, 
		limit_list, 
		service_list,
		limit_orgListService
	){
		   $scope.$parent.is_jupitorConfig = 0 ; 
	       let update_confirm  = { title: '업데이트' , content:'변경사항을 업데이트 하시겠습니까?' , callback: async function(){ 
               let result = await $scope.updateService_limits_DB();
			   alert("update done!")} 
		   }
	       $scope.modal = update_confirm 
//	       $scope.limit_orgList = limit_orgList 
	       $scope.service_limits 
	       $scope.limit_list = limit_list 
	       $scope.service_list = service_list 
	       $scope.cur_service = service_list[0] 
	       this.changes_index = [] 
//	       $scope.service_limits = limit_orgListService.getService_limits( $scope.cur_service );
	       $scope.updateService = ()=>{
			   limit_orgListService.getService_limits( $scope.cur_service ).then((data)=>{
				   $scope.service_limits = data ;
				   $scope.$apply(); 
		   })}
	       $scope.updateService();
	       $scope.service_changed =( service )=>{
			   console.log( service ) 
			   $scope.updateService();
		   }
	       $scope.service_limit_changed = ( index )=>{
//			   alert("index" + index + $scope.cur_service );
			   console.log( $scope.service_limits[index] )
			   this.changes_index.push( index )
			   this.changes_index = [...new Set(this.changes_index)] 
		   }
	       $scope.button_click =()=>{
		       $scope.modal = update_confirm 	   
			   $scope.$broadcast('doModal'); 
		   }
	       $scope.updateService_limits_DB = async ()=>{
			   for( index of this.changes_index ){
				  await limit_orgListService.postServices_limitSetting( $scope.service_limits[index] , $scope.cur_service )
			   }
		   }

}]) 
.service('limit_codeFApiService',['$injector','$q',function($injector, $q ){
	var $http = $injector.get('$http') 
	this.getCodeFApiService = async ( service_name )=>{
		let result = await $http.get(`/Hades/service_admin/codeFApi_service/${ service_name }`) 
		return result.data.DATA 
	}
	this.merge_codeFApiservice = async( service_name , json )=>{
		let result = await $http({ method:'POST', url: `/Hades/service_admin/codeFApi_service/${ service_name }`, data:{ json: JSON.stringify( json) }}) 
		return result.data 
	}
}])
.service('limit_orgListService',['$injector','$q',function($injector, $q ){
	var $http = $injector.get('$http') 
	this.getReport = async ()=>{
		let result = await $http.get('/Hades/service_admin/service_setting') 
		let org_access_method = result.data.DATA 
		return org_access_method 
	}
	this.getAllData = async ()=>{
		let result_2 = await $http.get('/Hades/service_admin/service_orglist') 
		let org_access_method = result_2.data.DATA 
		return org_access_method 
	}
	this.getService_limits = async ( serviceFull )=>{
		let result_2 = await $http.get(`/Hades/service_admin/service_orglist/${ serviceFull }`) 
		let org_access_method = result_2.data.DATA 
		return org_access_method 
	}
	this.getLimit_list = async ()=>{
		let result = await $http.get('/Hades/service_admin/service_permissionlist') 
		if( result.data.STATUS == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1 ;
		}
		let permissionList = result.data.DATA.map((ent)=>ent.value);
		return permissionList

	}
	this.getServices_list = async ()=>{
		let result = await $http.get('/Hades/service_admin/service_servicelist') 
		if( result.data.STATUS == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1 ;
		}
		let serviceList = result.data.DATA.map((ent)=>ent.serviceFull );
		return serviceList
	}
    this.postServices_limitSetting = async ( row_data , service_id )=>{
		let orgName = row_data['orgName']
	    let data = { permissionType_2 : row_data['permissionType_2'] }
	    let	url = `/Hades/service_admin/service_setting/${ orgName }/${ service_id }`	

		let result = await $http({ method:'POST' , url , data }) 
		if( result.data.STATUS == -1 ){
			alert( result.data.ERRORMESSAGE )
			return -1 ;
		}
	}
}])
