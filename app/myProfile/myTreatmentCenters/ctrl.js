module.exports = ['$log', '$injector', '$rootScope', 'Status', '$uibModal', 'TreatmentCenterService', ctrl];

function ctrl($log, $injector, $rootScope, Status, $uibModal, service) {
  var vm = this;
  vm.centers = [];
  vm.totalPages = 0;
  vm.currentPage = 1;
  vm.order = 'ASC'; // ASC or DESC;
  vm.onPageUpdate = onPageUpdate;
  vm.onActivate = onActivate;
  vm.onDelete = onDelete;
  var deletePrompt = '<div class="modal-header"><h3 class="modal-title" id="modal-title">Delete Treatment Center!</h3></div><div class="modal-body" id="modal-body">Are you sure you want to delete?</div><div class="modal-footer"><button class="btn adn-btn" type="button" ng-click="ok()"> OK </button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button ></div>';
  vm.open = function (id) {
    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: deletePrompt,
      controller: function () {
        $rootScope.ok = function () {
          onDelete(id);
          modalInstance.close();
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
        };
      },
      bindToController: true
    });
  };
  vm.$onInit = onInit;

  function _query(page) {
    service.queryList(page).then(function (result) {
      var centers = result.treatment_centers;
      vm.centers = centers.map(function (center) {
        center.viewLink = 'treatmentCenterDetail({id:' + center.id + '})';
        center.editLink = 'myProfile.editTreatmentCenter({id:' + center.id + '})';
        return center;
      });
      vm.totalPages = result.total_pages;
      vm.currentPage = result.current_page;
    });
  }

  // get center list from server
  function onInit() {
    _query(vm.currentPage);
  }

  // when current page is changed, update currentCenters accordingly
  function onPageUpdate(page) {
    vm.currentPage = page;
    _query(vm.currentPage);
  }

  // activate of deactivate a treatment center by id
  function onActivate(id) {
    service.activate(id).then(function (result) {
      var center = vm.centers.find(_findCenterById(id));
      if (!center) {
        return;
      }
      center.active = result.active;
      var msg = center.active ? 'activated' : 'deactivated';
      msg = center.center_name + ' is ' + msg + ' successfully';
      $rootScope.$emit(Status.SUCCEEDED, msg);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  }

  // delete a treatment center by id
  function onDelete(id) {
    service.remove(id).then(function ( /* result */ ) {
      var center = vm.centers.find(_findCenterById(id));
      if (!center) {
        return;
      }
      _query(vm.currentPage);
      $rootScope.$emit(Status.SUCCEEDED, Status.CENTER_DELETE_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  }

  // return the index of the desired center in the centers array
  function _findCenterById(id) {
    return function (center) {
      return center.id === id;
    };
  }
}
