'use strict';

describe('Service: [serivce/work_space/collections] collections service', function() {
	// load the controller's module 
	beforeEach( module('work_space.collections'))
	beforeEach( module('myApp.rest_api_service'))
	beforeEach( module('work_space'))
	beforeEach( module('admin_app'))
	var workSpace_factory , workSpaceCollections_service ,  workSpaceCollections_factory , $httpBackend 
	beforeEach( inject( function ( $injector){
        $httpBackend = $injector.get('$httpBackend') 
		 workSpaceCollections_service = $injector.get('workSpaceCollections_service') 
		 workSpaceCollections_factory = $injector.get('workSpaceCollections_factory') 
		 workSpace_factory = $injector.get('workSpace_factory') 
	}))
	var collection_list = [
		{'name':'collectionIntro', 'level': 0,'parent':['main','collections'],'apps':['정기업무기본정보'],'configuration':{} },
		{'name':'newApp', 'level': 5 ,'parent':['main','collections'],'apps':['정기업무기본정보'],'configuration':{'menuListAble': 1 } },
		{'name':'AppEdit', 'level': 5 ,'parent':['main'],'apps':['%collections_list%'],'configuration':{'menuListAble': 0 } },
	] 
    var apps_list_all = [{'id':1 , 'name':'정기업무기본정보'}]
	it('[service/work_space/collections]#1  basic service test', function(){
		$httpBackend.expectGET('/db_edit/data/collection_list')
			.respond( collection_list ); 
		workSpace_factory.apps_list_all = apps_list_all  
		workSpaceCollections_service.initCollection('collectionIntro', 
			()=>{ 
		        expect( workSpaceCollections_service.getMyCollection() ).toEqual( collection_list[0] ) 
		        expect( workSpaceCollections_factory.my_collection ).toEqual( collection_list[0] ) 
		        expect( workSpaceCollections_factory.collections_list ).toEqual( collection_list ) 
		        expect( workSpaceCollections_factory.my_collectionConfiguration ).toEqual( collection_list[0].configuration ) 
				console.log('#[workSpaceCollections_service][test]#1 done!')
		})
		$httpBackend.flush() 
	})
	it('[service/work_space/collections]#2  newApp collection should be list in AppEdit Collection', function(){
		$httpBackend.expectGET('/db_edit/data/collection_list')
			.respond( collection_list ); 
		workSpace_factory.apps_list_all = apps_list_all  
		workSpaceCollections_service.initCollection('AppEdit',
			()=>{
				let apps_list_parent = workSpace_factory.apps_list_parent.map((ent)=>ent.name ) 
				expect( apps_list_parent ).toContain('newApp') 
				console.log('#######################[workSpaceCollections_service][test]#2 done!')
	    })
		$httpBackend.flush() 
    })
})	
