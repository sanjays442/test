var moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
]).component('addListing', {
  template: require('./view.html'),
  controller: require('./ctrl')
}).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
  $stateProvider.state({
    name: UIState.ADD_LISTING,
    url: '/add-listing',
    template: '<add-Listing></add-Listing>'
  });
}]);

module.exports = moduleName;
