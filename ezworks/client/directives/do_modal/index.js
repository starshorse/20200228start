/*
	bootstrap modal directive.. 
	$scope.$broadcast('doModal') 
*/
angular.module('myDomodal',[])
.controller('myDomodalCtrl',['$scope','myDomodal_service', 
	function( $scope, myDoModal_service ){
//		var myModal = new bootstrap.Modal( document.getElementById('exampleModalCenter'),{ static: false , keyboard: false } )
	$scope.$on('doModal', ()=>{
		if( !$scope.$root.$$phase )$scope.$apply();
		$('#exampleModalCenter').modal('show') 
//		myModal.show() 
	})
	$scope.$on('hideModal',()=>{
		$('#exampleModalCenter').modal('hide') 
//		myModal.hide()
	})
	$scope.modalDispatch = ( modal )=>{
		modal.callback( modal.params ); 
		$('#exampleModalCenter').modal('hide') 
//		myModal.hide()
	}
    $scope.modalCancel = ( modal )=>{
		$('#exampleModalCenter').modal('hide') 
//		myModal.hide() 
	}
// modal('show') after a modal('hide' doesn't work  workaround. 
	var hideInProgress = false;
	var showModalId = '';
	function showModal(elementId) {
		if (hideInProgress) {
			showModalId = elementId;
		} else {
			$("#" + elementId).modal("show");
		}
	};
	function hideModal(elementId) {
		hideInProgress = true;
		$("#" + elementId).on('hidden.bs.modal', hideCompleted);
		$("#" + elementId).modal("hide");
		function hideCompleted() {
			hideInProgress = false;
			if (showModalId) {
				showModal(showModalId);
			}
			showModalId = '';
			$("#" + elementId).off('hidden.bs.modal');
		}
	};
		$scope.$on('doModalImmediate',()=>{
			showModal('exampleModalCenter')
			}
		) 
		$scope.$on('hideModalImmediate',()=>{
			hideModal('exampleModalCenter') 
			}
		)

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
