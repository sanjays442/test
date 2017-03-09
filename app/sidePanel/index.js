var angular = require('angular'),
  htmlTemplate = require('./view.html'),
  moduleName = 'app.sidePanel';

angular.module(moduleName, [
  require('./findTreatmentSideCard'),
  require('./sideCard')
]).component('sidePanel', {
  template: htmlTemplate
});

module.exports = moduleName;
