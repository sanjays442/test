describe('About Us Route', function () {
  // Define global references for injections
  var $state,
    $rootScope,
    UIState,
    state,
    expectedURL;

  beforeEach(angular.mock.module('AddictionNetworkApp'));

  // Inject and assign the $state and $rootScope services.
  // Put the template in template cache.
  beforeEach(angular.mock.inject(function ($injector) {
    $state = $injector.get('$state');
    $rootScope = $injector.get('$rootScope');
    UIState = $injector.get('UIState');
  }));

  it('should have state `aboutUs`', function () {
    // Test whether the url is correct
    state = UIState.ABOUT_US;
    expectedURL = '#/searchState';
    expect($state.href(state)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });
});
