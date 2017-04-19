module.exports = ['$log', '$state', 'UIState', 'TreatmentCenterService', ctrl];

function ctrl($log, $state, UIState, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    var keyword = '';
    var $stateParams = $state.params;
    if ($state.is(UIState.SPONSOR_HOME.FILTER)) {
      keyword = $stateParams.filterName;
    }
    if ($state.is(UIState.SPONSOR_HOME.STATE)) {
      keyword = $stateParams.stateName;
    }
    if ($state.is(UIState.SPONSOR_HOME.COUNTY)) {
      keyword = $stateParams.countyName;
    }
    if ($state.is(UIState.SPONSOR_HOME.CITY)) {
      keyword = $stateParams.cityName;
    }
    if (!keyword) {
      $state.go(UIState.HOME);
      return;
    }
    service.querySponsoredListings(keyword).then(function (result) {
      vm.entry = result;
      vm.displayError = false;
    }).catch(function (err) {
      vm.displayError = true;
      $log.error(err);
    });
  }
}
