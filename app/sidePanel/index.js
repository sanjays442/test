var angular = require('angular'),
  moduleName = 'app.sidePanel';

angular.module(moduleName, [require('../components')])
  .component('findTreatmentSideCard', require('./findTreatmentSideCard'))
  .component('sideCard', require('./sideCard'))
  .component('sidePanel', {
    template: require('./view.html')
  });

module.exports = moduleName;
