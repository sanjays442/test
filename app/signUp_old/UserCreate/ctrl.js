module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'Status', 'localStorageService', '$document', '$timeout', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, Status, localStorageService, $document, $timeout) {
  var vm = this;

  var initStartupVars = function () {
    vm.userCreateFormInit = {};
    vm.userCreateFormInit.firstName = 1;
    vm.userCreateFormInit.lastName = 1;
    vm.userCreateFormInit.companyName = 1;
    vm.userCreateFormInit.phone = 1;
    vm.userCreateFormInit.email = 1;
    vm.userCreateFormInit.password = 1;
    vm.emailErrorTxt = '';
    vm.pwdRequiredTxt = 'Required';
    vm.phoneErrorTxt = 'Invalid Phone Number';
    vm.displayMsg = 'You are just one step away from listing your center!!';
  };

  initStartupVars();

  // reset previous localstorage
  vm.resetLocalstorage = function () {
    localStorageService.remove('membership', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType');
  };
  vm.resetLocalstorage();

  // show and hide password
  vm.showpassword = function () {
    var password = angular.element($document[0].querySelector('#pwd'));
    var showpassword = angular.element($document[0].querySelector('#showpassword'));
    showpassword.removeAttr('class');
    if (password.attr('type') === 'password') {
      password.attr('type', 'text');
      showpassword.attr('class', 'fa fa-eye fa-2x');
    } else {
      password.attr('type', 'password');
      showpassword.attr('class', 'fa fa-eye-slash fa-2x');
    }
  };

  function shakeme() {
    angular.element('.progress-img-wrap').addClass('shake');

    // setTimeout(function () {
    //   angular.element('.shake').removeClass('shake');
    // }, 500);
    $timeout(function () {
      angular.element('.shake').removeClass('shake');
    }, 500);
  }

  vm.userCreate = function () {
    var lm = $rootScope; // this;
    var firstName = vm.first_name;
    var lastName = vm.last_name;
    var company = vm.company_name;
    var phone = vm.phone_num;
    var password = vm.password;
    var username = vm.phone_num + vm.first_name;
    var email = vm.email;

    vm.emailErrorTxt = '';
    vm.pwdRequiredTxt = 'Required';
    vm.phoneErrorTxt = 'Invalid Phone Number';

    // if (angular.isUndefined(firstName) || firstName === '') {
    if (vm.userCreateForm.firstName.$invalid) {
      shakeme();
      vm.displayMsg = 'Firstname cannot be empty ';
      return;
      // } else if (angular.isUndefined(lastName) || lastName === '') {
    } else if (vm.userCreateForm.lastName.$invalid) {
      shakeme();
      vm.displayMsg = 'Lastname cannot be empty ';
      return;
      // } else if (angular.isUndefined(company) || company === '') {
    } else if (vm.userCreateForm.companyName.$invalid) {
      shakeme();
      vm.displayMsg = 'Company name cannot be empty ';
      return;
    } else if (vm.userCreateForm.phone.$invalid) {
      shakeme();
      vm.displayMsg = vm.phoneErrorTxt;
      return;
    } else if (vm.userCreateForm.email.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter valid email ';
      return;
    } else if (vm.emailErrorTxt !== '') {
      shakeme();
      vm.displayMsg = vm.emailErrorTxt;
      return;
    } else if (vm.userCreateForm.password.$error.required) {
      shakeme();
      vm.displayMsg = 'Password cannot be empty';
      return;
    } else if (vm.pwdRequiredTxt !== 'Required') {
      shakeme();
      vm.displayMsg = vm.pwdRequiredTxt;
      return;
    }

    var formData = new FormData();
    vm.signupData = {
      'first_name': firstName,
      'last_name': lastName,
      'company': company,
      'phone': phone,
      'email': email,
      'password': password,
      'username': username
    };

    for (var key in vm.signupData) {
      formData.append('user[' + key + ']', vm.signupData[key]);
    }
    // $log.info(formData);
    service.signUp(formData).then(function (result) {
      angular.element('.shake').removeClass('shake');
      lm.$emit(Status.SUCCEEDED, 'User has been successfully created');
      localStorageService.set('signupToken', result.user.auth_token);

      localStorageService.set('userInfo', {
        'email': vm.signupData.email,
        'password': vm.signupData.password
      }, 'sessionStorage');

      $state.go(UIState.SIGN_UP.USER_PROFILE);
    }).catch(function (err) {
      // lm.$emit(Status.FAILED, err.data.error);
      if (angular.isDefined(err.data.user.password)) {
        vm.pwdRequiredTxt = err.data.user.password.errors[0];
        vm.error = err.data.user.password.errors[0];
        vm.displayMsg = vm.pwdRequiredTxt;
      } else {
        vm.pwdRequiredTxt = 'Required';
      }
      if (angular.isDefined(err.data.user.email)) {
        vm.emailErrorTxt = err.data.user.email.errors[0];
        vm.error = err.data.user.email.errors[0];
        vm.displayMsg = vm.emailErrorTxt;
      } else {
        vm.emailErrorTxt = '';
      }
      if (angular.isDefined(err.data.user.phone)) {
        vm.phoneErrorTxt = err.data.user.phone.errors[0];
        vm.error = err.data.user.phone.errors[0];
        vm.displayMsg = vm.phoneErrorTxt;
      } else {
        vm.phoneErrorTxt = 'Invalid Phone Number';
      }
      shakeme();
      //  lm.$emit(Status.FAILED, vm.error);
      //  $log.info(err);
    });
  };
}
