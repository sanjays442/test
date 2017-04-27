function ctrl($log, $injector, $rootScope, Status, service) {
  var list = this;

  function paymentList() {
    service.paymentList().then(function (response) {
      list.payment = response;
    }).catch(function (err) {
      throw err;
    });
  }
  var deletePrompt = '<div class="modal-header"><h3 class="modal-title" id="modal-title">Delete Payment Details!</h3></div><div class="modal-body" id="modal-body">Are you sure you want to delete?</div><div class="modal-footer"><button class="btn" type="button" ng-click="ok()"> OK </button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button ></div>';
  list.open = function (id) {
    var paymentId = id.id;
    var modalInstance = $injector.get('$uibModal').open({
      animation: list.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: deletePrompt,
      controller: function () {
        $rootScope.ok = function () {
          onDelete(paymentId);
          modalInstance.close();
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
        };
      },
      bindToController: true
    });
  };

  function onDelete(id) {
    service.removePaymentDetails(id).then(function ( /* result */ ) {
      paymentList();
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_DELETE_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  }
  paymentList();
}

module.exports = ['$log', '$injector', '$rootScope', 'Status', 'PaymentService', ctrl];
