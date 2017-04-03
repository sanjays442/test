function ctrl($log, $rootScope, Status, TreatmentCenterService) {
  var vm = this;
  vm.submit = function () {
    var data = {
      inquiry: {
        name: vm.name,
        email: vm.email,
        phone: vm.phone,
        message: vm.message,
        treatment_center_id: vm.centerId
      }
    };
    TreatmentCenterService.inquiry(data).then(function ( /* result */ ) {
      $rootScope.$emit(Status.SUCCEEDED, Status.INQUIRY_SUCCESS_MSG);
      vm.name = '';
      vm.email = '';
      vm.phone = '';
      vm.message = '';
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

module.exports = ['$log', '$rootScope', 'Status', 'TreatmentCenterService', ctrl];
