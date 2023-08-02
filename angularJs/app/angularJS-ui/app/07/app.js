angular.module('myApp',[
'ui.router',
'toggle_sidebar',
'mySidebar'
])
.config( function( $urlRouterProvider, $stateProvider){
	var appMain ={
		name:"appMain",
		url:"/appMain/:appName",
		template:`
		    <h3>{{ appName }}</h3> 
		    <div class="container">
		    <my-sidebar appslist="appparts"></my-sidebar> 
			<toggle-sidebar></toggle-sidebar>
		    </div>
		`,
		controller:'myAppCtrl'  
	}
	var collections_list ={
		name:"collections_list",
		url:"/collections_list",
		template:`
		    <h3>{{ appName }}</h3> 
		    <div class="container">
		    <my-sidebar2level collectionslist="collections_list"></my-sidebar2level>
			<toggle-sidebar></toggle-sidebar>
		    </div>
		`,
		controller:'myCollections_listCtrl'  
	}
	$urlRouterProvider.otherwise('/appMain/example'); 
//    $urlRouterProvider.otherwise('/collections_list'); 
	$stateProvider.state( appMain ); 
	$stateProvider.state( collections_list ); 
/*	
	$stateProvider.state('root', {
				url:"/",
		        redirectTo: "collections_list" }); 
*/				
})
.controller('myAppCtrl', function($scope, $stateParams ){
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
.controller('myCollections_listCtrl', function($scope , $state ){
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
	$scope.openApp = ( name )=>{
		console.log( name )
		$state.go('appMain',{ appName: name }) 
		throw new Error('state changed') 
	}
	$scope.openParent = ( title )=>{
		console.log( title )
	}
	$scope.collections_list = { collections_list : collections , apps_list: apps ,  
		openApp : $scope.openApp,
		openParent : $scope.openParent,
	}
})
