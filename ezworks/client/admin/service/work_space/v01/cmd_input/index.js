angular.module('work_space.cmd_input',[]) 
.service('work_spaceCmdInput_service', [
//1 'restApiServiceDbEdit', 
'workSpace_service',
	function( 
//1 restApiServiceDbEdit, 
workSpace_service 
){
		this.cmd_input = ( cmd , tbl_name, args )=>{
//1			restApiServiceDbEdit.command_db( cmd,  tbl_name , args, ( res )=>{ console.log(res)} )  
		}	
	}])
