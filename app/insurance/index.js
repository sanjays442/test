var moduleName = 'app.insurance';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('insurance', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.INSURANCE,
      url: '/insurance',
      template: '<insurance></insurance>'
    });
  }]);

module.exports = moduleName;
