module.exports = ['$log', '$state', 'UIState', 'MapService', '$rootScope', '$window', ctrl];

function ctrl($log, $state, UIState, service, $rootScope, $window) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCounty = goToCounty;

  function onInit() {
    vm.stateName = $state.params.stateName;
    $rootScope.title = 'Browse the Best Rehabs in ' + vm.stateName.substring(0, 1).toUpperCase() + vm.stateName.substring(1);
    $rootScope.description = 'Browse the Best Rehabs in ' + vm.stateName.substring(0, 1).toUpperCase() + vm.stateName.substring(1);
    service.getCountiesByState(vm.stateName).then(function (result) {
      if (result.length === 0) {
        // $window.location = '/';
        $window.location = '/404';
      }
      result.sort();
      vm.counties = result;
      vm.displayError = false;
    }).catch(function (err) {
      $log.error(err);
      vm.counties = [];
      vm.displayError = true;
    });
  }

  function convertToSlug(Text) {
    return Text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  function goToCounty(county) {
    $state.go(UIState.SPONSOR_HOME.COUNTY, {
      stateName: convertToSlug(vm.stateName),
      countyName: convertToSlug(county)
    });
  }
}
