var moduleName = 'app.featuredTreatmentCenter';

angular.module(moduleName, [
  'ui.router',
  require('../sidePanel')
]).component('featuredTreatmentCenterPage', {
  template: require('./view.html'),
  controller: require('./ctrl')
}).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
  $stateProvider.state({
    name: UIState.FEATURED_CENTER,
    url: '/featured-treatment-center',
    template: '<featured-treatment-center-page></featured-treatment-center-page>'
  });
}]);

module.exports = moduleName;
