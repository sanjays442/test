function ctrl($log, $rootScope, Status, $window, PaymentService) {
  var vm = this;
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
      'expiry_year': vm.year,
      'expiry_month': vm.month,
      'card_code': vm.cvv
    };
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    PaymentService.paymentDetailsAdd(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      $window.location.href = '/#my-profile/payment-details';
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

module.exports = ['$log', '$rootScope', 'Status', '$window', 'PaymentService', ctrl];
