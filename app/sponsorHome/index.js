var moduleName = 'app.sponsorHome';

require('./style.css');

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services'),
  require('../sidePanel')
]).component('cityListBox', require('./cityListBox'))
  .component('cityListBoxOfCounty', require('./cityListBoxOfCounty'))
  .component('cityListBoxOfState', require('./cityListBoxOfState'))
  .component('countyListBox', require('./countyListBox'))
  .component('sponsorListingBox', require('./sponsorListingBox'))
  .component('sponsorHome', {
    template: require('./view.html')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.INDEX,
      abstract: true,
      template: '<sponsor-home></sponsor-home>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.FILTER,
      url: '/sponsorhome/filter/:filterName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.STATE,
      url: '/sponsorhome/state/{stateName:[a-zA-Z]{2}}',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.COUNTIES,
      url: '/sponsorhome/counties/{stateName:[a-zA-Z]{2}}',
      template: '<county-list-box></county-list-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.COUNTY,
      url: '/sponsorhome/{stateName:[a-zA-Z]{2}}/:countyName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITY,
      url: '/sponsorhome/{stateName:[a-zA-Z]{2}}/{countyName}/:cityName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITIES_OF_STATE,
      url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}',
      template: '<city-list-box-of-state></city-list-box-of-state>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITIES_OF_COUNTY,
      url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}/{countyName}',
      template: '<city-list-box-of-county></city-list-box-county>'
    });
  }]);

module.exports = moduleName;
