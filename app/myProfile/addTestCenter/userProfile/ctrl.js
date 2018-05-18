module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.testCenter = function () {
    // $state.go(UIState.SIGN_UP.TEST_CENTER);
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };
  vm.viewProfile = function () {
    $state.go(UIState.LOGIN);
  };
}
