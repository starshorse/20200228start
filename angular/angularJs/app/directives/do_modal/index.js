/*
	bootstrap modal directive.. 
	$broadcast('doModl') 
	modal = { title: 'title' , content: 'content' , input_1: { enable: true , label, text } , callback: ( modal )=>{ modal.input_1.text }  
*/
angular.module('myDomodal',[])
.controller('myDomodalCtrl',['$scope','myDomodal_service', 
	function( $scope, myDoModal_service ){
	$scope.$on('doModal', ()=>{
		$('#exampleModalCenter').modal('show') 
	})
	$scope.modalCancel = ( modal )=>{
		$('#exampleModalCenter').modal('hide') 
	}
	$scope.modalDispatch = async ( modal )=>{
	   let result =	await modal.callback( modal );
	   if( result.STATUS ==  0 )
			$scope.modalCancel( modal );
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
