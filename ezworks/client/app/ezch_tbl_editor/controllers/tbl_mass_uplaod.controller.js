angular.module('ezch_tbl_editorCtrl')
.config( function( $provide ){
	$provide.decorator('ezch_tbl_editorService', function( $delegate ){
		$delegate.sheet_upload_insertData_DB = async ( spread , data_array , ezch_tbl_editorFactory , $http  )=>{
			  let sheet_TblView_table = ezch_tbl_editorFactory.sheet_TblView_table 
			  let headers = {}
			  let user_DB = sheet_TblView_table.db_name ; 
			  if( user_DB )headers['db'] = user_DB 
	// checking mass insert 
			  let tbl_name = sheet_TblView_table.tbl_name 
			  url_ = `/tbl_editor/${ tbl_name }/Tr`
			  let result  = await $http({ method:'POST', url: url_ ,  data: data_array , headers: headers })
			  if( result.data.STATUS == -1 )
				alert('DataBase UPLOAD Failed!',  result.data.ERRORMESSAGE ); 
			  else 
				alert('DataBase UPLOAD Done!' ); 
		}
        return $delegate 	
	})
})
.controller('ezch_tbl_uploadCtrl', ['$scope','$injector', function( $scope, $injector ){
//// angualrJs ui-route web 	
	var $cookies = $injector.get('$cookies');
	var $state = $injector.get('$state');
	var $http = $injector.get('$http');

//// spreajdjs Grid 
	var ezch_tbl_editorFactory = $injector.get('ezch_tbl_editorFactory')
	var ezch_tbl_editorService = $injector.get('ezch_tbl_editorService')
	const MAX_COL = $injector.get('MAX_COL')
	const MAX_ROW = $injector.get('MAX_ROW') 
	const UPLOAD_CELL_COL_START = $injector.get('UPLOAD_CELL_COL_START') 
	const UPLOAD_CELL_ROW_START = $injector.get('UPLOAD_CELL_ROW_START') 
	var spread
	var excelIO 
	$(document).ready( function(){
         spread = new GC.Spread.Sheets.Workbook( document.getElementById('ss_upload'))
		 spread.getSheet(0).setColumnCount(MAX_COL);
		 spread.getSheet(0).setRowCount(MAX_ROW);
		excelIO = new GC.Spread.Excel.IO(); 
	})
	console.log( ezch_tbl_editorFactory.names_sheet0 ) // Field, Formatter 
	let fields  = ezch_tbl_editorFactory.names_sheet0
	let notnull_fields = ezch_tbl_editorFactory.names_sheet0_notNull 
	let tbl_columns = ezch_tbl_editorFactory.sheet_TblView_table.tbl_columns ;  
	let updateConfig_data = ezch_tbl_editorFactory.sheet_TblView_table.config_data 
	let upTable = spread.getSheet(0).tables.add("upTable", 1,1, MAX_ROW -1 , fields.length, GC.Spread.Sheets.Tables.TableThemes.medium4 )
	let upTable_info = {
		tbl_data: null 
	}
	upTable.autoGenerateColumns( false ) 
    upTable.bind( tbl_columns ,'tbl_data', upTable_info ) 	
	updateConfig_data.tblViewSheet.tbl_columnWidth?.forEach((ent)=>{
		spread.getSheet(0).setColumnWidth( ent.col_index , ent.col_width ); 
	})

   if( notnull_fields ){
	   notnull_fields.forEach(( value )=>{
		    let color = '#E3EFDA'
		    if( value == 0 )color = '#A5A5A5' 
            spread.getSheet(0).getRange( 2 , UPLOAD_CELL_COL_START + value , MAX_ROW -1 , 1 ).backColor( color )  
	   })
   }
   $scope.ImportFile = function(){
	    var excelFile = document.getElementById("fileDemo").files[0];
        excelIO.open(excelFile, function (json) {
            var workbookObj = json;
            spread.fromJSON(workbookObj);
        }, function (e) {
            console.log(e);
        });
   }
   $scope.ExportFile = function(){
	   const file_name ='jupitor_upload.xlsx' 
	   var json = JSON.stringify( spread.toJSON() ) 
	   excelIO.save( json, function( blob ){
		   saveAs( blob, file_name ); 
	   }, function(e){
		   console.log(e);
	   });
   }
   $scope.DBUpload =  function(){
	   let evaluation_flag = 0 ; 
       let upTable = spread.getSheet(0).tables.findByName('upTable') 
	   if( upTable == null ){
           upTable = spread.getSheet(1).tables.findByName('upTable') 
		   evaluation_flag = 1 
	   }

	   console.log( upTable ) 
	   let dataRange = upTable.dataRange()
	   let retr_dataSet = [] 
	   for( i =  dataRange.row ; i < dataRange.row + dataRange.rowCount ;  i++ ){
		   retr_data  = {} 
		   empty_flag = 0 
		   for( j = dataRange.col + 1 ; j < dataRange.col + dataRange.colCount ; j++ ){
			   let data 
			   if( evaluation_flag )
				   data =  spread.getSheet(1).getValue( i , j ) 
			   else 
				   data =  spread.getSheet(0).getValue( i , j ) 

			   if( data == null && empty_flag == 0 )empty_flag = 0 
			   else empty_flag = 1 
			   retr_data[ upTable.getColumnName(j-1)] = data   
		   }
		   if( empty_flag == 0 )
			   break;
		   retr_dataSet.push( retr_data )
	   }
	   console.log( retr_dataSet ) 
	   ezch_tbl_editorService.sheet_upload_insertData_DB( spread, retr_dataSet, ezch_tbl_editorFactory , $http ); 
   }
  $scope.Cancel = function(){
	let config_name = ezch_tbl_editorFactory.sheet_TblView_table.config_name; 
	$state.go('home', { config_name })
  }
}])
