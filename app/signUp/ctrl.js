module.exports = ['$injector', '$window', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $window, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.signUp = function () {
    $state.go(UIState.SIGN_UP.USER_CREATE);
  };
  vm.unloadConfirmPages = ['signUp.testCenter', 'signUp.userCreate', 'signUp.optionalFields', 'signUp.publish_ads', 'signUp.payment'];

  $window.onbeforeunload = function () {
  //  return 'Are you sure you want to leave?';
    $log.info('befor alert trigger from signup ctrl: ' + $state.current);
    if (vm.unloadConfirmPages.indexOf($state.current.name) >= 0) {
      return 'Are you sure you want to leave?';
    }
  //  $window.alert('Please enter your name!');
  };
}
