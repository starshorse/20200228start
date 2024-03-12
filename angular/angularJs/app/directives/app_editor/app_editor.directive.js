angular.module('app_editor',['ngCookies'])
.controller('app_editorCtrl',async function( $scope, $http, $cookies ){
//		$scope.appTitle =  'main' ;
		$scope.is_app = true; 
		$scope.app_share_enable = false; 
		$scope.extrn_enable = false;  
		$scope.ids =  { idSelected : null , curIdSelected : null } ;
		let user_DB = $cookies.get('user_DB');  
//		let appName = 'ezct_account' ;
	    let appName = $scope.appinfo.name ; 
	    let response 
		response = await $http.get(`http://localhost/hades/app/info/${ user_DB }/${ appName }`).catch((err)=>console.log(err) );
		let	appInfo = response.data.DATA 
		$scope.appTitle = appInfo.title 
		$scope.groupSelected = appInfo.group_name;
		$scope.appLevel = appInfo.level ;
		if( appInfo.url != null )$scope.extrn_enable = true;
		$scope.share_id_add = async ()=>{
			alert( $scope.ids.idSelected )
			for( id of $scope.ids.idSelected ){
				if( !$scope.curIds_list.includes( id )){
					await $http({ method:'POST' , url:`http://localhost/hades/app/assign/${ user_DB }` , data: { appName , user_id: id  }})
					$scope.curIds_list.push( id )
				}
			}
		   $scope.$apply() 
		}
		$scope.share_id_remove = async ()=>{
			alert( $scope.ids.curIdSelected )
			for( id of $scope.ids.curIdSelected ){
					await $http({ method:'DELETE' , url:`http://localhost/hades/app/assign/${ user_DB }` , data: { appName , user_id: id  }})
			}
			$scope.curIds_list = $scope.curIds_list.filter((el) =>!$scope.ids.curIdSelected.includes(el));
			$scope.$apply() 			
		}
		// $cookies : user_DB , user , org_name  
		// server_name/org_name/user_id    
/*	
		$http.get(`http://localhost/hades/app/group_list/${ user_DB }`).then(( response )=>{ 
			if( response.data.STATUS == -1 ){
				alert( response.data.ERRORMESSAGE )
				return -1;
			}
			$scope.groups_list = response.data.DATA 
		}).catch(( err)=>{
			console.log( err );
			$scope.groups_list =[
				'default',
			]
		})
		$http.get(`http://localhost/hades/app/assign/${ user_DB }/${ appName }`).then(( response )=>{ 
			if( response.data.STATUS == -1 ){
				alert( response.data.ERRORMESSAGE )
				return -1;
			}
			$scope.curIds_list = response.data.DATA 

		}).catch(( err)=>{
			$scope.curIds_list = [
			]
		})
		//		 $http({ method: 'GET',url:'http://127.0.0.1/hades/ids_list',  withCredentials: true }).then(( response )=>{ 
		$http({ method: 'GET',url:`http://127.0.0.1/hades/ids_list/${ user_DB }`}).then(( response )=>{ 
			if( response.data.STATUS == -1 ){
				alert( response.data.ERRORMESSAGE )
				return -1;
			}
			$scope.ids_list = response.data.DATA 

		}).catch(( err)=>{
			$scope.ids_list = [
				'error@error.com',
				'hades@problem.com' 
			]
		})
		*/		
		$scope.$apply() 			

})
.directive('appEditor',function(){
	return {
		restrict:'E',
		scope:{
			appinfo:'='
		},
		templateUrl:'/directives/app_editor/app_editor.html',
		controller:'app_editorCtrl',
	}
})
