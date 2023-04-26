
'use strict';

describe('controller: [parts/headers] headers ctrl', function() {
	// load the controller's module 
	beforeEach( module('myApp.rest_api_service'))
	beforeEach( module('work_space'))
	beforeEach( module('admin_app'))
	beforeEach( module('spread_js'))
	beforeEach( module('parse_str'))
	beforeEach( module('work_space.collections'))
	beforeEach( module('myWorkspaceHeader'))

	var workSpace_service, $httpBackend , $cookies , workSpace_factory, scope, controller  
	beforeEach( inject( function ( $injector, $rootScope, $controller ){
		 workSpace_service = $injector.get('workSpace_service') 
		 workSpace_factory = $injector.get('workSpace_factory') 
		 $httpBackend = $injector.get('$httpBackend') 
		 $cookies = $injector.get('$cookies') 
		 scope = $rootScope.$new() 
		 controller = $controller('myWorkspaceHeaderCtrl', { '$scope': scope }) 
		 console.log('d') 
	}))
	it('ctrl header test', function(){
		expect( scope.isHeaderEnabled ).toEqual(1)  // keep default 1
	})
})	
