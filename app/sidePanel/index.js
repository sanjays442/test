var moduleName = 'app.sidePanel';

require('./style.css');

angular.module(moduleName, [require('../components')])
  .component('areaFilterCard', require('./areaFilterCard'))
  .component('findTreatmentSideCard', require('./findTreatmentSideCard'))
  .component('sideCard', require('./sideCard'))
  .component('sidePanel', {
    template: require('./view.html')
  });

module.exports = moduleName;
