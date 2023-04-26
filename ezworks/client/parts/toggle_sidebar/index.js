angular.module('toggle_sidebar',[])
.factory('toggleSidebar_factory', function(){
	var toggleSidebar_factory = {
		toggleSidebar_flag: 0 , 
		ft_toggleSideStauts : ()=>{ return $('#sidebar').hasClass('active')}, 
		ft_toggleSide_pushBar : ()=>{ $('#sidebar').addClass('active') },
		hide_sidebar : ()=>{
			$('#sidebar').addClass('active') 
			toggleSidebar_factory.updateSpreadJs_window() 
		},
		updateSpreadJs_window : ()=>{
			if( $('#sidebar').hasClass('active')){	
				document.getElementById("ss").style.width = "100%";
				$('#appWrapper').removeClass('disabledbutton') 
				$('body').css('overflow','hidden') 
				//		 $('#ss').wijspread("spread").repaint()
			}else{	
				document.getElementById("ss").style.width = "100%";
				$('#appWrapper').addClass('disabledbutton') 
				$('body').css('overflow','scroll') 
				//		 $('#ss').wijspread("spread").repaint()
			}	
		}
	}
	return toggleSidebar_factory 
})
.controller('toggle_sidebarCtrl',['$scope','$window','toggleSidebar_factory', function($scope, $window, toggleSidebar_factory ){
	if( $('#sidebar').hasClass('active'))$('#sidebar').removeClass('active') 
// fake using timeout. 
	 setTimeout( ()=>{
	 }, 500 )
//   	 document.getElementById("ss").style.width = "100%";
     $(window).resize( toggleSidebar_factory.updateSpreadJs_window ) 
	 $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active')
		toggleSidebar_factory.updateSpreadJs_window()  
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  resgister envets .. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	$(window).resize( toggleSidebar_factory.updateSpreadJs_window )  
	$window.addEventListener('click', function(e){
		if( toggleSidebar_factory.ft_toggleSideStauts && !toggleSidebar_factory.toggleSidebar_flag ){
		   console.log('[parts/toggleSidebar] $windows mouse click: ', toggleSidebar_factory.ft_toggleSideStauts   )  
		   toggleSidebar_factory.ft_toggleSide_pushBar()
	    	$('#appWrapper').removeClass('disabledbutton') 
			$('body').css('overflow','hidden') 
		}
		toggleSidebar_factory.toggleSidebar_flag = 0 
	})
// toggle Slide 
	$scope.toggleSlide = ()=>{
		console.log('[parts/toggleSidebar] $scope.toggleSide () toggleSidebar_flag ', toggleSidebar_factory.toggleSidebar_flag =  !toggleSidebar_factory.toggleSidebar_flag  )  
	}
	var full_flag = 0 
	var save_state = {} 
	$scope.toggleFullScreen = ()=>{
		if( !full_flag ){
			save_state.isMainButton_enabled = $scope.isMainButton_enabled 
		    save_state.isCmdInput_enabled  =  $scope.isCmdInput_enabled  
			$scope.isMainButton_enabled = 0 
			$scope.isCmdInput_enabled = 0
			$scope.isHeaderEnabled =  0
			full_flag = 1
			if( !$scope.$$phase )$scope.$apply() 
		}else{
		   $scope.isMainButton_enabled = save_state.isMainButton_enabled 
		   $scope.isCmdInput_enabled = save_state.isCmdInput_enabled 	
		   $scope.isHeaderEnabled =  1
		   full_flag = 0
			if( !$scope.$$phase )$scope.$apply() 
		}
	}
}])
.directive('toggleSidebar', function(){
	return {
		restrict:'E',
		controller:'toggle_sidebarCtrl',
		template:`<button type="button" id="sidebarCollapse" class="myButton btn btn-lg btn-info mx-1 px-1" ng-click="toggleSlide()">
							<i class="fas fa-align-left"></i>
							<span>Sidebar/close</span>
				  </button>
		          <button type="button" id="fullScreen_toggle" class="myButton btn btn-lg btn-info mx-1 px-1" ng-click="toggleFullScreen()">
							<i class="fas fa-align-left"></i>
							<span>Full/normal</span>
				  </button>`
	}
})
