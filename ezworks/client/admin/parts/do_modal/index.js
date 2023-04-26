angular.module('myDomodal',[])
.controller('myDomodalCtrl',['$scope','restApiServiceDbEdit', 'doModal_service',
	function( $scope, restApiServiceDbEdit, doModal_service ){
	$scope.modals 
	$scope.modal  
	const cb_f_modal = ( res )=>{
		$scope.modals = res.tbl_data 
		res.tbl_format.forEach((ent)=>{
			if( ent.isJson ){
				$scope.modals.forEach((ent0)=>{
					ent0[ent.name] = JSON.parse( ent0[ent.name]) 
				})
			}
		})
/*
	$scope.modals = [{ id: 1, callback:null ,args:null, title: '새로운 앱' ,  content:'새로운앱 생성',input_1: { label:'앱이름', enable: 1, text: null } }, 
				  { id: 2, callback:null ,args:null, title: '새로운 앱 저장', content:'새로운 앱으로 저장합니다.', input_1: { label:'앱이름', enable: 0, text: null }},
				  { id: 3, callback:null ,args:null, title: 'Mssql에 생성', content:'Mssql에 생성합니다.', input_1: { label:'앱이름', enable: 0, text: null }},
				  { id: 4, callback:null ,args:null , title: 'Mssql에 삭제', content:'Mssql에서 삭제합니다.', input_1: { label:'앱이름', enable: 0, text: null }},
				  { id: 5, callback:null ,args:null , title: 'Command help', content:'done' , input_1: { label:'앱이름', enable: 0, text: null }},
	] */
	}
	doModal_service.getDataWithHdr('Design_modal', cb_f_modal )
	$scope.modalDispatch = ( id )=>{
//		switch( id ){
//			case 1:  // Create App 
//replace.				$scope.createApp( $scope.modal.input_1.text ) 
//				break;
//			case 2:  // Save new App. 
//				$scope.addNew_app() 
//				break; 
//			default:
//		}
		$scope.modal.callback( $scope.modal.args, $scope.modal ) 
	}
/*	
	$scope.initApp = ()=>{
		$scope.openApp('./server/db_edit/apps/app_list') 
	}*/
	$scope.doModal = ( inx )=>{
		$scope.modal = $scope.modals[inx - 1] 
	   if(inx == 5 )$scope.$apply() 
		$('#exampleModalCenter').modal() 
	}
}])
.directive('myDomodal', function(){
	return{
		restrict:'E',
		templateUrl:'/db_edit/parts/do_modal/do_modal.html',
		controller:'myDomodalCtrl'	
	}
})
