module.exports = ['$state', 'UIState', ctrl];

function ctrl($state, UIState) {
  var vm = this;
  vm.onStateSelect = function (state) {
    $state.go(UIState.SPONSOR_HOME.STATE, {
      stateName: state.shortname
    });
  };
}
