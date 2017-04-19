module.exports = ['$log', '$state', 'UIState', ctrl];

function ctrl($log, $state, UIState) {
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

  function submit() {
    var stateParams = {
      state: vm.state,
      zipcode: vm.zipcode,
      miles: vm.miles
    };
    $state.go(UIState.CENTER_MAP.LIST, stateParams);
  }
}
