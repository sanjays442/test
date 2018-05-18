module.exports = ['$log', '$state', 'UIState', 'MapService', '$rootScope', '$window', ctrl];

function ctrl($log, $state, UIState, service, $rootScope, $window) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    // request cities of state. #/sponsorhome/cities/IL
    vm.stateName = $state.params.stateName;
    vm.area = vm.stateName;
    $rootScope.title = 'Browse the Best Rehabs in ' + vm.stateName.substring(0, 1).toUpperCase() + vm.stateName.substring(1);
    $rootScope.description = 'Browse the Best Rehabs in ' + vm.stateName.substring(0, 1).toUpperCase() + vm.stateName.substring(1);
    service.getCitiesByState(vm.stateName).then(function (result) {
      if (result.length === 0) {
        // $window.location = '/';
        $window.location = '/404';
      }
      //  var cities = flatten(result);
      var cities = result;
      //  console.log('cites: '+ cities);
      cities.sort();
      vm.citiesWithCounty = result;
      vm.cities = cities;
      //   console.log('cites: '+ cities);
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

  function convertToSlug(Text) {
    return Text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  function goToCity(city) {
    // go to city from state page
    //  var countyName = findCountyName(city);
    //  if (!countyName) {
    // throw error
    //  return;
    //  }
    $state.go(UIState.SPONSOR_HOME.CITY, {
      stateName: convertToSlug(vm.stateName),
      // countyName: '', // convertToSlug(countyName),
      cityName: convertToSlug(city)
    });
  }
}
