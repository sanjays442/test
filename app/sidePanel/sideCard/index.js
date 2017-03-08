var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  moduleName = 'com.sideCard';

angular.module(moduleName, []).component('sideCard', {
  template: htmlTemplate,
  controller: 'SideCardCtrl'
}).controller('SideCardCtrl', ctrl);

module.exports = moduleName;
