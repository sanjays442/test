function ctrl($log, $stateParams, $rootScope, Status, service) {
  var vm = this;
  var profileId = $stateParams.id;
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
