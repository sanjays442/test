module.exports = ['$log', '$rootScope', 'Status', 'UserService', ctrl];

function ctrl($log, $rootScope, Status, service) {
  var vm = this;
  vm.submit = submit;

  function submit() {
    var formData = new FormData();
    formData.append('user[old_password]', vm.oldPassword);
    formData.append('user[password]', vm.password);
    formData.append('user[password_confirmation]', vm.passwordConfirmation);
    service.changePassword(formData).then(function ( /* result */ ) {
      // clear all the input
      vm.oldPassword = '';
      vm.password = '';
      vm.passwordConfirmation = '';
      // show the success message
      $rootScope.$emit(Status.SUCCEEDED, Status.CHANGE_PASSWORD_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      // show the failure message
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  }
}
