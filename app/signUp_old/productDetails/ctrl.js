module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService) {
  var vm = this;
  vm.testCenter = function () {
    $state.go(UIState.SIGN_UP.TEST_CENTER);
  };
  var token = localStorageService.get('signupToken');
  vm.cartDetails = [];
  // get cart details using api
  service.getCartDetails(token).then(function (result) {
    //  $log.info(result);
    vm.cartDetails = result.cart_subscription;
  }).catch(function (err) {
    $log.info(err);
  });

  vm.gotoPayment = function () {
    localStorageService.set('cartTotal', vm.cartDetails.total_price);
    $state.go(UIState.SIGN_UP.PAYMENT);
  };

  vm.grandTotal = 0;
  vm.membership = '';
  vm.centersAdded = localStorageService.get('center_added');
  if (localStorageService.get('membership') !== null) {
    vm.membership = localStorageService.get('membership');
    vm.grandTotal += vm.membership.cost;
  } else {
    vm.centersAdded = [];
  }
  for (var key in vm.centersAdded) {
    vm.grandTotal += vm.centersAdded[key].cost;
  }

  vm.viewProfile = function () {
    $state.go(UIState.LOGIN);
  };
}
