module.exports = ctrl;

function ctrl() {
  var vm = this;
  vm.onStateSelect = function (state) {
    vm.onSelect({
      state: state
    });
  };
}
