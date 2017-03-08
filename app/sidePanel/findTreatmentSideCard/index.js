var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  moduleName = 'com.findTreatmentSideCard';

angular.module(moduleName, []).component('findTreatmentSideCard', {
  template: htmlTemplate,
  controller: 'FindTreatmentSideCardCtrl'
}).controller('FindTreatmentSideCardCtrl', ctrl);

module.exports = moduleName;
