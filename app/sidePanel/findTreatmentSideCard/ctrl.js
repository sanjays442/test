module.exports = ['$log', '$state', ctrl];

function ctrl($log, $state) {
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
    $state.go('treatmentCenterMap.list', stateParams);
  }
}
