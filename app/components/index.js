var moduleName = 'app.components';

angular.module(moduleName, [])
  .constant('Status', require('./statusConstants'))
  .constant('states', require('./states.json'))
  .constant('mapConfig', require('./map.json'))
  .component('statusView', require('./statusView'))
  .component('profileNavSection', require('./profileNavSection'))
  .component('stateSelect', require('./stateSelect'))
  .component('stateMap', require('./stateMap'))
  .component('sponsAdsCategories', require('./sponsAdsCategories'))
  .component('sponsListIds', require('./sponsListIds'))
  .component('sectionHeading', require('./sectionHeading'))
  .directive('fileModel', require('./fileModel'))
  .directive('validPasswordC', require('./validPasswordC'));

module.exports = moduleName;
