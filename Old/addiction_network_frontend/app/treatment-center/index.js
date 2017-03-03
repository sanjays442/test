var angular = require('angular'),
  // ngRoute = require('angular-route'),
  ctrl = require('./treatmentCtrl'),
  service = require('./treatmentService'),
  htmlTemplate = require('./treatment-center-map.html'),
  moduleName = 'app.treatment';

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/treatment-center-map', {
      template: htmlTemplate,
      controller: 'treatmentCtrl'
    })
  }])
  .factory('TreatmentService', service)
  .controller('treatmentCtrl', ctrl);

module.exports = moduleName;
