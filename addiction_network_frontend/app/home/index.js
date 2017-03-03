var angular = require('angular'),
  // ngRoute = require('angular-route'),
  ctrl = require('./listingCtrl'),
  service = require('./listingService'),
  htmlTemplate = require('./home.html'),
  moduleName = 'app.home';

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      template: htmlTemplate,
      controller: 'HomeCtrl'
    })
  }])
  .factory('SponsoredListingService', service)
  .controller('HomeCtrl', ctrl);

module.exports = moduleName;
