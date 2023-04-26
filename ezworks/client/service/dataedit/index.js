angular.module('data_edit', [])
.service('dataEdit_service', ['spreadJs_service','formControl_service', function( spreadJs_service, formControl_service ){
	     var dataedit 
	     var dataedit_colInfo
	     var dataedit_select_colInfo
	     var select_list = {} 
	     var select_list_sub = {}
         this.getWorking_entry = spreadJs_service.getWorking_entry
	     this.getHeadInfos = spreadJs_service.getHeadInfos 
	     this.saveTbl = spreadJs_service.saveTbl 
	     this.getThis_configuration = spreadJs_service.getThis_configuration 
	     this.getDb_mode = spreadJs_service.getDb_mode 
	     this.change_dataedit = ( form_cb_f = null )=>{
			let working_ent = this.getWorking_entry() 
			let colInfo = this.getHeadInfos()
			dataedit = JSON.parse( JSON.stringify( working_ent ) ) 
			dataedit_colInfo = JSON.parse( JSON.stringify( colInfo ) ) 
	/* change to id_jpt 		
			const idx = $scope.dataedit_colInfo.findIndex((item)=>item.name == 'id') 
			if( idx > -1 ) $scope.dataedit_colInfo.splice( idx, 1 ) 
			delete $scope.dataedit.id 
	*/		
			dataedit_select_colInfo = dataedit_colInfo.filter((ent)=>ent.formType == 'select' ) 
	//	    $scope.select_list ={}
			formControl_service.dataedit_select( dataedit_select_colInfo , select_list , select_list_sub , form_cb_f )
			return { dataedit, dataedit_colInfo, dataedit_select_colInfo , select_list , select_list_sub }  
		 }
}])
