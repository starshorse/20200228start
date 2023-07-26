/*
	bootstrap modal directive.. 
	$broadcast('doModl') 
*/
angular.module('myDomodal',[])
.controller('myDomodalCtrl',['$scope','myDomodal_service', 
	function( $scope, myDoModal_service ){
	$scope.$on('doModal', ()=>{
		$('#exampleModalCenter').modal('show') 
	})
	$scope.modalDispatch = ( modal )=>{
		modal.callback(); 
		$('#exampleModalCenter').modal('hide') 
	}
    $scope.modalCancel = ( modal )=>{
		$('#exampleModalCenter').modal('hide') 
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
