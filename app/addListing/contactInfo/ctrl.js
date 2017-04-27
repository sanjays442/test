module.exports = ['$rootScope', '$log', '$state', 'UIState', ctrl];

function ctrl($rootScope, $log, $state, UIState) {
  // todo
  // console.log('contact info');
  var vm = $rootScope; // this;
  // $rootScope.activeLink = ['Contact'];
  $rootScope.activeLink = 'Contact';
  var lm = this;
  lm.saveStep1 = function () {
    $rootScope.contactInfo = {
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company,
      'phone': vm.phone
    };
    $rootScope.addListingStepDone = 1;
    $state.go(UIState.ADD_LISTING.USER_INFO);
  };
}
