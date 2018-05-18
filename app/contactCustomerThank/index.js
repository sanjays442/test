var moduleName = 'app.contactCustomerThank';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('contactcustomerthank', {
    template: require('./view.html')
    // controller: require('./ctrl'),
    // controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACTCUSTOMERTHANK,
      url: '/contact-customer-thank',
      template: '<contactcustomerthank></contactcustomerthank>'
    });
  }]);

module.exports = moduleName;
