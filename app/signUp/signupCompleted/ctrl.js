module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.totalMemberships = localStorageService.get('totalMemberships','sessionStorage');
  vm.viewProfile = function () {
    vm.resetData();
    $state.go(UIState.LOGIN);
  };
  vm.close = function () {
    vm.resetData();
    $state.go(UIState.HOME);
  };
  vm.resetData = function () {
    $rootScope.activeCenter = null;
    localStorageService.remove('signupStepsData', 'lastAddedCenter', 'sessionStorage', 'signupToken');
    clearRootscopeData();
  };
  function clearRootscopeData() {
    $rootScope.cityModel = {};
    $rootScope.countyModel = {};
    $rootScope.statesSel = {};
    $rootScope.checkedStateModel = {};
    $rootScope.checkedStateDetail = {};
    $rootScope.treatmentCentersModel = {};
    $rootScope.demographicModel = {};
    $rootScope.treatmentApproachModel = {};
    $rootScope.settingModel = {};
    $rootScope.additionalServicesModel = {};
    $rootScope.paymentModel = {};
    $rootScope.byDrugModel = {};
    $rootScope.checkedAllStates = {};
    $rootScope.centerSelected = {};
    vm.treatmentCentersModel = {};
    localStorageService.remove('signupSponsoredPage');
  }
}
