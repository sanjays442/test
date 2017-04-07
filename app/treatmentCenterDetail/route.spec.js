describe('Treatment Cetner Detail Route', function () {
  // Define global references for injections
  var state = 'treatmentCenterDetail',
    targetUrl = '#/treatment-center-detail/',
    $state,
    $rootScope;

  beforeEach(angular.mock.module('AddictionNetworkApp'));

  // Inject and assign the $state and $rootScope services.
  // Put the template in template cache.
  beforeEach(angular.mock.inject(function ($injector) {
    $state = $injector.get('$state');
    $rootScope = $injector.get('$rootScope');
  }));

  // Test whether the url is correct
  it('should respond to URL', function () {
    var _id = 100;
    expect($state.href(state)).toEqual(targetUrl);
    expect($state.href(state, {
      id: _id
    })).toEqual((targetUrl + _id));
  });

  // Test whether our state activates correctly
  it('should activate the state', function () {
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });
});
