var states = require('./states.json');

function ctrl($scope) {
  $scope.states = states;
}

module.exports = ['$scope', ctrl];
