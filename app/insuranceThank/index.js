var moduleName = 'app.insuranceThank';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('insuranceThank', {
    template: require('./view.html')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.INSURANCETHANK,
      url: '/insurance-prequalification-thank',
      template: '<insurance-thank></insurance-thank>'
    });
  }]);

module.exports = moduleName;
