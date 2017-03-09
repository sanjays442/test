function ctrl($scope, $routeParams, service) {
  var id = $routeParams.id;
  service.queryById(id).then(function (result) {
    result.address = result.address_line_1 + result.address_line_1;
    $scope.entry = result;
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = ['$scope', '$routeParams', 'TreatmentcenterDetailService', ctrl];
