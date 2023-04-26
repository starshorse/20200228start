angular.module('switch_mode',[])
.controller('switchModeCtrl', ['$scope','spreadJs_service',
	function( $scope, spreadJs_service ){
	$scope.saveMode = 0 
	$scope.switchMode_flag = 1 
	$scope.switch_mode = ()=>{
		if( $scope.saveMode  ){
			$scope.mode = $scope.saveMode 
			$scope.saveMode = 0 
		}	
		else{
			$scope.saveMode =  $scope.mode 
			$scope.mode = 0 
		}
	}
	const setSwitchMode_flag = ()=>{
		let appConfiguration = spreadJs_service.getAppConfiguration() 
		switch( appConfiguration.type ){
			case 'page_only':
			case 'form_only':	
				$scope.switchMode_flag = 0 
				break; 
			default:	
				$scope.switchMode_flag = 1 
		}
	}
	spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( setSwitchMode_flag ) 
}])
.directive('switchMode', function(){
	return {
		restrict:'E',
		controller:'switchModeCtrl', 
		template:`
		<div class='form-group row mt-1' ng-show='switchMode_flag'>
			<div class='col-md-10'>
			</div>
			<div class='col-md-2'>
				<BUTTON class='btn btn-info btn-block' ng-click='switch_mode()'>Switch</BUTTON>	
			</div>
		<div> `
	}	

})
