var angular = require('angular'),
  moduleName = 'app.advertisement';
angular.module(moduleName, ['ui.router'])
  .factory('advertisementService', require('./service'))
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'advertisement'
    });
  }]).controller('advertisementCtrl', require('./ctrl'));

module.exports = moduleName;
