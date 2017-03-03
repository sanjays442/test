var angular = require('angular'),
  // ngRoute = require('angular-route'),
  ctrl = require('./listingCtrl'),
  htmlTemplate = require('./sponsoredListing.html'),
  service = require('./listingService'),
  moduleName = 'app.sponsoredListing';

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sponsorhome', {
      template: htmlTemplate,
      controller: 'SponsoredListingCtrl'
    });
  }])
  .factory('SponsoredListingService', service)
  .controller('SponsoredListingCtrl', ctrl);

module.exports = moduleName;
