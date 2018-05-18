module.exports = ['$state', '$scope', '$rootScope', '$log', '$window', 'UserService', 'localStorageService', ctrl];

function ctrl($state, $scope, $rootScope, $log, $window, UserService, localStorageService) {
  var vm = this;
  $rootScope.profileData = [];
  var token = localStorageService.get('token');
  localStorageService.set('loginToken', token, 'sessionStorage'); // setting extra same token in different variable to fix logout issue
  var profileData = localStorageService.get('profileData', 'sessionStorage');
  if (profileData !== null) {
    vm.profile = profileData;
    localStorageService.remove('profileData');
  }
  // $state.reload();
  UserService.queryProfile().then(function (result) {
    vm.profile = result.user;
    $rootScope.profileData = result.user;
    localStorageService.set('profileData', result.user, 'sessionStorage');
  }).catch(function (error) {
    // todo, display in message in the frontend page
    // $window.location.href = '/#logout';
    $log.error(error);
  });
  //  vm.addCenterInitialize = localStorageService.get('addCenterInitialize');

  // prevent page refresh and confirm
  vm.unloadConfirmPages = ['myProfile.profile', 'myProfile.changePassword', 'myProfile.editPublishAds', 'myProfile.addTestCenter', 'myProfile.optionalfields', 'myProfile.publishAds', 'myProfile.centerPayment'];
  $window.onbeforeunload = function () {
    $log.info('before alert..myprofile');
    if (vm.unloadConfirmPages.indexOf($state.current.name) >= 0) {
      return 'Are you sure you want to leave?';
    }
  };
  // $scope.$on('$stateChangeStart', function (event, next, current) {
  //   $log.info($state.current);
  // });
}
