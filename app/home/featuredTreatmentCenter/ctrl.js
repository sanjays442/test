module.exports = ['$log', 'UIState', 'TreatmentCenterService', '$document', ctrl];

function ctrl($log, UIState, service, $document) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    service.queryFeaturedListings().then(function (result) {
      var listings = result.listings;
      if (!listings.length) {
        // get an empty listings from backend. what should we do?
        return;
      }
      angular.forEach(listings, function (value) {
        var image = value.listing_image;
        var id = value.id;
        imageExists(image, id);
      });

      function imageExists(url, id) {
        var img = new Image();
        img.onload = function () {

        };
        img.onerror = function () {
          var imageNotFound = angular.element($document[0].querySelector('#image-' + id));
          imageNotFound.attr('src', 'themes/addiction/images/placeholder.png');
        };
        img.src = url;
      }

      vm.listings = listings.map(function (listing) {
        listing.uiSref = UIState.CENTER_DETAIL + '({id: "' + listing.slug + '"})';
        return listing;
      });
    }).catch(function (err) {
      // todo, display the error message in the page.
      $log.error(err);
    });
  }
}
