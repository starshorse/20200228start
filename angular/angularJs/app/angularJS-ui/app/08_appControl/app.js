angular.module('myApp',[
'ui.router',
'ngCookies',	
// directives 	
'myHeader',
'toggle_sidebar',
'mySidebar',
'collection_editor',
'app_editor', 
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
		    <div class="container w100">
		    <my-sidebar appslist="appparts"></my-sidebar> 
			<toggle-sidebar></toggle-sidebar>
	        <collection_editor class="flx-cc hv100 flx-1" collectioninfo="collectioninfo" ></collection_editor>
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
		    <div class="container w100">
		    <my-sidebar appslist="appparts"></my-sidebar> 
			<toggle-sidebar></toggle-sidebar>
	        <app-editor class='flx-cc hv100 flx-1' appinfo='appinfo'></app-editor>
		    </div>
		`,
		controller:'appEditMainCtrl'  
	}
	$urlRouterProvider.otherwise('/collectionEditMain/home'); 
	$stateProvider.state( appEditMain ); 
	$stateProvider.state( collectionEditMain ); 
	$stateProvider.state( collectionEditInfo ); 
})
