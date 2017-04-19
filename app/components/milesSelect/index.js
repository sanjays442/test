function ctrl() {
  var vm = this;
  vm.$onInit = function () {
    vm.miles = '';
  };
  vm.onChange = function () {
    vm.onUpdate({
      miles: vm.miles
    });
  };
}

module.exports = {
  template: require('./view.html'),
  controller: ctrl,
  bindings: {
    onUpdate: '&'
  }
};
