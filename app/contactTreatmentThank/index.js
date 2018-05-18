var moduleName = 'app.contactTreatmentThank';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('contacttreatmentthank', {
    template: require('./view.html')
    // controller: require('./ctrl'),
    // controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACTTREATMENTTHANK,
      url: '/contact-treatment-center-thank',
      template: '<contacttreatmentthank></contacttreatmentthank>'
    });
  }]);

module.exports = moduleName;
