module.exports = ['$log', '$state', 'UIState', 'MapService', ctrl];

function ctrl($log, $state, UIState, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    // request cities of state. #/sponsorhome/cities/IL
    vm.stateName = $state.params.stateName;
    vm.area = vm.stateName;
    service.getCitiesWithCountyByState(vm.stateName).then(function (result) {
      var cities = flatten(result);
      cities.sort();
      vm.citiesWithCounty = result;
      vm.cities = cities;
      vm.displayError = (vm.cities.length === 0);
    }).catch(function (err) {
      $log.error(err);
      vm.citiesWithCounty = [];
      vm.cities = [];
      vm.displayError = true;
    });
  }

  /*
    [
      {
      county: countyName1,
      cities: [cityName1, cityName2, ...]
    }, {
      county: countyName2,
      cities: [cityName3, cityName4, ...]
    }
  ...
  ]
  */
  // flattem the result from server to a single city list
  //eslint-disable-next-line
  function flatten(citiesWithCounty) {
    var flattened = citiesWithCounty.reduce(function (accumulator, current) {
      return accumulator.concat(current.cities);
    }, []);
    return flattened;
  }

  // find county according to cityName
  //eslint-disable-next-line
  function findCountyName(cityName) {
    var entry = vm.citiesWithCounty.find(function (elem) {
      return elem.cities.find(function (city) {
        return city === cityName;
      });
    });
    return entry ? entry.county : null;
  }

  function goToCity(city) {
    // go to city from state page
    var countyName = findCountyName(city);
    if (!countyName) {
      // throw error
      return;
    }
    $state.go(UIState.SPONSOR_HOME.CITY, {
      stateName: vm.stateName,
      countyName: countyName,
      cityName: city
    });
  }
}
