function ctrl($window, $log, UserService, $rootScope, localStorageService) {
  $rootScope.login = 0;
  localStorageService.remove('token');
  $window.location.href = '/#/login';
}

module.exports = ['$window', '$log', 'UserService', '$rootScope', 'localStorageService', ctrl];
