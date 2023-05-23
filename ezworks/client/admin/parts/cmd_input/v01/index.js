angular.module('myDbEditCmdInput', [])
.controller('myDbEditCmdInputCtrl', ['$scope','$injector',
'spreadJs_service',
'sheetCmd_service',
'sheetFormat_service',
'spreadjsEvents_service',
'workSpace_service',
	function( $scope, $injector, 
spreadJs_service,
sheetCmd_service,
sheetFormat_service, 
spreadjsEvents_service, 
workSpace_service,
){
/////////////////////////////////////////////////////////////////////////////////
//  Dependency assign.. 
////////////////////////////////////////////////////////////////////////////////		
		
	$scope.cmdInput = { txt: '', formula: null , pandas: null } 
	$scope.cmdInput_txt_comment = ''
	$scope.cmdInput_title = 'CmdInput' 
	$scope.isCmdInput_enabled = 0 		
	$scope.cmdInput_readMode = 0 
	$scope.inputCmd = 1	
/////////////////////////////////////////////////////////////////////////////////
//  General  Apply event..
////////////////////////////////////////////////////////////////////////////////		
	$scope.execCmd = ()=>{
        var cmdOpts = $scope.cmdInput.txt.split(' ')
		let cb_f = null   // callback function. 
		switch( cmdOpts[0] ){
			case 'addCol':
				if( cmdOpts[1] == undefined ) return  
				let col_data = sheetCmd_service.getFirst_c( cmdOpts[1] ) 
				cb_f = ( res_ )=>{
					if( res_.STATUS == -1 )return 
				 	let headInfos =  sheetCmd_service.addCol( cmdOpts[1] ) 
					try{
						let col_data = headInfos.find((ent)=>ent.name == cmdOpts[1] )
						if( col_data == undefined )throw { Error: 100 , ERRORMESSAGE: `${ cmdOpts[1] } column not found` }  
        			    spreadJs_service.saveTbl() 
					}catch(err){
						console.log( err.ERRORMESSAGE )  
					}
				}	
				if( $scope.app_cur.mssql ){
				    createApp_service.updateApp( cmdOpts[0] , $scope.tbl_name , cmdOpts[1] , col_data , cb_f ) 
				}else{
				 	let headInfos =  sheetCmd_service.addCol( cmdOpts[1] ) 
				}
				break;
			case 'addRow':
				sheetCmd_service.addRow( parseInt( cmdOpts[1] ) ) 
				break;
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
/*			
   CmdInput - deleteCol  :  DB에 Table를 변경   
   		global: 
				[ cmdOpts  ] 
		input:
				[ 	
			    ]
		return: [
				    sheetCmd_service.deleteCol( cmdOpts ) 
				]
*/			
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
			case 'deleteCol':
				const { col_name , cb_function } = sheetCmd_service.deleteCol( cmdOpts ) 
				break; 
			case 'iAskCol':
				sheetCmd_service.iAskCol( cmdOpts ) 
				break;
			case 'moveCol':
				sheetCmd_service.moveCol( cmdOpts ) 
				break;
			case 'open':
				$scope.openFile = 1 
				$scope.inputCmd = 0 
				break;
/*				
Tue May 17 04:22:55 UTC 2022
*/	
			case 'save':
// temp 				
				spreadJs_service.saveTbl(); 

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
      }
/////////////////////////////////////////////////////////////////////////////////////////////////
//  post sidebar init  hooking service. 
////////////////////////////////////////////////////////////////////////////////////////////////		
		const process_cmdInput =()=>{
			  $scope.isCmdInput_enabled = true 
			  if(!$scope.$$phase)$scope.$apply() 
		}
		workSpace_service.addPost_initSidebars_f_list( process_cmdInput ) 
}])
.directive('cmdInput', function(){
	return {
		restrict: 'E',
		templateUrl: '/admin/parts/cmd_input/v01/cmdinput.html',
		controller:'myDbEditCmdInputCtrl',
		}
})
.directive('cmdText', function(){
	var cmd_list = { 'save': '' , 
		             'saveTo':'인자 1(경로) 디폴트: ./server/company/data/company/회사명', 
		             'setPandas' :'' , 
		             'setFormula':'' , 
		             'addCol': '인자 1(컬럼이름)',
		             'addRow': '인자 1(열갯수)' 
	               }
	return {
		restrict: 'EAC',
		require :'ngModel',
		link : function( scope, element, attrs , ctrl ){
			    ctrl.$parsers.unshift( ( viewValue )=>{
				console.log('[parts/cmd_input] cmdInput directive viewValue ', viewValue ) 
				let cmd_list_key = Object.keys( cmd_list ) 
				if(  cmd_list_key.includes( viewValue )){ 
					scope.cmdInput_txt_comment = cmd_list[viewValue] 
					ctrl.$setValidity('valid_cmd', true ) 
				}else{
					ctrl.$setValidity('valid_cmd', false ) 
				}
				return viewValue
			})
	}
 }
})
