var moduleName = 'app.treatmentCenterMap';

require('./style.css');

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
]).component('searchSidePanel', require('./searchSidePanel'))
  .component('centerListBox', require('./centerListBox'))
  .component('mapBox', require('./mapBox'))
  .component('treatmentCenterMap', {
    template: require('./view.html')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CENTER_MAP.INDEX,
      url: '/treatment-center-map',
      abstract: true,
      template: '<treatment-center-map></treatment-center-map>'
    });
    $stateProvider.state({
      name: UIState.CENTER_MAP.MAP,
      url: '',
      template: '<map-box on-select="$ctrl.onMapStateSelect(state)"></map-box>'
    });
    $stateProvider.state({
      name: UIState.CENTER_MAP.LIST,
      url: '/list?categories?state?zipcode?miles',
      template: '<center-list-box></center-list-box>'
    });
  }]);

module.exports = moduleName;
