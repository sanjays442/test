function ctrl($log, $stateParams, $rootScope, Status, service) {
  var vm = this;
  var profileId = $stateParams.id;
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
    };
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    service.paymentDetailsEdit(profileId, formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_EDIT_SUCCEESS_MSG);
      // refreshing data
      //  getPaymentData(vm, profileId, PaymentService);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}
module.exports = ['$log', '$stateParams', '$rootScope', 'Status', 'PaymentService', ctrl];
