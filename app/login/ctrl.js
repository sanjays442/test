function ctrl($log, UserService, $rootScope, $window, $document) {
  var vm = this;
  vm.submit = function () {
    var email = vm.email;
    var password = vm.password;
    UserService.signIn(email, password).then(function () {
      $rootScope.login = 1;
      $window.location.href = '/#my-profile/profile';
    }).catch(function (errors) {
      // todo, display the error message in the page.
      var error = angular.element($document[0].querySelector('#error_if'));
      error.html('Invalid email or password');
      $log.error(errors);
    });
    return false;
  };
}

module.exports = ['$log', 'UserService', '$rootScope', '$window', '$document', ctrl];
