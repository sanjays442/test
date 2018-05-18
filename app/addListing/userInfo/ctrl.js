module.exports = ['$rootScope', '$log', '$state', 'UIState', 'TreatmentCenterService', 'Status', 'localStorageService',
  ctrl];

function ctrl($rootScope, $log, $state, UIState, service, Status, localStorageService) {
  // todo
  var vm = $rootScope; // this;
  var lm = this;
  // initialize
  vm.email = '';
  vm.username = '';
  vm.password = '';
  vm.password_confirmation = '';

  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CONTACT_INFO);
  };
  $rootScope.activeLink = 'User Info';
  lm.userCreated = function () {
    $rootScope.addListingStepDone = 2;
    $rootScope.disableUserinfo = 1;
    $rootScope.hideSteps = ['contactInfo', 'userInfo'];
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['userInfo']);
    $state.go(UIState.ADD_LISTING.PAID_MEMBER);
  };
  // get values if stored in sessionStorage/localstorage
  if (angular.isDefined(localStorageService.get('addListingUserInfo', 'sessionStorage'))) {
    var info = localStorageService.get('addListingUserInfo', 'sessionStorage');
    if (info !== null) {
      lm.showSkip = '1';
      vm.email = info.email;
      vm.company = info.company;
      vm.phone = info.phone;
      vm.username = info.username;
    }
  }

  lm.saveStep2 = function () {
    var formData = new FormData();
    var sigupData = {
      'email': vm.email,
      'password': vm.password,
      'password_confirmation': vm.confirm_password,
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company,
      'phone': vm.phone,
      'username': vm.username,
      'phone_validated': $rootScope.user_phone
    };

    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingUserInfo', sigupData, 'sessionStorage');
    }
    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('userInfo', sigupData, 'sessionStorage');
      localStorageService.set('userLoginInfo', sigupData, 'sessionStorage');
    }
    for (var key in sigupData) {
      if (key === 'phone_validated') {
        continue;
      }
      formData.append('user[' + key + ']', sigupData[key]);
    }
    $rootScope.formdata = formData;

    service.addTreatmentCenterSignUp(formData).then(function (result) {
      localStorageService.set('signupToken', result.user.auth_token);
      $rootScope.$emit(Status.SUCCEEDED, Status.USER_ADD_SUCCESS_MSG);
      $rootScope.addListingStepDone = 2;
      $rootScope.disableUserinfo = 1;
      $rootScope.hideSteps = ['contactInfo', 'userInfo'];
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['userInfo']);
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
