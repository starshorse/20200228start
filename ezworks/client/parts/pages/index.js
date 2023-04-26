angular.module('myPages',[])
.controller('myPagesCtrl',['$scope','$sce','spreadJs_service','$compile', function( $scope, $sce, spreadJs_service, $compile ){
	$scope.pageHtml = '<h2>Hello</h2>'   
	$scope.opts = 'init' 
	$scope.id = '1234' 
	$scope.data = ['최종규',14,13] 
	const updateData_cb_f = ( res_ )=>{
		$scope.data = res_ 	
	}
	const setPageHtml = ()=>{
		$scope.opts ='update' 
		
		let html_ = spreadJs_service.getPageHtml() 
		let myDom = document.getElementById('myID') 
	    var element = angular.element(myDom);
	    var p = '<p ng-bind="id">Test Run</p>'; // <- will be bound/replaced with $scope.id
		while( myDom.firstChild ){
			   myDom.removeChild( myDom.firstChild ) 
		}
		element.append(html_);
//		element.replaceWith(html_) 
		$compile(element.contents())($scope);
		elements  = angular.element( document.getElementsByTagName( 'table' ) );
		elements.addClass('table') 
		
	} 
	spreadJs_service.openTbl_f_list.addPre_openTbl_f_list( setPageHtml ) 
    spreadJs_service.set_pageCb_f_p( updateData_cb_f ) 
}])
.directive('myPages',['spreadJs_service','$compile',function( spreadJs_service , $compile ){
	var getTemplate = function( contentType ){
		  switch( contentType ){
			case 'init':
				  return  '<h2>Not loaded yet</h2>' 
		    case 'update':	  
		          let html_ = spreadJs_service.getPageHtml() 
		  		  return  html_ 
		  }
	}
	var linker = function(scope, element, attrs){
		          element.html(getTemplate( scope.opts));
		          $compile(element.contents())(scope);
		        };
     return{
		restrict:'E',
//		replace: true  ,
//		link : linker ,
		templateUrl:'/parts/pages/pages.html',
		controller:'myPagesCtrl',
/*		 
		compile   : function( element, attrs , transclude ){
			
		    let html_ = spreadJs_service.getPageHtml() 
			while( element.firstChild ){
				   element.removeChild( element.firstChild ) 
			}
			element.append( html_ ) 
			return  linker 
		}
*/		
	 }
}])
