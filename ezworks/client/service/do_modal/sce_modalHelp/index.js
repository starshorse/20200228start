/*
	this modeul need shortcut.js and/ do_modal custom parts. 
*/
angular.module('sce_modalHelp', [])
.service('sceModalHelp_service', ['$sce', function($sce){ 
	var command_help = `
	      <p>addCol x  # x column name col_sel reference</p> 
	      <p>addRow x  # x row number </p>
	      <p>createTbl_mssql  # create this table in mssql</p>  
	      <p>deleteCol [x,x,x]  # column index x </p>  
		  <p>deleteApp  # drop App </p> 
	      <p>deleteTbl_mssql  # drop this table from mssql</p> 
	      <p>iAskCol [x,x,x]  # query col name of  index x </p>  
		  <p>moveCol x    # move x column to col_sel reference </p>
	      <p>open     # open CSV file  </p>  
	      <p>save x   # save table name x </p>  
	      <p>saveTo x   # save table to path x </p>  
	      <p>setTbl_name x  # assign table name x </p>  
	      <p>updateTbl_mssql  # insert update Data to mssql</p> 
	`
	this.modal_index = 4 
	this.getSec_trustAsHtml =  ()=> $sce.trustAsHtml( command_help )  
}])
