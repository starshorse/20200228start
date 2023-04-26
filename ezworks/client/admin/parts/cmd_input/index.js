angular.module('myDbEditCmdInput', [])
.controller('myDbEditCmdInputCtrl', ['$scope','uploadFileCsv_service','spreadJs_service','sheetCmd_service','sheetFormat_service',
'createApp_service','spreadjsEvents_service','formulas_service',
'workSpace_service','work_spaceCmdInput_service','workSpaceCollections_service', 
	function( $scope, uploadFileCsv_service, spreadJs_service, sheetCmd_service,
		sheetFormat_service, createApp_service, spreadjsEvents_service, formulas_service, 
        workSpace_service,work_spaceCmdInput_service, workSpaceCollections_service ){
	$scope.cmdInput = { txt: 'open test.fdb', formula: null } 
	$scope.openFile = 0 
	$scope.inputFormula = 0 	
	$scope.isCmdInput_enabled = 0 	
	$scope.execCancel = ()=>{
		$scope.openFile = 0 
		$scope.inputFormula = 0 
	}
	$scope.saveFormula =()=>{
		let col_name = spreadjsEvents_service.getSel_cell().col_sel 
		sheetFormat_service.saveFormulaInHeadInfo( col_name, $scope.cmdInput.formula ) 
        formulas_service.resetFormulas() 
//		formulas_service.applyFormulas() 
		$scope.execCancel() 
	}
// Set post process functions . 	
	const process_nextApp = ()=>{
    // 	$scope.apps_list = workSpace_service.getAppsListAll_post() 	
		$scope.openApp()    // default. app open. 
	}
	createApp_service.addPost_deleteApp_f_list( process_nextApp ) 				
	$scope.execCmd = ()=>{
        var cmdOpts = $scope.cmdInput.txt.split(' ')
		switch( cmdOpts[0] ){
			case 'addCol':
//				$scope.addCol( cmdOpts[1] )
				sheetCmd_service.addCol( cmdOpts[1] ) 
				break;
			case 'addRow':
//				$scope.addRow( parseInt( cmdOpts[1] ))
				sheetCmd_service.addRow( parseInt( cmdOpts[1] ) ) 
				break;
			case 'createTbl_mssql':
				$scope.saveTbl( $scope.tbl_name )
				$scope.command_db( cmdOpts[0], $scope.headInfos ) 
//				$scope.sidebarApps_init() 
				break;
			case 'deleteApp':
				if( $scope.tbl_name != 'app_list' ) createApp_service.deleteApp( $scope.tbl_name ) 
				break;
			case 'deleteCol':
				sheetCmd_service.deleteCol( cmdOpts ) 
/*following code move to service/spreadjs/sheetCmd/index.js				
				var col_list = eval( cmdOpts[1] ) 
				col_list = col_list.sort((a,b)=>b-a) 
				let sheet0 = $scope.spread.getSheet(0)
				sheet0.suspendEvent()
				for( p_i of col_list ){
					$scope.DbData.forEach((ent)=>{
						  var deleteEnt = $scope.headInfos[p_i] 
						  delete ent[deleteEnt.name] 
					})
				   $scope.headInfos.splice( p_i, 1 ) 
				}
				sheet0.resumeEvent() 
*/				
				break; 
			case 'deleteTbl_mssql':
				$scope.command_db( cmdOpts[0], $scope.headInfos  )
				break; 
			case 'genHead':
				$scope.retractHead( $scope.DbData[0]) 
				break;
			case 'iAskCol':
				sheetCmd_service.iAskCol( cmdOpts ) 
/* following code move to service/spreadjs/sheetCmd/index.js				
				col_list = eval( cmdOpts[1] ) 
				var stmt =''
				for( p_i of col_list ){
					  deleteEnt = $scope.headInfos[p_i] 
					 stmt += `col[ ${p_i} ] is ${deleteEnt.name}\n` 
				}
				alert( stmt ) 
*/				
				break;
			case 'moveCol':
				sheetCmd_service.moveCol( cmdOpts ) 
				break;
			case 'open':
				$scope.openFile = 1 
/*				
				$scope.openTbl( cmdOpts[1] )
				$scope.tbl_name = cmdOpts[1]
*/				
				break;
			case 'setFormula':
				$scope.inputFormula = 1
				$scope.openFile = 1 
				break;
			case 'saveTo':
//				const  cb_f = ()=>{ work_spaceCmdInput_service.cmd_input( cmdOpts[0], $scope.tbl_name ,{'path': cmdOpts[1]} ) }
//				spreadJs_service.saveTbl( undefined , undefined , cb_f ) 
//				break;
			case 'save':
// temp 				
//				$scope.saveApp() 
				if(  createApp_service.findApp( $scope.tbl_name ) ||  $scope.tbl_name == 'app_list'){
        			    spreadJs_service.saveTbl() 
					    console.log('app saved' ) 
				}else{	
					$scope.modals[1].content = `new app save [${$scope.tbl_name}]`
					$scope.modals[1].callback = ( modal_args, modal )=>{
						if( cmdOpts[1])path = cmdOpts[1] 
						else path = null 
						createApp_service.addNew_app( $scope.tbl_name,  path ) 
					}
					$scope.doModal(2)  // new app save. 
				}
				break;
			case 'setTbl_name':
				$scope.tbl_name = cmdOpts[1]
				spreadJs_service.setTbl_name( cmdOpts[1]) 
				break;
		    case 'updateTbl_mssql':
				$scope.saveTbl( $scope.tbl_name ) 
				$scope.command_db( cmdOpts[0], $scope.DbData )
				break;
			default:	
			    $scope.extendCmdOpts( cmdOpts ) 
		}
	}
    $scope.readFile = (obj) => {
		   $scope.tbl_name =  obj.files[0].name 
		   const cb_f = ( Data_ )=>{
//			   spreadJs_service.cb_f_main( Data_ ) 
			   spreadJs_service.initData( Data_ ) 
			   sheetFormat_service.retract_loadHead( Data_ ) 
			   $scope.removeAddedSheets() 
			   $scope.openFile = 0 
			   $scope.setAppStage(0) // new App. 
		   }
		   uploadFileCsv_service.uploadFile_csv( obj , cb_f ) 
/*		
           const files = obj.files
           const file = files[0]
           var reader = new FileReader()
           reader.onload = function(event) {
             console.log(event.target.result)
			 $scope.convData( event.target.result )   
           }
           reader.readAsText(file)
*/		   
      }
/////////////////////////////////////////////////////////////////////////////////////////////////
//  post sidebar init  hooking service. 
////////////////////////////////////////////////////////////////////////////////////////////////		
		const process_cmdInput =()=>{
			  let collectionConfiguration = workSpaceCollections_service.getMyCollectionConfiguration() 
			  $scope.isCmdInput_enabled = collectionConfiguration.component.cmdInput.enable 
//			  $scope.$apply() 
		}
		workSpace_service.addPost_initSidebars_f_list( process_cmdInput ) 
}])
.directive('cmdInput', function(){
	return {
		restrict: 'E',
		templateUrl: '/db_edit/parts/cmd_input/cmdinput.html',
		controller:'myDbEditCmdInputCtrl'
	}
})
