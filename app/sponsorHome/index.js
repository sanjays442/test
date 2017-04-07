var moduleName = 'app.sponsorHome';

angular.module(moduleName, [
  'ui.router',
  require('../services'),
  require('../sidePanel')
]).filter('urlFilter', require('./urlFilter'))
  .component('sponsorListingBox', require('./sponsorListingBox'))
  .component('locationListingBox', require('./locationListingBox'))
  .component('sponsorHome', {
    template: require('./view.html')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorHome',
      abstract: true,
      template: '<sponsor-home></sponsor-home>'
    });
    $stateProvider.state({
      name: 'sponsorHome.filter',
      url: '/sponsorhome/filter/:filterName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.state',
      url: '/sponsorhome/state/:stateName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.city',
      url: '/sponsorhome/city/:cityName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.county',
      url: '/sponsorhome/county/:countyName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.cities',
      url: '/sponsorhome/:stateName/cities',
      template: '<location-listing-box></location-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.counties',
      url: '/sponsorhome/:stateName/counties',
      template: '<location-listing-box></location-listing-box>'
    });
  }]);

module.exports = moduleName;
