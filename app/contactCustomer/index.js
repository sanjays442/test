var moduleName = 'app.contactCustomer';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('contactcustomer', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACT_CUSTOMER,
      url: '/contact-customer',
      template: '<contactcustomer></contactcustomer>'
    });
  }]);

module.exports = moduleName;
