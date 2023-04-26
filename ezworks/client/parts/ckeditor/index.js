angular.module('ckEditor',[])
.controller('ckEditorCtrl',['$scope', 'jsonEditor_service', function($scope, jsonEditor_service ){
	var editor 
	InlineEditor
		.create( document.querySelector( '#editor' ) )
	    .then( newEditor => {
			editor = newEditor 
			jsonEditor_service.initCkEditor( editor ) 
		})
		.catch( error => {
			console.error( error );
		} );
	$scope.ckEditorApply = ()=>{
		console.log( editor.getData() ) 
		jsonEditor_service.setHtmlData() 
		$scope.dataMode = 0 
	}
	$scope.ckEditorCancel = () =>{
		$scope.dataMode = 0 
	}
}])
.directive('ckEditor', function(){
	return{
		restrict:'E',
		templateUrl:'/parts/ckeditor/ckeditor.html' ,
		controller:'ckEditorCtrl'
	}
})
