/*
		collectioninfo = { addApp , delteApp } 
*/
angular.module('collection_editor',['ngCookies'])
.controller('collection_editorCtrl', function($scope, $http,$cookies ){
//		$scope.collectionTitle = 'main' ;
		$scope.header_edit_enable = false; 
		$scope.apps_list_edit_enable = false; 
		$scope.extrn_enable = false;  
	    $scope.oSelected = { apps : null } ;
	    $scope.oCurrent = { apps : null } ;
	    $scope.curApps_list =  $scope.collectioninfo.appList || []; 
		let user_DB = $cookies.get('user_DB');  
//		let collectionName = 'newApp' ;
		let collectionName = $scope.collectioninfo.name;

	   ( async ()=>{
			let collectionInfo  
			let response = await $http.get(`http://localhost/hades/collection/info/${ user_DB }/${ collectionName }`).catch((err)=>console.log(err));
			collectionInfo = response.data.DATA 
			if( collectionInfo == undefined )
				return ;
			$scope.collectionTitle = collectionInfo.title 
			$scope.groupSelected = collectionInfo.group_name;
			$scope.collectionLevel = collectionInfo.level ;
			if( collectionInfo.url != null )$scope.extrn_enable = true;
	//		$scope.$apply();
			let collections_list = await $http.get(`http://localhost/hades/collections/${ user_DB }`);
			$scope.collections_list = collections_list.data.DATA  
			let apps_list = await $http.get(`http://localhost/hades/apps/${ user_DB }`);
			$scope.apps_list = apps_list.data.DATA || [];

			let collections_link = await $http.get(`http://localhost/hades/collection/assign/${ user_DB }/${ collectionName }`);
			$scope.curCollections_list = collections_link.data.DATA	
		  /* 
			let app_assign  = await $http.get(`http://localhost/hades/collection/app_assign/${ user_DB }/${ collectionName }`);
			$scope.curApps_list = app_assign.data.DATA  || [];
			*/
	   })(); 
		$scope.header_collection_add =()=>{
			alert( $scope.collectionSelected )
			let collections = $scope.collectionSelected
			$scope.curCollections_list = [...new Set($scope.curCollections_list.concat( collections ))]; 
		}
	    $scope.add_app = ()=>{
			alert( $scope.oSelected.apps )
			if( $scope.oSelected.apps.includes(null)){
				alert(' null not allow ');
			}

			let apps = $scope.oSelected.apps
			$scope.curApps_list = [...new Set($scope.curApps_list.concat( apps ))]; 
			$scope.collectioninfo.addApp( $scope.curApps_list ); 
		}
		$scope.header_collection_remove =()=>{
			let collections = $scope.curCollectionSelected 
			$scope.curCollections_list = $scope.curCollections_list.filter((el) =>!collections.includes(el));
		}
	    $scope.delete_app =()=>{
			let apps = $scope.oCurrent.apps  
			$scope.curApps_list = $scope.curApps_list.filter((el) =>!apps.includes(el));
		    $scope.collectioninfo.deleteApp( $scope.curApps_list );
		}
	    $scope.changeSelectedAdd = ()=>{
			console.log( $scope.oSelected.apps ) 
		}
	    $scope.changeSelectedDelete = ()=>{
			console.log( $scope.oCurrent.apps ) 
		}
})
.directive('collectionEditor', function(){
	return {
		restrict: 'E',
		scope:{
			collectioninfo:'=' 
		},
		templateUrl:'/directives/collection_editor/collection_editor.html',
		controller: 'collection_editorCtrl',
	}
}) 
