var dataEditCtrl = function( $injector,  $scope , dataEdit_service, formControl_service, spreadjsFilter_service = null , hotLink_service = null , serviceUi_service = null, spreadJs_service ){
//    var demo1 = $('[name=duallistbox_demo1]').bootstrapDualListbox();
	var $location = $injector.get('$location') 
	var $cookies = $injector.get('$cookies')
	$scope.dataedit 
	$scope.dataedit_labelList 
	$scope.dataedit_colInfo 
	$scope.dataedit_type4 =[] 
	$scope.dataedit_select_colInfo
	$scope.dateedit_dualList = [] 
	$scope.select_list ={}
	$scope.select_list_sub = {} 
	$scope.applyBtn_flag = 1 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   load appConfiguartion  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	const setApplyBtn_flag = ()=>{
		let appConfiguartion = spreadJs_service.getAppConfiguration()
		switch( appConfiguartion.type ){
			case 'form_only':
				$scope.applyBtn_flag = 0 
				break; 
			default:
				$scope.applyBtn_flag = 1 
		}
	}
    spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( setApplyBtn_flag ) 

	const formCb_f_p = ( res_ )=>{
		let appConfiguartion = spreadJs_service.getAppConfiguration() 
		$scope.dataedit_labelList = appConfiguartion.formControl.labels 
// df[0] for availabe app list . 		
		console.log( res_ )
		if( res_.dataFrame.length == 0 ){
			let host = $location.host() 
			let url = `https://${ host }:3004/admin/user/login` 
			window.location.href = url 
		}

		$scope.dataedit_type4 = res_.dataFrame 
		let nonOffice_member =  $scope.header_list.find((ent)=> ent.title == '미상' )
		if( nonOffice_member?.title ){
			nonOffice_member.title = $scope.dataedit_type4[0].user_name 
			if( !$$phase )$scope.$apply() 
		}
	}
	const setFormPage = ()=>{
		spreadJs_service.set_formCb_f_p( formCb_f_p )
	}
    spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( setFormPage )
    $scope.type4_goWork = ( url, server_name )=>{
    //      window.location.assign( url )     
	//	    window.location.href = 'http://192.168.0.87:3001/company/main/0'
		    $cookies.put('user_DB', server_name,{ path: '/'} ) 
//		    window.open( url , '_blank' ) 
		    window.open( url , '_self' ) 
		    throw new Error('Forward to back!') 
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   legacy  DataEdit.  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	$scope.change_dataedit = ()=>{
		$scope.mode = 1
		const form_cb_f = ()=>{
			$scope.$apply() 
		}
		var { dataedit, dataedit_colInfo , dataedit_select_colInfo, select_list , select_list_sub } = dataEdit_service.change_dataedit(form_cb_f) 
		$scope.dataedit = dataedit 
		$scope.dataedit_colInfo = dataedit_colInfo 
		$scope.dataedit_select_colInfo = dataedit_select_colInfo
	    $scope.select_list = select_list 
		$scope.select_list_sub = select_list_sub
		$scope.dataedit_select_colInfo.forEach((ent)=>{
			$scope.select_list[ent.child] = $scope.select_list_sub[$scope.dataedit[ent.name]] 
		}) 
	}	
	$scope.isformTypetxt =( item )=>{
		return ( item.formType == 'txt')
	}
	$scope.editCancel = ()=>{
		$scope.mode = 0 
		serviceUi_service.windowPos_init() 
		hotLink_service.path_clear() 
		hotLink_service.path_set_app($scope.my_collection, $scope.tbl_name ) 
//		$scope.$apply() 
	}
	$scope.editApply = () =>{
		let working_ent = dataEdit_service.getWorking_entry() 
		let colInfo = dataEdit_service.getHeadInfos()
         for( var item of $scope.dataedit_colInfo ){
			 let Db_mode = dataEdit_service.getDb_mode() 
			 switch( Db_mode ){
// 202200211-001 bug fix .. 					 
				 case 'mssql':
					 if( item['DATA_TYPE'] == 'nvarchar' && $scope.dataedit[item.name] != null ) 	 working_ent[item.name] = '"'+ $scope.dataedit[item.name] +'"'
					 else working_ent[item.name] = $scope.dataedit[item.name] 
					 break;
			     default:
			         working_ent[item.name] = $scope.dataedit[item.name] 
			 }
		 }
// 		$scope.saveTbl_admin() 
		if( spreadjsFilter_service ){
			if( working_ent['seq'])spreadjsFilter_service.setFilter_key( working_ent['seq'] , 'seq' )   
			else spreadjsFilter_service.setFilter_key( working_ent['id_jpt'] , 'id_jpt' )   
		}
//Mon Mar 21 09:26:30 KST 2022 need force saveTbl refresh.. 
		let this_configuration = dataEdit_service.getThis_configuration() 
		this_configuration.ot_saveTbl_refresh = 1 
		dataEdit_service.saveTbl() 
		serviceUi_service.windowPos_init() 
		hotLink_service.path_clear() 
//Thu May 26 01:34:22 UTC 2022
		hotLink_service.path_set_app($scope.my_collection, $scope.tbl_name ) 
		$scope.mode =0 
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  myDataEdit Directive 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
angular.module('myDataEdit',[])
.controller('myDataEditCtrl', ['$injector','$scope','formControl_service','hotLink_service','encode64_service','spreadjsFilter_service',
							    'serviceUi_service','dataEdit_service','spreadJs_service',
	function( $injector, $scope, formControl_service , hotLink_service , encode64_service, spreadjsFilter_service, serviceUi_service ,
		  dataEdit_service, spreadJs_service ){
	angular.extend( this, new dataEditCtrl( $injector ,$scope, dataEdit_service , formControl_service, spreadjsFilter_service, hotLink_service , serviceUi_service, spreadJs_service )) 
    var demo1 = $('[name=duallistbox_demo1]').bootstrapDualListbox();
	$scope.selectChange = ( item )=>{
		$scope.select_list[item.child] = $scope.select_list_sub[$scope.dataedit[item.name]] 
	}
	$scope.ptr_variable = {'init_sel_ft': $scope.selectChange } 
}]) 
.directive('myDataedit',function(){
	return {
		restrict:'E',
		templateUrl:'/parts/dataedit/dataedit.html',
		controller:'myDataEditCtrl'
	}
})
