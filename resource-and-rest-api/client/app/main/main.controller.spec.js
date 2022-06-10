'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('resourceAndRestApiApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
//	console.log( scope ) // log: {}  
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
//    expect(scope.awesomeThings.length).toBe(4);
    expect(scope.things.length).toBe(4);
  });
});
