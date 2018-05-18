module.exports = ['$log', '$state', 'UIState', 'TreatmentCenterService', ctrl];

function ctrl($log, $state, UIState, TreatmentCenterService) {
  var vm = this;
  vm.$onInit = onInit;
  vm.submit = submit;
  vm.onStateSelect = onStateSelect;

  function onInit() {
    var params = $state.params;
    if (!params) {
      return;
    }
    vm.categories = params.categories || '';
    vm.state = params.state || '';
    vm.zipcode = params.zipcode || '';
    vm.miles = params.miles || '';
    var categories = vm.categories.split(',');
    categories.forEach(function (catg) {
      var catgInt = parseInt(catg, 10);
      if (isNaN(catgInt)) {
        return;
      }
      if (catgInt <= 4 && catgInt >= 1) {
        vm['catg' + catg] = true;
      }
    });
  }

  // listen the onUpdate event of state-select
  function onStateSelect(selected) {
    vm.state = selected;
  }

  // submit search form
  function submit() {
    var categories = [];
    if (vm.catg1) {
      categories.push(1);
    }
    if (vm.catg2) {
      categories.push(2);
    }
    if (vm.catg3) {
      categories.push(3);
    }
    if (vm.catg4) {
      categories.push(4);
    }
    var params = {
      categories: categories.join(','),
      state: vm.state,
      zipcode: vm.zipcode,
      miles: vm.miles
    };

    // validate
    var check = validationCheck(params);
    if (check === false) {
      return;
    }
    $state.go(UIState.CENTER_MAP.LIST, params);
  }

  function validationCheck(stateParams) {
    vm.zipErr = 0;
    vm.stateErr = 0;
    if (vm.zipcode.length > 5) {
      vm.zipErr = 'Zipcode must be 5 digits or empty';
      return false;
    }

    if ((angular.isUndefined(vm.state) || vm.state === '' || vm.state === null) && vm.zipcode.length === 0) {
      vm.stateErr = 'Select any state or enter zipcode';
      return false;
    } else if ((angular.isUndefined(vm.state) || vm.state === '') && vm.zipcode.length === 5) {
      return true;
    } else if ((angular.isUndefined(vm.state) || vm.state === '') && vm.zipcode.length < 5) {
      vm.zipErr = 'Zipcode must be 5 digits or empty';
      return false;
    }

    if (vm.state.trim() !== '' && vm.zipcode.length === 5) {
      testZipByState(vm.state, vm.zipcode, stateParams);
    } else if (vm.state.trim() !== '' && vm.zipcode.length === 0) {
      return true;
    } else if (vm.state.trim() !== '' && vm.zipcode.length < 5) {
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
