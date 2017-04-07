function ctrl(states) {
  var vm = this;
  vm.states = states;
}

ctrl.$inject = ['states'];

module.exports = {
  template: require('./view.html'),
  controller: ctrl,
  bindings: {
    selected: '<',
    onUpdate: '&'
  }
};
