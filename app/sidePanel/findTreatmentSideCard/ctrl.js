module.exports = ['$log', '$state', 'UIState', 'TreatmentCenterService', ctrl];

function ctrl($log, $state, UIState, TreatmentCenterService) {
  var vm = this;
  vm.$onInit = onInit;
  vm.onStateUpdate = onStateUpdate;
  vm.submit = submit;

  function onInit() {
    vm.state = '';
    vm.zipcode = '';
    vm.miles = '';
  }

  function onStateUpdate(selected) {
    vm.state = selected;
  }
  vm.zipErr = 0;

  function submit() {
    var stateParams = {
      state: vm.state,
      zipcode: vm.zipcode,
      miles: vm.miles
    };

    var check = validationCheck(stateParams);
    if (check === false) {
      return;
    }
    $state.go(UIState.CENTER_MAP.LIST, stateParams);
  }

  function validationCheck(stateParams) {
    vm.zipErr = 0;
    vm.stateErr = 0;
    if (vm.zipcode.length > 5) {
      vm.zipErr = 'Zipcode must be 5 digits or empty';
      return false;
    }
    if ((angular.isUndefined(vm.state) || vm.state === '') && vm.zipcode.length === 5) {
      return true;
    } else if ((angular.isUndefined(vm.state) || vm.state === '') && vm.zipcode.length === 0) {
      vm.stateErr = 'Select any state or enter zipcode';
      return false;
    } else if ((angular.isUndefined(vm.state) || vm.state === '') && vm.zipcode.length < 5) {
      // console.log('Zipcode must be 5 digits');
      vm.zipErr = 'Zipcode must be 5 digits or empty';
      return false;
    }

    if (vm.state.trim() !== '' && vm.zipcode.length === 5) {
      testZipByState(vm.state, vm.zipcode, stateParams);
    } else if (vm.state.trim() !== '' && vm.zipcode.length === 0) {
      return true;
    } else if (vm.state.trim() !== '' && vm.zipcode.length < 5) {
      // console.log('Zipcode must be 5 digits or empty');
      vm.zipErr = 'Zipcode must be 5 digits or empty';
    }
    return false;
  }

  function testZipByState(state, zip, stateParams) {
    // test zip code
    TreatmentCenterService.getZipValidation(state, zip).then(function (response) {
      if (response.zip_present) {
        $state.go(UIState.CENTER_MAP.LIST, stateParams);
        return true;
      }
      vm.zipErr = 'Zipcode not associate with selected state.';
      return false;
    });
  }
}
