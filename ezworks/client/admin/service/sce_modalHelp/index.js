/*
	this modeul need shortcut.js and/ do_modal custom parts. 
*/
angular.module('sce_modalHelp', [])
.service('sceModalHelp_service', ['$sce', function($sce){ 
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
	this.add_modalHelp = (scope)=>{
		shortcut.add("F1", function(){
			scope.trustedHtml = $sce.trustAsHtml(command_help) 
			scope.modals[4].callback = ()=>{
				 scope.trustedHtml = null  
			}
			scope.doModal(5) 
		})
	}
}])
