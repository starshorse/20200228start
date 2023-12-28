/*
 *	Jupitor Web admin  collections and appl management. 
 */
 angular.module('myDbEditExists')
.config( function($locationProvider, $routeProvider ){
	$locationProvider.html5Mode({ enabled:true , requireBase: false} )
	$routeProvider.when('/',{ 
	})
	.when('/jupitor_appConfig',{
		template:`
			<json-editor jeditor='jeditor'></json-editor>
		`,
		controller: function( $scope, $injector ){
			var $rootScope = $injector.get('$rootScope') 
			var $location = $injector.get('$location')
			var $http = $injector.get('$http') 
			var jsonEditor_service = $injector.get('jsonEditor_service') 
			const cb_apply = async ()=>{
				    let seq = $rootScope.app_obj['seq'] 
					let configuration  = jsonEditor_service.outData() 
				    let result = await $http({ method: 'POST', url: `/Hades/restapi/data/ezoffice/app_list/${ seq }`, data:{ configuration } })
				    if( result.data.STATUS == -1 )
					       alert(' ERROR: '+ result.data.ERRORMESSAGE )
					$location.path('/jupitor_config/app_list').replace();
					$scope.$apply();
			}
			const cb_cancel = ()=>{
					$location.path('/jupitor_config/app_list').replace();
					$scope.$apply();
			}
			$scope.jeditor = { data: JSON.parse( $rootScope.app_obj['configuration'] ) , cb_apply , cb_cancel } 
			console.log( $rootScope.app_obj ) 
		}
	})
	.when('/jupitor_config/:config_name',{
		template:`
		<div id='appWrapper' class='mx-2 px-2'>
			<my-indicate></my-indicate> 
			<cmd-input></cmd-input>                                    
			<my-spreadjs></my-spreadjs>                                
			<my-events></my-events>
			<my-sheet1></my-sheet1>
			<my-addopts></my-addopts>
		</div>
		`,
		controller: function($scope,$injector, $routeParams,$location ){
			var spreadjsEvents_factory = $injector.get('spreadjsEvents_factory') 
			var spreadJs_service = $injector.get('spreadJs_service')
			var $location = $injector.get('$location')
			var $rootScope = $injector.get('$rootScope') 
			$scope.$parent.is_jupitorConfig = 1 ;
			let config_name  = $scope.config_name =  $routeParams.config_name 
			if( $scope.config_name != 'first' ){
				let config_obj = $scope.$parent[config_name]
				$scope.$parent.set_spreadCreate_flag(0) // request create spread. 
				$scope.$parent.openApp( config_obj ) 
			}else{
				$scope.config_name = 'app_lit' ;
			}
			$scope.editConfig = ( appConfiguration )=>{
			}
			spreadjsEvents_factory.owned_sheet0_doubleCellClick = ( sender, args )=>{
				let column_name = args.sheet.getCell( 0, args.col , 1 ).value(); 
				let app_name = args.sheet.getCell( args.row, args.col ).value();
				if( column_name == 'name' ){
					$rootScope.app_obj = spreadJs_service.getDbData().find((ent)=>ent.name == app_name )
					console.log( $rootScope.app_obj ) 
					$location.path('/jupitor_appConfig').replace();
					$scope.$apply();
				}
			}
		}

	})
	.otherwise( { redirectTo :'/jupitor_config/first' } ) 
//	.otherwise( { redirectTo :'/jupitor_appConfig' } ) 
})
