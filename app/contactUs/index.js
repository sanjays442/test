var moduleName = 'app.contactUs';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('contact', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACT_US,
      url: '/contact',
      template: '<contact></contact>'
    });
  }]);

module.exports = moduleName;
