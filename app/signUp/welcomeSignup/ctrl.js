module.exports = ['$injector', 'Status', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, Status,  $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  var rm = $rootScope;
  vm.signUp = function () {
    $state.go(UIState.SIGN_UP.USER_CREATE);
  };
  vm.resetPreviousVars = function () {
    // reset previous localstorage
    localStorageService.remove('totalMemberships', 'membership','lastAddedCenter', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType', 'bannerAdded', 'sponsorAdded', 'signupToken');
  };
  vm.resetPreviousVars();

  vm.initializeLocalstorage = function () {
    var signUp = {
      'signupStep': {}
    };
    localStorageService.set('signupStepsData', signUp, 'sessionStorage');
    var mem =[];
    localStorageService.set('totalMemberships', mem, 'sessionStorage');
  };
  vm.initializeLocalstorage();
  // rm.saveSigupDataLocal = function (stepLabel, data) {
  //   var signup = localStorageService.get('signupStepsData', 'sessionStorage');
  //   signup[stepLabel] = data;
  //   localStorageService.set('signupStepsData', signup, 'sessionStorage');
  // }
}
