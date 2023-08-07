angular.module('myControllers', ['work_space'])
.controller('collectionEditMainCtrl',function( $scope, $stateParams, $injector  ){
			var workSpace_service = $injector.get('workSpace_service') 
			var $state = $injector.get('$state')  
			var $stateRegistry = $injector.get('$stateRegistry'); 
	        var $window = $injector.get('$window') 
// my-header part.. 			
	        $scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
			$scope.changeSpace =( collection )=>{
				switch( collection ){
					case 'logout':
//						$state.go('login')
		                $window.location.href ='http://localhost:8000/angularJS-ui/app/06/'
						break;
				    case 'delete':								
					case 'allEdit':	
//						$state.go('collections_list') 
		                $window.location.href ='http://localhost:8000/angularJS-ui/app/07/#!/collections_list'
						break; 
					case 'home':	
					default:	
						$state.go('collectionMain', { cur_collection: collection } ) 
				}	
			}
		    $scope.header.header_list = ['home','delete','logout'] 
			$scope.header.header_list.push('allEdit')			
			$scope.header.changeSpace = $scope.changeSpace ; 
			$scope.openApp = ( item )=>{
// my-sider part
				$state.go( item.name ) 
			}
//			const apps = workSpace_service.promise_getAppsListData( $stateParams.cur_collection ) 
	        const appparts = [
				{ title: 'Info' , name: 'collectionEditMain.info' },
				{ title: 'Data' , name: 'collectionEditMain.data' },
				{ title: 'Chart' , name: 'collectionEditMain.chart' },
				{ title: 'Report' , name: 'collectionEditMain.report' }
			]
			$scope.appparts = { list : appparts , openApp : $scope.openApp  }
		}
)	
.controller('collectionEditInfoCtrl',function( $scope, $stateParams, $injector  ){
})
.controller('appEditMainCtrl', function($scope, $stateParams, $statei, $injector ){
// my-header part.. 			
	    var $window = $injector.get('$window') 
		$scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
		$scope.changeSpace =( collection )=>{
			switch( collection ){
				case 'logout':
//					$state.go('login')
		            $window.location.href ='http://localhost:8000/angularJS-ui/app/06/'
					break;
				case 'delete':								
				case 'allEdit':	
//						$state.go('collections_list') 
					$window.location.href ='http://localhost:8000/angularJS-ui/app/07/#!/collections_list'
					break; 
				case 'home':	
				default:	
					$state.go( collection.name ) 
			}	
		}

		$scope.header.header_list = ['home','delete','logout'] 
		$scope.header.changeSpace = $scope.changeSpace ; 
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
})
