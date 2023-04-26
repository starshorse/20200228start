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
	$scope.jsonApply = ()=>{
		jsonEditor_service.setJSONData() 
		$scope.dataMode = 0 
	}
	$scope.jsonCancel = ()=>{
		$scope.dataMode = 0 
	}
/*	
	const options = {}
	const editor = new JSONEditor(container, options)
	// set json
	const initialJson = {
					"Array": [1, 2, 3],
					"Boolean": true,
					"Null": null,
					"Number": 123,
					"Object": {"a": "b", "c": "d"},
					"String": "Hello World"
				}
	editor.set(initialJson)
	// get json
	const updatedJson = editor.get()
*/
}]) 
.directive('jsonEditor', function(){
      return {
		restrict:'E',
		templateUrl:'/parts/jsoneditor/jsoneditor.html', 
        controller:'jsoneditorCtrl'
	  }
})
