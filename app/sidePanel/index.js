var moduleName = 'app.sidePanel';

angular.module(moduleName, [require('../components')])
  .component('findTreatmentSideCard', require('./findTreatmentSideCard'))
  .component('sideCard', require('./sideCard'))
  .component('locationFilterCard', require('./locationFilterCard'))
  .component('sidePanel', {
    template: require('./view.html')
  });

module.exports = moduleName;
