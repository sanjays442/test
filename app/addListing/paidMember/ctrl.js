module.exports = ['$rootScope', '$log', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($rootScope, $log, $state, UIState, localStorageService) {
  // todo
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CONTACT_INFO);
  };
  lm.finish = function () {
    $rootScope.addListingStepDone = 0;
    $state.go(UIState.LOGIN);
  };

  $rootScope.activeLink = 'Membership';
  lm.sponsored = function () {
    $rootScope.addListingStepDone = 2;
    $rootScope.membershipType = 'sponsored';
    localStorageService.set('membershipType', $rootScope.membershipType, 'sessionStorage');
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paidMember']);
    $rootScope.centerReset = 0;
    $rootScope.showSteps = ['contactInfo', 'paidMember', 'centerInfo', 'centerDetails', 'paymentDetails', 'sponsoredPage', 'bannerAd', 'featuredListing'];
    setMembershipType('sponsored');
    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  lm.featured = function () {
    $rootScope.addListingStepDone = 2;
    $rootScope.membershipType = 'featured';
    localStorageService.set('membershipType', $rootScope.membershipType, 'sessionStorage');
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paidMember']);
    $rootScope.centerReset = 0;
    $rootScope.showSteps = ['contactInfo', 'paidMember', 'centerInfo', 'centerDetails', 'paymentDetails', 'sponsoredPage', 'bannerAd', 'featuredListing'];
    setMembershipType('featured');
    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  lm.freeSignup = function () {
    $rootScope.addListingStepDone = 3;
    $rootScope.membershipType = 'free';
    localStorageService.set('membershipType', $rootScope.membershipType, 'sessionStorage');
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paidMember']);
    $rootScope.centerReset = 0;
    $rootScope.showSteps = ['contactInfo', 'paidMember', 'centerInfo', 'centerDetails'];
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };

  function setMembershipType(type) {
    localStorageService.set('membershipType', type, 'sessionStorage');
  }
}
