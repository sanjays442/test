var angular = require('angular'),
  sidePanelCtrl = require('./sidePanelCtrl'),
  htmlTemplate = require('./sidePanel.html'),
  moduleName = 'app.sidePanel';

angular.module(moduleName, []).component('sidePanel', {
  template: htmlTemplate,
  controller: 'SidePanelCtrl'
}).controller('SidePanelCtrl', sidePanelCtrl);

module.exports = moduleName;
