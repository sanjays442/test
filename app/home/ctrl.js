module.exports = ['$log', 'TreatmentCenterService', ctrl];

function ctrl($log, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    service.queryFeaturedListings().then(function (result) {
      var listings = result.listings;
      if (!listings.length) {
        // get an empty listings from backend. what should we do?
        return;
      }
      vm.listings = listings.map(function (listing) {
        listing.uiSref = 'treatmentCenterDetail({id: "' + listing.id + '"})';
        return listing;
      });
    }).catch(function (err) {
      // todo, display the error message in the page.
      $log.error(err);
    });
  }
}
