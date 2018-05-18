function ctrl($log, UserService, $rootScope, $window, $document, localStorageService, Status, $state, UIState) {
  var vm = this;
  var getUserInfo = (localStorageService.get('userInfo', 'sessionStorage') !== null) ? localStorageService.get('userInfo', 'sessionStorage') : localStorageService.get('userLoginInfo', 'sessionStorage');
  $rootScope.title = 'Login';
  $rootScope.description = 'Login';
  if (getUserInfo !== null) {
    //  alert(getUserInfo.email);
    $rootScope.$emit(Status.SUCCEEDED, 'Please wait while we login you automatically');
    var email = getUserInfo.email;
    var password = getUserInfo.password;
    UserService.signIn(email, password).then(function () {
      $rootScope.login = 1;
      // $rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
      localStorageService.set('myprofileCurrentMenu', 'my-profile', 'sessionStorage');
      localStorageService.remove('userInfo');
      // $window.location.href = '/my-profile/profile';
      vm.resetSignupData();
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
  // forgot password

  vm.forgot = function () {
    $state.go(UIState.LOGINHELP);
  };

  vm.submit = function () {
    email = vm.email;
    password = vm.password;
    UserService.signIn(email, password).then(function () {
      $rootScope.login = 1;
      localStorageService.set('myprofileCurrentMenu', 'my-profile', 'sessionStorage');
      // $window.location.href = '/my-profile/profile';
      vm.resetSignupData();
      $state.go(UIState.MY_PROFILE.PROFILE);
      //$rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
    }).catch(function (errors) {
      // todo, display the error message in the page.
      $rootScope.$emit(Status.FAILED, 'Invalid email or password');
      // var error = angular.element($document[0].querySelector('#error_if'));
      // error.html('Invalid email or password');
      $log.error(errors);
    });
    return false;
  };

  vm.resetSignupData = function () {
    localStorageService.remove('cartMode', 'cartReached', 'lastAddedCenter', 'addCenterProgress', 'signupSponsoredPage', 'membershipType', 'current_center');
    $rootScope.cityModel = {};
    $rootScope.countyModel = {};
    $rootScope.statesSel = {};
    $rootScope.checkedStateModel = {};
    $rootScope.checkedStateDetail = {};
    $rootScope.treatmentCentersModel = {};
    $rootScope.demographicModel = {};
    $rootScope.treatmentApproachModel = {};
    $rootScope.settingModel = {};
    $rootScope.additionalServicesModel = {};
    $rootScope.paymentModel = {};
    $rootScope.byDrugModel = {};
    $rootScope.checkedAllStates = {};
    $rootScope.centerSelected = {};
    vm.treatmentCentersModel = {};
    localStorageService.remove('signupSponsoredPage');
  };
}

module.exports = ['$log', 'UserService', '$rootScope', '$window', '$document', 'localStorageService', 'Status', '$state', 'UIState', ctrl];
