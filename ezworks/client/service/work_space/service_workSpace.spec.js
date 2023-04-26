'use strict';

describe('Service: [serivce/work_space] work_space service', function() {
	// load the controller's module 
	beforeEach( module('myApp.rest_api_service'))
	beforeEach( module('work_space'))
	beforeEach( module('admin_app'))
	var workSpace_service, $httpBackend , $cookies , workSpace_factory 
	beforeEach( inject( function ( $injector){
		 workSpace_service = $injector.get('workSpace_service') 
		 workSpace_factory = $injector.get('workSpace_factory') 
		 $httpBackend = $injector.get('$httpBackend') 
		 $cookies = $injector.get('$cookies') 
	}))
	it('[service/work_space/collections] service test', function(){
		let cur_user_info = {'name':'RICHARD CHOI','email':'star_horse@naver.com','level': -1,'configuration':{} } 
		let apps_list  = [{'name':'apps_list', 'level': 0, 'configuration':{} }] 
		let companies_info = [{'corperation':'ezoffice', 'level': 0 }] 
		$httpBackend.whenGET('/db_edit/data/admin_1')
			.respond([cur_user_info]); 
		$httpBackend.whenGET('/db_edit/data/app_list')
			.respond( apps_list ); 
		$httpBackend.whenGET('/db_edit/data/회사정보')
			.respond( companies_info ); 
		 $cookies.put('user','star_horse@naver.com') 

		 workSpace_service.initAppsList( ()=>{ 
// Test Case here.. 
            expect( workSpace_factory.cur_user_info ).toEqual( cur_user_info )
			 console.log('#[workSpace_service][test] done!')
		 })
		 $httpBackend.flush()  
//		 expect(1).toEqual(0) 
	})
	
})
