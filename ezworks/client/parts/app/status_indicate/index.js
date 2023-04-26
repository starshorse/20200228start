angular.module('status_indicate',[])
.controller('statusIndicateCtrl', ['$scope','workSpace_service', 'spreadjsEvents_service','workSpaceCollections_service',
	'spreadJs_service',
	function( $scope, workSpace_service , spreadjsEvents_service, workSpaceCollections_service, spreadJs_service ){
		const  stage = ['new Created', 'saved fdb', 'saved db[mssql]','hided','not published','published' ]
		$scope.app_status = { 'stage': stage[0], 'col_sel':null , 'row_sel': null  } 
		$scope.isStatusIndicate_enabled = 0 
		$scope.setAppStage = ( index )=>{ 
			$scope.app_status.stage = stage[index] 
		}
		const process_statusIndicate =()=>{
			  let app_cur  = workSpace_service.getAppCur_post() 
		      $scope.app_status.stage = stage[ app_cur.stage ] 
			  let collectionConfiguration = workSpaceCollections_service.getMyCollectionConfiguration() 
			  $scope.isStatusIndicate_enabled = collectionConfiguration.component.cmdInput.enable 
//			  $scope.$apply() 
		}
		const process_cellClick = ()=>{
			 let sel_cell = spreadjsEvents_service.getSel_cell() 
			 $scope.app_status.col_sel = sel_cell.col_sel 
			 $scope.app_status.row_sel = sel_cell.row_sel 
			 $scope.$apply() 
		}
		const process_appConfiguration = ()=>{
/*			
		      let collectionConfiguration = workSpaceCollections_service.getMyCollectionConfiguration() 
		      if( collectionConfiguration.component.noOverride.enable ) return 
			  let app_cur  = workSpace_service.getAppCur_post() 
			  let appConfiguration = JSON.parse(app_cur.configuration)
*/
			  let appConfiguration = spreadJs_service.getAppConfiguration() 
			  try{     
			       $scope.isStatusIndicate_enabled = appConfiguration.component.cmdInput.enable 
			  }catch(err){
				   $scope.isStatusIndicate_enabled = 0 
				  console.log(err) 
			  }
			  switch( appConfiguration.type ){
				  case 'form_only':
					  $scope.isStatusIndicate_enabled = 0 
					  break;
				  default:
			  }
		}
		workSpace_service.addPost_initSidebars_f_list( process_statusIndicate ) 
		spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( process_appConfiguration ) 
		spreadjsEvents_service.addPost_cellClick_f_list( process_cellClick ) 
}])
.directive('myIndicate', function(){
	return {
		restrict:'E',
		templateUrl:'/parts/app/status_indicate/statusIndicate.html',
		controller:'statusIndicateCtrl'
	}
})
