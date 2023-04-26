angular.module('myDbEditCmdInput', [])
.controller('myDbEditCmdInputCtrl', ['$scope','$injector',
'uploadFileCsv_service','spreadJs_service','sheetCmd_service','sheetFormat_service',
'createApp_service','spreadjsEvents_service','formulas_service',
'workSpace_service','work_spaceCmdInput_service','workSpaceCollections_service', 
//1 'danfoJs_service', 
'parseStr_service', 'templates_service',
	function( $scope, $injector, uploadFileCsv_service, spreadJs_service, sheetCmd_service,
	sheetFormat_service, createApp_service, spreadjsEvents_service, formulas_service, 
        workSpace_service,work_spaceCmdInput_service, workSpaceCollections_service,
//1	danfoJs_service, 
	parseStr_service, templates_service ){
/////////////////////////////////////////////////////////////////////////////////
//  Dependency assign.. 
////////////////////////////////////////////////////////////////////////////////		
		var danfoJs_service = null 
		if( $injector.has('danfoJs_service')){ danfoJs_service = $injector.get('danfoJs_service')}	
		
		$scope.cmdInput = { txt: '', formula: null , pandas: null } 
		$scope.cmdInput_txt_comment = ''
		$scope.cmdInput_title = 'CmdInput' 
        $scope.cmdInput_readMode = 0 

		$scope.inputCmd = 1	
		$scope.inputFormula = 0 	
		$scope.inputPandas = 0 
		$scope.inputSql = 0 
		$scope.isCmdInput_enabled = 0 		
		$scope.inputTypes = Array(10) 	
		$scope.inputType_data = Array(10) 	
		$scope.openFile = 0 

		var isMainButton_enabled_org = 0
		const setDefaultType = ( nType = null , aData )=>{
		console.log('[parts/cmd_input] setDefaultType _start with nType', nType ) 
		if( nType == null ) return 
		$scope.inputCmd = 0 
		$scope.inputTypes[nType] = 1 
		aData.forEach((ent)=>{
			 if( ent.data != null )
		       ent.data = parseStr_service.parse_str_f( ent.data  )
		})
		$scope.inputType_data[ nType ] =  aData  
	}
/////////////////////////////////////////////////////////////////////////////////
//  General  Apply event..
////////////////////////////////////////////////////////////////////////////////		
    $scope.execApply = ( nType )=>{
		console.log('[parts/cmd_input] $scope.execApply with nType', nType ) 
		switch( nType ){
			case 1:
			case '1':
				let DbData = spreadJs_service.getDbData() 
				let headInfos = spreadJs_service.getHeadInfos() 
			    let appConfiguration = spreadJs_service.getAppConfiguration() 	
				let sheet0 = spreadJs_service.getSheet0()
				let Data = Array(10) 
				let filter_data = DbData
				let inputType_data_1 = $scope.inputType_data[1]

				$scope.alert_info_message.message = '적용 버튼 수행' 
				$scope.alert_info_message.class = 'success' 
		console.log('[parts/cmd_input] translate inputType_data_1: ', inputType_data_1 ) 

				for( i = 0 ; i< inputType_data_1.length ; i++ ){
					    switch( inputType_data_1[i].format ){
							case 'string':
						          Data[i] = inputType_data_1[i].data 
                                  break 
							case 'date':
								  let date_data = inputType_data_1[i].data.toString() 	  
								  Data[i] = formulas_service.yyyymmdd2Oadate( date_data ) 
								  break 
							default:
					}
				}
		console.log('[parts/cmd_input] translate Data ', Data ) 
				try{
					 if( appConfiguration.component.cmdInput.apply.filter.enable ){
						 let filters = appConfiguration.component.cmdInput.apply.filter.code
						 filters.forEach((ent0)=>{
							 console.log( ent0 ) 
							 console.log( Data[0] )
							 filter_data = filter_data.filter((ent)=>{
								 formulas_service.oadateCorrection( ent, headInfos ) 
			                	 return eval(ent0) 
//								 return ent['아파트'] == Data[0]  
							 })
						 })
						 if( filter_data.length == 0 )filter_data = DbData
					 }
					else if( appConfiguration.component.cmdInput.apply.sql.enable  ){
							let where_stmt ='' 
						    let where_parm = [] 
						    let sql_stmt = appConfiguration.component.cmdInput.apply.sql.code 
						    let queryLike_enable = 0 
						    try{ queryLike_enable = appConfiguration.component.cmdInput.apply.sql.queryLike_enable }
						    catch(err){ console.log(err)}
// First string field 
						for( var i = 0 ;i< inputType_data_1.length; i++){
							if( inputType_data_1[i].format == 'string'&&  Data[i] != null && Data[i] != '' ){
								if( queryLike_enable && inputType_data_1[i].queryLike_enable )
								     where_parm.push( `${ inputType_data_1[i].title } LIKE '%${ Data[i] }%'`) 
								else where_parm.push( `${ inputType_data_1[i].title } = '${ Data[i] }'`) 
							}
						}
					       if( where_parm.length > 0 ){ 
							   where_stmt += where_parm.join(' AND ') 
							   where_stmt += ' AND ' 
						   }
                           Data[0] = where_stmt 
// Second date field 
						for( var i = 0 ; i< inputType_data_1.length; i++){
							if( inputType_data_1[i].format == 'date' ){
								let reg = /^\d+$/ 
								let dateData = inputType_data_1[i].data.toString()
								if( dateData.length != 8 || !reg.test( dateData )){
									   console.log(' Date Error!' )

										$scope.alert_info_message.message = `${ dateData } Format Error should be YYYYMMDD ` 
										$scope.alert_info_message.class = 'warning' 
									   return 
					 			}else{
		console.log('[parts/cmd_input] formulas_service.dateFormat_convert( dateData ) _call', dateData ) 
									Data[i] = formulas_service.dateFormat_convert( dateData, 'YYYY-MM-DD' )
								}
							}
						}
// Final Conversion ..
						   sql_stmt = parseStr_service.parse_str_f( sql_stmt , Data )
		console.log('[parts/cmd_input] final sql statment.', Data, sql_stmt ) 
						   sql_stmt.forEach((ent)=>{
							   danfoJs_service.execSQL_p( ent, undefined, 'asiafni' ) 
						   }) 

					}
				}catch(err){
					console.log( err )
				}
		console.log('[parts/cmd_input] sheet0.setDataSource( filter_data )_call') 
				sheet0.setDataSource( filter_data ) 
//				spreadJs_service.initData( DbData ) 
		console.log('[parts/cmd_input] spreadJs_service.initHead _call') 
				spreadJs_service.initHead( headInfos ) 
		}
	}
	$scope.execCancel = ( nType = 0 )=>{
		if(nType == 1 ){
			$scope.inputType_data[nType].forEach((ent)=>{
				if( ent.reset_able != 0 ) ent.data = null 
			})
            $scope.execApply( nType ) 
			return 
		}	
		$scope.openFile = 0 
		$scope.inputFormula = 0 
		$scope.inputPandas = 0
		$scope.inputSql = 0 
// Wed Apr  6 09:34:12 KST 2022
		if( isMainButton_enabled_org) $scope.isMainButton_enabled = 1 
		$scope.inputCmd = 1 
		$scope.openApp( $scope.app_cur ) 
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Formula Command. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	$scope.saveFormula =()=>{
		let col_name = spreadjsEvents_service.getSel_cell().col_sel 
		sheetFormat_service.saveFormulaInHeadInfo( col_name, $scope.cmdInput.formula ) 
        formulas_service.resetFormulas() 
//		formulas_service.applyFormulas() 
		$scope.execCancel() 
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  pandas  Query.  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	$scope.execPandas = ()=>{
		danfoJs_service.execPandas( $scope.tbl_name , $scope.cmdInput.pandas ) 
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  SQL  Query.  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
	$scope.execSql = ()=>{
		let sql_info_arr = $scope.cmdInput.sql.split('#') 
		if( sql_info_arr.length == 2 ){
// set option field  1: asisfni 실거래가 Query. 2: sql_cmd_input danfoJs_service.execSQL_p( sql, option , dbName )  			
			   danfoJs_service.execSQL_p( sql_info_arr[1], 2, sql_info_arr[0] ) 
		}
	}

// Set post process functions . 	
	const process_nextApp = ()=>{
    // 	$scope.apps_list = workSpace_service.getAppsListAll_post() 	
		$scope.openApp()    // default. app open. 
	}
	createApp_service.addPost_deleteApp_f_list( process_nextApp ) 				
	$scope.execCmd = ()=>{
        var cmdOpts = $scope.cmdInput.txt.split(' ')
		let cb_f = null   // callback function. 
		switch( cmdOpts[0] ){
			case 'addCol':
//				$scope.addCol( cmdOpts[1] )
				if( cmdOpts[1] == undefined ) return  
				let col_data = sheetCmd_service.getFirst_c( cmdOpts[1] ) 
				cb_f = ( res_ )=>{
					if( res_.STATUS == -1 )return 
				 	let headInfos =  sheetCmd_service.addCol( cmdOpts[1] ) 
					try{
						let col_data = headInfos.find((ent)=>ent.name == cmdOpts[1] )
						if( col_data == undefined )throw { Error: 100 , ERRORMESSAGE: `${ cmdOpts[1] } column not found` }  
	//					$scope.command_db( cmdOpts[0], { col_name : cmdOpts[1], col_data : col_data , db_name_test :'ezoffice_test' } )  // cmdOpts[1] : col_name 
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
//				$scope.addRow( parseInt( cmdOpts[1] ))
				sheetCmd_service.addRow( parseInt( cmdOpts[1] ) ) 
				break;
			case 'createTbl_mssql':
				$scope.saveTbl( $scope.tbl_name )
				$scope.command_db( cmdOpts[0], $scope.headInfos ) 
//				$scope.sidebarApps_init() 
				break;
			case 'deleteApp':
				if( $scope.tbl_name != 'app_list' || $scope.tbl_name != 'collection_list' ) 
					createApp_service.deleteApp( $scope.tbl_name ) 
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
			    cb_f = ( res_ )=>{
					if( res_.STATUS != 1 )return 
					cb_function() 
				}
				createApp_service.updateApp( cmdOpts[0] , $scope.tbl_name , col_name , null , cb_f ) 
				break; 
			case 'deleteTbl_mssql':
				if( cmdOpts[1] == undefined )$scope.command_db( cmdOpts[0], $scope.headInfos  )
				else $scope.command_db( cmdOpts[0], { db_name : cmdOpts[1] } )  // cmdOpts[1] : db_name   
				break; 
			case 'genHead':
				$scope.retractHead( $scope.DbData[0]) 
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
/*				
				$scope.openTbl( cmdOpts[1] )
				$scope.tbl_name = cmdOpts[1]
*/				
				break;
			case 'setFormula':
				$scope.inputFormula = 1
				$scope.openFile = 0
				$scope.inputCmd = 0 
// Wed Apr  6 09:28:57 KST 2022
			    if( $scope.isMainButton_enabled ){
					isMainButton_enabled_org = 1
					$scope.isMainButton_enabled = 0 
				}
				break;
			case 'setPandas':
				$scope.inputPandas = 1
				$scope.inputCmd = 0 
			    if( $scope.isMainButton_enabled ){
					isMainButton_enabled_org = 1
					$scope.isMainButton_enabled = 0 
				}
				break;
			case 'setSql':
				$scope.inputSql = 1
				$scope.inputCmd = 0 
			    if( $scope.isMainButton_enabled ){
					isMainButton_enabled_org = 1
					$scope.isMainButton_enabled = 0 
				}
				break;
/*				
Tue May 17 04:22:55 UTC 2022
*/	
			case 'setTemplate_app':
				if( $scope.tbl_name != 'app_list'  || $scope.tbl_name != 'collection_list ')
				         templates_service.applyTemplate_app( $scope.tbl_name , cmdOpts[1] )   
				break; 
			case 'saveTo':
				createApp_service.saveToApp( $scope.tbl_name , cmdOpts[1] ) 
				break;
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
      }
/////////////////////////////////////////////////////////////////////////////////////////////////
//  post sidebar init  hooking service. 
////////////////////////////////////////////////////////////////////////////////////////////////		
		const process_cmdInput =()=>{
			  let collectionConfiguration = workSpaceCollections_service.getMyCollectionConfiguration() 
			  $scope.isCmdInput_enabled = collectionConfiguration.component.cmdInput.enable 
			  if(!$scope.$$phase)$scope.$apply() 
		}
		const process_appConfiguration = ()=>{
			  let appConfiguration = spreadJs_service.getAppConfiguration() 	
			  if( appConfiguration.component?.cmdInput?.readMode ){
				  $scope.cmdInput_readMode = 1  // readMode long cell reflect.. 
				  $scope.cmdInput_title ='Cell Content:'
				  const updateCell_content = ( cell_content )=>{
					  $scope.cmdInput.txt = cell_content 
					  if( !$scope.$$phase )$scope.$apply() 
				  }
				  spreadjsEvents_service.addPost_cellClick_f_list( updateCell_content ) 
			  }
			  try{     
			       $scope.isCmdInput_enabled = appConfiguration.component.cmdInput.enable 
				   setDefaultType( appConfiguration.component.cmdInput.defaultType, appConfiguration.component.cmdInput.typeData ) 
			  }catch(err){
				   $scope.isCmdInput_enabled = 0 
				  console.log(err) 
			  }
			  if(!$scope.$$phase)$scope.$apply() 
		}
		workSpace_service.addPost_initSidebars_f_list( process_cmdInput ) 
		spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( process_appConfiguration ) 
}])
.directive('cmdInput', function(){
	return {
		restrict: 'E',
		templateUrl: '/parts/cmd_input/cmdinput.html',
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
