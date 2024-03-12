angular.module('myControllers', ['work_space'])
.controller('pageCtrl', function( $scope, $injector ){
	var $window = $injector.get('$window') 
	var $http = $injector.get('$http') 
	var $state = $injector.get('$state') 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  User Infomation 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////		
	var $cookies = $injector.get('$cookies')
	let id = $cookies.get('user')
	let user_DB = $cookies.get('user_DB')  
	// my-header part.. 			
	$scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
	$scope.changeSpace =( collection )=>{
			switch( collection ){
				case 'Logout':
					//						$state.go('login')
					$window.location.href ='http://localhost:8000/angularJS-ui/app/06_login/'
					break;
				case 'Workspace':	
					//						$state.go('collections_list') 
					$window.location.href ='http://localhost:8000/angularJS-ui/app/07_appMain/#!/collections_list'
					break; 
				case 'Home':	
				default:	
					$state.go('collectionEditMain', { cur_collection: collection } ) 
			}	
	}
	$scope.header.header_list = ['Home','Logout'] 
	$scope.header.header_list.push('Workspace')			
	$scope.header.changeSpace = $scope.changeSpace ; 
	( async ()=>{
		let  objects_list  
		const update_collections_list = async ()=>{
			let data  = await $http.get(`http://localhost/hades/collections/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
			$scope.collections_list.collections_list = data.data.DATA;
			data  = await $http.get(`http://localhost/hades/apps/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
			$scope.collections_list.apps_list = data.data.DATA ;	
			$scope.$apply();
		}
		let response  =  await  $http.get(`http://localhost/hades/all_objects/${ user_DB }/${ id }`).then( async (response)=>{
		objects_list  = response.data.DATA 
		console.log( objects_list )
		await update_collections_list(); 
		})
	})();	
	$scope.collections_list = { collections_list: [] , apps_list: [] } 
	$scope.cur_selection =  null ;
    $scope.enter_collection = ( collection )=>{
		$scope.cur_selection = collection.name ; 
		$state.go('collectionEditMain', { cur_collection : collection.name } ) 
	}
    $scope.enter_app = ( app )=>{
		$scope.cur_selection = app.name
		$state.go('appEditMain', { appName : app.name } ) 
	}
})
.controller('collectionEditMainCtrl',function( $scope, $stateParams, $injector  ){
			var workSpace_service = $injector.get('workSpace_service') 
			var $state = $injector.get('$state')  
			var $stateRegistry = $injector.get('$stateRegistry'); 
	        var collection_id = $stateParams.cur_collection ; 
//			const apps = workSpace_service.promise_getAppsListData( $stateParams.cur_collection ) 
	        const appparts = [
				{ title: 'Info' , name: 'collectionEditMain.info' },
				{ title: 'Data' , name: 'collectionEditMain.data' },
				{ title: 'Chart' , name: 'collectionEditMain.chart' },
				{ title: 'Report' , name: 'collectionEditMain.report' }
			]
			$scope.openApp = ( item )=>{
					// my-sider part
					$state.go( item.name ) 
			}
			$scope.appparts = { list : appparts , openApp : $scope.openApp  }
		    $scope.collectioninfo = { name: collection_id }  
	        $scope.current_tab = 'INFO' ;
	        $state.go('collectionEditMain.info') 
	        $scope.enter_info =  ()=>{
	            $scope.current_tab = 'INFO' ;
				$state.go('collectionEditMain.info' )
			}
	        $scope.enter_data =  ()=>{
	            $scope.current_tab = 'DATA' ;
				$state.go('collectionEditMain.data' )
			}
})	
.controller('collectionEditInfoCtrl',function( $scope, $stateParams, $injector  ){
	// name , createDate ..
})
.controller('appEditMainCtrl', function($scope, $stateParams, $state, $injector ){
// my-header part.. 			
	    var $window = $injector.get('$window') 
	    var app_id = $stateParams.appName ; 
//  my-sidebar part.. 	
		$scope.appName = $stateParams.appName 
		let appparts = [
			{ title: 'Info', name:'app_Info' },
			{ title: 'Data', name:'app_Data' },
			{ title: 'Chart' , name: 'app_Chart' },
			{ title: 'Report' , name: 'app_Report' }
		]
		$scope.openApp = ( item )=>{
			console.log( item.title )
			$state.go( collection.name ) 
		}
		$scope.appparts = { list : appparts , openApp : $scope.openApp  }
		$scope.appinfo ={ name: app_id } 
})
