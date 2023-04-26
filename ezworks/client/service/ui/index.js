angular.module('service_ui', [])
.service( 'serviceUi_service', ['$window', function( $window){
	this.windowPos_init = () =>{
		$window.scrollTo(0,0) 
	}
}])
