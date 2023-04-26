angular.module('myDbEditSidebar',[])
.controller('myDbEditSidebarCtrl',['$scope','sceModalHelp_service','restApiServiceDbEdit','workSpace_service' ,'createApp_service','adminApp_service','spreadJs_service',
	function($scope,sceModalHelp_service, restApiServiceDbEdit, workSpace_service , createApp_service, adminApp_service, spreadJs_service ){
	$scope.frame_type ='DbEdit'
	angular.extend( this, new sidebarsCtrl($scope, workSpace_service, createApp_service, adminApp_service , spreadJs_service ) ) 
	$scope.cmdControlOptions = { fileUpload : 0 } 
/*	following code move to common sidebarsCtrl. 	
	$scope.apps_list  
	$scope.app_cur 
	$scope.apps_list_parent 
*/	
//	const init_app ='app_list'
	$scope.app_app_list = workSpace_service.app_app_list  
	// var myHtml ='<h3>Test trusted html</h3>' 
/*	following move to sce_modalhelp ..	
	var command_help = `
	      <p>addCol x  # x column name</p> 
	      <p>addRow x  # x row number </p>
	      <p>createTbl_mssql  # create this table in mssql</p>  
	      <p>deleteCol [x,x,x]  # column index x </p>  
	      <p>deleteTbl_mssql  # drop this table from mssql</p> 
	      <p>iAskCol [x,x,x]  # query col name of  index x </p>  
	      <p>open x   # open table name x </p>  
	      <p>save x   # save table name x </p>  
	      <p>setTbl_name x  # assign table name x </p>  
	      <p>updateTbl_mssql  # insert update Data to mssql</p> 
	`
*/	
/* following move to parts/do_modal components. 	
	$scope.modals = [{ id: 1, callback:null ,args:null, title: '새로운 앱' ,  content:'새로운앱 생성',input_1: { label:'앱이름', enable: 1, text: null } }, 
				  { id: 2, callback:null ,args:null, title: '새로운 앱 저장', content:'새로운 앱으로 저장합니다.', input_1: { label:'앱이름', enable: 0, text: null }},
				  { id: 3, callback:null ,args:null, title: 'Mssql에 생성', content:'Mssql에 생성합니다.', input_1: { label:'앱이름', enable: 0, text: null }},
				  { id: 4, callback:null ,args:null , title: 'Mssql에 삭제', content:'Mssql에서 삭제합니다.', input_1: { label:'앱이름', enable: 0, text: null }},
				  { id: 5, callback:null ,args:null , title: 'Command help', content:'done' , input_1: { label:'앱이름', enable: 0, text: null }},
	] 
	$scope.modal  
*/	
//	var newAppInfo = { id: 9999 , name:'new App' ,path:'./server/company/data/tbl/',parent:'newApp', level:2 ,stage:1  }  
/*		
	const cb_f_main =( res )=>{
		$scope.apps_list = res
		$scope.apps_list_parent = res.reduce(( acc, cur )=>{
			if( cur.level == 1 )acc.push( cur )
			return acc 
		},[])
		$scope.openApp(init_app) 
	}
*/	
// move to service/do_modal/secModalHelp..
//		sceModalHelp_service.add_modalHelp($scope) 
/*	this move to do_modal service . 
	shortcut.add("F1", function(){
	    $scope.trustedHtml = $sce.trustAsHtml(command_help) 
		$scope.modals[4].callback = ()=>{
	         $scope.trustedHtml = null  
		}
		$scope.doModal(5) 
	})*/
/*		
	$scope.newAppByClick= ()=>{
		workSpace_service.createApp( $scope ) 
// following code move to workSpace_service.createApp 
//		$scope.doModal(1) 
	}
*/	
// page initialization _start_
// following function move to workSpace_service .		
/*		
	$scope.sidebarApps_init = ()=>{ 
   		restApiServiceDbEdit.getData(init_app , cb_f_main )
	}
*/	
//Temp 	workSpace_service.sidebarApps_init($scope)  // Init.
// 	_end_ 	
/* following code move common /parts/sidebars/index.js		
	$scope.openApp = ( item  )=>{
		workSpace_service.openApp( $scope , item.name ) 
*/		
/* following code move to workSpace_service.openApp.		
		$scope.cur_app_info = $scope.apps_list.find((ent)=>ent.name == tbl_name ) 
 		if( $scope.cur_app_info.stage == 5 ) $scope.cmdControlOptions.fileUpload = 0 
		$scope.tbl_name = tbl_name
		$scope.openTbl( tbl_name )
	}
*/	
	$scope.saveApp = ()=>{
		workSpace_service.saveApp( $scope )  
	}
//	$scope.initApp = ()=>{ return 'app_list' } 
/* following code move to workSpace_service.createApp		
	$scope.createApp = ( app_name )=>{
		$scope.tbl_name = app_name 
		$scope.openTbl( $scope.tbl_name ) 
	}
*/	
/* following code move to service of workSpace_service module.  		
// mssql App_mssql_flag setting. _start_ 		
	$scope.findApp = ( app_name )=>{
		return $scope.apps_list.find((ent)=>ent.name == app_name ) 
	}
	$scope.isApp_mssql_exist = ( app_name )=>{
		  const app_info = $scope.findApp( app_name ) 
		  return app_info.mssql
	}
	$scope.updateApp_mssql = ( app_name, flag )=>{
		  var app_info = $scope.findApp( app_name ) 
		  app_info.mssql = flag
	}
// mssql flag setting _end_		
// add new app  to updateApp_list_fdb _start_		
	$scope.updateApp_list_fdb = ()=>{
			restApiServiceDbEdit.postData('app_list', $scope.apps_list , ( res)=>{
				$scope.saveTbl( $scope.tbl_name )
			})
	}
*/	
// addNew_app $scope.updateApp_list_fdb  		
/*	following function code move to workSpace_service.addNew_app  	
	$scope.addNew_app = ()=>{
			var lastId = $scope.apps_list.reduce((acc, cur )=>{
				 if( cur.id > acc ) acc = cur.id 
				 return acc 
			}, 0 )
			lastId++ 
			var newOne = JSON.parse( JSON.stringify( newAppInfo )) 
			newOne.id = lastId , newOne.title =  newOne.name = $scope.tbl_name 
			$scope.apps_list.push( newOne ) 
		    $scope.updateApp_list_fdb()  
	}
*/	
//_end_ 		
/*	
	$scope.initApp = ()=>{
		$scope.openApp('./server/db_edit/apps/app_list') 
	}*/
/*	
	$scope.modalDispatch = ( id )=>{
		switch( id 
			case 1:  // Create App 
				$scope.createApp( $scope.modal.input_1.text ) 
				break;
			case 2:  // Save new App. 
				$scope.addNew_app() 
				break; 
			default:
		}
		$scope.modal.callback( $scope.modal.args ) 
	}
	$scope.doModal = ( inx )=>{
		$scope.modal = $scope.modals[inx - 1] 
	   if(inx == 5 )$scope.$apply() 
		$('#exampleModalCenter').modal() 
	}
*/	
}]) 
