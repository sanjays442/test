function ctrl($log, $rootScope, Status, $window, service) {
  var vm = this;

  var creditCardType = require('credit-card-type');
  vm.detectCardType = function (card) {
    if (angular.isDefined(card)) {
      vm.cardType = creditCardType(card);
      vm.totalDigits = card.length;
    } else {
      vm.cardType = null;
      vm.totalDigits = 0;
    }
  };

  var curYear = new Date().getFullYear();
  vm.testYear = function () {
    vm.curYear = curYear;
  };
  vm.middleName = '';
  vm.submit = function () {
    // validating file type
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
      'card_no': vm.card,
      'first_name': vm.firstName,
      'middle_name': vm.middleName,
      'last_name': vm.lastName,
      'expiry_year': vm.year,
      'expiry_month': vm.month,
      'card_code': vm.cvv
      //  'default': vm.default
    };
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    service.paymentDetailsAdd(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      $window.location.href = '/#my-profile/payment-details';
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

module.exports = ['$log', '$rootScope', 'Status', '$window', 'PaymentService', ctrl];
