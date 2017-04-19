module.exports = ['$log', '$state', 'UIState', 'MapService', ctrl];

function ctrl($log, $state, UIState, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    // request cities of state. #/sponsorhome/cities/IL/Cook
    vm.countyName = $state.params.countyName;
    vm.stateName = $state.params.stateName;
    vm.area = vm.countyName + ' ' + vm.stateName;
    service.getCitiesByCounty(vm.countyName).then(function (result) {
      result.sort();
      vm.cities = result;
      vm.displayError = (vm.cities.length === 0);
    }).catch(function (err) {
      $log.error(err);
      vm.cities = [];
      vm.displayError = true;
    });
  }

  function goToCity(city) {
    // go to city from county page
    $state.go(UIState.SPONSOR_HOME.CITY_OF_COUNTY, {
      stateName: vm.stateName,
      countyName: vm.countyName,
      cityName: city
    });
  }
}
