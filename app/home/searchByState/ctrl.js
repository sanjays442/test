module.exports = ['$state', ctrl];

function ctrl($state) {
  var vm = this;
  vm.onStateSelect = function (state) {
    $state.go('sponsorHome.state', {
      stateName: state.shortname
    });
  };
}
