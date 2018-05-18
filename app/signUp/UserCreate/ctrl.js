module.exports = ['$window', '$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'Status', 'localStorageService', '$document', '$timeout', ctrl];

function ctrl($window, $injector, $scope, $log, $rootScope, $state, UIState, service, Status, localStorageService, $document, $timeout) {
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
    vm.displayErrorMsg = '';
    // resetting browser filled value and refocus to first field
    // vm.firstTimeLoad = 0;
    // vm.email = '';
    // vm.password = '';
    // $timeout(function () {
    // //  vm.email = '';
    // //  vm.password = '';
    //   vm.first_name = '';
    //   var element = $window.document.getElementById('fname');
    //   var element_lname = $window.document.getElementById('lname');
    // //  angular.element('#email').val('');
    // //  angular.element('#password').val('');
    //   if (element) {
    //     vm.first_name = ' ';
    //     element.focus();
    //     vm.firstTimeLoad = 1;
    //     vm.first_name = '';
    //   }
    // }, 700);
  };
  initStartupVars();

  // for extra placeholder
  vm.extraPlaceholder = function (id) {
    if (id === 'email') {
      var eml = $document.find('[id="' + id + '"]');
      if (eml.val() !== '') {
        vm.emailPlaceholder = 1;
      } else {
        vm.emailPlaceholder = 0;
      }
    } else if (id === 'phone') {
      var eml = $document.find('[id="' + id + '"]');
      if (eml.val() !== '') {
        vm.phonePlaceholder = 1;
      } else {
        vm.phonePlaceholder = 0;
      }
    }
  };

  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 800);
  };

  function runProgress(startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 80);
  }
  vm.setProgressValues(0, 0);
  // END: progress values

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

  // dialog box text according to fields
  vm.dialogueText = 'Hi there !! Please fill in your First Name';
  var timer = '';
  vm.dialogueBoxText = function (field) {
    var convText = '';
    var error = 0;
    vm.displayErrorMsg = '';
    vm.dialogueText = '';
    vm.showSmiley = 0;

    if (field === 'first_name') {
      if (vm.first_name === '' || angular.isUndefined(vm.first_name)) {
        convText = 'Hi there !! Please fill in your First Name ';
      } else if (angular.isUndefined(vm.last_name) || vm.last_name === '') {
        convText = 'Hello ' + vm.first_name + ', Go ahead fill your last name';
      } else {
        convText = '';
      }
    } else if (field === 'last_name') {
      if (angular.isDefined(vm.first_name) && (angular.isUndefined(vm.last_name) || vm.last_name === '')) {
        convText = 'Hello ' + vm.first_name + ', Go ahead fill your last name';
      } else if (angular.isUndefined(vm.first_name) || vm.first_name === '') {
        convText = 'Hey we can not proceed further without your First Name';
        error = 1;
      } else {
        convText = '';
      }
    } else if (field === 'company_name') {
      if (angular.isUndefined(vm.first_name) || vm.first_name === '') {
        convText = 'Hey we can not proceed further without your First Name';
        error = 1;
      } else if (angular.isUndefined(vm.last_name) || vm.last_name === '') {
        convText = 'Okay you can not miss your last name';
        error = 1;
      } else if (angular.isUndefined(vm.company_name)) {
        convText = 'What is your company Name';
      } else {
        convText = '';
      }
    } else if (field === 'phone_number') {
      if (angular.isUndefined(vm.first_name) || vm.first_name === '') {
        convText = 'Hey we can not proceed further without your First Name';
        error = 1;
      } else if (angular.isUndefined(vm.last_name) || vm.last_name === '') {
        convText = 'Okay you can not miss your last name';
        error = 1;
      } else if (angular.isUndefined(vm.company_name)) {
        convText = vm.first_name + ' you forgot your company name!!';
        error = 1;
      } else if (angular.isUndefined(vm.phone_num)) {
        convText = 'Can I have your contact in which we can reach-out to  you !!';
      } else {
        convText = '';
      }
    } else if (field === 'email') {
      if (angular.isUndefined(vm.first_name) || vm.first_name === '') {
        convText = 'Hey we can not proceed further without your First Name';
        error = 1;
      } else if (angular.isUndefined(vm.last_name) || vm.last_name === '') {
        convText = 'Okay you can not miss your last name';
        error = 1;
      } else if (angular.isUndefined(vm.company_name)) {
        convText = vm.first_name + ' you forgot your company name!!';
        error = 1;
      } else if (angular.isUndefined(vm.phone_num)) {
        convText = 'You have to give your phone number ' + vm.first_name;
        error = 1;
      } else if (angular.isUndefined(vm.email)) {
        convText = 'Also your email id please';
      } else {
        convText = '';
      }
    } else if (field === 'password') {
      if (angular.isUndefined(vm.first_name) || vm.first_name === '') {
        convText = 'Hey we can not proceed further without your First Name';
        error = 1;
      } else if (angular.isUndefined(vm.last_name) || vm.last_name === '') {
        convText = 'Okay you can not miss your last name';
        error = 1;
      } else if (angular.isUndefined(vm.company_name)) {
        convText = vm.first_name + ' you forgot your company name!!';
        error = 1;
      } else if (angular.isUndefined(vm.phone_num)) {
        convText = 'You have to give your phone number ' + vm.first_name;
        error = 1;
      } else if (angular.isUndefined(vm.email)) {
        convText = 'Okay you missed your email id !!!!!!';
        error = 1;
      } else if (angular.isUndefined(vm.password)) {
        convText = 'Now its time to choose safe password!!';
      } else {
        vm.showSmiley = 1;
        convText = 'Good...';
      }
    }

    //  $log.info('error: ' + error + '   ' + convText, '-----: ' + field);
    $timeout.cancel(timer);
    if (error === 0) {
      fillDialogAnimated(convText, 0, field);
    } else {
      shakeme();
      fillDialogAnimatedError(convText, 0, field);
    }
  };

  function fillDialogAnimated(text, index, field) {
    vm.dialogueText += text.charAt(index);
    timer = $timeout(function () {
      if (index < (text.length - 1)) {
        fillDialogAnimated(text, (index + 1), field);
      } else if (field === 'first_name' || field === 'email') {
        vm.showSmiley = 1;
      }
    }, 80);
  }

  function fillDialogAnimatedError(text, index, field) {
    vm.displayErrorMsg += text.charAt(index);
    timer = $timeout(function () {
      if (index < (text.length - 1)) {
        fillDialogAnimatedError(text, (index + 1), field);
      } else if (field === 'first_name' || field === 'email') {
        vm.showSmiley = 1;
      }
    }, 20);
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
    // cancel current timer and dialogue msg
    vm.dialogueText = '';
    $timeout.cancel(timer);
    // if (angular.isUndefined(firstName) || firstName === '') {
    if (vm.userCreateForm.firstName.$invalid) {
      shakeme();
      vm.displayErrorMsg = 'Hey we can not proceed further without your First Name ';
      return;
      // } else if (angular.isUndefined(lastName) || lastName === '') {
    } else if (vm.userCreateForm.lastName.$invalid) {
      shakeme();
      vm.displayErrorMsg = 'Okay you can not miss your last name';
      return;
      // } else if (angular.isUndefined(company) || company === '') {
    } else if (vm.userCreateForm.companyName.$invalid) {
      shakeme();
      first_name = (angular.isDefined(vm.first_name)) ? vm.first_name : '';
      vm.displayErrorMsg = first_name + ' you forgot your company name!!';
      return;
    } else if (vm.userCreateForm.phone.$error.required) {
      shakeme();
      first_name = (angular.isDefined(vm.first_name)) ? vm.first_name : '';
      vm.displayErrorMsg = 'You have to give your phone number ' + first_name;
      return;
    } else if (vm.userCreateForm.phone.$invalid) {
      shakeme();
      vm.displayErrorMsg = vm.phoneErrorTxt;
      return;
    } else if (vm.userCreateForm.email.$error.required) {
      shakeme();
      vm.displayErrorMsg = 'Okay you missed your email id !!!!!! ';
      return;
    } else if (vm.userCreateForm.email.$invalid) {
      shakeme();
      vm.displayErrorMsg = 'Please enter valid email ';
      return;
    } else if (vm.emailErrorTxt !== '') {
      shakeme();
      vm.displayErrorMsg = vm.emailErrorTxt;
      return;
    } else if (vm.userCreateForm.password.$error.required) {
      shakeme();
      vm.displayErrorMsg = 'How can we go further if you don\'t fill your password .';
      return;
    } else if (vm.pwdRequiredTxt !== 'Required') {
      shakeme();
      vm.displayErrorMsg = vm.pwdRequiredTxt;
      return;
    } else if (vm.terms !== true) {
      shakeme();
      vm.displayErrorMsg = 'Please confirm by selecting terms and condition.';
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
      // 'username': username
    };

    for (var key in vm.signupData) {
      formData.append('user[' + key + ']', vm.signupData[key]);
    }
    lm.$emit(Status.PROCESSING, '');
    vm.processing = 1;
    service.signUp(formData).then(function (result) {
      var auth_token = result.user.auth_token;
      angular.element('.shake').removeClass('shake');
      vm.processing = 0;
      // lm.$emit(Status.SUCCEEDED, 'User has been successfully created');
      lm.$emit(Status.HIDE_PROCESSING, '');
      localStorageService.set('signupToken', auth_token);
      localStorageService.set('userInfo', {
        'email': vm.signupData.email,
        'password': vm.signupData.password
      }, 'sessionStorage');

      var signup = localStorageService.get('signupStepsData');
      signup.signupStep.userCreate = {
        'email': vm.signupData.email,
        'password': vm.signupData.password,
        'username': username,
        'first_name': firstName
      };
      localStorageService.set('signupStepsData', signup, 'sessionStorage');

      $state.go(UIState.SIGN_UP.USER_PROFILE);
    }).catch(function (err) {
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      // lm.$emit(Status.FAILED, err.data.error);
      if (angular.isDefined(err.data.user.password)) {
        vm.pwdRequiredTxt = err.data.user.password.errors[0];
        vm.error = err.data.user.password.errors[0];
        vm.displayErrorMsg = vm.pwdRequiredTxt;
      } else {
        vm.pwdRequiredTxt = 'Required';
      }
      if (angular.isDefined(err.data.user.email)) {
        vm.emailErrorTxt = err.data.user.email.errors[0];
        vm.error = err.data.user.email.errors[0];
        vm.displayErrorMsg = vm.emailErrorTxt;
      } else {
        vm.emailErrorTxt = '';
      }
      if (angular.isDefined(err.data.user.phone)) {
        vm.phoneErrorTxt = err.data.user.phone.errors[0];
        vm.error = err.data.user.phone.errors[0];
        vm.displayErrorMsg = vm.phoneErrorTxt;
      } else {
        vm.phoneErrorTxt = 'Invalid Phone Number';
      }
      shakeme();
      //  lm.$emit(Status.FAILED, vm.error);
      //  $log.info(err);
    });
  };
  vm.openTerms = function (url) {
    window.open(url, '_blank', 'location=yes,height=570,width=720,scrollbars=yes,status=yes');
  }
}
