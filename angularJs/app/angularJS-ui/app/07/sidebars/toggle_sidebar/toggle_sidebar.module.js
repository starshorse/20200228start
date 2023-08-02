/*
    prequsition: mySidebars 
	             css .container        

*/
angular.module('toggle_sidebar',[])
.factory('toggleSidebar_factory', function(){
	var toggleSidebar_factory = {
		full_flag: 0,
		save_state: {}
	}
	return toggleSidebar_factory 
})
.controller('toggle_sidebarCtrl',['$scope','$window','toggleSidebar_factory', function($scope, $window, toggleSidebar_factory ){
	if( $('.container').hasClass('active'))$('.container').removeClass('active') 
	 $('#sidebarCollapse').on('click', function () {
        $('.container').toggleClass('active')
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  resgister envets .. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
// toggle Slide 
	$scope.toggleSlide = ()=>{
	}
	$scope.toggleFullScreen = ()=>{
	}
}])
.directive('toggleSidebar', function(){
	return {
		restrict:'E',
		controller:'toggle_sidebarCtrl',
		template:`
                  <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
				  <button type="button" id="sidebarCollapse" class="myButton btn btn-lg btn-info mx-1 px-1" ng-click="toggleSlide()">
		                     <box-icon name="rocket"></box-icon>
							<span>S</span>
				  </button>
		          <button type="button" id="fullScreen_toggle" class="myButton btn btn-lg btn-info mx-1 px-1" ng-click="toggleFullScreen()">
		                     <box-icon name="rocket"></box-icon>
							<!-- <span>F</span> -->
				  </button>`
	}
})
