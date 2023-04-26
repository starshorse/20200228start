 angular.module('myDbEditSpreadjs', [])
.controller('myDbEditSpreadjsCtrl',['$scope','restApiServiceDbEdit','workSpace_service','spreadJs_service','spreadjsEvents_service',
	function( $scope, restApiServiceDbEdit, workSpace_service, spreadJs_service, spreadjsEvents_service ){
	angular.extend( this, new spreadsCtrl( $scope, restApiServiceDbEdit , spreadJs_service, spreadjsEvents_service )) 
	var sheet0 = spreadJs_service.getSheet0() 	
	var first_c = {"name":"default","displayName":"default","size":120,"formatter":"* ##-#-####","locked":true,"data-type":"nvarchar"}
	sheet0.setName('DataSheet') 
	var app_opts = { is_appl_list : false }
	$scope.saveTbl = ( tbl_name )=>{
// 2021-12-27 
		$scope.DbData = $scope.DbData.filter((ent)=>ent.id_jpt != undefined || ent.id != undefined)  
		$scope.DbData.forEach((ent)=>{
			if( ent['실사용자'] == undefined ) ent['실사용자'] = ent['사용자성명'] 
		})
		restApiServiceDbEdit.postData( tbl_name, $scope.DbData , cb_f_main ) 
		$scope.headInfos = $scope.headInfos.filter((ent)=>ent.name != undefined ) 
		$scope.saveHead( tbl_name , $scope.headInfos ) 
	}
/* following move to /service/spreadjs/sheetCmd/index.js 		
	$scope.addCol = ( col_name )=>{
		var sheet0 = $scope.spread.getActiveSheet() 
		const a_index = $scope.spread.getActiveSheetIndex()
		var i = sheet0.getColumnCount()
		sheet0.suspendEvent()
		sheet0.addColumns( i , 1 ) 
		sheet0.bindColumn( i, col_name ) 
		sheet0.resumeEvent() 
		if( a_index == 0 ){
// 2021-12-10 			
			first_c.name = col_name , first_c.displayName = col_name
			first_c.Column_default = 'NULL'
			first_c.DATA_TYPE = 'nvarchar' 
			first_c.character_maximum_length = 30 
			first_c.is_nullable = 'YES' 
			first_c.is_primary = 'NO' 
			first_c.is_identity = 'NO' 
        	$scope.headInfos.push( JSON.parse( JSON.stringify( first_c ))) 
        sheet0.bindColumns( $scope.headInfos )  
		sheet1.reset() 
		sheet1.setDataSource( $scope.headInfos ) 
        }
	}
	$scope.addRow = ( rowCount )=>{
		var sheet0 = $scope.spread.getActiveSheet() 
		var N = sheet0.getRowCount()
		sheet0.addRows( N , rowCount )
		var j = sheet0.getValue( N -1 , 0 )
		j++
		for( var i= 0  ; i < rowCount   ; i++){
			sheet0.setValue( N+i , 0, j+i )
		}
	}
*/	
/* followig code cmd_input/uploadFile_csv service.	
	$scope.convData = ( textCsv )=>{
		$scope.tbl_name = '' 
		$scope.headInfos = '' 
		restApiServiceDbEdit.convData( { text: textCsv }, cb_f_main ) 
	}
*/	
	$scope.command_db_accept = ( args  )=>{
		workSpace_service.command_db_accept( $scope, args ) 
/*	following code move to workSpace_service.command_db_accept	
		switch( args.cmd_name ){
			case 'createTbl_mssql':
				$scope.updateApp_mssql( $scope.tbl_name , 1 ) // sidebar.js function updateApp_mssql 
				break;
			case 'deleteTbl_mssql':
				$scope.updateApp_mssql( $scope.tbl_name , 0 ) // sidebar.js function updateApp_mssql
				break;
			default:
		}
		$scope.updateApp_list_fdb() // sidebar.js function updateApp_list_fdb .. 
*/		
		restApiServiceDbEdit.command_db( args.cmd_name ,$scope.tbl_name, args.data_  , (res)=>{ console.log(res)}  )  
	}
	$scope.command_db = ( cmd_name , data_  )=>{
	    workSpace_service.command_db( $scope , cmd_name , data_ ) 
/*  following code move to workSpace_service.command_db 		
		switch( cmd_name ){1
			case 'createTbl_mssql':
				if( $scope.isApp_mssql_exist($scope.tbl_name))return  // sidbar.js function  isApp_mssql_exist 
				$scope.modals[2].args = { cmd_name, data_ } 
				$scope.modals[2].callback = $scope.command_db_accept 
				$scope.modals[2].content =`${$scope.tbl_name}을  Mssql에서 생성합니다.` 
                $scope.doModal(3)  
				return 
				break;
			case 'deleteTbl_mssql':
				if( !$scope.isApp_mssql_exist($scope.tbl_name))return  
				$scope.modals[3].args = { cmd_name, data_ } 
				$scope.modals[3].callback = $scope.command_db_accept 
				$scope.modals[3].content =`${$scope.tbl_name}을  Mssql에서 삭제합니다.` 
				$scope.doModal(4)
				return 
				break;
			default:
		}
*/		
		restApiServiceDbEdit.command_db( cmd_name ,$scope.tbl_name, data_  , (res)=>{ console.log(res)}  )  
	}
// Init Spreadjs Data 
/*	
	$scope.initApp_spreadjs = ()=>{ 
  		 const init_app = $scope.initApp() 
		 $scope.tbl_name = init_app 
   		 restApiServiceDbEdit.getData( init_app , cb_f_main ) 
		 app_opts.is_appl_list = true 
	} */	
//    $scope.initApp_spreadjs() 
}])
.directive('mySpreadjs', function(){
	return {
	restrict: 'E',
	template:`<div id='ss' style='width:85%; height:600px; border:1px solid gray;'></div>`,
	controller:'myDbEditSpreadjsCtrl'
	}
})
