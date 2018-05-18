module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.viewCenterDetails = function () {
    vm.resetData();
    //updating progress of steps
    var addCenterProgress = {'lastStep':'myProfile.signupCompleted', 'stepsCompleted':1};
    localStorageService.set('addCenterProgress',addCenterProgress, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };
  vm.close = function () {
    vm.resetData();
    $state.go(UIState.HOME);
  };
  vm.resetData = function () {
    $rootScope.activeCenter = null;
    localStorageService.remove('signupStepsData', 'lastAddedCenter', 'sessionStorage', 'signupToken','addCenterProgress');
  };
  vm.viewCenterDetails();
}
