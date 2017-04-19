describe('Sponsor Home Route', function () {
  // Define global references for injections
  var $state,
    $rootScope,
    UIState,
    state,
    params,
    expectedURL;

  beforeEach(angular.mock.module('AddictionNetworkApp'));

  // Inject and assign the $state and $rootScope services.
  // Put the template in template cache.
  beforeEach(angular.mock.inject(function ($injector) {
    $state = $injector.get('$state');
    $rootScope = $injector.get('$rootScope');
    UIState = $injector.get('UIState');
    $state.go('home');
    $rootScope.$digest();
  }));

  it('should have state `sponsorHome.filter`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.FILTER;
    params = {
      'filterName': 'Rehab for Men'
    };
    expectedURL = encodeURI('#/sponsorhome/filter/Rehab for Men');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

  it('should have state `sponsorHome.state`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.STATE;
    params = {
      'stateName': 'IL'
    };
    expectedURL = '#/sponsorhome/state/IL';
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state, params);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

  it('should have state `sponsorHome.county`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.COUNTY;
    params = {
      'stateName': 'IL',
      'countyName': 'Cook County'
    };
    expectedURL = encodeURI('#/sponsorhome/IL/Cook County');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state, params);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

  it('should have state `sponsorHome.city`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.CITY;
    params = {
      'stateName': 'IL',
      'countyName': 'Cook County',
      'cityName': 'Chicago'
    };
    expectedURL = encodeURI('#/sponsorhome/IL/Cook County/Chicago');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state, params);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

  it('should have state `sponsorHome.counties`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.COUNTIES;
    params = {
      'stateName': 'IL'
    };
    expectedURL = encodeURI('#/sponsorhome/counties/IL');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state, params);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

  it('should have state `sponsorHome.citiesOfState`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.CITIES_OF_STATE;
    params = {
      'stateName': 'IL'
    };
    expectedURL = encodeURI('#/sponsorhome/cities/IL');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state, params);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

  it('should have state `sponsorHome.citiesOfCounty`', function () {
    // Test whether the url is correct
    state = UIState.SPONSOR_HOME.CITIES_OF_COUNTY;
    params = {
      'stateName': 'IL',
      'countyName': 'Cook County'
    };
    expectedURL = encodeURI('#/sponsorhome/cities/IL/Cook County');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state, params);
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });
});
