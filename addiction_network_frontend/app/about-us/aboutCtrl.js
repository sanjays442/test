var result = require('./about.json');

function listingCtrl($scope, $routeParams, TreatmentService) {
  $scope.type = $routeParams.type;
  $scope.entry = result;
  // ListingService.queryByType($scope.type).then(function (response) {
  //   var result = response.data;
  //   $scope.entry = result;
  // }).catch(function (err) {
  //   console.log(err);
  // });
}

module.exports = ['$scope', '$routeParams', 'AboutService', listingCtrl];
