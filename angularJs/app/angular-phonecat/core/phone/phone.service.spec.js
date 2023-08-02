describe('Phone', function() {
  ...
  var phonesData = [...];
  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });
  // Load the module that contains the `Phone` service before each test
  ...
  // Instantiate the service and "train" `$httpBackend` before each test
  ...
  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('should fetch the phones data from `/phones/phones.json`', function() {
    var phones = Phone.query();
    expect(phones).toEqual([]);
    $httpBackend.flush();
    expect(phones).toEqual(phonesData);
  });
});
