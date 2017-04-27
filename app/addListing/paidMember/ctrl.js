module.exports = ['$rootScope', '$log', '$state', 'UIState', ctrl];

function ctrl($rootScope, $log, $state, UIState) {
  // todo
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.USER_INFO);
  };
  lm.finish = function () {
    $rootScope.addListingStepDone = 0;
    $state.go(UIState.LOGIN);
  };
  // $rootScope.activeLink = ['Contact'];
  $rootScope.activeLink = 'Membership';
  lm.submit = function () {
    $rootScope.addListingStepDone = 3;
    $rootScope.centerReset = 0;
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };
}
