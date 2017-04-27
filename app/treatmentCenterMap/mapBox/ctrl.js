module.exports = ['$state', 'UIState', ctrl];

function ctrl($state, UIState) {
  var vm = this;
  vm.onStateSelect = onStateSelect;

  // listen the onSelect event of map-box component
  function onStateSelect(state) {
    $state.go(UIState.CENTER_MAP.LIST, {
      state: state.fullname
    });
  }
}
