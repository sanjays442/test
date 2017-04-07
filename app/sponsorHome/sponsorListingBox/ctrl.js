module.exports = ['$log', '$state', '$stateParams', 'TreatmentCenterService', ctrl];

function ctrl($log, $state, $stateParams, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    var keyword = '';
    if ($state.is('sponsorHome.filter')) {
      keyword = $stateParams.filterName;
    }
    if ($state.is('sponsorHome.state')) {
      keyword = $stateParams.stateName;
    }
    if ($state.is('sponsorHome.city')) {
      keyword = $stateParams.cityName;
    }
    if ($state.is('sponsorHome.county')) {
      keyword = $stateParams.countyName;
    }
    if (!keyword) {
      $state.go('home');
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
