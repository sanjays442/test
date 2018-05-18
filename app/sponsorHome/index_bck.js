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
  .filter('removeHTMLTags', function () {
    return function (text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  })
  .filter('firstlettercaps', function () {
    return function (input, all) {
      var textValue = input.replace('-', ' ');
      if (input === '') {
        return '';
      }
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!textValue) ? textValue.replace(reg, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) : '';
    };
  })
  .filter('createSlug', function () {
    return function (slug) {
      if (slug === 'UT') {
        return 'utah';
      }
      var value = slug.replace(/(^[\s]+|[\s]+$)/g, '');
      return value
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    };
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.INDEX,
      abstract: true,
      template: '<sponsor-home></sponsor-home>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.FILTER,
      // url: '/sponsorhome/filter/:filterName',
      url: '/info/:filterName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.STATE,
      // url: '/sponsorhome/state/{stateName:[a-zA-Z]{2}}',
      url: '/state/{slug}-rehab-centers',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.COUNTIES,
      //  url: '/sponsorhome/counties/{stateName:[a-zA-Z]{2}}',
      url: '/counties/{stateName}',
      template: '<county-list-box></county-list-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.COUNTY,
      // url: '/sponsorhome/{stateName:[a-zA-Z]{2}}/:countyName',
      url: '/{stateName}-rehab-centers/:countyName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITY,
      // url: '/sponsorhome/{stateName:[a-zA-Z]{2}}/{countyName}/:cityName',
      url: '/{stateName}-rehab-centers/:cityName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITIES_OF_STATE,
      //  url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}',
      url: '/cities/{stateName}',
      template: '<city-list-box-of-state></city-list-box-of-state>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITIES_OF_COUNTY,
      //  url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}/{countyName}',
      url: '/cities/{stateName}/{countyName}',
      template: '<city-list-box-of-county></city-list-box-county>'
    });
  }]);

module.exports = moduleName;
