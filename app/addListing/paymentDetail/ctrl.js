function ctrl($log, $rootScope, Status, $window, $state, UIState, localStorageService, service, userService) {
  // var vm = this;
  var vm = $rootScope;
  var lm = this;
  vm.activeLink = 'Payment';
  vm.cardPaymentAdded = 0;
  var creditCardType = require('credit-card-type');
  lm.cardType = 'credit';

  // get values if stored in sessionStorage/localstorage
  if (angular.isDefined(localStorageService.get('addListingPaymentDetail', 'sessionStorage'))) {
    var info = localStorageService.get('addListingPaymentDetail', 'sessionStorage');
    if (info !== null) {
      vm.card = info.card_no;
      vm.firstName = info.first_name;
      //  vm.middleName = info.middle_name;
      vm.lastName = info.last_name;
      vm.year = info.expiry_year;
      vm.month = info.expiry_month;
      vm.cvv = info.card_code;
      vm.address = info.address;
      vm.city = info.city;
      vm.state = info.state;
      vm.zip = info.zip;
      vm.country = info.country;
    }
  }

  // get payment skip detail
  if (angular.isDefined(localStorageService.get('addListingCanSkip', 'sessionStorage'))) {
    var canSkip = localStorageService.get('addListingCanSkip', 'sessionStorage');

    if (canSkip !== null) {
      vm.paymentSkip = canSkip.paymentSkip;
      // vm.paymentSkip = 1;
    }
  }

  vm.detectCardType = function (card, event) {
    if (angular.isDefined(card)) {
      var cardVal = card.replace(/ /g, '');
      vm.cardType = creditCardType(cardVal);
      if (angular.isDefined(vm.cardType[0])) {
        if (vm.cardType[0].type === 'master-card') {
          lm.cardType = 'master';
        } else if (vm.cardType[0].type === 'visa') {
          lm.cardType = 'visa';
        } else if (vm.cardType[0].type === 'american-express') {
          lm.cardType = 'amex';
        } else if (vm.cardType[0].type === 'jcb') {
          lm.cardType = 'jcb';
        } else if (vm.cardType[0].type === 'discover') {
          lm.cardType = 'discover';
        } else if (vm.cardType[0].type === 'diners-club') {
          lm.cardType = 'diners-club';
        } else {
          lm.cardType = 'credit';
        }
      }

      lm.totalDigits = card.replace(/ /g, '').length;
      if (event.keyCode !== 8) {
        if (lm.totalDigits === 4) {
          vm.card = vm.card + ' ';
        } else if (lm.totalDigits === 9) {
          vm.card = vm.card + ' ';
        } else if (lm.totalDigits === 14) {
          vm.card = vm.card + ' ';
        }
      }
    } else {
      vm.cardType = null;
      lm.totalDigits = 0;
      lm.cardType = 'credit';
    }
  };

  lm.validateMonth = function () {
    lm.validMonth = 0;
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth();
    if (angular.isDefined($rootScope.year)) {
      if ($rootScope.year > curYear) {
        lm.validMonth = 1;
      } else if (parseInt($rootScope.year, 10) === curYear) {
        if (parseInt($rootScope.month, 10) > (curMonth)) {
          lm.validMonth = 1;
        }
      }
    }
  };

  lm.previous = function () {
    // $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
    $state.go(UIState.ADD_LISTING.PAID_MEMBER);
  };
  lm.skipStep = function () {
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paymentDetails']);
    // $rootScope.addListingStepDone = 6;
    $rootScope.addListingStepDone = 3;
    // $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };

  lm.resetForm = function () {
    vm.card = null;
    vm.firstName = null;
    //  vm.middleName = null;
    vm.lastName = null;
    vm.year = null;
    vm.month = null;
    vm.cvv = null;
    vm.address = null;
    vm.state = null;
    vm.city = null;
    vm.country = null;
    vm.zip = null;
  };

  var curYear = new Date().getFullYear();
  vm.testYear = function () {
    vm.curYear = curYear;
  };
  vm.middleName = '';
  vm.submit = function () {
    $rootScope.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    // validating file type
    var card = vm.card.replace(/ /g, '');
    vm.err_type = 0;
    if (angular.isUndefined(vm.year)) {
      vm.yearError = 'Please select year';
      return;
    }
    if (angular.isUndefined(vm.month)) {
      vm.monthError = 'Please select month';
      return;
    }
    var formData = new FormData();
    var paymentData = {
      'card_no': card,
      'first_name': vm.firstName,
      // 'middle_name': vm.middleName,
      'last_name': vm.lastName,
      'expiry_year': vm.year,
      'expiry_month': vm.month,
      'card_code': vm.cvv,
      'address': vm.address,
      'city': vm.city,
      'country': vm.country,
      'zip': vm.zip,
      'state': vm.state,
      'default': 'true'
    };
    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingPaymentDetail', paymentData, 'sessionStorage');
    }
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    var token = localStorageService.get('signupToken');
    service.paymentDetailsAddSignup(formData, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      // $rootScope.addListingStepDone = 6;
      $rootScope.addListingStepDone = 3;
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['paymentDetails']);
      // remove from storage
      localStorageService.remove('addListingPaymentDetail');
      lm.resetForm();

      // payment can be skips now
      canSkip = localStorageService.get('addListingCanSkip', 'sessionStorage');
      if (canSkip !== null) {
        canSkip.paymentSkip = 1;
      } else {
        canSkip = {
          paymentSkip: 1
        };
      }
      $rootScope.paymentSkip = 1;
      localStorageService.set('addListingCanSkip', canSkip, 'sessionStorage');
      upgradeMembership(token);
      // $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
      $state.go(UIState.ADD_LISTING.CENTER_INFO);

    }).catch(function (err) {
      $log.error(err);
      console.log('payment declined' + err.data.error);
      $rootScope.$emit(Status.FAILED, err.data.error);
    });
  };

  function upgradeMembership(token) {
    var type = localStorageService.get('membershipType', 'sessionStorage');
    var formData = new FormData();
    formData.append('package', type);
    // upgrade user
    userService.upgradeUserSignup(formData, token).then(function ( /* response */ ) {
      $rootScope.$emit(Status.SUCCESS, 'UPGRADE SUCCESSFUL');
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, err.data.error);
      throw err;
    });
  }
}

module.exports = ['$log', '$rootScope', 'Status', '$window', '$state', 'UIState', 'localStorageService', 'PaymentService', 'UserService', ctrl];
