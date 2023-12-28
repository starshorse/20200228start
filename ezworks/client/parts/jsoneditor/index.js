angular.module('jsoneditor',[])
.config( ['$routeProvider', function( $routeProvider ){
     $routeProvider.when('/view_1',{
		 template :'<div>View_2</div>',
		 controller : 'view_1Ctrl'
	 })
}])
.controller('view_1Ctrl', ['$scope', function( $scope ){
	$scope.dataMode = 2 
}])
.controller('jsoneditorCtrl', ['$scope','jsonEditor_service','spreadjsFilter_service', 
	function($scope,jsonEditor_service, spreadjsFilter_service ){
     // create the editor
	const container = document.getElementById("jsoneditor")
	jsonEditor_service.initEditor( container ) 
	jsonEditor_service.updateData( $scope.jeditor.data  ) 

	$scope.jsonApply = ()=>{
		if( $scope.jeditor.cb_apply )
                $scope.jeditor.cb_apply(); 
//		jsonEditor_service.setJSONData() 
		$scope.dataMode = 0 
	}
	$scope.jsonCancel = ()=>{
		if( $scope.jeditor.cb_cancel )
			    $scope.jeditor.cb_cancel(); 
		$scope.dataMode = 0 
	}
}]) 
.directive('jsonEditor', function(){
      return {
		restrict:'E',
		scope: { jeditor:'='} ,
		templateUrl:'/parts/jsoneditor/jsoneditor.html', 
        controller:'jsoneditorCtrl'
	  }
})
