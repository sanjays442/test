function StateSelectctrl($http, endPoint) {
  var vm = this;
  // vm.states = states;
  var req = $http({
    url: endPoint + '/states',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  req.then(function (res) {
    vm.states = res.data;
    // return res.data;
  });
}
module.exports = {
  template: require('./view.html'),
  controller: StateSelectctrl,
  bindings: {
    selected: '@',
    onUpdate: '&'
  }
};

StateSelectctrl.$inject = ['$http', 'endPoint'];
