function ctrl($log, UserService, $rootScope, $window, $document, localStorageService, Status, $state, UIState) {
  var vm = this;
  var getUserInfo = (localStorageService.get('userInfo', 'sessionStorage') !== null) ? localStorageService.get('userInfo', 'sessionStorage') : localStorageService.get('userLoginInfo', 'sessionStorage');

  var hideFirst = angular.element($document[0].querySelector('#get_otp'));
  var showEmailOtp = angular.element($document[0].querySelector('#match_otp_email'));
  var showPhoneOtp = angular.element($document[0].querySelector('#match_otp_phone'));

  if (getUserInfo !== null) {
    //  alert(getUserInfo.email);
    $rootScope.$emit(Status.SUCCEEDED, 'Please wait while we login you automatically');
    var email = getUserInfo.email;
    var password = getUserInfo.password;
    UserService.signIn(email, password).then(function () {
      $rootScope.login = 1;
      $rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
      // $window.location.href = '/my-profile/profile';
      $state.go(UIState.MY_PROFILE.PROFILE);
    }).catch(function (errors) {
      // todo, display the error message in the page.
      // var error = angular.element($document[0].querySelector('#error_if'));
      // error.html('Invalid email or password');
      $rootScope.$emit(Status.FAILED, 'Invalid email or password');
      $log.error(errors);
    });
  }
  // show password

  vm.show_password = function () {
    var showPass = vm.show_pass;
    var passwordShow = angular.element($document[0].querySelector('#password'));
    if (showPass === true) {
      passwordShow.attr('type', 'text');
    } else {
      passwordShow.attr('type', 'password');
    }
  };

  // forgot Username

  vm.forgot_username = function () {
    hideFirst.addClass('ng-hide');
    var forgotUsername = angular.element($document[0].querySelector('#forgot_username_phone'));
    forgotUsername.removeClass('ng-hide');
  };

  // get Email and Username
  vm.get_email_username = function () {
    var phone = vm.forgot_username_phone;
    if (angular.isUndefined(phone)) {
      $rootScope.$emit(Status.SUCCEEDED, 'Please enter the phone number');
      return;
    }
    var formData = {
      'phone': phone
    };

    UserService.forgotUsername(formData).then(function (result) {
      $state.go(UIState.LOGIN);
      $rootScope.$emit(Status.SUCCEEDED, result.message);
    }).catch(function (errors) {
      // todo, display the error message in the page.
      $rootScope.$emit(Status.FAILED, errors.data.error);
      $log.error(errors);
    });
  };

  // getEmail
  vm.getEmail = function () {
    var getEmailvalue = vm.get_email;
    var showEmailField = angular.element($document[0].querySelector('#get_email'));
    var showPhoneField = angular.element($document[0].querySelector('#get_phone'));
    if (getEmailvalue === true) {
      vm.get_phone = false;
      showEmailField.removeClass('ng-hide');
      showPhoneField.addClass('ng-hide');
    } else {
      showEmailField.addClass('ng-hide');
      showPhoneField.addClass('ng-hide');
      vm.get_phone = false;
    }
  };

  // getPhone
  vm.getPhone = function () {
    var getPhonevalue = vm.get_phone;
    var showPhoneField = angular.element($document[0].querySelector('#get_phone'));
    var showEmailField = angular.element($document[0].querySelector('#get_email'));
    if (getPhonevalue === true) {
      vm.get_email = false;
      showPhoneField.removeClass('ng-hide');
      showEmailField.addClass('ng-hide');
    } else {
      showPhoneField.addClass('ng-hide');
      showEmailField.addClass('ng-hide');
      vm.get_email = false;
    }
  };

  vm.email_otp = function () {
    var emailGet = vm.send_email;
    if (angular.isUndefined(emailGet)) {
      $rootScope.$emit(Status.SUCCEEDED, 'Please enter valid Email address');
      return;
    }
    var formData = {
      'email': emailGet
    };
    UserService.emailOtp(formData).then(function (result) {
      $rootScope.$emit(Status.SUCCEEDED, result.message);
      hideFirst.addClass('ng-hide');
      showEmailOtp.removeClass('ng-hide');
    }).catch(function (errors) {
      // todo, display the error message in the page.
      $rootScope.$emit(Status.FAILED, errors.data.error);
      $log.error(errors);
    });
  };

  vm.phone_otp = function () {
    var phoneGet = vm.send_phone;
    var formData = {
      'phone': phoneGet
    };
    if (angular.isUndefined(phoneGet)) {
      $rootScope.$emit(Status.SUCCEEDED, 'Please enter Phone number');
      return;
    }
    UserService.phoneOtp(formData).then(function (result) {
      // $rootScope.$emit(Status.SUCCEEDED, 'Instructions has been sent');
      $rootScope.$emit(Status.SUCCEEDED, result.message);
      hideFirst.addClass('ng-hide');
      showPhoneOtp.removeClass('ng-hide');
    }).catch(function (errors) {
      $rootScope.$emit(Status.FAILED, errors.data.error);
      $log.error(errors);
    });
  };

  vm.send_email_api = function () {
    var emailApi = vm.send_email_otp;
    var otpEmailApi = vm.send_email_otp_api;
    var passwordEmailApi = vm.send_email_password_api;
    var confirmPassEmailApi = vm.send_email_confirm_password_api;

    var formData = {
      'email': emailApi,
      'otp': otpEmailApi,
      'password': passwordEmailApi
    };
    if (angular.isUndefined(emailApi)) {
      $rootScope.$emit(Status.SUCCEEDED, 'Please enter valid Email address');
      return;
    }
    if (angular.isUndefined(passwordEmailApi)) {
      $rootScope.$emit(Status.SUCCEEDED, 'Password must contain 1 special, 1 numeric character and must be 8 digits');
      return;
    }
    if (angular.isUndefined(emailApi) || angular.isUndefined(otpEmailApi)) {
      $rootScope.$emit(Status.FAILED, 'Please complete the form');
      return;
    }
    if (passwordEmailApi !== confirmPassEmailApi) {
      $rootScope.$emit(Status.FAILED, "Password and Confirm password don't match");
      return;
    }

    UserService.emailOtpApi(formData).then(function (result) {
      // $rootScope.$emit(Status.SUCCEEDED, 'Instructions has been sent');
      $rootScope.$emit(Status.SUCCEEDED, result.message);
      $state.go(UIState.LOGIN);
      // hideFirst.addClass('ng-hide');
      // showPhoneOtp.removeClass('ng-hide');
    }).catch(function (errors) {
      $rootScope.$emit(Status.FAILED, errors.data.error);
      $log.error(errors);
    });
  };

  vm.send_phone_api = function () {
    var phoneApi = vm.send_phone_otp;
    var otpPhoneApi = vm.send_phone_otp_api;
    var otpPasswordApi = vm.send_phone_password_api;
    var confirmPassPhoneApi = vm.send_phone_confirm_password_otp_api;

    if (angular.isUndefined(phoneApi) || angular.isUndefined(otpPhoneApi)) {
      $rootScope.$emit(Status.FAILED, 'Please complete the form');
      return;
    }
    if (angular.isUndefined(otpPasswordApi)) {
      $rootScope.$emit(Status.SUCCEEDED, 'Password must contain 1 special, 1 numeric character and must be 8 digits');
      return;
    }

    if (otpPasswordApi !== confirmPassPhoneApi) {
      $rootScope.$emit(Status.FAILED, "Password and Confirm password don't match");
      return;
    }

    var formData = {
      'phone': phoneApi,
      'otp': otpPhoneApi,
      'password': otpPasswordApi
    };

    UserService.phoneOtpApi(formData).then(function (result) {
      // $rootScope.$emit(Status.SUCCEEDED, 'Instructions has been sent');
      $rootScope.$emit(Status.SUCCEEDED, result.message);
      $state.go(UIState.LOGIN);
      // hideFirst.addClass('ng-hide');
      // showPhoneOtp.removeClass('ng-hide');
    }).catch(function (errors) {
      $rootScope.$emit(Status.FAILED, errors.data.error);
      $log.error(errors);
    });
  };
}

module.exports = ['$log', 'UserService', '$rootScope', '$window', '$document', 'localStorageService', 'Status', '$state', 'UIState', ctrl];
