describe('Sponsor Home Route', function () {
  // Define global references for injections
  var state = 'sponsorHome',
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
    expect($state.href(state)).toEqual(encodeURI('#/sponsorhome/'));
    expect($state.href(state, {
      slug: 'Test Slug'
    })).toEqual(encodeURI('#/sponsorhome/Test Slug'));
  });

  // Test whether our state activates correctly
  it('should activate the state', function () {
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });
});
