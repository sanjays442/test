var angular = require('angular'),
  moduleName = 'app.treatmentCenterMap';

angular.module(moduleName, ['ui.router'])
  .factory('TreatmentcenterMapService', require('./service'))
  .component('treatmentCenterMap', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'treatmentCenterMap',
      url: '/treatment-center-map',
      template: '<treatment-center-map></treatment-center-map>'
    }).state({
      name: 'treatmentCenterMapState',
      url: '/treatment-center-map/:mapState',
      template: '<treatment-center-map></treatment-center-map>',
      params: {
        mapState: null
      }
    });
  }]).controller('searchCtrl', require('./ctrl'));

module.exports = moduleName;
