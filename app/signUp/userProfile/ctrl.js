module.exports = ['$timeout', '$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($timeout, $injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.testCenter = function () {
    $state.go(UIState.SIGN_UP.TEST_CENTER);
  };
  vm.viewProfile = function () {
    $state.go(UIState.LOGIN);
  };
  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue =  startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 800);
  };
  function runProgress(startVal, endVal) {
    vm.progressValue =  startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 80);
  }
  vm.setProgressValues(0, 15);
  // END: progress values
}
