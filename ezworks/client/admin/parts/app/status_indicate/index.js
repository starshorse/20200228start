angular.module('status_indicate',[])
.controller('statusIndicateCtrl', ['$scope','workSpace_service', 
'spreadjsEvents_service',
//1 'workSpaceCollections_service',
'spreadJs_service',
	function( $scope, workSpace_service , 
spreadjsEvents_service, 
//1 workSpaceCollections_service, 
spreadJs_service 
){
		const  stage = ['new Created', 'saved fdb', 'saved db[mssql]','hided','not published','published' ]
		$scope.app_status = { 'stage': stage[0], 'col_sel':null , 'row_sel': null  } 
		$scope.isStatusIndicate_enabled = 1 
		$scope.setAppStage = ( index )=>{ 
			$scope.app_status.stage = stage[index] 
		}
		const process_statusIndicate =()=>{
			  let app_cur  = workSpace_service.getAppCur_post() 
		          $scope.app_status.stage = stage[ app_cur.stage ] 
		}
		const process_cellClick = ()=>{
			 let sel_cell = spreadjsEvents_service.getSel_cell() 
			 $scope.app_status.col_sel = sel_cell.col_sel 
			 $scope.app_status.row_sel = sel_cell.row_sel 
			 $scope.$apply() 
		}
		workSpace_service.addPost_initSidebars_f_list( process_statusIndicate ) 
		spreadjsEvents_service.addPost_cellClick_f_list( process_cellClick ) 
}])
.directive('myIndicate', function(){
	return {
		restrict:'E',
		templateUrl:'/parts/app/status_indicate/statusIndicate.html',
		controller:'statusIndicateCtrl'
	}
})
