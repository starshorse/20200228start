'use strict';

describe('Controller: [Company/main/0/app] MainCtrl', function() {
	// load the controller's module 
	beforeEach( module('myMain_0'))
	var MainCtrl, 
		$rootScope,
		scope,
		$httpBackend, 
		$cookies ,
		$http,
		$controller 


	// Initialize the Controller and a mock scope 
//	beforeEach( inject( function (_$httpBackend_, $controller, $rootScope, $cookies ,$http ){
	beforeEach( inject( function( $injector ) {
		$rootScope = $injector.get('$rootScope') 
		$httpBackend = $injector.get('$httpBackend')  
		$http = $injector.get('$http')  
		$cookies = $injector.get('$cookies') 
        $controller = $injector.get('$controller') 

		$httpBackend.whenGET('/db_edit/data/admin_1')
			.respond([{'name':'RICHARD CHOI','email':'star_horse@naver.com','level': -1,'configuration':'{}' }]); 
		$httpBackend.whenGET('/db_edit/data/app_list')
			.respond([{'name':'apps_list', 'level': 0, 'configuration':'{}' }]); 
		$httpBackend.whenGET('/db_edit/data/회사정보')
			.respond([{'corperation':'ezoffice', 'level': 0 }]); 
		$httpBackend.whenGET('/company/main/0/view/viewMain.html')
			.respond( 200 , 'viewMain HTML'); 
		$httpBackend.whenGET('/db_edit/data/collection_list')
			.respond([{'name':'collectionIntro', 'level': 0, 'configuration':'{}' }]); 
		$cookies.put('user','star_horse@naver.com') 
		scope = $rootScope.$new() 
/*		
		MainCtrl = $controller('myMain_0Ctrl', {
			$scope: scope 
		})
//		jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
*/
	}))
	afterEach( function(){
/*		
		$httpBackend.verifyNoOutstandingExpectation() 
		$httpBackend.verifyNoOutstandingRequest() 
*/		
	})
//	$httpBackend.resetExpectations() 
   
	it('[Company/main/0/app] mayMain_0 Controller init test', function() {
		$httpBackend.flush() 
/*		
		expect(scope.my_collection).toMatch('main') 
		expect(scope.frame_type).toMatch('main') 
*/		
		$httpBackend.expectGET('/db_edit/data/collection_list')
			.respond([{'name':'collectionIntro', 'level': 0, 'configuration':'{}' }]); 
		console.log('%%%%')
		$http.get('/db_edit/data/collection_list').then((res_)=>{ console.log('####', res_.data )
//		    $httpBackend.flush() 
//			 done() 
			
		    $httpBackend.whenGET('/db_edit/data/회사정보')
			    .respond([{'corperation':'ezoffice', 'level': 0 }]); 
			$http.get('/db_edit/data/회사정보').then((res_)=>{ console.log('@@@@', res_.data )
//				$httpBackend.flush() 
			}) 
//		    $httpBackend.flush() 
		})
///		    $httpBackend.flush() 
	})
	
})
