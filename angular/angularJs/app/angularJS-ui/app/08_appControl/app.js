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
		<ul class="nav nav-pills nav-fill">
		  <li class="nav-item">
			<a class="nav-link" ng-class='{ active : current_tab == "INFO" }'  aria-current="page" ng-click='enter_info()'>INFO</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" ng-class='{ active : current_tab == "DATA" }' ng-click='enter_data()'>DATA</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" href="#">CHART</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
		  </li>
		</ul>
		<div class="w100">
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
		<collection_editor class="flx-cc hv100 flx-1" collectioninfo="collectioninfo" ></collection_editor>
		`,
		controller: 'collectionEditInfoCtrl', 
	}
	var collectionEditData ={
		name: 'collectionEditMain.data',
		url: '/data', 
//		parent: 'collectionEditMain',
		template:`
		<div class="accordion" id="accordionExample">
		  <div class="accordion-item">
			<h2 class="accordion-header" id="headingOne">
			  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				Accordion Item #1
			  </button>
			</h2>
			<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
			  <div class="accordion-body">
				<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
			  </div>
			</div>
		  </div>
		  <div class="accordion-item">
			<h2 class="accordion-header" id="headingTwo">
			  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				Accordion Item #2
			  </button>
			</h2>
			<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
			  <div class="accordion-body">
				<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
			  </div>
			</div>
		  </div>
		  <div class="accordion-item">
			<h2 class="accordion-header" id="headingThree">
			  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				Accordion Item #3
			  </button>
			</h2>
			<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
			  <div class="accordion-body">
				<strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
			  </div>
			</div>
		  </div>
		</div>
		`,
		controller: 'collectionEditInfoCtrl', 
	}
	var appEditMain ={
		name:"appEditMain",
		url:"/appEditMain/:appName",
		template:`
		<ul class="nav nav-pills nav-fill">
		  <li class="nav-item">
			<a class="nav-link active" aria-current="page" href="#">INFO</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" href="#">DATA</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" href="#">CHART</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
		  </li>
		</ul>
		<div class="w100">
		<app-editor class='flx-cc hv100 flx-1' appinfo='appinfo'></app-editor>
		</div>
		`,
		controller:'appEditMainCtrl'  
	}
	$urlRouterProvider.otherwise('/collectionEditMain/home'); 
	$stateProvider.state( appEditMain ); 
	$stateProvider.state( collectionEditMain ); 
	$stateProvider.state( collectionEditInfo ); 
	$stateProvider.state( collectionEditData ); 
})
