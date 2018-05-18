describe('My Profile Route', function () {
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
  }));

  it('should have state `myProfile.profile`', function () {
    state = UIState.MY_PROFILE.PROFILE;
    // Test whether the url is correct
    expectedURL = encodeURI('#/my-profile/profile');
    expect($state.href(state)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.accountSetting`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.ACCOUNT_SETTING;
    expectedURL = encodeURI('#/my-profile/account-settings');
    expect($state.href(state)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.changePassword`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.CHANGE_PASSWORD;
    expectedURL = encodeURI('#/my-profile/change-password');
    expect($state.href(state)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.myTreatmentCenters`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.MY_CENTERS;
    expectedURL = encodeURI('#/my-profile/my-treatment-centers');
    expect($state.href(state)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.addTreatmentCenter`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.ADD_CENTER;
    expectedURL = encodeURI('#/my-profile/add-treatment-center');
    expect($state.href(state)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.editTreatmentCenter`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.EDIT_CENTER;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/edit-treatment-center/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.bannerAds`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.BANNER_ADS;
    expectedURL = encodeURI('#/my-profile/banner-ads');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.bannerAdsAdd`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.BANNER_ADS_ADD;
    expectedURL = encodeURI('#/my-profile/banner-ads/add-banner');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.bannerAdsEdit`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.BANNER_ADS_EDIT;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/banner-ads/edit-banner/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.bannerAdsView`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.BANNER_ADS_VIEW;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/banner-ads/view-banner/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.sponsorAds`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.SPONSOR_ADS;
    expectedURL = encodeURI('#/my-profile/sponsor-ads');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  // it('should have state `myProfile.sponsorAdsAdd`', function () {
  //   // Test whether the url is correct
  //   state = UIState.MY_PROFILE.SPONSOR_ADS_ADD;
  //   expectedURL = encodeURI('#/my-profile/sponsor-ads/add-sponsor');
  //   expect($state.href(state, params)).toEqual(expectedURL);
  //   // Test whether our state activates correctly
  //   $state.go(state);
  //   $rootScope.$digest();
  //   expect($state.current.name).toEqual(state);
  // });

  it('should have state `myProfile.sponsorAdsEdit`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.SPONSOR_ADS_EDIT;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/sponsor-ads/edit-sponsor/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.sponsorAdsView`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.SPONSOR_ADS_VIEW;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/sponsor-ads/view-sponsor/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.paymentDetails`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.PAYMENT_DETAILS;
    expectedURL = encodeURI('#/my-profile/payment-details');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.paymentDetailsAdd`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.PAYMENT_DETAILS_ADD;
    expectedURL = encodeURI('#/my-profile/payment-details/add-payment');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.paymentDetailsEdit`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.PAYMENT_DETAILS_EDIT;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/payment-details/edit-payment/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });

  it('should have state `myProfile.paymentDetailsView`', function () {
    // Test whether the url is correct
    state = UIState.MY_PROFILE.PAYMENT_DETAILS_VIEW;
    params = {
      id: 100
    };
    expectedURL = encodeURI('#/my-profile/payment-details/view-payment/100');
    expect($state.href(state, params)).toEqual(expectedURL);
    // Test whether our state activates correctly
    $state.go(state);
    $rootScope.$digest();
    expect($state.current.name).toEqual(state);
  });
});
