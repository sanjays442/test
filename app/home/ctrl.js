function ctrl($log, service) {
  var vm = this;
  service.query().then(function (result) {
    var listings = result.listings.map(function (listing) {
      listing.uiSref = 'treatmentCenterDetail({id: "' + listing.id + '"})';
      return listing;
    });
    vm.listings = listings;
  }).catch(function (err) {
    // todo, display the error message in the page.
    $log.error(err);
  });
}

module.exports = ['$log', 'HomeListingService', ctrl];
