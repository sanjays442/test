module.exports = ['$scope', 'MapService', '$log', '$window',
  ctrl];

function ctrl($scope, service, $log, $window) {
  var vm = this;
  service.getStates().then(function (result) {
    vm.states = result;
  }).catch(function (err) {
    $log.info(err);
  });
  vm.getCities = function () {
    var state = vm.state;
    service.getCitiesByState(state).then(function (response) {
      if (response.length === 0) {
        // $window.location = '/';
        $window.location = '/404';
      }
      vm.cities = response;
      //  vm.city = vm.profile.city;
    }).catch(function (err) {
      vm.error_message = err;
    });
  };
  vm.cityClick = function (e) {
    var elem = angular.element(e.srcElement);
    elem.addClass('cities-sponsored-bgcolor');
  };
}
