module.exports = ['$timeout', '$scope', '$document', '$log', '$rootScope', '$state', '$stateParams', 'Status', 'UIState', 'SignUpService', 'TreatmentCenterService', 'MapService', 'localStorageService', 'UserService', 'CartDetailService',
  ctrl];

function ctrl($timeout, $scope, $document, $log, $rootScope, $state, $stateParams, Status, UIState, signupService, service, mapService, localStorageService, UserService, CartDetailService) {
  var vm = this;
  vm.customer = function () {
    $state.go(UIState.CONTACT_CUSTOMER);
    // $window.location.href = '/contact-customer';
  };
  vm.treatment = function () {
    $state.go(UIState.CONTACTTREATMENTCENTER);
    // $window.location.href = '/contact-treatment-center';
  };
}
