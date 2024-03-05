angular.module('myControllers', ['work_space'])
.controller('collectionMainCtrl',function( $scope, $stateParams, $injector  ){
			var workSpace_service = $injector.get('workSpace_service') 
			var $state = $injector.get('$state')  
			var $stateRegistry = $injector.get('$stateRegistry'); 
	        var $window = $injector.get('$window') 
	        var cur_collection = $stateParams.cur_collection ;
// my-header part.. 			
	        $scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null, cur_collection  } 	
			$scope.changeSpace =( collection )=>{
				switch( collection ){
					case 'logout':
// 						$state.go('login')
		                $window.location.href ='http://localhost:8000/angularJS-ui/app/06_login/'
						break;
					case 'allEdit':
						$state.go('collections_list') 
						break; 
					case 'home':	
					default:	
						$state.go('collectionMain', { cur_collection: collection } ) 
				}	
			}
			$scope.header.header_list = $scope.collections = workSpace_service.getCollections( $stateParams.cur_collection ) 
			$scope.header.header_list.push('allEdit')			
			$scope.header.changeSpace = $scope.changeSpace ; 
// my-sider part
			$scope.openApp = ( item )=>{
				$state.go('appMain', { appName : item.name }) 
			}
			const apps = workSpace_service.promise_getAppsListData( $stateParams.cur_collection ) 
			let appparts = []
			apps.forEach((ent)=>{
				appparts.push({ title: ent , name: ent });

			})
			$scope.appparts = { list : appparts , openApp : $scope.openApp  }
		}
)	
.controller('myAppCtrl', function($scope, $stateParams, $state, $injector ){
// my-header part.. 			
	    var $window = $injector.get('$window') 
		$scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
		$scope.changeSpace =( collection )=>{
			switch( collection ){
				case 'logout':
//					$state.go('login')
		            $window.location.href ='http://localhost:8000/angularJS-ui/app/06_login/'
					break;
				case 'home':	
				default:	
					$state.go('collectionMain', { cur_collection: collection } ) 
			}	
		}

		$scope.header.header_list = ['home','logout'] 
		$scope.header.changeSpace = $scope.changeSpace ; 
//  my-sidebar part.. 	
		$scope.appName = $stateParams.appName 
		let appparts = [
			{ title: 'Info', name:'Info' },
			{ title: 'Data', name:'Data' },
			{ title: 'Chart' , name: 'Chart' },
			{ title: 'Report' , name: 'Report' }
		]
		$scope.openApp = ( title )=>{
			console.log( title )
		}
		$scope.appparts = { list : appparts , openApp : $scope.openApp  }
})
.controller('myCollections_listCtrl', function($scope , $state, $injector ){
	   var $window = $injector.get('$window') 
	   var $http = $injector.get('$http') 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//  User Infomation 
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
	   var $cookies = $injector.get('$cookies')
	   let id = $cookies.get('user')
	   let user_DB = $cookies.get('user_DB')  
// my-header part.. 			
		$scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null , cur_collection:'app메뉴편집'  } 	
		$scope.changeSpace =( collection )=>{
			switch( collection ){
				case 'logout':
//					$state.go('login')
		            $window.location.href ='http://localhost:8000/angularJS-ui/app/06_login/'
					break;
				case 'home':	
				default:	
					$state.go('collectionMain', { cur_collection: collection } ) 
			}	
		}
		$scope.header.header_list = ['home','logout'] 
		$scope.header.changeSpace = $scope.changeSpace ; 
// my-sidebarl2 part.. 	
	let collections = [
		{ title: 'Info', name:'Info' },
		{ title: 'Data', name:'Data' },
		{ title: 'Chart' , name: 'Chart' },
		{ title: 'Report' , name: 'Report' }
	]
    let apps = [
		{ title: 'Info.A', collection: 'Info', name:'A' }, 
		{ title: 'Data.B', collection: 'Data', name:'B' }
	]
	let objects_list  
	const update_collections_list = async ()=>{
		let data  = await $http.get(`http://localhost/hades/collections/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
		    collections = data.data.DATA ; 
			apps = objects_list.map( (ent)=>{ return { title: ent.appTitle, collection: ent.collectionName , name: ent.appName }});
			$scope.collections_list.collections_list = collections ;
			$scope.collections_list.apps_list = apps ;	
			$scope.$apply();
			$scope.$broadcast('updateRequest', $scope.collections_list); 	
	}

	$http.get(`http://localhost/hades/all_objects/${ user_DB }/${ id }`).then( async (response)=>{
			objects_list  = response.data.DATA 
		    console.log( objects_list )
	/*	
		    let data  = await $http.get(`http://localhost/hades/collections/${ user_DB }/${ id }` );
		    collections = data.data.DATA ; 
			apps = objects_list.map( (ent)=>{ return { title: ent.appTitle, collection: ent.collectionName , name: ent.appName }});
			$scope.collections_list.collections_list = collections ;
			$scope.collections_list.apps_list = apps ;	
			$scope.$apply();
			$scope.$broadcast('updateRequest', $scope.collections_list); 	
	*/		
		    update_collections_list(); 
    })

	$scope.openApp = ( name )=>{
		console.log( name )
//		$state.go('appMain',{ appName: name }) 
		$window.location.href =`http://localhost:8000/angularJS-ui/app/08_appControl/#!/appEditMain/${ name }`
		throw new Error('state changed') 
	}
	$scope.openParent = ( title )=>{
		console.log( title )
		$window.location.href =`http://localhost:8000/angularJS-ui/app/08_appControl/#!/collectionEditMain/${ title }`
	} 
    $scope.create_collection = async()=>{
		let collectionName = prompt("새로운 Collection 이름을 입력하세요"); 
		if(!collectionName == '' ){
			let data  = await $http({ method: 'POST' , url: `http://localhost/hades/collection/${ user_DB }/${ collectionName }/${ id }`}).catch((err)=>console.log(err));
            if( data.data.STATUS == -1 )return -1;
		}
		update_collections_list(); 
	}
    $scope.create_app = async ()=>{
		let appName = prompt("새로운 App 이름을 입력하세요"); 
		if(!appName == '' ){
			let data  = await $http({ method: 'POST' , url: `http://localhost/hades/app/${ user_DB }/${ appName }/${ id }`}).catch((err)=>console.log(err));
            if( data.data.STATUS == -1 )return -1;
		}
		update_apps_list(); 
	}
	$scope.collections_list = { collections_list : collections , apps_list: apps ,  
		openApp : $scope.openApp,
		openParent : $scope.openParent,
		create_collection : $scope.create_collection,
		create_app: $scope.create_app 
	}
})

