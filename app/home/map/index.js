var config = require('./map.json');

function MapCtrl($scope, $element, $location) {
  var _ctrl = this;
  // assign the map config to the controller, so html template can access it
  _ctrl.config = config;
  // the targets are thoese path elements in graphic element(#state)
  var selector = '#states path';
  // use event delegation to add mouse events on the target elements.
  $element.on('mouseenter', selector, function (event) {
    var target = event.target;
    target.setAttribute('fill', config.overcolor);
  });

  $element.on('mouseleave', selector, function (event) {
    var target = event.target;
    target.setAttribute('fill', config.upcolor);
  });

  $element.on('mousedown', selector, function (event) {
    var target = event.target;
    target.setAttribute('fill', config.downcolor);
  });

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  $element.on('mouseup', selector, function (event) {
    var target = event.target;
    var id = target.getAttribute('id');
    var stateData = getStateDataById(id);
    var currentPath = $location.path();
    var treatmentState = capitalize(stateData.fullname);
    if (currentPath === '/') {
      var targetURL = '/sponsorhome/' + stateData.shortname;
    } else {
      targetURL = '/treatment-center-map/' + treatmentState;
    }
    // $scope.$apply needs to be called to have the url change into effect
    $location.url(targetURL);
    $scope.$apply();
  });

  // find the exact state data from map confing data (map.json) by id
  function getStateDataById(id) {
    var states = config.states;
    var len = states.length;
    for (var i = 0; i < len; i++) {
      if (id === states[i].id) {
        return states[i];
      }
    }
    return null;
  }
}

MapCtrl.$inject = ['$scope', '$element', '$location'];

module.exports = {
  template: require('./view.html'),
  controller: MapCtrl
};
