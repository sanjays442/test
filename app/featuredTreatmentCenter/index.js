var angular = require('angular'),
  moduleName = 'app.featuredTreatmentCenter';

angular.module(moduleName, [
  'ui.router',
  require('../sidePanel')
]).component('featuredTreatmentCenterPage', {
  template: require('./view.html')
}).config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state({
    name: 'featuredTreatmentCenterPage',
    url: '/featured-treatment-center',
    template: '<featured-treatment-center-page></featured-treatment-center-page>'
  });
}]);

module.exports = moduleName;
