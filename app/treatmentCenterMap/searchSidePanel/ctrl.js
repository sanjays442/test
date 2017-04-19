module.exports = ['$log', '$state', 'UIState', ctrl];

function ctrl($log, $state, UIState) {
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
    $state.go(UIState.CENTER_MAP.LIST, params);
  }
}
