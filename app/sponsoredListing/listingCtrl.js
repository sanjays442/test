function listingCtrl($scope, $routeParams, service) {
  $scope.type = $routeParams.type;
  var slug = $routeParams.slug;
  $scope.type = 'Rehab for Men';
  service.queryByType($scope.type).then(function (response) {
    var result = response.data;
    $scope.entry = result;
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = ['$scope', '$routeParams', 'SponsoredListingService', listingCtrl];
