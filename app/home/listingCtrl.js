var result = require('./home.json');

function listingCtrl($scope, $http, $routeParams, ListingService) {
  $scope.type = $routeParams.type;
  var listings = result.listings.map(function (listing) {
    var content_paragraph = listing.content_paragraph;
    var listing_href = content_paragraph.toLowerCase().replace(/ /g, '_');
    listing.id = 1;
    listing.listing_href = '#/treatment_center/' + listing.id + '/detail';
    return listing;
  });
  result.listings = listings;
  $scope.entry = result;
  
	$http({
		  method: 'GET',
		  url: 'https://ancient-everglades-10056.herokuapp.com/featured_listings',
		}).then(function successCallback(response) {
			$scope.featured_listing = response.data;
		  }, function errorCallback(response) {
			$scope.featured_listing = response.statusText;
		  });
  // ListingService.queryByType($scope.type).then(function (response) {
  //   var result = response.data;
  //   $scope.entry = result;
  // }).catch(function (err) {
  //   console.log(err);
  // });
}

module.exports = ['$scope', '$http', '$routeParams', 'SponsoredListingService', listingCtrl];
