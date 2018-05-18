module.exports = ['$log', '$rootScope', 'Status', 'UserService', ctrl];

function ctrl($log, $rootScope, Status, service) {
  var vm = this;
  vm.submit = submit;

  function submit() {
    var data = {
      user: {
        old_password: vm.oldPassword,
        password: vm.password,
        passwordConfirmation: vm.passwordConfirmation
      }
    };
    $rootScope.$emit(Status.PROCESSING, '');
    service.changePassword(data).then(function ( /* result */ ) {
      // clear all the input
      vm.oldPassword = '';
      vm.password = '';
      vm.passwordConfirmation = '';
      // show the success message
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      $rootScope.$emit(Status.SUCCEEDED, Status.CHANGE_PASSWORD_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      // show the failure message
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      if (angular.isUndefined(err.data.error)) {
        var error = Status.FAILURE_MSG;
      } else {
        error = err.data.error;
      }

      $rootScope.$emit(Status.FAILED, error);
    });
  }
}
