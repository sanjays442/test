module.exports = ['$log', '$stateParams', 'UIState', 'TreatmentCenterService', '$rootScope', ctrl];

function ctrl($log, $stateParams, UIState, service, $rootScope) {
  var vm = this;
  vm.currentPage = 1;
  vm.totalPages = 0;
  vm.$onInit = onInit;
  vm.onPageUpdate = onPageUpdate;

  function onInit() {
    _search();
  }

  $rootScope.title = 'Treatment Center';
  $rootScope.description = 'Treatment Center';

  function onPageUpdate(page) {
    $log.info(page);
    vm.currentPage = page;
    _search();
  }

  function _search() {
    var data = $stateParams;
    data.page = vm.currentPage;
    service.search(data).then(function (result) {
      var listings = result.listings;
      vm.listings = listings.map(function (listing) {
        listing.uiSref = UIState.CENTER_DETAIL + '({id:"' + listing.slug + '"})';
        return listing;
      });
      vm.totalPages = result.total_pages;
      vm.currentPage = result.current_page;
      vm.displayError = (listings.length === 0);
    }).catch(function (err) {
      $log.error(err);
      vm.displayError = true;
    });
  }
}
