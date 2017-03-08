var angular = require('angular'),
  ctrl = require('./listingCtrl'),
  htmlTemplate = require('./view.html'),
  service = require('./listingService'),
  moduleName = 'app.sponsoredListing';

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sponsorhome/:slug', {
      template: htmlTemplate,
      controller: 'SponsoredListingCtrl'
    });
  }])
  .factory('SponsoredListingService', service)
  .controller('SponsoredListingCtrl', ctrl);

module.exports = moduleName;
