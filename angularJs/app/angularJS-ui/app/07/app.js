angular.module('myApp',[
'ui.router',
// directives 	
'myHeader',
'toggle_sidebar',
'mySidebar',
// controllers. 	
'myControllers',	
// services.
// 'work_space'	
])
.config( function( $urlRouterProvider, $stateProvider){
	var collectionMain ={
		name: 'collectionMain',
		url: '/collectionMain/:cur_collection', 
		template:`
		    <my-header header="header" changeSpace="changeSpace( collection )"></my-header> 
		    <div class="container">
		    <my-sidebar appslist="appparts"></my-sidebar> 
			<toggle-sidebar></toggle-sidebar>
		`,
		controller: 'collectionMainCtrl', 
	}
	var appMain ={
		name:"appMain",
		url:"/appMain/:appName",
		template:`
		    <my-header header="header" changeSpace="changeSpace( collection )"></my-header> 
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
		    <my-header header="header" changeSpace="changeSpace( collection )"></my-header> 
		    <h3>collections List for Edit</h3> 
		    <div class="container">
		    <my-sidebar2level collectionslist="collections_list"></my-sidebar2level>
			<toggle-sidebar></toggle-sidebar>
		    </div>
		`,
		controller:'myCollections_listCtrl'  
	}
	$urlRouterProvider.otherwise('/collectionMain/home'); 
	$stateProvider.state( appMain ); 
	$stateProvider.state( collectionMain ); 
	$stateProvider.state( collections_list ); 
})
