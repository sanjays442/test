function ctrl($window, $log, UserService, $rootScope, localStorageService, $state, UIState) {

  $rootScope.login = 0;
  $rootScope.unpaidItemsCount = 0;
  localStorageService.remove('token');
  localStorageService.remove('loginToken');
  localStorageService.remove('addListingBannerAds');
  localStorageService.remove('addListingSponsoredPage');
  localStorageService.remove('addListingCenterDetails');
  localStorageService.remove('addListingCanSkip');
  localStorageService.remove('addListingCenterInfo');
  localStorageService.remove('addListingNavigation');
  localStorageService.remove('addListingPaymentDetail');
  localStorageService.remove('addListingSponsoredPage');
  localStorageService.remove('addListingUserInfo');
  localStorageService.remove('userInfo');
  localStorageService.remove('signupToken');
  localStorageService.remove('profileData');
  localStorageService.remove('userLoginInfo');
  localStorageService.remove('addListingCenteradded');
  localStorageService.remove('centerPriceValue');
  localStorageService.remove('myprofileCurrentMenu', 'sessionStorage');
  localStorageService.remove('addCenterProgress');
  // $window.location.href = '/login';
  $state.go(UIState.LOGIN);
}

module.exports = ['$window', '$log', 'UserService', '$rootScope', 'localStorageService', '$state', 'UIState', ctrl];
