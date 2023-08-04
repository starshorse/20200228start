angular.module('myApp',[
'ui.router',
// directives 	
'myHeader',
'toggle_sidebar',
'mySidebar',
// controllers. 	
'myControllers',	
// services.
])
.config( function( $urlRouterProvider, $stateProvider){
	var collectionEditMain ={
		name: 'collectionEditMain',
		url: '/collectionEditMain/:cur_collection', 
		template:`
		    <my-header header="header" changeSpace="changeSpace( collection )"></my-header> 
		    <p>Collections main</P> 
		    <div class="container">
		    <my-sidebar appslist="appparts"></my-sidebar> 
			<toggle-sidebar></toggle-sidebar>
            <ui-view></ui-view> 
		    </div> 
		`,
		controller: 'collectionEditMainCtrl', 
	}
	var collectionEditInfo ={
		name: 'collectionEditMain.info',
		url: '/info', 
//		parent: 'collectionEditMain',
		template:`
		    <p>Collection Edit now. </P>   
		`,
		controller: 'collectionEditInfoCtrl', 
	}
	var appEditMain ={
		name:"appEditMain",
		url:"/appEditMain/:appName",
		template:`
		    <my-header header="header" changeSpace="changeSpace( collection )"></my-header> 
		    <h3>{{ appName }}</h3> 
		    <div class="container">
		    <my-sidebar appslist="appparts"></my-sidebar> 
			<toggle-sidebar></toggle-sidebar>
		    </div>
		`,
		controller:'appEditMainCtrl'  
	}
	$urlRouterProvider.otherwise('/collectionEditMain/home'); 
	$stateProvider.state( appEditMain ); 
	$stateProvider.state( collectionEditMain ); 
	$stateProvider.state( collectionEditInfo ); 
})
