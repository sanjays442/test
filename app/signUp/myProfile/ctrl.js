module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.signUp = function () {
    $state.go(UIState.SIGN_UP.USER_CREATE);
  };
}
