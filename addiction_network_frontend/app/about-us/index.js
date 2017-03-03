var angular = require('angular'),
  // ngRoute = require('angular-route'),
  ctrl = require('./aboutCtrl'),
  service = require('./aboutService'),
  htmlTemplate = require('./about.html'),
  moduleName = 'app.about';

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/about', {
      template: htmlTemplate,
      controller: 'aboutCtrl'
    })
  }])
  .factory('AboutService', service)
  .controller('aboutCtrl', ctrl);

module.exports = moduleName;
