var moduleName = 'app.treatmentCenterMap';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
]).component('centerListBox', require('./centerListBox'))
  .component('mapBox', require('./mapBox'))
  .component('treatmentCenterMap', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'treatmentCenterMap',
      url: '/treatment-center-map',
      abstract: true,
      template: '<treatment-center-map></treatment-center-map>'
    });
    $stateProvider.state({
      name: 'treatmentCenterMap.index',
      url: '',
      template: '<map-box on-select="$ctrl.onMapStateSelect(state)"></map-box>'
    });
    $stateProvider.state({
      name: 'treatmentCenterMap.list',
      url: '/list?categories?state?zipcode?miles',
      template: '<center-list-box></center-list-box>'
    });
  }]);

module.exports = moduleName;
