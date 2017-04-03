function ctrl($log, UserService) {
  var vm = this;
  vm.submit = function () {
    var email = vm.email;
    var password = vm.password;
    UserService.signIn(email, password).then(function () {
      window.location.href = '/#my-profile/index';
    }).catch(function (errors) {
      // todo, display the error message in the page.
      var error = angular.element(document.querySelector('#error_if'));
      error.html('Invalid email or password');
      $log.error(errors);
    });
    return false;
  };
}

module.exports = ['$log', 'UserService', ctrl];
