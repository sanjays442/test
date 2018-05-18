module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.viewProfile = function () {
    $state.go(UIState.LOGIN);
  };
  vm.close = function () {
    $state.go(UIState.HOME);
  };

}
