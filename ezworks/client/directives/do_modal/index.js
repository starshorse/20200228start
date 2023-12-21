/*
	bootstrap modal directive.. 
	$scope.$broadcast('doModal') 
*/
angular.module('myDomodal',[])
.controller('myDomodalCtrl',['$scope','myDomodal_service', 
	function( $scope, myDoModal_service ){
		var myModal = new bootstrap.Modal( document.getElementById('exampleModalCenter'),{ static: false , keyboard: false } )
	$scope.$on('doModal', ()=>{
//		$('#exampleModalCenter').modal('show') 
		myModal.show() 
	})
	$scope.$on('hideModal',()=>{
//		$('#exampleModalCenter').modal('hide') 
		myModal.hide()
	})
	$scope.modalDispatch = ( modal )=>{
		modal.callback( modal.params ); 
//		$('#exampleModalCenter').modal('hide') 
		myModal.hide()
	}
    $scope.modalCancel = ( modal )=>{
//		$('#exampleModalCenter').modal('hide') 
		myModal.hide() 
	}

}])
.service('myDomodal_service', function(){
})
.directive('myDomodal', function(){
	return{
		restrict:'E',
		scope:{
			modal: '='
		}, 
		templateUrl:'/directives/do_modal/do_modal.html',
		controller:'myDomodalCtrl'	
	}
})
