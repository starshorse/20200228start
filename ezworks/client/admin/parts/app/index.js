/*
   Init condition management. registerataion concept..
   argument from  app.js from [ DbEdit, company/workspace , company/main/0 .. 
   		[1]$scope.frame_type 
*/
var appCtrl = function( $scope, $injector,
workSpace_service, 
){
///////////////////////////////////////////////////////////////////////////////////////////
//   optional injection. introduced.. 
//////////////////////////////////////////////////////////////////////////////////////////	
	var spreadJs_factory = null			
	if( $injector.has('spreadJs_factory')){  spreadJs_factory = $injector.get('spreadJs_factory') }
	var workSpace_factory = workSpace_service.getWorkSpace_factory() 
	const process_sidebars = ()=>{
        console.log('[parts/appCtrl] :  process_sidebars _start_ ') 	
	      $scope.sidebars_init()  	
	      $scope.openApp() 
	}
        workSpace_service.addPost_initAppsList_f_list( process_sidebars ) 
		console.log('[parts/appCtrl]: [1]workSpace_service.initAppsList _call_') 	
		const cb_f_initAppsList = (args_list = null )=>{
		console.log('[parts/appCtrl] :![callback]initAppsList with args_list', args_list ) 	
		$scope.cur_user_info = workSpace_factory.cur_user_info 
		console.log('[parts/appCtrl] :![callback] $scope.cur_user_info', $scope.cur_user_info  ) 	
	}
	( $scope.initAppsList = ()=>{ workSpace_service.initAppsList( cb_f_initAppsList )  })();

}
