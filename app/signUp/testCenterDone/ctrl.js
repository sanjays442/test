module.exports = ['$timeout', '$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($timeout, $injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.testCenter = function () {
    var lsKeys = localStorageService.keys();
    $log.info('before remove keys: ');
    $log.info(lsKeys);
    localStorageService.remove('cartMode', 'cartReached','lastAddedCenter', 'addCenterProgress', 'signupSponsoredPage', 'membershipType', 'current_center', 'sessionStorage');
    lsKeys = localStorageService.keys();
    $log.info('after remove keys: ');
    $log.info(lsKeys);
    var signupData = localStorageService.get('signupStepsData', 'sessionStorage');
    signupData.signupStep.testCenter = {};
    localStorageService.set('signupStepsData', signupData, 'sessionStorage');
    $state.go(UIState.SIGN_UP.TEST_CENTER);
  };
  vm.viewProfile = function () {
      localStorageService.remove('cartMode', 'cartReached','lastAddedCenter', 'addCenterProgress', 'signupSponsoredPage', 'membershipType', 'current_center', 'sessionStorage');
    $state.go(UIState.LOGIN);
  };
  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue =  startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 500);
  };
  function runProgress(startVal, endVal) {
    vm.progressValue =  startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 30);
  }
  vm.setProgressValues(10, 100);
  // END: progress values
}
