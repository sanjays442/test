module.exports = ['$log', '$stateParams', '$state', 'MapService', ctrl];

function ctrl($log, $stateParams, $state, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    vm.stateName = $stateParams.stateName;
    var uiState = $state.current.name;
    var promise;
    if (uiState === 'sponsorHome.cities') {
      promise = service.getCitiesByState(vm.stateName);
    }
    if (uiState === 'sponsorHome.counties') {
      promise = service.getCountiesByState(vm.stateName);
    }
    if (!promise) {
      return;
    }
    promise.then(function (result) {
      vm.places = result;
    }).catch(function (err) {
      $log.error(err);
    });
  }

  function goToCity(city) {
    $state.go('sponsorHome.city', {
      cityName: city
    });
  }
}
