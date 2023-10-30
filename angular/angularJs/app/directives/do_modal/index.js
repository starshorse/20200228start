/*
	bootstrap modal directive.. 
	$broadcast('doModl') 
*/
angular.module('myDomodal',[])
.controller('myDomodalCtrl',['$scope','myDomodal_service', 
	function( $scope, myDoModal_service ){
	$scope.$on('doModal', ()=>{
		$('#exampleModalCenter').modal() 
	})
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
