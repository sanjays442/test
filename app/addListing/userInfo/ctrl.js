module.exports = ['$rootScope', '$log', '$state', 'UIState', 'TreatmentCenterService', 'Status', 'localStorageService',
  ctrl];

function ctrl($rootScope, $log, $state, UIState, service, Status, localStorageService) {
  // todo

  var vm = $rootScope; // this;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CONTACT_INFO);
  };
  $rootScope.activeLink = 'User Info';
  // $rootScope.activeLink = ['Contact', 'User'];
  lm.saveStep2 = function () {
    var formData = new FormData();
    var sigupData = {
      'email': vm.email,
      'password': vm.password,
      'password_confirmation': vm.confirm_password,
      'first_name': $rootScope.contactInfo.first_name,
      'last_name': $rootScope.contactInfo.last_name,
      'company': $rootScope.contactInfo.company,
      'phone': $rootScope.contactInfo.phone,
      'username': vm.username
    };
    for (var key in sigupData) {
      formData.append('user[' + key + ']', sigupData[key]);
    }
    $rootScope.formdata = formData;
    service.addTreatmentCenterSignUp(formData).then(function (result) {
      localStorageService.set('signupToken', result.user.auth_token);
      $rootScope.$emit(Status.SUCCEEDED, Status.USER_ADD_SUCCESS_MSG);
      $rootScope.addListingStepDone = 2;
      $rootScope.hideSteps = ['contactInfo', 'userInfo'];
      $state.go(UIState.ADD_LISTING.PAID_MEMBER);
    }).catch(function (err) {
      if (err.data.user) {
        if (angular.isDefined(err.data.user.email)) {
          var emailError = err.data.user.email.errors[0];
          $rootScope.$emit(Status.FAILED, emailError);
        }
        if (angular.isDefined(err.data.user.password)) {
          var passError = err.data.user.password.errors[0];
          $rootScope.$emit(Status.FAILED, passError);
        }
        if (angular.isDefined(err.data.user.username)) {
          var userError = err.data.user.username.errors[0];
          $rootScope.$emit(Status.FAILED, userError);
        }
      }
    });
  };
}
