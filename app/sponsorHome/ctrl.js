function ctrl($log, $stateParams, service) {
  var vm = this;
  vm.slug = $stateParams.slug;
  service.queryByType(vm.slug).then(function (response) {
    vm.entry = response.data;
    window.scrollTo(0, 100);
  }).catch(function (err) {
    $log.error(err);
  });
}

module.exports = ['$log', '$stateParams', 'SponsoredListingService', ctrl];
