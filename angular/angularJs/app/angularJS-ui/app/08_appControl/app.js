angular.module('myApp',[
'ui.router',
'ngCookies',	
// directives 	
'myHeader',
'myDomodal',
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
		<collection_editor class="flx-cc  flx-1 my-5" collectioninfo="collectioninfo" ></collection_editor>
		`,
		controller: 'collectionEditInfoCtrl', 
	}
	var collectionEditData ={
		name: 'collectionEditMain.data',
		url: '/data', 
//		parent: 'collectionEditMain',
		templateUrl:'/templates/template_collectionData.html',
		controller: 'collectionEditDataCtrl', 
	}
	var appEditMain ={
		name:"appEditMain",
		url:"/appEditMain/:appName",
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
		controller:'appEditMainCtrl'  
	}
	var appEditInfo ={
		name: 'appEditMain.info',
		url: '/info', 
//		parent: 'appEditMain',
		template:`
		<app-editor class='flx-cc flx-1' appinfo='appinfo'></app-editor>
		`,
		controller: 'appEditInfoCtrl', 
	}
	var appEditData ={
		name: 'appEditMain.data',
		url: '/data', 
//		parent: 'appEditMain',
		template:`
		<div class="d-flex align-items-center justify-content-center my-5">
			<h3> Column Information </h3> 
		</div> 
		<div class="row mx-5">
			<div class="col-md-8">
				<div class="accordion" id="accordionExample">
				  <div class="accordion-item" ng-repeat="column in tbl_columns">
					<h2 class="accordion-header" id="headingOne">
					  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $index }}" aria-expanded="true" aria-controls="collapse{{ $index }}">
						{{ column.name }} 
					  </button>
					</h2>
					<div id="collapse{{ $index }}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
					  <div class="accordion-body row">
					   <div class="col-md-4">
					   	 	<h6>FORMAT:[ {{ column.formatter }}]</h6>
					   </div>
					   <div class="col-md-4"></div>
					   <div class="col-md-4">
					   	<button class="btn btn-secondary w100" ng-click="edit_column( column.name )">EDIT</button> 
					   </div>
					  </div>
					</div>
				  </div>
				</div>
			</div>
			<div class="col-md-4">
				<textarea class="form-control w100 h-125" rows = "20" disabled>
				 {{ collections_list.cur_app.sql_state.state_1 }}
				</textarea> 
			</div>
		</div>
		<div class="row mx-5 my-5">
			<div class="col-md-4">
				<button class="btn btn-lg btn-secondary w100">Save</button> 
			</div>
			<div class="col-md-4">
				<button class="btn btn-lg btn-secondary w100">Gen View</button> 
			</div>
		</div>
		`,
		controller: 'appEditDataCtrl', 
	}
	$urlRouterProvider.otherwise('/collectionEditMain/home'); 
	$stateProvider.state( appEditMain ); 
	$stateProvider.state( appEditInfo ); 
	$stateProvider.state( appEditData ); 
	$stateProvider.state( collectionEditMain ); 
	$stateProvider.state( collectionEditInfo ); 
	$stateProvider.state( collectionEditData ); 
})
