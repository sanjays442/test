function ctrl($log, UserService, $state, UIState) {
  var vm = this;
  UserService.latestPost().then(function (result) {
    vm.result = result.data;
  }).catch(function (errors) {
    // todo, display the error message in the page.
    $log.error(errors);
  });
  vm.gotoPrivacyPolicy = function () {
    $state.go(UIState.PRIVACY_POLICY);
  };
  vm.gotoAboutus = function () {
    $state.go(UIState.ABOUT_US);
  };
  var dt = new Date();
  vm.currentYear = dt.getFullYear();
}

module.exports = ['$log', 'UserService', '$state', 'UIState', ctrl];
