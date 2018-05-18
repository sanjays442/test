module.exports = ['$window', 'FeaturedService', '$rootScope', 'UIState', '$state', 'Status', ctrl];

function ctrl($window, FeaturedService, $rootScope, UIState, $state, Status) {
  var vm = this;
  vm.subscribeFeatured = function () {
    FeaturedService.subscribeFeatured().then(function () {
      $rootScope.$emit(Status.SUCCEEDED, 'Successfully subscribed to featured Listing.');
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['FeaturedListing']);
      $rootScope.addListingStepDone = 8;
      $state.go(UIState.MY_PROFILE.PROFILE);
    });
  };

  vm.cancelState = function () {
    $window.location.href = '/#/login';
  };
  // vm.cancelState = UIState.MY_PROFILE.PROFILE;
  vm.backState = UIState.ADD_LISTING.FEATURED_LISTING_PAGE5;
}
