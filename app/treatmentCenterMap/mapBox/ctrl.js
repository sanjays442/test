module.exports = ['$state', 'UIState', '$rootScope', ctrl];

function ctrl($state, UIState, $rootScope) {
  var vm = this;
  vm.onStateSelect = onStateSelect;
  $rootScope.title = 'Treatment Center';
  $rootScope.description = 'Treatment Center';
  // listen the onSelect event of map-box component
  function onStateSelect(state) {
    $state.go(UIState.CENTER_MAP.LIST, {
      state: state.fullname
    });
  }
}
