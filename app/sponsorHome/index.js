var angular = require('angular'),
  moduleName = 'app.sponsorHome';

angular.module(moduleName, [
  'ui.router',
  require('../sidePanel')
]).factory('SponsoredListingService', require('./service'))
  .component('sponsorHome', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorHome',
      url: '/sponsorhome/:slug',
      template: '<sponsor-home></sponsor-home>'
    });
  }]);

module.exports = moduleName;
