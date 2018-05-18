var moduleName = 'app.contactTreatmentCenter';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('contacttreatmentcenter', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACTTREATMENTCENTER,
      url: '/contact-treatment-center',
      template: '<contacttreatmentcenter></contacttreatmentcenter>'
    });
  }]);

module.exports = moduleName;
