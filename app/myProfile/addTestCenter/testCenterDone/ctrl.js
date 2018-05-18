module.exports = ['$timeout', '$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($timeout, $injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.testCenter = function () {
    localStorageService.remove('cartMode','lastAddedCenter','addCenterProgress', 'cartReached', 'signupSponsoredPage', 'membershipType', 'sessionStorage');
    var signupData = localStorageService.get('signupStepsData', 'sessionStorage');
    signupData.signupStep.testCenter = {};
    localStorageService.set('signupStepsData', signupData, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.ADD_TEST_CENTER);
  };
  vm.viewProfile = function () {
    localStorageService.remove('signupStepsData', 'lastAddedCenter', 'addCenterProgress', 'signupToken','addCenterProgress');
    localStorageService.remove('cartMode','lastAddedCenter','addCenterProgress', 'cartReached', 'signupSponsoredPage', 'membershipType', 'sessionStorage');
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };
  // set progressbar progress values
  // vm.setProgressValues = function (startVal, endVal) {
  //   vm.progressValue =  startVal;
  //   $timeout(function () {
  //     runProgress(startVal, endVal);
  //   }, 800);
  // };
  // function runProgress(startVal, endVal) {
  //   vm.progressValue =  startVal;
  //   $timeout(function () {
  //     if (startVal < endVal) {
  //       runProgress((startVal + 1), endVal);
  //     }
  //   }, 80);
  // }
  // vm.setProgressValues(15, 30);
  // END: progress values
}
