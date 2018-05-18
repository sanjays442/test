var moduleName = 'app.contactThank';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('contactthank', {
    template: require('./view.html')
    // controller: require('./ctrl'),
    // controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACTTHANK,
      url: '/contactus-thank',
      template: '<contactthank></contactthank>'
    });
  }]);

module.exports = moduleName;
