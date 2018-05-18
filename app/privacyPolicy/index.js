var moduleName = 'app.privacyPolicy';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('privacypolicy', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.PRIVACY_POLICY,
      url: '/privacy-policy',
      template: '<privacyPolicy></privacyPolicy>'
    });
  }]);

module.exports = moduleName;
