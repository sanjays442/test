function ctrl($log, $rootScope, Status, $state, UIState, service, userService, localStorageService) {
  var vm = this;
  var creditCardType = require('credit-card-type');
  vm.cardType = 'credit';

  vm.detectCardType = function (card, event) {
    if (angular.isDefined(card)) {
      var cardVal = card.replace(/ /g, '');
      vm.cardType = creditCardType(cardVal);
      if (angular.isDefined(vm.cardType[0])) {
        if (vm.cardType[0].type === 'master-card') {
          vm.cardType = 'master';
        } else if (vm.cardType[0].type === 'visa') {
          vm.cardType = 'visa';
        } else if (vm.cardType[0].type === 'american-express') {
          vm.cardType = 'amex';
        } else if (vm.cardType[0].type === 'jcb') {
          vm.cardType = 'jcb';
        } else if (vm.cardType[0].type === 'discover') {
          vm.cardType = 'discover';
        } else if (vm.cardType[0].type === 'diners-club') {
          vm.cardType = 'diners-club';
        } else {
          vm.cardType = 'credit';
        }
      }

      vm.totalDigits = card.replace(/ /g, '').length;
      if (event.keyCode !== 8) {
        if (vm.totalDigits === 4) {
          vm.card = vm.card + ' ';
        } else if (vm.totalDigits === 9) {
          vm.card = vm.card + ' ';
        } else if (vm.totalDigits === 14) {
          vm.card = vm.card + ' ';
        }
      }
    } else {
      vm.cardType = null;
      vm.totalDigits = 0;
      vm.cardType = 'credit';
    }
  };

  vm.validateMonth = function () {
    vm.validMonth = 0;
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth();
    if (angular.isDefined(vm.year)) {
      if (vm.year > curYear) {
        vm.validMonth = 1;
      } else if (parseInt(vm.year, 10) === curYear) {
        if (parseInt(vm.month, 10) > (curMonth)) {
          vm.validMonth = 1;
        }
      }
    }
  };

  vm.resetForm = function () {
    vm.card = null;
    vm.firstName = null;
    //  vm.middleName = null;
    vm.lastName = null;
    vm.year = null;
    vm.month = null;
    vm.cvv = null;
    vm.address = null;
    vm.city = null;
    vm.state = null;
    vm.zip = null;
    vm.country = null;
  };

  var curYear = new Date().getFullYear();
  vm.testYear = function () {
    vm.curYear = curYear;
  };
  vm.middleName = '';
  vm.submit = function () {
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
      'state': vm.state,
      'city': vm.city,
      'country': vm.country,
      'zip': vm.zip
      //  'default': vm.default
    };

    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    service.paymentDetailsAdd(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      upgradeMembership();
      vm.resetForm();
      $state.go(UIState.MY_PROFILE.MY_CENTERS);
      // $state.reload();
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, err.data.error);
    });
  };

  function upgradeMembership() {
    var type = $rootScope.membershipType;
    if (angular.isUndefined($rootScope.membershipType)) {
      type = localStorageService.get('membershipType', 'sessionStorage');
    }
    var formData = new FormData();
    formData.append('package', type);
    // upgrade user
    userService.upgradeUser(formData).then(function ( /* response */ ) {
      $rootScope.$emit(Status.SUCCESS, 'UPGRADE SUCCESSFUL');
      localStorageService.set('membershipType', type, 'sessionStorage');
      $rootScope.profileData.type_of_user = type;
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, err.data.error);
      throw err;
    });
  }
}

module.exports = ['$log', '$rootScope', 'Status', '$state', 'UIState', 'PaymentService', 'UserService', 'localStorageService', ctrl];
