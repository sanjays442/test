var angular = require('angular'),
  moduleName = 'app.components';

angular.module(moduleName, [])
  .constant('Status', require('./statusConstants'))
  .component('statusView', require('./statusView'))
  .component('profileNavSection', require('./profileNavSection'))
  .component('stateSelect', require('./stateSelect'))
  .component('sponsAdsCategories', require('./sponsAdsCategories'))
  .component('sponsListIds', require('./sponsListIds'))
  .directive('fileModel', require('./fileModel'))
  .directive('validPasswordC', require('./validPasswordC'));

module.exports = moduleName;
