module.exports = ['$log', '$scope', '$state', '$stateParams', ctrl];

function ctrl($log, $scope, $state, $stateParams) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToState = goToState;
  vm.goToCities = goToCities;
  vm.goToCounties = goToCounties;

  var uiStatesToDiplsay = [
    'sponsorHome.state',
    'sponsorHome.cities',
    'sponsorHome.counties'
  ];

  function _compare(source) {
    return function (target) {
      return source === target;
    };
  }

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    var uiState = toState.name;
    if (uiStatesToDiplsay.findIndex(_compare(uiState)) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = toParams.stateName;
  });

  function onInit() {
    var uiState = $state.current.name;
    if (uiStatesToDiplsay.findIndex(_compare(uiState)) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = $stateParams.stateName;
  }

  function goToState() {
    if (!vm.stateName) {
      return;
    }
    $state.go('sponsorHome.state', {
      stateName: vm.stateName
    });
  }

  // click to view All Cities of a state
  function goToCities() {
    $state.go('sponsorHome.cities', {
      stateName: vm.stateName
    });
  }

  // click to view All Counties of a state
  function goToCounties() {
    $state.go('sponsorHome.counties', {
      stateName: vm.stateName
    });
  }
}
