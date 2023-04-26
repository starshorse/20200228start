angular.module('work_space.cmd_input',[]) 
.service('work_spaceCmdInput_service', ['restApiServiceDbEdit', 'workSpace_service',
	function( restApiServiceDbEdit, workSpace_service ){
		this.cmd_input = ( cmd , tbl_name, args )=>{
			restApiServiceDbEdit.command_db( cmd,  tbl_name , args, ( res )=>{ console.log(res)} )  
		}	
	}])
